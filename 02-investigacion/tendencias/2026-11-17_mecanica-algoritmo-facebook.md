# Decodificación del Algoritmo Actual de Facebook (2025–2026): Informe de Investigación Verificada
*Fecha: 2026-11-17 | Fuentes analizadas: 14 (Nivel 1 y Nivel 2) | Confianza global: Alta en arquitectura y penalizaciones; Media-Alta en benchmarks empíricos (pesos exactos no publicados por Meta)*

---

## 1. Resumen Ejecutivo
Entre 2024 y 2026, Facebook completó la transición de un grafo social (*Connected*) a un **grafo de intereses impulsado por IA (*Unconnected Reach*)**, donde entre el **30% y el 45.6%** de las vistas del Feed provienen de cuentas que el usuario no sigue, y en junio de 2025 unificó todos los formatos de video bajo **Reels** (eliminando el límite de 90 segundos). El ranking prioriza **retención/tasa de finalización**, **envíos por DM/compartidos (*Sends per reach*)**, **interacciones conversacionales** y **originalidad verificada**, mientras degrada severamente **enlaces salientes en el caption** (con pruebas en 2026 de tope de 2 enlaces/mes para páginas no verificadas), **contenido reutilizado sin valor añadido** y ***engagement bait***. Meta **no publica los pesos porcentuales exactos** de cada señal ni umbrales oficiales de "buen" *hook rate*.

---

## 2. Tabla de Evidencia y Cadena de Custodia

| Dato / Afirmación | Nivel | Fuente / URL | Fecha | Estado |
| :--- | :--- | :--- | :--- | :--- |
| Unificación de Video en Reels: todos los videos nuevos se publican como Reels, sin límite de 90s; pestaña Video renombrada a Reels | Nivel 1 / Nivel 2 | Meta Newsroom (`about.fb.com`) / TechCrunch | Jun 2025 | `VERIFICADO` |
| Política anti-contenido no original: degradación de alcance en toda la página + suspensión de monetización para re-subidas sin valor añadido; 500k cuentas por spam y 10M perfiles suplantadores removidos en H1 2025 | Nivel 1 | Facebook for Creators (`creators.facebook.com`) / PPC Land | 14 Jul 2025 | `VERIFICADO` |
| Modelo unificado de recomendaciones IA (Tom Alison): ganancia de **8%–10%** en tiempo de visualización en pruebas de Reels | Nivel 1 / Nivel 2 | Meta / Quartz / Engadget | 2024–2025 | `VERIFICADO` |
| *Widely Viewed Content Report*: **92%–97.9%+** de vistas del Feed en EE. UU. son posts sin enlaces externos; **30%–45.6%** provienen de posts *Unconnected* | Nivel 1 | Meta Transparency Center (`transparency.meta.com`) / Jon Loomer / Stampede | 2024–2025 | `VERIFICADO` |
| Arquitectura multi-etapa (Retrieval → Early-Stage Ranking → Late-Stage Ranking) + modelo UTIS y capa LLM ("Your Algorithm") | Nivel 1 | Meta Engineering (`engineering.fb.com`) / TechCrunch | 2024–2026 | `VERIFICADO` |
| *Content Distribution Guidelines*: degradación algorítmica (*downranking*) para *clickbait*, *engagement bait*, contenido límite y reutilizado | Nivel 1 | Meta Transparency Center (`transparency.meta.com`) | Vigente 2025–2026 | `VERIFICADO` |
| Aviso en *Professional Dashboard* recomendando poner enlaces en el primer comentario; pruebas en 2026 de límite de **2 posts con enlace/mes** para cuentas sin *Meta Verified* | Nivel 2 | Social Media Today / Social Media Examiner / TechCrunch | 2025–2026 | `VERIFICADO` |
| Estudio de formatos en Facebook (muestra: **52M+ posts** en **213k+ cuentas**): Imágenes **5.20%**, Video **4.84%**, Texto **4.76%**, Enlaces **4.43%**; responder comentarios da **+9.5%** de engagement | Nivel 2 | Buffer (*State of Social Media Engagement*) / Net Influencer | 2025–2026 | `VERIFICADO` |
| Curva de engagement por duración de video: 1–30s (**0.10%**), 30–60s (**0.18%**), 60–120s (**0.22%**), 120–180s (**0.25% pico**), >180s (**0.22%**) | Nivel 2 | Socialinsider (estudios multi-millón de posts de marcas) | 2025–2026 | `VERIFICADO` |
| Reels con voz humana y rostro visible en los primeros 3s logran **+11.7%** de retención a 3s y **+24.7%** a 10s vs. apertura solo con música | Nivel 2 | Emplifi (estudio de ecosistema Meta) | 2025 | `VERIFICADO` |
| Tasa de finalización (*completion rate*) empírica: ~70%–71% en Reels de 8–15s; ~45%–55% en ~30s; ~20%–40% en 60s–3 min | Nivel 2 | InfluenceFlow / Socialinsider | 2025–2026 | `UNICA_FUENTE` (contrastar por nicho) |
| Regla estricta de "comentarios de 4+ o 5+ palabras" ignorando comentarios cortos | Mito refutado | Meta Transparency / análisis NLP (SocialPilot) | 2025–2026 | `NO_VERIFICABLE` (falso como regla fija; ver §3.2) |
| Peso porcentual exacto de cada señal en el algoritmo de Facebook | — | Documentación pública de Meta | — | `[BRECHA: peso algorítmico exacto no publicado por Meta]` |

