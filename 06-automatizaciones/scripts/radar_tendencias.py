#!/usr/bin/env python3
"""
radar_tendencias.py — Radar de tendencias reales en Mexico/LATAM (sin dependencias externas).

Consulta en tiempo real:
1. Google Trends RSS (Mexico: geo=MX) para detectar picos de busqueda masivos.
2. Google News RSS (es-419 / MX) para extraer noticias recientes sobre una tendencia
   especifica (ej. "La Mansion VIP 2") y evaluar frescura/saturacion.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) MonetizacionFB-Radar/1.0"
}


def fetch_xml(url: str, timeout: int = 15) -> ET.Element:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        data = resp.read()
    return ET.fromstring(data)


def get_google_trends(geo: str = "MX", limit: int = 10) -> list[dict[str, str]]:
    """Extrae las tendencias actuales de Google Trends (RSS oficial) para el codigo de pais dado."""
    url = f"https://trends.google.com/trending/rss?geo={urllib.parse.quote_plus(geo.upper())}"
    root = fetch_xml(url)
    ns = {"ht": "https://trends.google.com/trending/rss"}
    items = []
    for item in root.findall("./channel/item")[:limit]:
        title = (item.findtext("title") or "").strip()
        traffic = (item.findtext("ht:approx_traffic", namespaces=ns) or "").strip()
        pub_date = (item.findtext("pubDate") or "").strip()
        link = (item.findtext("link") or "").strip()
        news_item = item.find("ht:news_item", namespaces=ns)
        news_title = ""
        news_url = ""
        news_source = ""
        if news_item is not None:
            news_title = (news_item.findtext("ht:news_item_title", namespaces=ns) or "").strip()
            news_url = (news_item.findtext("ht:news_item_url", namespaces=ns) or "").strip()
            news_source = (news_item.findtext("ht:news_item_source", namespaces=ns) or "").strip()
        items.append(
            {
                "geo": geo.upper(),
                "tema": title,
                "trafico_aprox": traffic or "N/D",
                "publicado": pub_date,
                "titular_referencia": news_title,
                "fuente": news_source,
                "url": news_url or link,
            }
        )
    return items


def get_google_news_topic(topic: str, limit: int = 8) -> list[dict[str, str]]:
    """Consulta noticias recientes en Mexico sobre un tema especifico."""
    encoded = urllib.parse.quote_plus(topic)
    url = f"https://news.google.com/rss/search?q={encoded}&hl=es-419&gl=MX&ceid=MX:es-419"
    root = fetch_xml(url)
    items = []
    for item in root.findall("./channel/item")[:limit]:
        title = (item.findtext("title") or "").strip()
        pub_date = (item.findtext("pubDate") or "").strip()
        link = (item.findtext("link") or "").strip()
        source_el = item.find("source")
        source = (source_el.text or "").strip() if source_el is not None else "Desconocida"
        items.append(
            {
                "titular": title,
                "fuente": source,
                "publicado": pub_date,
                "url": link,
            }
        )
    return items


def render_markdown(topic: str | None, trends: list[dict[str, str]], news: list[dict[str, str]]) -> str:
    today = dt.datetime.now().strftime("%Y-%m-%d %H:%M")
    lines = [
        f"# Radar de Tendencias — {topic or 'General MX'}",
        f"*Generado: {today} | Fuente: Google Trends MX RSS & Google News MX RSS*",
        "",
        "## 1. Noticias / Sucesos Recientes del Tema",
    ]
    if not news:
        lines.append("- Sin resultados para el tema consultado.")
    else:
        for i, n in enumerate(news, 1):
            lines.append(f"{i}. **{n['titular']}** — *{n['fuente']}* ({n['publicado']}) · [Fuente]({n['url']})")

    lines.extend(["", "## 2. Top Tendencias Activas (Google Trends)"])
    if not trends:
        lines.append("- No se pudieron recuperar tendencias de Google Trends.")
    else:
        for i, t in enumerate(trends, 1):
            geo_tag = f"[{t.get('geo', 'MX')}] " if t.get("geo") else ""
            lines.append(
                f"{i}. {geo_tag}**{t['tema']}** ({t['trafico_aprox']}) — {t['titular_referencia']} (*{t['fuente']}*)"
            )
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description="Radar de tendencias reales MX/US-Bicultural.")
    parser.add_argument("--tema", default=None, help="Tema o tendencia especifica a monitorear")
    parser.add_argument("--geo", default="MX", help="Codigos de pais separados por coma (ej. MX,US)")
    parser.add_argument("--limit-trends", type=int, default=10, help="Numero de tendencias por pais")
    parser.add_argument("--limit-news", type=int, default=8, help="Numero de noticias del tema")
    parser.add_argument("--out-md", default=None, help="Ruta opcional para guardar reporte .md")
    parser.add_argument("--json", action="store_true", help="Imprimir salida en JSON")
    args = parser.parse_args()

    trends: list[dict[str, str]] = []
    news: list[dict[str, str]] = []
    errors: list[str] = []

    for geo in [g.strip().upper() for g in args.geo.split(",") if g.strip()]:
        try:
            trends.extend(get_google_trends(geo=geo, limit=args.limit_trends))
        except Exception as exc:
            errors.append(f"Google Trends {geo}: {exc}")

    if args.tema:
        try:
            news = get_google_news_topic(args.tema, limit=args.limit_news)
        except Exception as exc:
            errors.append(f"Google News ({args.tema}): {exc}")

    if args.out_md:
        out_path = Path(args.out_md).resolve()
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(render_markdown(args.tema, trends, news), encoding="utf-8")

    if args.json:
        print(
            json.dumps(
                {"tema": args.tema, "trends_mx": trends, "news_tema": news, "errors": errors},
                ensure_ascii=False,
                indent=2,
            )
        )
    else:
        print(render_markdown(args.tema, trends, news))

    if errors:
        print(f"[ADVERTENCIAS] {'; '.join(errors)}", file=sys.stderr)
    return 0 if (trends or news) else 1


if __name__ == "__main__":
    raise SystemExit(main())
