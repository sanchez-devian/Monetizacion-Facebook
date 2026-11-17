#!/usr/bin/env python3
"""
transformar_clip.py — Reencuadre y transformacion visual base para MonetizacionFacebook.

Aplica reencuadre 9:16 / 4:5 / 16:9 con fondo desenfocado o recorte, zoom sutil,
barra editorial superior, marca propia y control de audio (silenciado o mezcla
con locucion propia) para cumplir las reglas de originalidad del Atomo 0.2.
"""

from __future__ import annotations

import argparse
import glob
import os
import shutil
import subprocess
import sys
from pathlib import Path

ASPECT_PRESETS = {
    "9:16": (1080, 1920),
    "4:5": (1080, 1350),
    "16:9": (1920, 1080),
}


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


def resolve_font() -> str:
    """Devuelve una ruta de fuente valida en Windows escapada para ffmpeg drawtext."""
    candidates = [
        Path("C:/Windows/Fonts/arialbd.ttf"),
        Path("C:/Windows/Fonts/segoeuib.ttf"),
        Path("C:/Windows/Fonts/arial.ttf"),
    ]
    for font in candidates:
        if font.exists():
            return str(font).replace("\\", "/").replace(":", "\\:")
    return ""


def escape_drawtext(text: str) -> str:
    """Escapa caracteres especiales para el filtro drawtext de ffmpeg."""
    return (
        text.replace("\\", "\\\\")
        .replace(":", "\\:")
        .replace("'", "\\'")
        .replace("%", "\\%")
    )


def build_filter_complex(
    width: int,
    height: int,
    titulo: str | None,
    marca: str,
    zoom: float,
) -> str:
    """Construye la cadena de filtros: fondo blur + foreground con zoom + capas de marca."""
    fg_w = int(round(width * zoom))
    fg_h = int(round(height * zoom))
    # Asegurar dimensiones pares para libx264
    fg_w -= fg_w % 2
    fg_h -= fg_h % 2

    filters = [
        f"[0:v]scale={width}:{height}:force_original_aspect_ratio=increase,"
        f"crop={width}:{height},boxblur=24:2[bg]",
        f"[0:v]scale={fg_w}:{fg_h}:force_original_aspect_ratio=decrease[fg]",
        "[bg][fg]overlay=(W-w)/2:(H-h)/2:shortest=1[composed]",
    ]

    current_label = "composed"
    font_opt = f":fontfile='{resolve_font()}'" if resolve_font() else ""

    if titulo:
        safe_title = escape_drawtext(titulo[:64])
        filters.append(
            f"[{current_label}]drawbox=x=0:y=80:w=iw:h=130:color=black@0.72:t=fill,"
            f"drawtext=text='{safe_title}'{font_opt}:fontcolor=white:fontsize=44:"
            f"x=(w-text_w)/2:y=122[titled]"
        )
        current_label = "titled"

    safe_brand = escape_drawtext(marca)
    filters.append(
        f"[{current_label}]drawbox=x=40:y=ih-130:w=360:h=58:color=#2563EB@0.88:t=fill,"
        f"drawtext=text='{safe_brand}'{font_opt}:fontcolor=white:fontsize=30:"
        f"x=62:y=h-114[vout]"
    )

    return ";".join(filters)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Transforma un clip crudo en formato nativo con capas de marca."
    )
    parser.add_argument("--input", required=True, help="Ruta al video de entrada")
    parser.add_argument("--output", required=True, help="Ruta al video transformado")
    parser.add_argument(
        "--aspect",
        choices=list(ASPECT_PRESETS.keys()),
        default="9:16",
        help="Relacion de aspecto destino (default: 9:16)",
    )
    parser.add_argument("--titulo", default=None, help="Titular superior editorial")
    parser.add_argument("--marca", default="RADAR POP MX", help="Texto de marca propia")
    parser.add_argument("--inicio", type=float, default=None, help="Segundo inicial")
    parser.add_argument("--duracion", type=float, default=None, help="Duracion maxima (s)")
    parser.add_argument(
        "--zoom",
        type=float,
        default=1.04,
        help="Factor de escala sutil sobre el cuadro principal (default: 1.04)",
    )
    parser.add_argument(
        "--sin-audio-original",
        action="store_true",
        help="Elimina la pista de audio original (ideal para agregar voz propia)",
    )
    parser.add_argument(
        "--audio-propio",
        default=None,
        help="Ruta a archivo de audio/locucion propia para reemplazar el audio original",
    )
    args = parser.parse_args()

    input_path = Path(args.input).resolve()
    output_path = Path(args.output).resolve()
    if not input_path.exists():
        print(f"[ERROR] No existe el archivo de entrada: {input_path}", file=sys.stderr)
        return 1

    output_path.parent.mkdir(parents=True, exist_ok=True)

    try:
        ffmpeg_bin = resolve_binary("ffmpeg")
    except FileNotFoundError as exc:
        print(f"[ERROR] {exc}", file=sys.stderr)
        return 1

    width, height = ASPECT_PRESETS[args.aspect]
    filter_complex = build_filter_complex(
        width=width,
        height=height,
        titulo=args.titulo,
        marca=args.marca,
        zoom=args.zoom,
    )

    cmd = [ffmpeg_bin, "-y"]
    if args.inicio is not None:
        cmd.extend(["-ss", str(args.inicio)])
    cmd.extend(["-i", str(input_path)])

    if args.audio_propio:
        audio_path = Path(args.audio_propio).resolve()
        if not audio_path.exists():
            print(f"[ERROR] No existe --audio-propio: {audio_path}", file=sys.stderr)
            return 1
        cmd.extend(["-i", str(audio_path)])

    if args.duracion is not None:
        cmd.extend(["-t", str(args.duracion)])

    cmd.extend(["-filter_complex", filter_complex, "-map", "[vout]"])

    if args.audio_propio:
        cmd.extend(["-map", "1:a:0", "-c:a", "aac", "-b:a", "192k", "-shortest"])
    elif args.sin_audio_original:
        cmd.append("-an")
    else:
        cmd.extend(["-map", "0:a?", "-c:a", "aac", "-b:a", "160k"])

    cmd.extend(
        [
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "21",
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            str(output_path),
        ]
    )

    print(f"[transformar_clip] Generando {output_path.name} ({args.aspect})...")
    proc = subprocess.run(cmd, check=False)
    if proc.returncode != 0:
        print(f"[ERROR] ffmpeg fallo con codigo {proc.returncode}", file=sys.stderr)
        return proc.returncode

    print(f"[OK] Clip transformado guardado en: {output_path} ({output_path.stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
