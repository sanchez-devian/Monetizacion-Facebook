#!/usr/bin/env python3
"""
generar_vista_previa.py — Genera un archivo vista_previa.html auto-contenido
a partir de cualquier lote_programacion.json para copiar copys en 1 clic y ver
todas las imagenes en un solo lugar antes de programar en Meta Business Suite.
"""

from __future__ import annotations

import argparse
import datetime as dt
import html
import json
from pathlib import Path


HTML_TEMPLATE = """<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Vista Previa de Lote — Cultura En Corto</title>
  <style>
    body {{ font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background:#0f121c; color:#f1f5f9; margin:0; padding:24px; }}
    .wrap {{ max-width: 1080px; margin: 0 auto; }}
    h1 {{ margin:0 0 6px; font-size:24px; color:#ffd028; }}
    .sub {{ color:#94a3b8; margin-bottom:24px; font-size:14px; }}
    .card {{ background:#181d2c; border:1px solid #2b334b; border-radius:14px; padding:20px; margin-bottom:20px; }}
    .head {{ display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:14px; flex-wrap:wrap; }}
    .badge {{ background:#ffd028; color:#0f121c; font-weight:700; font-size:12px; padding:4px 10px; border-radius:999px; }}
    .time {{ color:#38bdf8; font-size:13px; font-weight:600; }}
    .grid {{ display:grid; grid-template-columns: 1.1fr 1fr; gap:20px; align-items:start; }}
    @media (max-width:760px) {{ .grid {{ grid-template-columns:1fr; }} }}
    .imgs {{ display:flex; flex-wrap:wrap; gap:10px; }}
    .imgs a {{ display:block; width:calc(50% - 5px); }}
    .imgs img {{ width:100%; border-radius:10px; border:1px solid #334155; display:block; }}
    .copy-box {{ background:#0b0e16; border:1px solid #2b334b; border-radius:10px; padding:14px; white-space:pre-wrap; font-size:14px; line-height:1.5; color:#e2e8f0; }}
    button {{ margin-top:12px; background:#ffd028; color:#0f121c; border:none; border-radius:8px; padding:10px 16px; font-weight:700; cursor:pointer; font-size:14px; }}
    button:hover {{ filter:brightness(1.08); }}
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Vista Previa del Lote — Cultura En Corto</h1>
    <div class="sub">Generado: {generated_at} · Abre Meta Business Suite → Planificador, arrastra las imágenes y usa "Copiar Copy".</div>
    {cards}
  </div>
  <script>
    function copyText(id, btn) {{
      const el = document.getElementById(id);
      navigator.clipboard.writeText(el.innerText).then(() => {{
        const orig = btn.innerText;
        btn.innerText = "¡Copiado!";
        setTimeout(() => btn.innerText = orig, 1500);
      }});
    }}
  </script>
</body>
</html>
"""


def main() -> int:
    parser = argparse.ArgumentParser(description="Genera vista_previa.html desde lote_programacion.json.")
    parser.add_argument("--manifest", required=True, help="Ruta a lote_programacion.json")
    parser.add_argument("--interval-hours", type=float, default=4.0, help="Separacion sugerida entre posts")
    args = parser.parse_args()

    manifest_path = Path(args.manifest).resolve()
    posts = json.loads(manifest_path.read_text(encoding="utf-8"))
    now = dt.datetime.now() + dt.timedelta(minutes=20)

    cards_html = []
    for idx, post in enumerate(posts, 1):
        sched = now + dt.timedelta(hours=args.interval_hours * (idx - 1))
        imgs_html = "\n".join(
            f'<a href="{html.escape(rel)}" target="_blank"><img src="{html.escape(rel)}" alt="Post {idx}" /></a>'
            for rel in post["imagenes"]
        )
        msg_escaped = html.escape(post["message"])
        cards_html.append(
            f"""
            <div class="card">
              <div class="head">
                <span class="badge">POST #{idx} ({len(post['imagenes'])} imagen/es)</span>
                <span class="time">Hora sugerida: {sched.strftime('%Y-%m-%d %H:%M')}</span>
              </div>
              <div class="grid">
                <div class="imgs">{imgs_html}</div>
                <div>
                  <div class="copy-box" id="copy-{idx}">{msg_escaped}</div>
                  <button onclick="copyText('copy-{idx}', this)">Copiar Copy #{idx}</button>
                </div>
              </div>
            </div>
            """
        )

    out_path = manifest_path.parent / "vista_previa.html"
    out_path.write_text(
        HTML_TEMPLATE.format(
            generated_at=dt.datetime.now().strftime("%Y-%m-%d %H:%M"),
            cards="\n".join(cards_html),
        ),
        encoding="utf-8",
    )
    print(f"Vista previa generada: {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