---

## 3. Hallazgos Verificados por Eje

### 3.1 Arquitectura de Distribución Actual (2025–2026)

#### A. Hechos documentados por Meta / Ingeniería
1. **Doble carril: *Connected* vs. *Unconnected Reach*:** Meta separa la distribución en contenido conectado (amigos, grupos unidos, páginas seguidas) y contenido no conectado (*Unconnected Recommendations* en el Feed y pestaña Reels). Según los reportes *Widely Viewed Content Report*, las publicaciones *Unconnected* alcanzaron entre **30% y 45.6%** de las vistas del Feed en EE. UU.
2. **Unificación de Video bajo Reels (Junio 2025):** Meta eliminó la separación técnica entre video tradicional del Feed y Reels. Exceptuando transmisiones en vivo (*Live*), todo video nuevo subido a Facebook se distribuye como **Reel**, se eliminaron los topes históricos de duración (como los 90 segundos) y la pestaña **Video** pasó a llamarse **Reels**.
3. **Embudo de Ranking Multi-Etapa (<100 ms):** Según `engineering.fb.com`, el motor selecciona candidatos en 3 fases:
   - **Etapa 1 — *Retrieval* (Recuperación):** Reduce miles de millones de publicaciones a miles mediante señales heurísticas, de grafo e intereses.
   - **Etapa 2 — *Early-Stage Ranking (ESR)*:** Redes neuronales ligeras filtran miles a cientos según relevancia inicial.
   - **Etapa 3 — *Late-Stage Ranking (LSR)*:** Modelos profundos multi-objetivo predicen simultáneamente probabilidad de tiempo de visualización, finalización, compartidos, comentarios y señales negativas (*Hide*, *Not Interested*), apoyados por capas de satisfacción a largo plazo (como **UTIS** — *User Trust and Interaction Satisfaction*).
4. **Modelo Unificado y Control Natural (*"Your Algorithm"*):** El modelo unificado de video/Feed presentado por Tom Alison generó un aumento de **8% a 10%** en tiempo de visualización en Reels. En 2025–2026, Meta integró LLMs en la función **"Your Algorithm"**, permitiendo a los usuarios escribir en lenguaje natural qué temas desean ver más o menos en Feed y Reels, reajustando el ranking en la misma sesión.

#### B. Reportes empíricos Tier-2
- El algoritmo opera por **micro-lotes de prueba (*trial batches*)**: un Reel nuevo se expone primero a un segmento pequeño de no-seguidores; si supera el umbral de retención inicial y velocidad de interacción (*freshness boost* para contenido del mismo día), escala a lotes mayores de distribución *Unconnected*.

---

### 3.2 Señales Reales de Ranking que Premia Meta

