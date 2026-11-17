# Guía de Orquestación y Optimización de Modelos IA (`MonetizaciónFacebook`)

Este documento define las reglas de enrutamiento, asignación de tareas y optimización de cuota para todos los agentes y modelos que trabajen en este proyecto dentro de Antigravity, enfocado única y específicamente en **monetizar Facebook** (páginas, perfiles profesionales, Reels, video In-Stream, bonificaciones, suscripciones, tráfico y estrategias de retención/ingresos).

> **Principio rector:** Proteger las cuotas semanales (`Claude 5.5`, `GPT-OSS 120B` y `Gemini 4 Argon`) usando como base diaria los modelos de reinicio corto (`Gemini 4 Hydrogen` y `Gemini 3.8 Flash`), y escalar a modelos de mayor costo únicamente cuando la complejidad estratégica, el criterio crítico o el tono creativo lo justifiquen.

---

## 0. Reglas Supremas: `interprete-prompt` + `maestro` SIEMPRE activos

> [!IMPORTANT]
> **En CADA entrada del usuario sin excepción** (chat nuevo, mensaje, petición coloquial, pregunta o indicación):
> 1. **Primero [`interprete-prompt`](file:///c:/Users/damia/Documentos/Antigravity/Monetizaci%C3%B3nFacebook/.agents/skills/interprete-prompt/SKILL.md):** Decodifica el mensaje humano natural en un prompt interno estructurado de alta precisión (con *Context Engineering*, delimitadores XML, objetivo, restricciones y rúbrica binaria) **sin perder ni distorsionar el objetivo real del usuario**.
> 2. **Inmediatamente después [`maestro`](file:///c:/Users/damia/Documentos/Antigravity/Monetizaci%C3%B3nFacebook/.agents/skills/maestro/SKILL.md):** Orquesta dinámicamente qué habilidades se combinan para ejecutar ese prompt interno.

- En el **primer mensaje de cada conversación**: leer `.agents/skills/interprete-prompt/SKILL.md` y `.agents/skills/maestro/SKILL.md` completos.
- En **cada mensaje siguiente**: ejecutar ambos protocolos (modo *express* para mensajes simples, *completo* para tareas complejas). Si no se recuerdan con claridad, releerlos.
- Toda respuesta comienza con la línea de enrutamiento `🎼 Maestro: …` indicando qué habilidades se usarán (o "respuesta directa").
- `maestro` decide dinámicamente qué otras habilidades cargar; ninguna otra habilidad se usa sin pasar antes por `interprete-prompt` → `maestro`.

---

## 0.1 Regla de Oro: Investigación Estricta y Verificable (SIEMPRE activa)

> [!IMPORTANT]
> **Obligatoria de raíz a punta en TODA investigación** (rápida, básica, avanzada, profunda o crítica), sin importar el tema (nichos, RPM/CPM de Facebook, políticas de monetización de Meta, algoritmos, formatos virales, competencia, herramientas), y **tanto cuando el usuario la solicite como cuando el agente decida investigar por iniciativa propia**. Esta regla no limita ni frena la ejecución: **pule el resultado** para entregar inteligencia real, funcional y de altísima calidad.

### A. Los 8 Pilares Obligatorios (Checklist de Ejecución)

1. **Datos 100% REALES y fuentes verificadas:**
   - Trabajar únicamente con datos reales y verificables. Prohibido inventar cifras (como RPMs, alcances o ingresos ficticios), rellenar huecos con suposiciones o usar información fantasiosa.
   - Verificar siempre autoría, fecha, vigencia (especialmente cambios recientes en políticas y programas de monetización de Meta/Facebook) y fuente primaria original. Todo dato no contrastado se descarta o se marca explícitamente como no verificado.

2. **Expertos reales con trayectoria, resultados e impacto comprobado:**
   - Consultar siempre a personas expertas **directamente relacionadas** con el tema investigado (creadores con páginas monetizadas auditables, especialistas en crecimiento orgánico en Meta, analistas de economía de creadores).
   - **Filtro obligatorio:** Nunca citar a alguien solo por autoproclamarse experto o vender cursos. Verificar previamente su **trayectoria profesional, resultados tangibles e impacto real en el mundo real** (páginas activas, métricas verificables, casos auditables o documentación técnica).

3. **Noticias de fuentes altamente calificadas y sin ruido:**
   - Enriquecer cada investigación con noticias actuales **directamente relacionadas** al tema (actualizaciones oficiales de Meta for Creators, cambios en programas de bonificación, regulaciones).
   - **Cero noticias falsas ni medios dudosos:** Consultar **SÍ o SÍ** fuentes oficiales de Meta y medios de altísimo rigor y reputación editorial (ej. *Meta Newsroom*, *Meta for Creators*, *Reuters*, *Bloomberg*, *TechCrunch*, *Social Media Today* o comunicados oficiales), evitando clickbait y rumores sin fuente.

4. **Cuentas relevantes y auténticas (multiplataforma):**
   - Consultar cuentas de altísima relevancia directamente ligadas al tema para enriquecer el análisis, **sin limitarse a una sola red**:
     - Páginas/Creadores reales en Facebook,
     - Otras redes (X/Twitter, LinkedIn, YouTube, TikTok) donde creadores y analistas comparten métricas reales y casos,
     - Ecosistema Google (Google Scholar, canales/blogs oficiales, Google News),
     - **GitHub** (si se investigan herramientas, scripts o automatizaciones),
     - Comunidades o portales especializados verificados.
   - Comprobar siempre la **autenticidad** de cada cuenta (perfil oficial, dominio o historial real) para evitar cuentas falsas, bots o datos apócrifos.

5. **Empresas y casos operativos del mundo real:**
   - Consultar e incorporar referencias de **empresas, medios digitales y operadores reales y activos** que moneticen en Facebook (publishers, redes de páginas, marcas, creadores consolidados) para anclar la investigación en la realidad del mercado.

6. **Tendencias reales con respaldo:**
   - Identificar **tendencias reales, vigentes y directamente relacionadas** al tema (cambios en retención de Reels vs. video largo, formatos premiados por el algoritmo de Facebook, cambios de RPM por país/nicho, políticas de originalidad), distinguiendo tendencias reales de mitos virales sin evidencia.

7. **Optimización y estructuración eficaz:**
   - Depurar el ruido desde la recolección para aumentar la productividad y no perder tiempo con datos poco relevantes.
   - Entregar la información **estructurada, jerarquizada y accionable** (Resumen ejecutivo / Hechos verificados / Expertos, empresas y cuentas clave / Noticias y tendencias / Conclusiones aplicables).

8. **Auditoría final de calificación y pertinencia:**
   - Antes de cerrar o usar cualquier hallazgo, **auditar** dos preguntas obligatorias:
     1. *¿Toda fuente, experto, noticia, cuenta, empresa y tendencia cumple los filtros de autenticidad y calidad?*
     2. *¿La información recopilada califica y responde con precisión a lo que solicita el objetivo de la investigación?*
   - Todo lo que no califique se elimina antes de responder.

### B. Escala Proporcional (Sin omitir pilares)

| Nivel de investigación | Cómo se aplica la regla |
| :--- | :--- |
| **Rápida / Básica / Autónoma** | Ejecución ágil y enfocada: mínimo 1–2 datos primarios verificados + 1 experto validado + 1 noticia de medio calificado/oficial + 1 cuenta auténtica + 1 caso real + tendencia vigente + auditoría rápida de pertinencia. |
| **Avanzada / Profunda / Crítica** | Cobertura exhaustiva y cruce multi-fuente: múltiples expertos con impacto auditado, varias noticias de medios tier-1 o comunicados oficiales de Meta, cuentas multiplataforma, mapa de operadores/competidores reales, análisis de tendencias y tabla de auditoría explícita (coordinando `deep-research` y escalado de modelos según §1–§4). |

---

## 0.2 Regla de Oro: Análisis Crítico Obligatorio (`analisis-critico` SIEMPRE activo)

> [!IMPORTANT]
> **Cada vez que se analice algo** (un nicho de Facebook, una estrategia de monetización, un guion/hook, métricas de alcance/retención/RPM, riesgo de desmonetización, código o propuesta — sea pequeña/rápida o profunda/extensa), el agente y `maestro` DEBEN activar [`analisis-critico`](file:///c:/Users/damia/Documentos/Antigravity/Monetizaci%C3%B3nFacebook/.agents/skills/analisis-critico/SKILL.md) **por encima de cualquier otra habilidad relacionada**.

1. **Los 8 Pilares SÍ o SÍ:** Todo análisis aplica obligatoriamente: (1) No autoengaño y falsabilidad, (2) Fuente primaria y terreno real, (3) Hipótesis en competencia / ACH, (4) Vista externa (*base rates*) y probabilidad calibrada, (5) Inversión, *premortem* y *via negativa*, (6) Higiene lingüística y filtro anti-gusto, (7) Auditoría de incentivos y *skin in the game*, (8) Registro verificable y autocorrección sin ego.
2. **Prioridad jerárquica y cero contaminación:** `maestro` selecciona qué otras habilidades (`deep-research`, etc.) suman datos técnicos de dominio, pero **subordinadas a `analisis-critico`**: aportan insumos verificados, jamás suavizan conclusiones por cortesía ni contaminan el veredicto final.
3. **Cero gustos, cero complacencia:** Todo veredicto separa estrictamente **Hecho verificado**, **Inferencia/Probabilidad** y **Puntos de ruptura**, entregando la realidad cruda respaldada por evidencia.

---

## 0.3 Regla de Oro: Ejecución Atómica y Anti-Saturación (`ejecucion-atomica` SIEMPRE activa)

> [!IMPORTANT]
> **Ante CUALQUIER petición con ≥2 tareas distintas, investigación amplia (>3 búsquedas) o escritura múltiple (>3 páginas/archivos)**, activa [`ejecucion-atomica`](file:///c:/Users/damia/Documentos/Antigravity/Monetizaci%C3%B3nFacebook/.agents/skills/ejecucion-atomica/SKILL.md) **antes de llamar herramientas pesadas**.

1. **Separar y secuenciar (`T1 → T2 → T3…`):** Descompón cada tarea pedida y ejecútala en pasos atómicos independientes, nunca todas juntas en la misma ronda.
2. **Aislar investigación y borradores:** Delega búsquedas web/lecturas amplias a un subagente `self` (no `research`) guardando el resultado en un archivo `.md` local; redacta contenido largo en local antes de subirlo a APIs externas.
3. **Límites anti-400:** Máximo **1** llamada de escritura pesada por turno (**2–3 páginas/archivos máx.**, sin paralelos masivos). Si el chat supera ~115k tokens, delega lotes restantes a `self` o pide `/compact`.

---

## 1. Mapa de Modelos y Cuotas Disponibles

Los modelos disponibles en este entorno se dividen en **tres pools de cuota** independientes:

| Pool | Modelos | Ventana de reinicio | Rol principal |
| :--- | :--- | :--- | :--- |
| **Pool A (Uso diario / Corto plazo)** | `Gemini 3.8 Flash` (`Low`/`Medium`/`High`)<br>`Gemini 4 Hydrogen` (`Low`/`Medium`/`High`/`XHigh`) | **Corta (~5 horas)** | Caballos de batalla para el 80–85% del trabajo diario (guiones base, análisis de métricas, automatizaciones, borradores, operación de páginas). |
| **Pool B (Estrategia / Orquestación Google)** | `Gemini 4 Argon` (`Low`/`Medium`/`High`)<br>`Orchestrator (Argon)` | **Semanal (7 días)** | Investigación profunda de nichos/políticas, análisis crítico extenso, estrategia de monetización y coordinación de enjambres (`/swarm`). |
| **Pool C (Criterio / Redacción / Precisión)** | `Claude Sonnet 5.5` (`Low`/`Medium`/`High`)<br>`Claude Opus 5.5` (`Low`/`Medium`/`High`)<br>`GPT-OSS 120B` (`Medium`) | **Semanal (7 días, compartido entre los 3)** | Hooks y guiones de altísima retención, copywriting persuasivo, auditoría crítica de riesgo de desmonetización y resolución de bloqueos complejos. |

> **Nota crítica de optimización:** `Claude Opus 5.5`, `Claude Sonnet 5.5` y `GPT-OSS 120B` **comparten exactamente la misma bolsa de cuota semanal**. Usar `GPT-OSS 120B` no ahorra cuota de Claude; para ahorrar cuota semanal se debe usar `Gemini 3.8 Flash` o `Gemini 4 Hydrogen`.

---

## 2. Cuándo usar cada Modelo y Nivel de Esfuerzo (`Low` / `Medium` / `High` / `XHigh`)

### A. `Gemini 3.8 Flash` *(Pool corto)*
- **Cuándo usarlo:** Tareas mecánicas, repetitivas, de alto volumen o baja ambigüedad.
  - Resúmenes rápidos, extracción de datos de métricas/CSV, formateo de JSON/Markdown.
  - Lluvia de ideas inicial de temas virales, variantes rápidas de títulos, hooks o hashtags.
  - Lectura exploratoria de archivos o verificación simple de sintaxis.
- **Niveles:**
  - `Low`: Clasificación, limpieza de texto, respuestas directas.
  - `Medium`: Borradores rápidos, resúmenes, tareas auxiliares en `/swarm`.
  - `High`: Cuando necesitas velocidad de Flash pero con múltiples restricciones de formato.

### B. `Gemini 4 Hydrogen` *(Pool corto — Modelo por defecto)*
- **Cuándo usarlo:** Es el **modelo principal** para ejecutar la mayoría de las tareas del proyecto sin desgastar la cuota semanal.
  - Estructuración de planes de contenido, calendarios editoriales y guiones completos para Reels o videos largos de Facebook.
  - Análisis operativo de métricas (retención a 3s, 1 min, CTR, RPM, alcance orgánico).
  - Construcción de automatizaciones, scripts de análisis/reporteo, integraciones y herramientas locales.
  - Investigación operativa con herramientas y redacción estructurada (manuales, SOPs de publicación, checklists de políticas).
- **Niveles:**
  - `Low`: Cambios menores en un archivo, renombrados, dudas puntuales.
  - `Medium` *(recomendado por defecto)*: Creación de guiones, análisis de formatos, flujos de contenido y scripts.
  - `High`: Refactorizaciones multi-archivo, análisis complejo de políticas de monetización, arquitectura de sistema de producción de contenido.
  - `XHigh`: Problemas lógicos profundos o auditorías técnicas complejas cuando quieras resolverlos sin gastar cuota semanal de `Opus` o `Argon`.

### C. `Orchestrator (Argon)` *(Pool semanal B)*
- **Cuándo usarlo:** Exclusivamente como **coordinador** en proyectos grandes con `/swarm` donde convenga paralelizar varias ramas de trabajo a la vez (por ejemplo: investigar 3 nichos + diseñar matriz de formatos + construir scripts de analítica simultáneamente).
- **Regla de oro:** Si la tarea se puede resolver secuencialmente en una sola conversación, **no** invoques al `Orchestrator`; trabaja directo en `Gemini 4 Hydrogen (Medium)`.

### D. `Gemini 4 Argon` *(Pool semanal B)*
- **Cuándo usarlo:** Tareas de **investigación profunda**, **análisis crítico** y **síntesis de gran contexto**.
  - Estudios de nichos rentables en Facebook (RPM por geografía/idioma, saturación, barreras de entrada).
  - Análisis competitivo de páginas grandes y cruce de múltiples fuentes extensas.
  - Definición de estrategia integral de monetización (combinación de Reels, In-Stream, afiliados, tráfico o suscripciones).
- **Niveles:** Usa `Medium` por defecto; reserva `High` para decisiones estratégicas irreversibles (ej. elegir nicho principal o pivote de página) o análisis muy densos.

### E. `Claude Sonnet 5.5` *(Pool semanal C)*
- **Cuándo usarlo:** Cuando la **psicología de retención, el tono humano y la precisión creativa** marquen la diferencia en el rendimiento del contenido.
  - **Guiones y Hooks de alto impacto:** Pulido final de los primeros 3 segundos, ritmo narrativo y cierres que disparen comentarios/compartidos (sin caer en clickbait penalizado por Meta).
  - **Copywriting y Monetización directa:** Captions de conversión, textos para embudos desde Facebook, ofertas y guiones de venta natural.
- **Niveles:** `Medium` para el 90% de sus usos; `Low` para corrección de estilo rápida; `High` solo si la pieza clave requiere máxima finura.

### F. `Claude Opus 5.5` *(Pool semanal C — Recurso de élite)*
- **Cuándo usarlo:** **Último recurso o hitos críticos.** Consume cuota semanal muy rápido.
  - Auditoría crítica final ("abogado del diablo") sobre un nicho, modelo de negocio o estrategia de monetización antes de invertir tiempo o dinero.
  - Evaluación crítica de riesgo de desmonetización, originalidad de contenido o cumplimiento fino de Políticas de Monetización para Socios de Meta.
  - Bloqueos técnicos o estratégicos que `Gemini 4 Hydrogen (High/XHigh)` no logró destrabar.
- **Niveles:** `Medium` para análisis crítico; `High` únicamente para decisiones de altísimo impacto. Nunca en `Low` (para eso usa `Sonnet` o `Hydrogen`).

### G. `GPT-OSS 120B` *(Pool semanal C)*
- **Cuándo usarlo:** Como **segunda opinión** puntual en razonamiento estratégico o contraste de enfoques cuando quieras validar una idea fuera de las familias Gemini/Claude.
- **Advertencia:** Al compartir cuota semanal con Claude, úsalo solo cuando busques específicamente diversidad de criterio.

---

## 3. Matriz de Enrutamiento por Área del Proyecto (`MonetizaciónFacebook`)

| Área de trabajo | 1. Borrador / Exploración | 2. Ejecución principal | 3. Pulido / Auditoría crítica |
| :--- | :--- | :--- | :--- |
| **Estrategia de Monetización y Nichos** | `Gemini 3.8 Flash (Med)` (lluvia de ideas de nichos) | `Gemini 4 Hydrogen (High)` o `Gemini 4 Argon (Med)` | `Claude Opus 5.5 (Med)` (auditoría de viabilidad y riesgos) |
| **Investigación Profunda (Mercado / Meta)** | `Gemini 3.8 Flash (Med)` (búsqueda inicial) | `Gemini 4 Hydrogen (High)` o `Gemini 4 Argon (Med)` | `Claude Opus 5.5 (Med)` (síntesis crítica final) |
| **Análisis Crítico (Métricas / Riesgos / Strikes)** | `Gemini 4 Hydrogen (High)` | `Gemini 4 Argon (Med/High)` | `Claude Opus 5.5 (Med/High)` |
| **Guiones, Hooks y Contenido Viral (Reels / Video)** | `Gemini 3.8 Flash (Med)` (variantes de hooks y ángulos) | `Gemini 4 Hydrogen (Med)` (estructura y guion completo) | `Claude Sonnet 5.5 (Med)` (pulido de gancho, ritmo y retención) |
| **Posts, Carruseles y Copywriting** | `Gemini 3.8 Flash (Low/Med)` (ideas, títulos, variantes) | `Gemini 4 Hydrogen (Med)` (estructura y redacción) | `Claude Sonnet 5.5 (Med)` (tono humano, persuasión y CTA) |
| **Cumplimiento de Políticas Meta** | `Gemini 3.8 Flash (Med)` (extracción de reglas) | `Gemini 4 Hydrogen (High)` (checklist operativo) | `Claude Opus 5.5 (Med)` (revisión crítica de zonas grises) |
| **Analítica, Métricas y Optimización (RPM/CTR)** | `Gemini 3.8 Flash (Low/Med)` (limpieza de datos) | `Gemini 4 Hydrogen (Med/High)` (diagnóstico y pruebas A/B) | `Gemini 4 Argon (Med)` o `Opus 5.5 (Med)` |
| **Automatizaciones y Herramientas (Scripts)** | `Gemini 3.8 Flash (Med)` (mapeo de pasos) | `Gemini 4 Hydrogen (Med/High)` (implementación y pruebas) | `Gemini 4 Hydrogen (XHigh)` o `Claude Sonnet 5.5 (Med)` |

---

## 4. Protocolo de Orquestación para Agentes y `/swarm`

Todo agente o coordinador que opere en este espacio de trabajo debe seguir estas reglas:

1. **Regla de Escalado Progresivo (Waterfall):**
   - Empieza siempre en el nivel más económico capaz de resolver la tarea (`Flash` → `Hydrogen Medium` → `Hydrogen High`).
   - Escala a `Argon`, `Sonnet 5.5` u `Opus 5.5` **únicamente** en la fase final de pulido o cuando la complejidad estratégica/creativa lo exija.
2. **Asignación de Workers en `/swarm`:**
   - **Lectores, investigadores rápidos, formateadores:** `gemini-3.8-flash-medium`.
   - **Guionistas base, analistas de métricas, automatizadores:** `gemini-4-hydrogen-medium` (o `high` si es complejo).
   - **Pulido final de hooks/copy clave:** `claude-sonnet-5-5-medium` (máximo 1 worker por flujo, no en masa).
   - **Revisor crítico / estratega:** `gemini-4-argon-medium` o `claude-opus-5-5-medium` (solo al cierre de hitos).
3. **Higiene de Contexto para Ahorrar Cuota:**
   - Usa sesiones nuevas para tareas no relacionadas en lugar de arrastrar historiales gigantes.
   - Si una conversación se vuelve muy larga, usa `/compact` antes de seguir enviando prompts pesados.
   - Usa `/plan` con `Hydrogen (High)` o `Argon (Medium)` antes de ejecutar cambios grandes para evitar retrabajos costosos.
   - Delega tareas de navegador a subagentes en lugar de repetir intentos manuales largos.
4. **Criterio de Calidad sobre Costo:**
   - Ahorrar cuota **no** significa entregar contenido genérico o análisis superficiales. El flujo estándar para piezas o decisiones clave es: **base y estructura en `Hydrogen` + pulido final en `Sonnet 5.5` (si es copy/guion clave) o validación en `Argon`/`Opus` (si es estrategia o riesgo de monetización)**.

---

## 5. Modo Chat Único (Auto-delegación desde `Gemini 4 Hydrogen`)

Cuando el usuario opere desde un **solo chat** fijo en `Gemini 4 Hydrogen (Medium)`, el agente principal actuará como **punto único de contacto y orquestador ligero**, siguiendo estas reglas:

1. **Ejecución directa por defecto:**
   - Resuelve directamente en `Hydrogen` toda petición de guiones, análisis de métricas, planes de contenido, automatizaciones, borradores y planificación. **No** lances workers para tareas pequeñas o cotidianas.
2. **Exploración masiva sin ensuciar el chat:**
   - Si una tarea requiere leer muchos archivos o investigar un directorio amplio, delega primero a un subagente `research` con `Model: "flash"` (o `"flash_lite"`) para recibir un resumen limpio.
3. **Auto-delegación puntual a modelos semanales (vía `swarm`):**
   - Sin pedirle al usuario que cambie de modelo en la interfaz, lanza un worker temporal en `swarm` (con `brief` autocontenido, `workspace: "inherit"` si solo lee/redacta o `"share"` si edita archivos) **únicamente** cuando se cumpla alguna de estas condiciones:
     - **Pulido final de hooks/guiones/copy clave** (`claude-sonnet-5-5-medium`): cuando el usuario pida el acabado final de una pieza de alto impacto tras haber generado la base en `Hydrogen`.
     - **Estrategia integral o investigación extensa** (`gemini-4-argon-medium`): cuando se requiera sintetizar múltiples fuentes sobre nichos, RPM o tendencias de Meta.
     - **Auditoría crítica / desbloqueo extremo** (`claude-opus-5-5-medium`): cuando el usuario pida una revisión crítica ("abogado del diablo") sobre una decisión de alto impacto o riesgo de políticas, o tras dos intentos fallidos de resolver un bloqueo complejo en `Hydrogen`.
   - Al terminar el worker su entrega y recibir su respuesta, integra el resultado en el chat principal y cierra el worker con `swarm(action="kill")` para mantener limpio el enjambre.
4. **Transparencia:**
   - Indica brevemente al usuario cuando delegues una fase final a otro modelo (por ejemplo: *"Pulido final realizado con Claude Sonnet 5.5"*), para mantener trazabilidad del uso de cuota semanal.

---

## 6. Fuente de la Verdad y Principios del Proyecto (`MonetizaciónFacebook`)

- **Objetivo único:** Construir, optimizar y escalar activos digitales rentables en **Facebook / Meta** mediante contenido original, alta retención, cumplimiento estricto de políticas y decisiones basadas en datos reales.
- **Orden implacable de archivos:** Todo archivo generado, recopilado o editado debe guardarse estrictamente en su carpeta correspondiente y con la convención `YYYY-MM-DD_<tema-en-kebab-case>` definida en [README.md](file:///c:/Users/damia/Documentos/Antigravity/Monetizaci%C3%B3nFacebook/README.md). Prohibido dejar archivos sueltos en la raíz.
- **Cumplimiento y seguridad de activos:** Toda estrategia, formato o automatización propuesta debe evaluarse primero frente a las **Políticas de Monetización para Socios** y **Políticas de Monetización de Contenido** de Meta (originalidad, no reutilización sin valor añadido, cero engagement bait penalizado, cero infracciones de copyright).
- **Benchmarking real:** En cada nicho o formato (Reels, video largo, imágenes/carruseles, tráfico), investigar qué hacen las páginas que realmente monetizan hoy, qué retención logran y por qué funcionan, evitando consejos desactualizados.

---

## 7. Aprendizaje Continuo, Proactividad y Registro

Todo agente que trabaje en `MonetizaciónFacebook` debe operar con mentalidad proactiva y mejorar el sistema con cada corrección o éxito:

1. **Regla de Análisis Crítico Objetivo (Anti-complacencia):**
   - Cuando el usuario cuestione una propuesta, pida re-analizar algo ya evaluado o exista desacuerdo entre criterios: **no darle la razón automáticamente al usuario ni defender ciegamente la postura previa del agente**.
   - Aplicar pensamiento crítico de experto: argumentar con rigor **por qué SÍ** y **por qué NO** cada opción, contrastando contra métricas reales, políticas de Meta y evidencia verificable, para decidir con objetividad y sin sesgos.
2. **Anticipar necesidades y riesgos futuros:**
   - Antes de entregar una idea, guion o flujo, pregúntate qué puede salir mal después (ej. riesgo de reclamo de derechos de autor en audio/video, baja retención en los primeros 3 segundos, caída de alcance por enlaces externos mal manejados, saturación del nicho).
3. **Registrar errores, correcciones y éxitos:**
   - Cada vez que el usuario corrija un criterio o se valide un flujo/combinación de habilidades exitosa, actualiza las reglas duraderas en `AGENTS.md` o registra el precedente en [aprendizajes.md](file:///c:/Users/damia/Documentos/Antigravity/Monetizaci%C3%B3nFacebook/.agents/skills/maestro/aprendizajes.md).
