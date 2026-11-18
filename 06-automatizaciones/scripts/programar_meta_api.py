#!/usr/bin/env python3
"""
programar_meta_api.py — Programa lotes de publicaciones (foto unica o album multi-foto)
en una Pagina de Facebook usando Meta Graph API oficial.

Uso tipico:
  1. Validar sin enviar nada a Meta (--dry-run):
     python programar_meta_api.py --manifest lote_programacion.json --dry-run
  2. Programar en vivo espaciado cada 4 horas:
     python programar_meta_api.py --manifest lote_programacion.json --interval-hours 4
  3. Obtener Page Access Token que no expira a partir de un User Token temporal:
     python programar_meta_api.py --exchange-user-token TU_USER_TOKEN_CORTO
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import sys
from pathlib import Path
import requests


def load_env_files() -> None:
    """Carga variables desde .env en la raiz o en 06-automatizaciones/scripts/.env sin pisar env del sistema."""
    candidates = [
        Path(__file__).resolve().parents[2] / ".env",
        Path(__file__).resolve().parent / ".env",
    ]
    for env_path in candidates:
        if not env_path.exists():
            continue
        for raw_line in env_path.read_text(encoding="utf-8").splitlines():
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, val = line.split("=", 1)
            key = key.strip()
            val = val.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = val


def exchange_for_permanent_page_token(user_token: str, app_id: str, app_secret: str, version: str) -> dict:
    """Convierte un User Token corto (1h) en Long-Lived User Token y extrae los Page Access Tokens."""
    url = f"https://graph.facebook.com/{version}/oauth/access_token"
    resp = requests.get(
        url,
        params={
            "grant_type": "fb_exchange_token",
            "client_id": app_id,
            "client_secret": app_secret,
            "fb_exchange_token": user_token,
        },
        timeout=20,
    )
    data = resp.json()
    if "access_token" not in data:
        raise RuntimeError(f"Error intercambiando User Token: {json.dumps(data, ensure_ascii=False)}")

    long_user_token = data["access_token"]
    pages_resp = requests.get(
        f"https://graph.facebook.com/{version}/me/accounts",
        params={"access_token": long_user_token},
        timeout=20,
    )
    return pages_resp.json()


def upload_unpublished_photo(page_id: str, token: str, image_path: Path, version: str) -> str:
    """Sube una imagen local como no publicada y temporal para adjuntarla a un post programado."""
    url = f"https://graph.facebook.com/{version}/{page_id}/photos"
    with image_path.open("rb") as f:
        resp = requests.post(
            url,
            data={"published": "false", "temporary": "true", "access_token": token},
            files={"source": (image_path.name, f, "image/png")},
            timeout=60,
        )
    data = resp.json()
    if "id" not in data:
        raise RuntimeError(f"Error subiendo {image_path.name}: {json.dumps(data, ensure_ascii=False)}")
    return str(data["id"])


def schedule_feed_post(
    page_id: str,
    token: str,
    message: str,
    media_ids: list[str],
    unix_ts: int,
    version: str,
) -> dict:
    """Crea un post programado en /{page_id}/feed con 1 o varias fotos adjuntas."""
    url = f"https://graph.facebook.com/{version}/{page_id}/feed"
    payload: dict[str, str | int] = {
        "message": message,
        "published": "false",
        "scheduled_publish_time": unix_ts,
        "access_token": token,
    }
    for idx, media_id in enumerate(media_ids):
        payload[f"attached_media[{idx}]"] = json.dumps({"media_fbid": media_id})

    resp = requests.post(url, data=payload, timeout=30)
    data = resp.json()
    if "id" not in data:
        raise RuntimeError(f"Error programando post: {json.dumps(data, ensure_ascii=False)}")
    return data


def main() -> int:
    load_env_files()
    parser = argparse.ArgumentParser(description="Programa lotes de posts en Facebook via Meta Graph API.")
    parser.add_argument("--manifest", help="Ruta al JSON con lista de posts ({imagenes: [...], message: '...'})")
    parser.add_argument("--start-in-minutes", type=int, default=20, help="Minutos desde ahora para el 1er post (min 15)")
    parser.add_argument("--interval-hours", type=float, default=4.0, help="Horas de separacion entre posts")
    parser.add_argument("--dry-run", action="store_true", help="Valida archivos y horarios sin llamar a la API de Meta")
    parser.add_argument("--exchange-user-token", help="Convierte un User Token corto en Page Tokens permanentes")
    args = parser.parse_args()

    version = os.environ.get("FB_GRAPH_VERSION", "v25.0")

    if args.exchange_user_token:
        app_id = os.environ.get("FB_APP_ID", "")
        app_secret = os.environ.get("FB_APP_SECRET", "")
        if not app_id or not app_secret:
            print("ERROR: Define FB_APP_ID y FB_APP_SECRET en .env para intercambiar el token.", file=sys.stderr)
            return 1
        result = exchange_for_permanent_page_token(args.exchange_user_token, app_id, app_secret, version)
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return 0

    if not args.manifest:
        parser.error("Debes pasar --manifest <ruta.json> o --exchange-user-token <token>.")

    manifest_path = Path(args.manifest).resolve()
    posts = json.loads(manifest_path.read_text(encoding="utf-8"))
    base_dir = manifest_path.parent

    if args.start_in_minutes < 15:
        print("ERROR: Meta exige al menos 10 minutos en el futuro. Usa --start-in-minutes >= 15.", file=sys.stderr)
        return 1

    page_id = os.environ.get("FB_PAGE_ID", "")
    token = os.environ.get("FB_PAGE_ACCESS_TOKEN", "")
    if not args.dry_run and (not page_id or not token):
        print("ERROR: Faltan FB_PAGE_ID o FB_PAGE_ACCESS_TOKEN en .env.", file=sys.stderr)
        return 1

    now = dt.datetime.now()
    results = []
    for idx, post in enumerate(posts):
        sched_dt = now + dt.timedelta(minutes=args.start_in_minutes) + dt.timedelta(hours=args.interval_hours * idx)
        unix_ts = int(sched_dt.timestamp())
        image_paths = [(base_dir / rel).resolve() for rel in post["imagenes"]]
        for img_p in image_paths:
            if not img_p.exists():
                print(f"ERROR: No existe la imagen {img_p}", file=sys.stderr)
                return 1

        if args.dry_run:
            results.append(
                {
                    "orden": idx + 1,
                    "estado": "DRY_RUN_OK",
                    "programado_para": sched_dt.strftime("%Y-%m-%d %H:%M"),
                    "unix_ts": unix_ts,
                    "imagenes": [p.name for p in image_paths],
                    "preview_copy": post["message"][:70] + "...",
                }
            )
            continue

        media_ids = [upload_unpublished_photo(page_id, token, p, version) for p in image_paths]
        api_res = schedule_feed_post(page_id, token, post["message"], media_ids, unix_ts, version)
        results.append(
            {
                "orden": idx + 1,
                "estado": "PROGRAMADO_EN_META",
                "programado_para": sched_dt.strftime("%Y-%m-%d %H:%M"),
                "post_id": api_res.get("id"),
                "imagenes": [p.name for p in image_paths],
            }
        )

    print(json.dumps(results, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