| Categoría | Hechos documentados por Meta / Ingeniería | Reportes empíricos Tier-2 | Mitos refutados o sin respaldo |
| :--- | :--- | :--- | :--- |
| **Retención y 3 primeros segundos** | Meta define `video_3_sec_views` como el estándar técnico de vista inicial y confirma que **tiempo promedio de reproducción**, **tasa de finalización** y **re-visualizaciones (*rewatches*)** son señales centrales en LSR. | **Emplifi:** Rostro visible + voz humana en los primeros 3s aumenta retención **+11.7%** a los 3s y **+24.7%** a los 10s. En Reels de >30s, se observan caídas bruscas al segundo 30 si no hay *pattern interrupts* (cambios de plano/B-roll). `[BRECHA: Meta no publica un % oficial de "buen" hook rate]`. | Mito: *"Cualquier video de más de 60s muere en Reels"*. Falso: tras la unificación de 2025, la duración no bloquea distribución si sostiene retención relativa; Socialinsider muestra pico de engagement en **120–180s** para marcas. |
| **Envíos por DM y Compartidos (*Sends per reach* / *Shares*)** | Meta prioriza explícitamente envíos privados (Messenger/DMs) y compartidos sobre interacciones pasivas como *Likes*. | En embudos de alcance *Unconnected*, un alto ratio de compartidos/alcance funciona como señal de alto valor cultural/emocional que desbloquea lotes masivos de recomendación. | Mito: *"Los likes siguen valiendo igual que un compartido si hay muchos"*. Refutado por Meta en su arquitectura *Meaningful Social Interactions* (MSI). |
| **Comentarios y Conversación** | El sistema predice probabilidad de **diálogo bidireccional** (respuestas a comentarios e hilos activos), no solo conteo bruto de comentarios. | **Buffer (52M+ posts):** Responder activamente a los comentarios propios eleva el engagement en **~9.5%**. Modelos NLP evalúan densidad semántica de la conversación. | **Mito refutado:** *"Meta borra o ignora comentarios de menos de 4 o 5 palabras"*. Meta nunca ha publicado un corte numérico de palabras; simplemente los sistemas NLP/anti-spam dan menor peso a comentarios genéricos de 1 palabra o emojis que a hilos conversacionales reales. |
| **Originalidad y Consistencia Temática** | Desde julio 2025, Meta premia explícitamente la autoría original (audio original, edición nativa, huella visual única) y clasifica el nicho mediante visión computacional, audio y texto en pantalla. | Páginas con nicho consistente facilitan que el motor *Retrieval* las empareje con audiencias *Unconnected* estables. | Mito: *"Editar velocidad al 1.1x o poner un marco basta para pasar como original"*. Refutado explícitamente en el comunicado de Meta del 14 de julio de 2025. |

---

### 3.3 Señales Negativas y Degradación (*Downranking*)

1. **Enlaces salientes en el caption (Hecho + Evidencia de Mercado):**
   - **Dato primario:** El *Widely Viewed Content Report* demuestra que **92% a 97.9%+** de las vistas del Feed carecen de enlaces externos. Meta busca retener al usuario dentro de la app.
   - **Confirmación operativa (2025–2026):** El *Professional Dashboard* de Facebook comenzó a mostrar recomendaciones explícitas sugiriendo **colocar los enlaces en el primer comentario** en lugar del cuerpo del post. En 2026, Meta probó limitar a **2 publicaciones con enlace al mes** a páginas/perfiles profesionales sin suscripción *Meta Verified*, mientras los enlaces en comentarios permanecían sin ese tope.
2. **Contenido no original y marcas de agua (Hecho Nivel 1):**
   - El comunicado oficial del **14 de julio de 2025** estableció penalizaciones a nivel de **toda la cuenta** (no solo del post infractor) para quienes reutilicen clips de terceros o videos con marcas de agua (ej. logos de TikTok/CapCut externos sin transformación sustancial), incluyendo **restricción de distribución** y **pérdida temporal de monetización**.
3. **Baja resolución y calidad técnica:**
   - Videos borrosos, pixelados o re-comprimidos sufren pérdida de elegibilidad en superficies de recomendación *For You / Reels*.
4. ***Clickbait* y *Engagement Bait* (Hecho Nivel 1):**
   - Las *Content Distribution Guidelines* penalizan titulares que ocultan información crítica o exageran (*clickbait*) y llamados manipulativos directos (*"Comenta SÍ si..."*, *"Etiqueta a 5 amigos"*, *"Like si naciste en..."* = *engagement bait*).

---

### 3.4 Contra-Evidencia, Riesgos y Brechas

- **Contra-evidencia sobre "poner enlaces en comentarios":** Aunque evita el *downranking* directo del post y esquiva el tope de 2 enlaces/mes probado en 2026, **reduce drásticamente el CTR** frente a un enlace directo si no hay un motivo fuerte en el post para abrir comentarios; además, en formato Reels el usuario raramente abre comentarios solo para hacer clic en un link no clickeable o enterrado (requiere fijar el comentario inmediatamente).
- **Contra-evidencia sobre duración de Reels (<30s vs >60s):** Videos muy cortos (8–15s) obtienen tasas de finalización mucho mayores (~70–71%), facilitando alcance viral *top-of-funnel*, pero **no monetizan igual ni construyen lealtad profunda** si el contenido es vacío; por su parte, videos largos (>60s / 2–3 min) tienen menor *completion rate* (~20–40%) pero logran el pico de engagement de marca (0.25% en 120–180s según Socialinsider) y mayor tiempo total de visualización acumulada si retienen con estructura narrativa.
- **Brechas explícitas detectadas:**
  - `[BRECHA: peso algorítmico exacto no publicado por Meta]` — Meta no revela porcentajes de ponderación entre *watch time*, *sends per reach*, *comments* y *likes*.
  - `[BRECHA: umbral oficial de "hook rate" orgánico no publicado por Meta]` — Los rangos de 3s usados en la industria provienen de plataformas de analítica publicitaria (paid media) o agencias, no de documentación oficial de Meta.

