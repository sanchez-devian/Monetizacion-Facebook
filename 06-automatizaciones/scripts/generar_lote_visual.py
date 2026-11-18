#!/usr/bin/env python3
"""
generar_lote_visual.py — Generador de piezas visuales 4:5 (1080x1350) en 4 estilos distintos
para evitar repeticion visual / spam en Meta y mantener identidad de marca propia.

Estilos soportados:
  1. noticia_pop        -> Titular de impacto + categoria + resumen corto (1 imagen)
  2. carrusel_misterio  -> Set de 4-7 laminas secuenciales (portada + datos + cierre)
  3. ranking_comparativa-> Comparativa visual de 2 columnas / bloques (1 imagen)
  4. cita_viral         -> Frase de alto share rate con palabras resaltadas (1 imagen)
"""

from __future__ import annotations

import argparse
import json
import textwrap
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1080, 1350

PALETTES = {
    "noticia_pop": {"bg": (15, 18, 28), "accent": (255, 208, 40), "text": (245, 247, 250), "muted": (165, 175, 195)},
    "carrusel_misterio": {"bg": (12, 12, 16), "accent": (235, 75, 75), "text": (245, 245, 245), "muted": (175, 175, 185)},
    "ranking_comparativa": {"bg": (18, 24, 38), "accent": (56, 189, 248), "text": (248, 250, 252), "muted": (148, 163, 184)},
    "cita_viral": {"bg": (10, 10, 14), "accent": (250, 204, 21), "text": (255, 255, 255), "muted": (161, 161, 170)},
}


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = (
        ["C:/Windows/Fonts/arialbd.ttf", "C:/Windows/Fonts/segoeuib.ttf"]
        if bold
        else ["C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/segoeui.ttf"]
    )
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size=size)
    return ImageFont.load_default()


def draw_wrapped_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    x: int,
    y: int,
    max_chars: int,
    font: ImageFont.ImageFont,
    fill: tuple[int, int, int],
    line_spacing: int = 14,
) -> int:
    lines = textwrap.wrap(text, width=max_chars)
    curr_y = y
    for line in lines:
        draw.text((x, curr_y), line, font=font, fill=fill)
        bbox = draw.textbbox((x, curr_y), line, font=font)
        curr_y += (bbox[3] - bbox[1]) + line_spacing
    return curr_y


def add_brand_footer(draw: ImageDraw.ImageDraw, brand: str, palette: dict[str, tuple[int, int, int]], tag: str = "") -> None:
    font_brand = load_font(30, bold=True)
    draw.line([(80, HEIGHT - 120), (WIDTH - 80, HEIGHT - 120)], fill=palette["accent"], width=3)
    draw.text((80, HEIGHT - 95), brand.upper(), font=font_brand, fill=palette["muted"])
    if tag:
        draw.text((WIDTH - 340, HEIGHT - 95), tag, font=load_font(28, bold=False), fill=palette["accent"])


def paste_optional_image(img: Image.Image, image_path: str | None, box: tuple[int, int, int, int]) -> None:
    if not image_path or not Path(image_path).exists():
        return
    src = Image.open(image_path).convert("RGB")
    target_w = box[2] - box[0]
    target_h = box[3] - box[1]
    src_ratio = src.width / src.height
    target_ratio = target_w / target_h
    if src_ratio > target_ratio:
        new_h = target_h
        new_w = int(new_h * src_ratio)
    else:
        new_w = target_w
        new_h = int(new_w / src_ratio)
    resized = src.resize((new_w, new_h), Image.Resampling.LANCZOS)
    left = (new_w - target_w) // 2
    top = (new_h - target_h) // 2
    cropped = resized.crop((left, top, left + target_w, top + target_h))
    img.paste(cropped, (box[0], box[1]))


def render_noticia_pop(item: dict, out_dir: Path, brand: str) -> list[Path]:
    pal = PALETTES["noticia_pop"]
    img = Image.new("RGB", (WIDTH, HEIGHT), pal["bg"])
    draw = ImageDraw.Draw(img)

    cat = item.get("categoria", "CULTURA POP").upper()
    draw.rounded_rectangle([(80, 75), (420, 130)], radius=12, fill=pal["accent"])
    draw.text((105, 86), cat, font=load_font(30, bold=True), fill=(15, 18, 28))

    if item.get("imagen"):
        paste_optional_image(img, item["imagen"], (80, 165, WIDTH - 80, 680))
        y_title = 720
    else:
        draw.rounded_rectangle([(80, 175), (WIDTH - 80, 420)], radius=20, outline=pal["accent"], width=3)
        draw.text((120, 265), "RADAR DE TENDENCIAS", font=load_font(44, bold=True), fill=pal["accent"])
        y_title = 480

    y_after = draw_wrapped_text(draw, item["titular"], 80, y_title, 22, load_font(62, bold=True), pal["text"], 16)
    if item.get("bajada"):
        draw_wrapped_text(draw, item["bajada"], 80, y_after + 24, 36, load_font(38, bold=False), pal["muted"], 12)

    add_brand_footer(draw, brand, pal, "NOTICIA HOY")
    out_path = out_dir / f"{item['slug']}_noticia.png"
    img.save(out_path, quality=95)
    return [out_path]


