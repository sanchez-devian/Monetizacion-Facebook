# Plan Maestro v2: Sistema Híbrido Escalable a $50,000 MXN/mes (`MonetizaciónFacebook`)

> **Fecha:** 2026-11-17 | **Reemplaza a:** `2026-11-16_plan-atomico-configuracion-y-operacion.md` (archivado en `99-archivo/`)  
> **Base Empírica:** [2026-11-17_monetizacion-imagenes-memes-vs-video-facebook.md](file:///c:/Users/damia/Documentos/Antigravity/Monetizaci%C3%B3nFacebook/02-investigacion/profunda/2026-11-17_monetizacion-imagenes-memes-vs-video-facebook.md) | [2026-11-17_ingenieria-inversa-50k-mxn-facebook.md](file:///c:/Users/damia/Documentos/Antigravity/Monetizaci%C3%B3nFacebook/02-investigacion/profunda/2026-11-17_ingenieria-inversa-50k-mxn-facebook.md)  
> **Principio Rector:** Abandonar la dependencia de una sola tendencia (*La Mansión VIP 2*) y construir una **fábrica híbrida semi-automatizada** donde las **imágenes/álbumes/citas** generan crecimiento viral rápido con bajo esfuerzo, y el **video narrado (>60s–180s) + monetización complementaria** capturan el RPM necesario para alcanzar $\ge \$50,000\text{ MXN/mes}$ ($\approx \$2,695\text{ USD/mes}$).

---

## 1. Arquitectura del Modelo Híbrido ("Motor de Alcance + Caja Registradora")

Las 13 capturas analizadas del feed demuestran que **las imágenes estáticas, álbumes y citas dominan la velocidad de compartidos con fricción mínima**, pero la evidencia de mercado 2025–2026 demuestra que **el RPM nativo de fotos en LATAM paga centavos ($0.01–$0.04 USD/1k vistas calificadas)**. Por ello, el sistema separa claramente dos funciones:

| Capa del Sistema | Formatos | Función Principal | Nivel de Automatización | Ingreso Esperado |
| :--- | :--- | :--- | :--- | :--- |
| **Capa 1: Combustible Viral (Crecimiento y Comunidad)** | **Universo Único (Página 1 — Cultura Pop, Misterios y Tendencias):**<br>1. **Noticias Pop / Cine / Geek** (infografía propia)<br>2. **Álbumes / Carruseles de Misterio y Nostalgia** (+5 fotos)<br>3. **Rankings / Comparativas Virales** (cultura pop/internet)<br>4. **Humor / Situaciones Virales** (IA etiquetada limpia, ligada al tema pop)<br>*(Nota: Finanzas/Negocios se reserva para Página 2 separada para no romper el Interest Graph).* | Atraer seguidores rápido, disparar compartidos diarios, detectar qué temas explotan antes de invertir tiempo en video. | **80–85% Automatizado** (Radar → 4 variaciones visuales en Pillow/HTML + IA → Curación humana de 10 min → Meta Business Suite) | Bajo directo ($0.01–$0.04 USD RPM), **altísimo indirecto** (crecimiento y validación de temas). |
| **Capa 2: Caja Registradora (Monetización Fuerte)** | 1. **Reels largos (120–180s)** y **Video In-Stream (>1–3 min)** solo sobre los **Top 2–3 temas validados** en la Capa 1.<br>2. **Afiliados / Tráfico / Branded Content** en posts ganadores. | Capturar RPM real (**$0.60–$1.80 USD** LATAM; **$2.50–$6.00+ USD** hispanos EE. UU.) y monetizar sin depender 100% de Meta. | **60% Automatizado** (Guion IA + B-roll/capas + subtítulos automáticos) + **40% Humano** (Voz humana real anti-*Unoriginal Content*). | **85–95% de los $50,000 MXN/mes**. |

---

## 2. Ruta Matemática Realista hacia $50,000 MXN/mes (~$2,695 USD/mes)

En lugar de apostar a un escenario imposible (100+ millones de vistas en fotos), la meta se divide en **3 vías combinadas**:

1. **Vía A — Video In-Stream y Reels Largos (Meta FCM) [Meta principal: ~$2,100–$2,400 USD/mes]:**
   - Publicando **4–5 videos/Reels largos (120–180s) por semana** basados exclusivamente en los temas que ya probaron viralidad en la Capa 1.
   - Con un **20–30% de audiencia hispana en EE. UU.** (temas biculturales: cine, cultura pop, misterios LATAM), un RPM mezclado realista de **$0.50–$0.70 USD** exige **~3.4M a 4.5M de vistas calificadas/mes** (~115k–150k vistas/día).
2. **Vía B — Branded Content / Menciones + Afiliados Puntuales [Meta complementaria: ~$300–$600 USD/mes]:**
   - Al superar 50k–100k seguidores y 5M+ impresiones/mes, activar menciones patrocinadas y afiliados solo en lanzamientos virales de alta intención (ej. productos geek/tech estilo *Piñata* en primer comentario o bio/web).
3. **Vía C — Multiplicación Horizontal (Mes 3+, solo si Página 1 toca techo o para mayor RPM):**
   - Una vez validado el pipeline en la **Página 1**, replicar la misma fábrica de contenido en una **Página 2 satélite** enfocada 100% en **Finanzas Personales / Emprendimiento Bicultural** (nicho de mayor RPM para hispanos en EE. UU., sin contaminar el algoritmo de la Página 1).

---

## 3. Fases de Ejecución Atómica (`PASA / FALLA`)

### Fase 0 — Cimientos y Blindaje *(Completada)*
- **Estado:** `PASA` (Documentación en `00-sistema-y-reglas/`, `02-investigacion/`, `03-analisis-y-estadisticas/`).

### Fase 1 — Fábrica de Contenido Híbrida (Automatización Segura)
1. **Átomo 1.1 — Verificación de Entorno y Binarios (`python`, `ffmpeg`, `yt-dlp`, `Pillow`):** Verificar e instalar dependencias locales para generar imágenes en lote y transformar video.
2. **Átomo 1.2 — Radar Automático Diario (`trend-radar` + `radar_tendencias.py`):** Script programado que cada mañana extrae tendencias de Google Trends (MX + US-ES) y RSS de entretenimiento/tecnología/finanzas, generando un **Brief Diario** con 5 temas listos.
3. **Átomo 1.3 — Generador Automático de Imágenes de Marca Propia (`generar_memes_lote.py`):**
   - **Regla anti-ban:** Prohibido usar capturas de *Los Simpson*, *Bob Esponja* o fotos de paparazzi sin transformación. El script genera automáticamente **3 formatos 100% propios y seguros**:
     1. *Plantilla Noticia Pop / Geek* (fondo limpio + tipografía de marca + imagen generada/libre + resumen en 12 palabras).
     2. *Plantilla Cita de Valor / Finanzas* (fondo oscuro/contraste + frase gancho en blanco/amarillo + marca propia).
     3. *Plantilla Carrusel de Misterio/Curiosidad* (5–7 láminas secuenciales con gancho en lámina 1).
4. **Átomo 1.4 — Pipeline de Video Monetizable (`transformar_clip.py` + Voz Humana):**
   - Toma solo los temas ganadores del día/semana, genera guion de 120–180s optimizado para retención, inserta voz humana grabada en <5 min, agrega subtítulos dinámicos y capas visuales propias, y audita con `politicas-meta-guard` (10/10 `PASA`).

### Fase 2 — Activo Limpio en Facebook y Posicionamiento Bicultural
1. **Átomo 2.1 — Identidad Agnóstica Multi-Tendencia:** Página bajo el paraguas *"Radar Pop, Misterios y Tendencias"* (o equivalente) diseñada para hablarle tanto a **México** como a **hispanos en EE. UU.**
2. **Átomo 2.2 — Blindaje en Meta Business Portfolio:** 2FA, estado de página en verde ("Recomendable"), cero infracciones previas.

### Fase 3 — Ritmo de Publicación y Bucle de Métricas
1. **Átomo 3.1 — Cadencia Diaria Sostenible:**
   - **3 a 4 publicaciones/día de Capa 1** (Imágenes/Carruseles/Citas generadas en lote y programadas vía **Meta Business Suite** oficial; espaciadas cada 4–5 horas).
   - **1 Reel largo (120–180s) o Video >1 min cada 2 días** (4/semana) sobre el tema de Capa 1 que haya tenido mayor *share rate* en las últimas 24h.
2. **Átomo 3.2 — Parser de Métricas (CSV Business Suite / Graph API):** Medición semanal de: (a) *Share rate* por post de Capa 1, (b) Retención 3s y tiempo promedio en video de Capa 2, (c) % de audiencia en EE. UU. vs. MX.

### Fase 4 — Desbloqueo de Monetización, Kill-Switch y Escalamiento a $50K MXN/mes
1. **Átomo 4.1 — Historial Limpio y Solicitud FCM (Días 1–60):** Acumular 30–60+ días de actividad constante sin strikes y enviar expresión de interés en *Panel Profesional → Monetización*. *(Expectativa realista: Días 1–45 enfocarse en tracción y masa crítica de seguidores; Días 45–90 activación FCM y escalado).*
2. **Átomo 4.2 — Regla *Kill-Switch* cada 14 días (*Via Negativa*):** Todo formato de Capa 1 con `<5` compartidos por cada 1,000 impresiones o video de Capa 2 con `<15%` de retención a 3s tras 10 publicaciones se **elimina** y su cuota pasa al formato ganador.
3. **Átomo 4.3 — Activación de Vía B (Menciones/Afiliados) y Optimización de RPM (Días 45–120):** Monitoreo de ingresos reales en Meta Business Suite y ajuste de proporción hacia temas con mayor % de audiencia EE. UU. y mayor RPM.

---

## 4. Auditoría Crítica Aplicada (`analisis-critico` — Segunda Pasada)
Este plan ya incorpora las 5 correcciones derivadas de la auditoría crítica de [2026-11-17_auditoria-plan-v2-50k.md](file:///c:/Users/damia/Documentos/Antigravity/Monetizaci%C3%B3nFacebook/03-analisis-y-estadisticas/auditorias-criticas/2026-11-17_auditoria-plan-v2-50k.md): (1) separación de Finanzas en Página 2 para no romper el *Interest Graph* de Página 1, (2) horizonte realista 0–120 días sin falsas promesas en Días 1–30, (3) recalibración de Vía A vs. Vía B, (4) rotación obligatoria de 4 diseños visuales + toque humano en ganchos para evitar filtros anti-spam, y (5) *Kill-Switch* cuantitativo cada 14 días.
