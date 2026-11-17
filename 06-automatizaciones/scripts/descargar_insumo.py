#!/usr/bin/env python3
"""
descargar_insumo.py — Descarga limpia de insumos de video para MonetizacionFacebook.

Usa yt-dlp para obtener clips de fuentes publicas (YouTube, TikTok, X, Facebook)
en formato MP4 compatible con ffmpeg y genera un registro JSON de trazabilidad.
"""

from __future__ import annotations

import argparse
import glob
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path


def resolve_binary(name: str) -> str:
    """Busca un binario en PATH o en las rutas estandar de WinGet en Windows."""
    found = shutil.which(name)
    if found:
        return found

    local_app = os.environ.get("LOCALAPPDATA", "")
    candidates = [
        Path(local_app) / "Microsoft" / "WinGet" / "Links" / f"{name}.exe",
    ]
    winget_pkgs = Path(local_app) / "Microsoft" / "WinGet" / "Packages"
    if winget_pkgs.exists():
        for match in glob.glob(str(winget_pkgs / "**" / f"{name}.exe"), recursive=True):
            candidates.append(Path(match))

    for candidate in candidates:
        if candidate.exists():
            return str(candidate)

    raise FileNotFoundError(
        f"No se encontro '{name}'. Verifica que este instalado y en el PATH."
    )


def build_command(
    yt_dlp_bin: str,
    ffmpeg_bin: str,
    url: str,
    output_dir: Path,
    slug: str,
    start: str | None,
    end: str | None,
) -> list[str]:
    """Construye el comando de yt-dlp con formato MP4 H.264/AAC y recorte opcional."""
    output_template = str(output_dir / f"{slug}.%(ext)s")
    cmd = [
        yt_dlp_bin,
        "--ffmpeg-location",
        str(Path(ffmpeg_bin).parent),
        "--no-playlist",
        "-f",
        "bv*[vcodec^=avc1][ext=mp4]+ba[ext=m4a]/b[ext=mp4]/b",
        "--merge-output-format",
        "mp4",
        "--write-info-json",
        "-o",
        output_template,
    ]
    if start or end:
        start_val = start or "0"
        end_val = end or "inf"
        cmd.extend(["--download-sections", f"*{start_val}-{end_val}"])
    cmd.append(url)
    return cmd


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Descarga limpia de insumo de video con yt-dlp."
    )
    parser.add_argument("--url", required=True, help="URL publica del video/clip")
    parser.add_argument(
        "--out-dir",
        default="99-archivo/pruebas-media",
        help="Carpeta destino (por defecto: 99-archivo/pruebas-media)",
    )
    parser.add_argument("--slug", default="insumo", help="Nombre base del archivo")
    parser.add_argument("--start", default=None, help="Inicio de recorte (ej. 00:05)")
    parser.add_argument("--end", default=None, help="Fin de recorte (ej. 00:25)")
    args = parser.parse_args()

    try:
        yt_dlp_bin = resolve_binary("yt-dlp")
        ffmpeg_bin = resolve_binary("ffmpeg")
    except FileNotFoundError as exc:
        print(f"[ERROR] {exc}", file=sys.stderr)
        return 1

    output_dir = Path(args.out_dir).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    cmd = build_command(
        yt_dlp_bin=yt_dlp_bin,
        ffmpeg_bin=ffmpeg_bin,
        url=args.url,
        output_dir=output_dir,
        slug=args.slug,
        start=args.start,
        end=args.end,
    )

    print(f"[descargar_insumo] Ejecutando: {' '.join(cmd)}")
    proc = subprocess.run(cmd, check=False)
    if proc.returncode != 0:
        print(f"[ERROR] yt-dlp fallo con codigo {proc.returncode}", file=sys.stderr)
        return proc.returncode

    mp4_path = output_dir / f"{args.slug}.mp4"
    info_path = output_dir / f"{args.slug}.info.json"
    summary = {
        "url": args.url,
        "output_mp4": str(mp4_path) if mp4_path.exists() else None,
        "info_json": str(info_path) if info_path.exists() else None,
        "size_bytes": mp4_path.stat().st_size if mp4_path.exists() else 0,
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return 0 if mp4_path.exists() else 1


if __name__ == "__main__":
    raise SystemExit(main())