def render_carrusel_misterio(item: dict, out_dir: Path, brand: str) -> list[Path]:
    pal = PALETTES["carrusel_misterio"]
    slides = item.get("laminas", [])
    outputs: list[Path] = []
    total = len(slides)
    for idx, slide_text in enumerate(slides, 1):
        img = Image.new("RGB", (WIDTH, HEIGHT), pal["bg"])
        draw = ImageDraw.Draw(img)
        if idx == 1:
            draw.text((80, 90), "HILO VISUAL / MISTERIO", font=load_font(32, bold=True), fill=pal["accent"])
            if item.get("imagen"):
                paste_optional_image(img, item["imagen"], (80, 160, WIDTH - 80, 680))
                y_start = 720
            else:
                y_start = 320
            draw_wrapped_text(draw, slide_text, 80, y_start, 20, load_font(66, bold=True), pal["text"], 18)
        else:
            draw.text((80, 95), f"DATO {idx - 1} DE {total - 1}", font=load_font(34, bold=True), fill=pal["accent"])
            draw_wrapped_text(draw, slide_text, 80, 260, 26, load_font(52, bold=True), pal["text"], 20)
        add_brand_footer(draw, brand, pal, f"DESLIZA {idx}/{total}")
        out_path = out_dir / f"{item['slug']}_slide_{idx:02d}.png"
        img.save(out_path, quality=95)
        outputs.append(out_path)
    return outputs


def render_ranking_comparativa(item: dict, out_dir: Path, brand: str) -> list[Path]:
    pal = PALETTES["ranking_comparativa"]
    img = Image.new("RGB", (WIDTH, HEIGHT), pal["bg"])
    draw = ImageDraw.Draw(img)

    draw.text((80, 80), item.get("categoria", "COMPARATIVA").upper(), font=load_font(32, bold=True), fill=pal["accent"])
    y_after = draw_wrapped_text(draw, item["titular"], 80, 140, 24, load_font(56, bold=True), pal["text"], 14)

    # Bloques A vs B
    top_box = max(y_after + 40, 340)
    draw.rounded_rectangle([(80, top_box), (515, 1140)], radius=20, fill=(28, 37, 58), outline=pal["accent"], width=3)
    draw.rounded_rectangle([(565, top_box), (WIDTH - 80, 1140)], radius=20, fill=(38, 28, 45), outline=(244, 114, 182), width=3)

    draw.text((110, top_box + 35), item.get("lado_a_titulo", "OPCION A"), font=load_font(38, bold=True), fill=pal["accent"])
    draw_wrapped_text(draw, item.get("lado_a_texto", ""), 110, top_box + 105, 18, load_font(34, bold=False), pal["text"], 14)

    draw.text((595, top_box + 35), item.get("lado_b_titulo", "OPCION B"), font=load_font(38, bold=True), fill=(244, 114, 182))
    draw_wrapped_text(draw, item.get("lado_b_texto", ""), 595, top_box + 105, 18, load_font(34, bold=False), pal["text"], 14)

    add_brand_footer(draw, brand, pal, "DEBATE")
    out_path = out_dir / f"{item['slug']}_comparativa.png"
    img.save(out_path, quality=95)
    return [out_path]


def render_cita_viral(item: dict, out_dir: Path, brand: str) -> list[Path]:
    pal = PALETTES["cita_viral"]
    img = Image.new("RGB", (WIDTH, HEIGHT), pal["bg"])
    draw = ImageDraw.Draw(img)

    draw.text((80, 90), "“", font=load_font(160, bold=True), fill=pal["accent"])
    y_after = draw_wrapped_text(draw, item["titular"], 80, 260, 22, load_font(60, bold=True), pal["text"], 18)
    if item.get("destacado"):
        draw_wrapped_text(draw, item["destacado"], 80, y_after + 30, 22, load_font(58, bold=True), pal["accent"], 18)

    add_brand_footer(draw, brand, pal, item.get("categoria", "REALIDAD").upper())
    out_path = out_dir / f"{item['slug']}_cita.png"
    img.save(out_path, quality=95)
    return [out_path]


RENDERERS = {
    "noticia_pop": render_noticia_pop,
    "carrusel_misterio": render_carrusel_misterio,
    "ranking_comparativa": render_ranking_comparativa,
    "cita_viral": render_cita_viral,
}


def main() -> int:
    parser = argparse.ArgumentParser(description="Genera lote visual 4:5 en 4 estilos distintos de marca propia.")
    parser.add_argument("--input-json", required=True, help="Archivo JSON con lista de piezas a generar")
    parser.add_argument("--out-dir", required=True, help="Carpeta de salida para las imagenes")
    parser.add_argument("--brand", default="@RadarPopMX", help="Marca o handle de la pagina")
    args = parser.parse_args()

    payload = json.loads(Path(args.input_json).read_text(encoding="utf-8"))
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    generated: list[str] = []
    for item in payload:
        estilo = item.get("estilo", "noticia_pop")
        renderer = RENDERERS.get(estilo)
        if not renderer:
            raise ValueError(f"Estilo no soportado: {estilo}. Usa: {', '.join(RENDERERS)}")
        paths = renderer(item, out_dir, args.brand)
        generated.extend(str(p) for p in paths)

    print(json.dumps({"generadas": len(generated), "archivos": generated}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
