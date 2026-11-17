---
name: trend-radar
description: >-
  Social listening and trend-detection radar for MonetizaciónFacebook ("ojos en redes").
  Combines radar_tendencias.py (Google Trends MX + Google News MX RSS), search_web, and
  the browser subagent to detect breaking viral events, active angles, and trend
  saturation in <5 minutes before producing content.
---

# Trend Radar (`trend-radar`)

> **Propósito:** Darle "ojos" en tiempo real al proyecto para detectar qué está explotando hoy en México/LATAM (y en la audiencia hispana de EE. UU.) antes de que la ola se sature.

---

## 1. Cuándo Activarse

- Al iniciar el día o antes de producir piezas bajo el modelo *Trend-Jacking 360°*.
- Cuando el usuario pregunte qué está en tendencia hoy o quiera monitorear una ola específica (ej. *La Mansión VIP 2*, polémicas de creadores, cultura pop).
- Para evaluar si una tendencia sigue en ascenso o ya entró en agotamiento (Átomo 6.1).

---

## 2. Flujo de Ejecución (<5 minutos)

1. **Barrido cuantitativo rápido (Script local):**
   Ejecuta `python 06-automatizaciones/scripts/radar_tendencias.py --tema "<TENDENCIA>" --json` para obtener en segundos:
   - Top búsquedas en tiempo real de **Google Trends México**.
   - Últimas noticias/titulares publicados sobre la tendencia activa en México.
2. **Búsqueda social cruzada (`search_web` + `browser`):**
   - Usa `search_web` con filtros recientes para detectar qué están comentando en TikTok, X/Twitter, YouTube y Facebook público sobre el suceso.
   - Si Chrome DevTools MCP está conectado, delega al subagente **`browser`** la inspección en vivo de comentarios virales, clips recientes y qué están publicando páginas competidoras.
3. **Filtro de Viabilidad Editorial (`MonetizaciónFacebook`):**
   Evalúa cada hallazgo contra 3 preguntas binarias:
   - ¿Encaja en el paraguas editorial (*Entretenimiento, Cultura Pop, Polémicas y Humor Viral*)?
   - ¿Tiene suficiente tensión o debate sano para generar envíos por DM y comentarios sin violar Normas Comunitarias (cero tragedias sensibles o discurso de odio)?
   - ¿Existe material visual/contextual suficiente para producir transformación sustancial (voz + guion + capas propias)?

---

## 3. Formato Obligatorio de Salida (Brief de Oportunidad)

Entrega siempre máximo **5 sucesos frescos** ordenados por urgencia, con esta estructura:

1. **Suceso / Qué pasó hoy (con fuente y hora/fecha real).**
2. **Estado de la ola:** `EMERGENTE` (<6h) | `PICO` (6–24h) | `SATURADA` (>48h sin giro nuevo).
3. **Ángulos recomendados:** Qué formatos del *Trend-Jacking 360°* aplican mejor (Resumen 24h, Meme, Crítica segura, Noticia formal, Meta-reacción).
4. **Riesgo de políticas Meta:** Verde / Amarillo (si involucra tema sensible o derechos de autor estrictos).