---

## 4. Métricas Objetivo Accionables por Formato para `MonetizaciónFacebook`

> **Regla de transparencia:** Se distingue estrictamente qué cifra proviene de **fuente observada** y qué umbral es un **`[OBJETIVO OPERATIVO PROPUESTO]`** para operar páginas rentables en el proyecto.

| Formato | Métrica clave de algoritmo | Referencia observada en fuentes | `[OBJETIVO OPERATIVO PROPUESTO]` para `MonetizaciónFacebook` | Regla crítica de ejecución |
| :--- | :--- | :--- | :--- | :--- |
| **Reels cortos (15–45s)** *(Descubrimiento / Unconnected)* | Retención 3s + *Completion Rate* + *Sends/Shares* | Finalización observada: ~70–71% (8–15s) y ~45–55% (~30s). Voz/rostro en 3s: +11.7% retención (Emplifi). | - Retención a 3s (orgánica): **≥65%**<br>- *Completion rate*: **≥70%** (15–20s) / **≥50%** (30–45s)<br>- *Shares/Reach*: **≥1.5%** | Gancho visual/verbal en <1.5s; cero marcas de agua; loop limpio al final. |
| **Reels largos (>60s)** *(Autoridad y retención media)* | Tiempo promedio de reproducción + *Pattern interrupts* + Comentarios | Finalización observada: ~20–40%. Caída crítica frecuente al segundo 30 (Socialinsider). | - Retención a 3s: **≥60%**<br>- Retención al segundo 30: **≥40%**<br>- *Completion rate*: **≥30%**<br>- Tiempo medio visto: **≥35–45s** | Insertar *pattern interrupt* cada 15–20s (especialmente antes del 0:30); estructura por capítulos (*hook → tensión → entrega*). |
| **Video largo (>1 min / >3 min)** *(Subido unificado como Reel)* | Tiempo total visto + Engagement por tramo + Hilos de comentarios | Pico de engagement observado en **120–180s (0.25%)**; leve descenso >180s (0.22%) (Socialinsider). | - Retención al minuto 1: **≥35%**<br>- Tiempo medio visto: **≥60–90s** en videos de 2–3 min<br>- Responder al 100% de comentarios iniciales (lift ~9.5%, Buffer) | Solo producir >3 min si hay arco narrativo real; evitar relleno para inflar duración. |
| **Imágenes / Memes / Posts de texto** *(Fidelización / Connected + Debate)* | *Shares* + Comentarios conversacionales (sin *engagement bait*) | Medianas de engagement (Buffer): Imagen **5.20%**, Texto **4.76%**, Enlace **4.43%**. | - Engagement rate por alcance: **≥5.0%**<br>- Ratio de comentarios con respuesta del creador: **≥80%** en las primeras 2h<br>- Cero enlaces en el caption | Usar para generar debate genuino (preguntas abiertas reales, no *bait*); si hay enlace, fijarlo en el primer comentario. |

---

## 5. Conclusiones Accionables para `MonetizaciónFacebook`

1. **Producción Nativa como Reel por Defecto:** Todo video debe diseñarse bajo estándares de retención de Reels (apertura de 1.5–3s con rostro/voz o choque visual inmediato), independientemente de si dura 20 segundos o 3 minutos.
2. **Cero Tolerancia al Contenido Reutilizado Pasivo:** Tras la ofensiva de julio de 2025, reciclar clips sin transformación narrativa profunda arriesga el **alcance de toda la página** y la **monetización**. Todo material externo usado como base debe llevar comentario en cámara, edición sustancial y narrativa propia.
3. **Política Estricta "Cero Enlaces en Caption":** Para proteger el alcance *Unconnected* (y evitar topes como la prueba de 2 enlaces/mes en páginas no verificadas), las publicaciones de tráfico deben ir en formato nativo (imagen/texto/Reel) con el enlace en el **primer comentario fijado**, o canalizadas vía DM/automatización.
4. **Optimizar para "Envíos y Diálogo", no para Likes:** Cada guion debe incluir un disparador psicológico de envío (*"mándaselo a alguien que..."* de forma orgánica) y una pregunta abierta real que genere hilos de conversación, respaldado por respuestas activas del creador en los primeros minutos (+9.5% de engagement observado).
