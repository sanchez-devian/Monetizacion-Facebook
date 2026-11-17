# Plan Maestro Atómico: Configuración, Operación y Escalado a $50K MXN/mes (`MonetizaciónFacebook`)

> **Documento base de contexto:** [2026-11-16_contexto-maestro-proyecto.md](file:///c:/Users/damia/Documentos/Antigravity/Monetizaci%C3%B3nFacebook/00-sistema-y-reglas/sops-y-checklists/2026-11-16_contexto-maestro-proyecto.md)  
> **Metodología:** Ejecución atómica secuencial. Cada átomo se completa y verifica con criterio binario (`PASA / FALLA`) antes de pasar al siguiente, respetando la arquitectura de carpetas de [README.md](file:///c:/Users/damia/Documentos/Antigravity/Monetizaci%C3%B3nFacebook/README.md).

---

## Mapa General de Fases

| Fase | Nombre | Propósito central |
| :--- | :--- | :--- |
| **Fase 0** | **Cimientos de Inteligencia y Políticas (Cero Ceguera)** | Investigar casos reales de $\ge 50\text{K MXN/mes}$, políticas vigentes de Meta y mecánica real del algoritmo antes de crear la página. |
| **Fase 1** | **Ecosistema de Skills, "Ojos" y Herramientas** | Instalar y construir las skills, scripts (`yt-dlp`, `ffmpeg`) y radares sociales para que el proyecto vea tendencias y produzca en serie. |
| **Fase 2** | **Configuración Estratégica del Activo en Facebook** | Crear/configurar la página adaptable multi-tendencia y asegurar elegibilidad limpia y seguridad (2FA, Business Portfolio). |
| **Fase 3** | **Conexión a Métricas Reales (Feedback Loop)** | Conectar la página vía Meta Graph API / Insights (y respaldo CSV de Meta Business Suite) para leer métricas post por post. |
| **Fase 4** | **Fábrica Automatizada de Contenido (*Trend-Jacking 360°*)** | Sistematizar descarga, transformación sustancial anti-infracción, creación de memes/resúmenes/críticas/noticias y publicación. |
| **Fase 5** | **Tracción Rápida, Monitoreo y Desbloqueo de Monetización** | Ejecutar ciclos diarios sobre la tendencia activa (*ej. La Mansión VIP 2*), auditar cada post y alcanzar requisitos de monetización. |
| **Fase 6** | **Pivoteo Secuencial y Escalado a $50K MXN/mes** | Optimizar RPM/retención, activar múltiples vías de ingreso en Meta y ejecutar transiciones limpias entre tendencias. |

---

## Fase 0 — Cimientos de Inteligencia y Políticas (Cero Ceguera)

### Átomo 0.1 — Investigación Profunda de Ingeniería Inversa ($50K+ MXN/mes)
- **Acción:** Ejecutar `deep-research` (con los 8 pilares de `AGENTS.md §0.1`) sobre creadores y páginas de entretenimiento/noticias virales en México y LATAM que ya generan $\ge \$50,000\text{ MXN/mes}$ en Facebook.
- **Qué debe responder con datos reales:**
  1. Rangos reales de **RPM** en México/LATAM para Reels, Videos In-Stream (>1 min / >3 min) e Imágenes/Texto (bonificaciones vigentes en 2026).
  2. Volumen mensual de vistas calificadas necesarias para facturar $\$50,000\text{ MXN/mes}$ (ej. escenario conservador vs. realista).
  3. Requisitos vigentes del programa unificado de **Monetización de Contenido de Facebook** (Content Monetization) y tiempos promedio de invitación/aprobación.
  4. Anatomía de 5 páginas activas reales del mismo modelo (frecuencia diaria, duración de videos, estilo de edición que evita desmonetización).
- **Entregable:** `02-investigacion/profunda/2026-11-16_ingenieria-inversa-50k-mxn-facebook.md` + `02-investigacion/competencia/2026-11-16_benchmark-paginas-tendencias-latam.md`.
- **Criterio de terminado:** **PASA** si todas las cifras citan fuente verificable (documentación oficial Meta, creadores auditables, reportes) y se incluye tabla de sensibilidad Vistas × RPM = MXN.

### Átomo 0.2 — Biblia Operativa de Políticas Meta y Originalidad (Anti-Ban)
- **Acción:** Recopilar y traducir a reglas binarias las **Políticas de Monetización para Socios**, **Políticas de Monetización de Contenido**, reglas de **Contenido No Original / Reutilizado**, **Engagement Bait** y **Copyright (Rights Manager)** de Meta.
- **Entregable:** `00-sistema-y-reglas/politicas-meta/2026-11-16_reglas-oro-originalidad-y-monetizacion.md` + `00-sistema-y-reglas/sops-y-checklists/2026-11-16_checklist-pre-publicacion-anti-strike.md`.
- **Criterio de terminado:** **PASA** si existe un checklist de 10 puntos binarios (`SÍ/NO`) que toda pieza de terceros debe aprobar antes de publicarse (transformación visual, voz/narración propia, contexto añadido, música libre de copyright, cero marcas de agua de TikTok/IG/YouTube).

### Átomo 0.3 — Decodificación del Algoritmo Actual de Facebook
- **Acción:** Investigar señales reales de distribución orgánica de Facebook (retención en los primeros 3 segundos, tasa de finalización, re-visualizaciones, compartidos por DM/muro, comentarios largos vs. *clickbait* penalizado, distribución en feed *For You* / *Suggested for You*).
- **Entregable:** `02-investigacion/tendencias/2026-11-16_mecanica-algoritmo-facebook.md`.
- **Criterio de terminado:** **PASA** si separa hechos documentados por Meta/ingeniería de mitos sin respaldo, y define métricas objetivo por formato (Reels, Video largo, Meme/Imagen).

---

## Fase 1 — Ecosistema de Skills, "Ojos" y Herramientas

### Átomo 1.1 — Auditoría de Capacidades Actuales vs. Faltantes
- **Estado actual verificado:**
  - *Instaladas en workspace:* `interprete-prompt`, `maestro`, `ejecucion-atomica`, `analisis-critico`, `deep-research`.
  - *Nativas/Plugins disponibles:* `browser` (navegación en vivo), `image-generator`, `invideo` (edición de video), `run_workflow`, `schedule`, `search_web`, `notion`, `gdrive`.
  - *Faltantes críticas detectadas:* (a) Radar de tendencias en redes ("ojos"), (b) Conector de descarga y transformación de clips (`yt-dlp` + `ffmpeg`), (c) Conector de métricas reales de Facebook (Meta Graph API / parser CSV), (d) Skill especializada de producción viral multi-formato (memes, resúmenes 24h, críticas, noticias) y (e) Skill de auditoría de políticas Meta.
- **Entregable:** Este mapa verificado + verificación de dependencias locales (`python`, `node`, `ffmpeg`, `yt-dlp`).
- **Criterio de terminado:** **PASA** si se comprueba en terminal qué binarios (`ffmpeg`, `yt-dlp`, `python`) están instalados o se instalan limpiamente.

### Átomo 1.2 — Instalación de Binarios Locales de Media (`yt-dlp` + `ffmpeg`)
- **Acción:** Instalar o verificar `yt-dlp` (descarga limpia de clips de YouTube/TikTok/X/Facebook sin marca de agua cuando aplique) y `ffmpeg` (corte automático, reencuadre 9:16 / 4:5 / 16:9, *mirror/zoom* dinámico, inserción de subtítulos y capas visuales transformativas).
- **Entregable:** Scripts en `06-automatizaciones/scripts/` (`descargar_insumo.ps1` / `.py` y `transformar_clip.py`).
- **Criterio de terminado:** **PASA** si una prueba real descarga un clip público de prueba y genera una versión reencuadrada con marca/marco propio del proyecto sin errores.

### Átomo 1.3 — Creación de Skill `trend-radar` ("Ojos en Redes Sociales")
- **Acción:** Crear `.agents/skills/trend-radar/SKILL.md` combinando `browser` (para inspeccionar en vivo TikTok, X/Twitter, YouTube y Facebook público), `search_web` y scripts de monitoreo (Google Trends / RSS de noticias de entretenimiento en México).
- **Entregable:** `.agents/skills/trend-radar/SKILL.md` + `06-automatizaciones/scripts/radar_tendencias.py`.
- **Criterio de terminado:** **PASA** si al ejecutar el flujo sobre una tendencia real (ej. *"La Mansión VIP 2"*) devuelve en <5 min: los 5 sucesos más comentados de las últimas 24h, ángulos virales activos y el nivel de saturación/vida útil de la tendencia.

### Átomo 1.4 — Creación de Skill `viral-content-factory`
- **Acción:** Crear `.agents/skills/viral-content-factory/SKILL.md` especializada en los 5 ángulos del proyecto:
  1. Resumen "Últimas 24h" (guion corto + clips transformados).
  2. Meme de impacto rápido (imagen/texto con plantilla propia).
  3. Crítica/opinión polarizante segura (sin violar normas comunitarias).
  4. Noticia formal de entretenimiento (carrusel o imagen informativa tipo medio).
  5. Meta-reacción (qué opina la gente/creadores).
- **Entregable:** `.agents/skills/viral-content-factory/SKILL.md` + plantillas de hooks y prompts en `04-contenido/recursos-compartidos/prompts/`.
- **Criterio de terminado:** **PASA** si genera una matriz completa de 5 piezas distintas para un mismo suceso en <3 minutos cumpliendo el checklist anti-strike.

### Átomo 1.5 — Creación de Skill `meta-insights-analyst` y `politicas-meta-guard`
- **Acción:** Crear dos skills ligeras y enfocadas en `.agents/skills/`:
  - `politicas-meta-guard`: valida cada guion/pieza contra el checklist del Átomo 0.2 antes de producir.
  - `meta-insights-analyst`: procesa datos crudos de Facebook (API o CSV), calcula tasa de retención 3s, compartidos/alcance, RPM estimado y alimenta `analisis-critico`.
- **Entregable:** `.agents/skills/politicas-meta-guard/SKILL.md` y `.agents/skills/meta-insights-analyst/SKILL.md`.
- **Criterio de terminado:** **PASA** si `inventario.ps1` lista todas las skills nuevas sin errores de formato.

---

## Fase 2 — Configuración Estratégica del Activo en Facebook

### Átomo 2.1 — Arquitectura de Marca Adaptable (Identidad que no te encierra)
- **Acción:** Definir nombre, @handle, foto de perfil, portada, biografía y categoría de la página (ej. *Medio de comunicación / Entretenimiento / Creador digital*) diseñada para **pivotar de tendencia en tendencia** sin parecer spam ni perder seguidores al cambiar de tema (ej. de *La Mansión VIP 2* al siguiente fenómeno viral).
- **Entregable:** `01-estrategia-y-nichos/activos-y-paginas/2026-11-16_ficha-pagina-principal.md`.
- **Criterio de terminado:** **PASA** si el branding definido es 100% agnóstico a un solo reality/personaje, transmite autoridad de "medio/radar de cultura pop y humor" y tiene definidos colores/tipografías para memes y noticias.

### Átomo 2.2 — Creación y Blindaje Técnico de la Página y Meta Business Portfolio
- **Acción:** Guía paso a paso (ejecutada por el usuario con verificación) para:
  1. Crear/configurar la Página dentro de un **Meta Business Portfolio** limpio (no desde un perfil personal con historial de restricciones).
  2. Activar autenticación en 2 pasos (2FA), correo de respaldo y verificar que **Estado de la Página** y **Recomendación de Página** estén en verde.
  3. Configurar Meta Business Suite y rol de administrador.
- **Entregable:** Checklist completado en `01-estrategia-y-nichos/activos-y-paginas/2026-11-16_ficha-pagina-principal.md`.
- **Criterio de terminado:** **PASA** si la página muestra estado "Sin infracciones" y "Recomendable" en Meta Business Suite.

---

## Fase 3 — Conexión a Métricas Reales (Feedback Loop)

### Átomo 3.1 — Conector Oficial de Métricas (Meta Graph API + Respaldo CSV)
- **Acción:** Implementar dos vías complementarias para que nunca falle la lectura de datos:
  - **Vía A (Automatizada):** App en `developers.facebook.com` con permisos `pages_read_engagement`, `pages_read_user_content`, `read_insights` y script Python que consulta diariamente métricas por post (`post_impressions`, `post_engaged_users`, `post_video_views`, `post_video_avg_time_watched`, compartidos, reacciones).
  - **Vía B (Respaldo inmediato día 1):** Parser automático en Python que ingesta los CSV/XLSX exportados de Meta Business Suite desde `03-analisis-y-estadisticas/datos-crudos/` mientras Meta aprueba los permisos avanzados de la App.
- **Entregable:** `06-automatizaciones/scripts/fb_insights_sync.py` + `06-automatizaciones/scripts/parse_business_suite_csv.py` + guía de tokens en `.env.example` (sin guardar secretos en Git).
- **Criterio de terminado:** **PASA** si el script procesa un lote real de publicaciones (vía API o CSV de prueba) y genera un reporte en `03-analisis-y-estadisticas/informes/`.

### Átomo 3.2 — Sistema de Aprendizaje Post-a-Post ("Error → Ajuste → Mejora")
- **Acción:** Definir el protocolo automático después de cada publicación o bloque de 24h:
  1. Extraer métricas del post.
  2. Comparar contra la línea base (retención 3s, compartidos por cada 1,000 vistas, comentarios).
  3. Ejecutar `analisis-critico` (modo Quirúrgico o Estándar) para diagnosticar **por qué** funcionó o falló (hook débil, formato equivocado, timing tardío).
  4. Guardar aprendizaje en `05-bitacora-y-errores/bitacora/` o `errores-y-lecciones/` y actualizar las reglas de `viral-content-factory`.
- **Entregable:** `00-sistema-y-reglas/sops-y-checklists/2026-11-16_sop-aprendizaje-post-publicacion.md`.
- **Criterio de terminado:** **PASA** si el flujo está documentado con umbrales numéricos claros de qué se considera "post ganador" vs "post fallido".

---

## Fase 4 — Fábrica Automatizada de Contenido (*Trend-Jacking 360°*)

### Átomo 4.1 — Flujo Diario de Monitoreo ("Ojos" en Vivo)
- **Acción:** Configurar una rutina (manual asistida o con `/schedule` / `automation`) que 2–3 veces al día escanee la tendencia activa (ej. clips recientes de *La Mansión VIP 2* en TikTok/X/YouTube/FB, comentarios virales, qué están publicando las páginas competidoras) y deposite un **Brief de Oportunidad** en `02-investigacion/tendencias/`.
- **Entregable:** `06-automatizaciones/scripts/brief_diario_tendencia.py` + plantilla de brief.
- **Criterio de terminado:** **PASA** si produce un brief accionable con mínimo 3 sucesos frescos del día listos para producir.

### Átomo 4.2 — Pipeline de Producción Segura (Descarga + Transformación + Empaquetado)
- **Acción:** Conectar `descargar_insumo` → `politicas-meta-guard` → `viral-content-factory` → `transformar_clip.py` / `image-generator` / `invideo` para generar carpetas completas en `04-contenido/produccion/YYYY-MM-DD_<pagina>_<slug>/` con:
  - Hook + Guion / Copy listo para publicar.
  - Imagen/Meme o Video transformado (con narración/subtítulos/reencuadre/capas propias que eliminen riesgo de "contenido no original").
  - Primer comentario fijado para detonar conversación sana.
- **Entregable:** `06-automatizaciones/scripts/empaquetar_pieza.ps1` + primera carpeta piloto de producción completa.
- **Criterio de terminado:** **PASA** si una pieza piloto completa pasa el checklist anti-strike (Átomo 0.2) sin advertencias.

---

## Fase 5 — Tracción Rápida, Monitoreo y Desbloqueo de Monetización

### Átomo 5.1 — Sprint de Validación de 14 Días (Tendencia Piloto)
- **Acción:** Publicar de forma disciplinada sobre la tendencia activa dominante (ej. *La Mansión VIP 2* mientras siga en auge), alternando los 5 ángulos (Resumen 24h, Meme, Crítica, Noticia formal, Meta-reacción) y midiendo diariamente qué formato trae más **seguidores nuevos + compartidos**.
- **Entregable:** 14 días de registros en `03-analisis-y-estadisticas/informes/` y `05-bitacora-y-errores/bitacora/`.
- **Criterio de terminado:** **PASA** si se identifica estadísticamente el Top 2 de formatos con mayor tasa de compartidos y retención 3s > umbral definido en el Átomo 0.3.

### Átomo 5.2 — Auditoría de Elegibilidad y Activación de Monetización
- **Acción:** Monitorear progreso hacia los requisitos reales de monetización de Meta (verificados en el Átomo 0.1), asegurar 0 infracciones de originalidad, y enviar solicitud / activar herramientas de monetización en cuanto se cumplan los umbrales.
- **Entregable:** Reporte de auditoría en `03-analisis-y-estadisticas/auditorias-criticas/`.
- **Criterio de terminado:** **PASA** cuando al menos 1 vía de monetización oficial está activa y generando ingresos verificables.

---

## Fase 6 — Pivoteo Secuencial y Escalado a $50K MXN/mes

### Átomo 6.1 — Protocolo de Detección de Agotamiento y Pivoteo Limpio
- **Acción:** Definir la métrica gatillo para abandonar una tendencia (ej. caída >40% en búsquedas/alcance de la tendencia durante 3 días consecutivos mientras emerge otra tendencia en `trend-radar`) y ejecutar la transición hacia la nueva ola sin mezclar 5 temas a la vez.
- **Entregable:** `00-sistema-y-reglas/sops-y-checklists/2026-11-16_sop-pivoteo-tendencias.md`.
- **Criterio de terminado:** **PASA** si existen criterios cuantitativos claros de entrada, pico y salida de una tendencia.

### Átomo 6.2 — Optimización de RPM y Escalado Financiero ($50K MXN/mes)
- **Acción:** Una vez monetizada la página, optimizar la mezcla de formatos hacia los que pagan mayor RPM (ej. videos >1 min / >3 min para resúmenes profundos de 24h + Reels virales como embudo de alcance + imágenes/memes para retención de comunidad) hasta alcanzar la meta de $\$50,000\text{ MXN/mes}$.
- **Entregable:** Tablero de seguimiento financiero mensual en `03-analisis-y-estadisticas/informes/`.
- **Criterio de terminado:** **PASA** cuando los ingresos acumulados de 30 días en Meta Business Suite alcancen $\ge \$50,000\text{ MXN}$.

---

## Auditoría Crítica del Plan (`analisis-critico` — 8 Pilares) y Soluciones Aplicadas

> [!WARNING]
> **Aplicación obligatoria de `analisis-critico`:** Antes de ejecutar este plan, se somete el diseño completo a los 8 Pilares de Objetividad Radical para detectar fallas fatales ocultas, suposiciones falsas y riesgos de desmonetización.

### 1. Veredicto Crudo
El plan es **operativamente sólido en estructura**, pero en una versión ingenua tendría una **probabilidad alta (>70%) de fracaso por desmonetización o bloqueo técnico** en tres puntos críticos: (1) uso de clips de terceros, (2) acceso inmediato a la API de Facebook, y (3) matemática real de RPM en México para llegar a $50,000 MXN/mes con una sola página nueva.

### 2. Errores / Brechas Detectadas y Correcciones Integradas

| # | Error o Punto Ciego Detectado | Por qué rompe el proyecto (*Premortem*) | Solución Aplicada en el Plan |
| :--- | :--- | :--- | :--- |
| **E1** | **Riesgo letal de "Contenido No Original" y *Copyright Strikes* al descargar clips de lives/cuentas** | Meta detecta automáticamente huellas digitales de video/audio (*Rights Manager* y clasificadores de originalidad). Recortar un *live* de HotSpanish y subirlo tal cual (o solo con texto arriba) resulta en **desmonetización permanente** o eliminación de página. | Se añadió el **Átomo 0.2** (checklist obligatorio) y la skill **`politicas-meta-guard`** (Átomo 1.5), obligando a que todo clip pase por **transformación sustancial** (voz en off/narración propia, guion periodístico/crítico, edición con cortes <3–5s, capas gráficas propias, música libre) o formatos 100% propios (memes/carruseles/noticias ilustradas). |
| **E2** | **Falsa expectativa sobre Meta Graph API desde el Día 1** | Crear una App en Meta Developers para leer `read_insights` de una página requiere **App Review** (revisión de negocio y casos de uso por Meta), lo cual puede tardar semanas o ser rechazado si no hay empresa verificada o uso válido. | Se corrigió el **Átomo 3.1** agregando **Vía B (Respaldo inmediato día 1)**: parser automático en Python para los archivos **CSV/XLSX exportados de Meta Business Suite** (1 clic al día), garantizando analítica post-por-post desde el primer día sin depender de la aprobación de la API. |
| **E3** | **Trampa de la "Página Frankenstein" al cambiar de tendencia** | Si hoy hablas de *La Mansión VIP 2* y mañana de política o fútbol, el algoritmo pierde la gráfica de intereses de tu audiencia y el alcance se desploma, además de que los seguidores dejan de interactuar. | Se corrigió en el **Átomo 2.1** y **Átomo 6.1**: la página se posiciona bajo un **paraguas editorial único** (*Entretenimiento, Cultura Pop, Polémicas y Humor Viral en México/LATAM*) y pivota **secuencialmente** solo hacia tendencias dentro de ese mismo universo de audiencia masiva. |
| **E4** | **Ilusión de RPM alto en México/LATAM ($50K MXN/mes en 1 página nueva)** | En LATAM el RPM de Reels e imágenes suele ser bajo comparado con EE. UU. Depender solo de Reels cortos puede exigir decenas de millones de vistas mensuales, mientras que una cuenta nueva tarda meses en estabilizar ingresos. | Se ancló el **Átomo 0.1** a una **investigación empírica real** (tabla Vistas × RPM = MXN) y el **Átomo 6.2** a combinar formatos de mayor retención/RPM (resúmenes >1–3 min + Reels de atracción + memes de comunidad), sin prometer ingresos mágicos sin validar primero las tasas base reales. |
| **E5** | **Dependencia de MCPs no instalados (`firecrawl` / `exa`) en `deep-research`** | El entorno actual no tiene instalados los MCPs de `firecrawl` ni `exa`; intentar invocarlos haría fallar la investigación. | La investigación del **Átomo 0.1** y el radar del **Átomo 1.3** se diseñan sobre herramientas **realmente disponibles** en este entorno (`search_web`, subagente `browser` y scripts Python con RSS/Google Trends), sin asumir integraciones inexistentes. |
| **E6** | **Riesgo de *Shadowban* por automatización agresiva de publicación** | Usar bots no oficiales o publicar automáticamente con herramientas de terceros sin autorización puede disparar alertas de spam en Meta. | La automatización se enfoca en **monitoreo, descarga, edición/empaquetado y análisis**; la programación/publicación final usa **Meta Business Suite nativo** (que además permite programar en lote de forma 100% oficial y segura). |

### 3. Qué Faltaría Verificar (Brechas de Información Actual)
- **Falta verificar en el Átomo 0.1:** Las tarifas/RPM reales vigentes en 2026 para México en el programa unificado de *Content Monetization* de Meta y los requisitos exactos actuales de elegibilidad (que Meta actualiza periódicamente).
- **Falta verificar en el Átomo 1.1:** Qué binarios (`python`, `ffmpeg`, `yt-dlp`) ya están instalados en tu Windows actual.
