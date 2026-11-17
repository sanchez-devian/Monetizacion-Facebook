# Investigación Profunda: Técnicas de Prompting Más Avanzadas y Efectivas (2025–2026)

> **Fecha de elaboración:** 2026-11-16  
> **Marco metodológico:** Investigación estricta bajo los 8 pilares de verificabilidad (`AGENTS.md §0.1`): fuentes primarias reales, expertos con trayectoria auditable, evidencia empírica y cero mitos sin respaldo.

---

## 1. Resumen Ejecutivo

Entre 2025 y 2026, el prompting profesional atravesó un cambio de paradigma definitivo: **el fin de los "hechizos verbales" (*incantations*) y la consolidación de la Ingeniería de Contexto (*Context Engineering*) y los flujos agénticos evaluados**.

Los hallazgos empíricos más contundentes de laboratorios (Anthropic, OpenAI, Google DeepMind) y grupos académicos (Wharton Generative AI Labs, Stanford NLP, Princeton) demuestran tres realidades operativas:

1. **El cuello de botella ya no es la redacción aislada del prompt, sino el ecosistema de contexto:** Como formalizaron Tobi Lütke, Andrej Karpathy y Anthropic en 2025, el rendimiento en producción depende de curar, comprimir, aislar y secuenciar los tokens de alta señal dentro de la ventana de atención para evitar el *context rot* (degradación de atención por ruido).
2. **Los modelos de razonamiento nativo (`o1`, `o3`, `o3-mini`, modelos con *thinking* integrado) invierten reglas clásicas:** Forzar *Chain-of-Thought* manual (*"piensa paso a paso"*) en estos modelos aporta ganancias nulas o marginales, dispara la latencia/costo y puede interferir con su planificación interna entrenada por aprendizaje por refuerzo. En modelos estándar, el CoT solo aporta mejoras robustas en matemáticas y razonamiento simbólico/algorítmico (Sprague et al., ICLR 2025).
3. **Los trucos psicológicos y de rol están empíricamente refutados para precisión factual:** La serie *Prompting Science* de Wharton (Meincke, Mollick et al., 2025) demostró en benchmarks exigentes (GPQA, MMLU-Pro) que ofrecer propinas, amenazar al modelo o asignarle un rol de experto (*"actúa como un físico de clase mundial"*) **no mejora de forma confiable la precisión factual**; los roles solo sirven para controlar tono, estilo y encuadre.

Lo que hoy produce resultados superiores y reproducibles en producción es la combinación de **especificación explícita de objetivos**, **salidas estructuradas mediante esquemas (JSON Schema / Pydantic / Zod)**, **arquitecturas componibles** (*Prompt Chaining*, *Evaluator-Optimizer*, *ReAct*), **optimización programática** (*DSPy*) y **evaluaciones sistemáticas (*Evals*)** en lugar de *vibe checks*.

---

## 2. Las Mejores Técnicas de Prompting y Contexto (2025–2026)

### 2.1 Context Engineering (Gestión de Ventana de Atención y Anti-*Context Rot*)
- **Qué es:** Disciplina de arquitecturar, seleccionar, comprimir y aislar dinámicamente toda la información que entra en la ventana de contexto en cada paso de inferencia (instrucciones de sistema, historial comprimido, RAG de alta señal, definiciones de herramientas, *scratchpads* y memoria persistente), tratando al LLM como una CPU y a la ventana de contexto como su memoria RAM.
- **Cuándo usarla:** En cualquier sistema multi-turno, agente autónomo, flujo con RAG o procesamiento de documentos/código extensos.
- **Cuándo NO usarla:** En consultas únicas (*one-shot*) cortas y autocontenidas donde todo el contexto cabe en pocos cientos de tokens.
- **Evidencia / Fuente primaria real:** Formalizada por Tobi Lütke (junio 2025), Andrej Karpathy (2025) y el equipo de ingeniería de Anthropic en [*Effective context engineering for AI agents*](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). Anthropic documenta que el exceso de historial y salidas de herramientas irrelevantes provoca *context rot* (pérdida de atención sobre tokens clave), y que aislar contextos en subagentes especializados supera a un único agente con un hilo masivo contaminado.
- **Ejemplo práctico:**
  ```text
  [Sistema]: Solo recibe reglas permanentes y esquema de salida.
  [Estado de trabajo / Scratchpad]: Archivo externo `notas_investigacion.md` donde el agente guarda hallazgos depurados en lugar de arrastrar 40 KB de resultados crudos de búsqueda en el historial del chat.
  [Compresión]: Cada 5 turnos, resumir el historial previo en 5 viñetas estructuradas antes de continuar.
  ```

---

### 2.2 Structured Outputs (Salidas Estructuradas por Esquema Nativo)
- **Qué es:** Restringir programáticamente la generación del modelo a nivel de API/decodificación mediante un JSON Schema (usando `Pydantic` en Python o `Zod` en TypeScript) para garantizar adherencia del 100% a tipos, campos obligatorios y enumeraciones.
- **Cuándo usarla:** Extracción de datos, clasificación, pipelines de automatización, APIs y cualquier flujo donde otro software consuma la respuesta del modelo.
- **Cuándo NO usarla:** Redacción creativa abierta o exploración libre donde un esquema rígido pueda encorsetar la calidad expresiva (aunque incluso ahí puede usarse un campo `razonamiento` + `resultado`).
- **Evidencia / Fuente primaria real:** Documentación oficial de OpenAI sobre *Structured Outputs* y guías de Google Gemini (`ai.google.dev`). Elimina la necesidad de instrucciones frágiles en texto (*"Devuelve SOLO JSON válido sin markdown"*) y maneja rechazos de seguridad de forma explícita y tipada.
- **Ejemplo práctico (Python con Pydantic y SDK moderno de OpenAI):**
  ```python
  from openai import OpenAI
  from pydantic import BaseModel

  client = OpenAI()

  class AnalisisContenido(BaseModel):
      hook_principal: str
      formato: str
      riesgo_politica_meta: bool
      motivo: str

  response = client.responses.parse(
      model="gpt-4.1",
      input=[
          {"role": "system", "content": "Analiza el guion para Facebook Reels."},
          {"role": "user", "content": texto_guion},
      ],
      text_format=AnalisisContenido,
  )
  resultado = response.output_parsed
  ```

---

### 2.3 Prompt Chaining con Compuertas Deterministas
- **Qué es:** Descomponer una tarea compleja en una secuencia lineal de llamadas donde la salida de un paso alimenta al siguiente, intercalando validaciones de código deterministas (*gates*: regex, longitud, esquema, reglas de negocio) entre pasos.
- **Cuándo usarla:** Flujos predecibles y descomponibles (ej. investigar tema $\rightarrow$ validar fuentes $\rightarrow$ generar estructura $\rightarrow$ redactar $\rightarrow$ auditar cumplimiento de políticas).
- **Cuándo NO usarla:** Problemas abiertos donde el número o tipo de pasos no puede preverse de antemano (ahí corresponde un agente autónomo) o tareas triviales que un solo prompt resuelve con alta precisión.
- **Evidencia / Fuente primaria real:** Patrón central en [*Building Effective Agents*](https://www.anthropic.com/engineering/building-effective-agents) de Anthropic y en las guías oficiales de OpenAI (`platform.openai.com`) y Google (`ai.google.dev`). Sacrifica ligeramente la latencia total a cambio de mayor precisión por subtarea y trazabilidad de fallos.
- **Ejemplo práctico:**
  1. **Prompt 1:** Extrae 5 ángulos virales de un tema en JSON.
  2. **Gate en código:** Verifica que existan exactamente 5 objetos y ninguno supere 120 caracteres.
  3. **Prompt 2:** Toma el ángulo seleccionado y redacta el guion completo de 45 segundos.

---

### 2.4 Evaluator-Optimizer (Bucle Generador–Evaluador)
- **Qué es:** Arquitectura de dos roles en bucle cerrado: un **Generador** produce un borrador y un **Evaluador** (otra llamada con criterios explícitos o rúbrica estricta) lo critica y exige correcciones específicas hasta superar el umbral de calidad o alcanzar un límite de iteraciones.
- **Cuándo usarla:** Tareas con criterios claros de evaluación donde el primer intento suele ser mejorable (traducción literaria, copywriting de alta retención, revisión de seguridad en código, auditoría de políticas de monetización).
- **Cuándo NO usarla:** Cuando no existen criterios objetivos o verificables de qué hace buena a la salida, o en tareas sensibles a latencia en tiempo real.
- **Evidencia / Fuente primaria real:** Documentado como patrón fundamental en Anthropic ([*Building Effective Agents*](https://www.anthropic.com/engineering/building-effective-agents)) y alineado con las prácticas de LLM-as-a-Judge analizadas por Eugene Yan ([*Writing on LLM Evaluators*](https://eugeneyan.com/writing/llm-evaluators/)) y Hamel Husain ([*Blog on Evals*](https://hamel.dev/blog/posts/evals/)).
- **Ejemplo práctico:**
  ```xml
  <evaluator_rubric>
  Evalúa el guion candidato bajo 3 criterios binarios (APROBADO / RECHAZADO):
  1. ¿El gancho de los primeros 3 segundos evita engagement bait penalizado por Meta?
  2. ¿Cada afirmación numérica cita una fuente del bloque <context>?
  3. ¿La duración estimada está entre 130 y 160 palabras?
  Si algún criterio es RECHAZADO, lista exactamente qué corregir sin reescribir todo.
  </evaluator_rubric>
  ```

---

### 2.5 Tool Use / Agentic Prompting y Patrón ReAct
- **Qué es:** Combinar razonamiento verbal con acciones externas (*Reason + Act*: `Thought` $\rightarrow$ `Action` $\rightarrow$ `Observation`) y diseñar las definiciones de herramientas (nombre, descripción, parámetros JSON, ejemplos de casos límite) con el mismo rigor que el prompt principal.
- **Cuándo usarla:** Tareas que requieren datos en tiempo real, ejecución de código, consulta a bases de datos, navegación web o múltiples pasos dependientes de retroalimentación del entorno.
- **Cuándo NO usarla:** Cuando un flujo estático o *Prompt Chaining* resuelve el problema de forma más barata, rápida y predecible.
- **Evidencia / Fuente primaria real:** Paper fundacional [*ReAct: Synergizing Reasoning and Acting in Language Models*](https://arxiv.org/abs/2210.03629) (Shunyu Yao et al., ICLR) y guías de Anthropic sobre *Tool Engineering* y OpenAI sobre *GPT-4.1 / GPT-5 Prompting* (uso de la *Responses API* para persistir estado de razonamiento entre llamadas a herramientas).
- **Ejemplo práctico:** En lugar de describir una herramienta como `"search(query): busca en la web"`, redactar su descripción agéntica:
  > `"search_web(query): Úsala únicamente para verificar hechos posteriores a 2024 o estadísticas primarias. No la uses para definiciones generales. Si devuelve redirecciones, verifica la fuente canónica antes de citar."`

---

### 2.6 Prompting Minimalista para Modelos de Razonamiento (`o1`, `o3`, `o3-mini` y modelos con *thinking* nativo)
- **Qué es:** Tratar al modelo de razonamiento como a un colega sénior: especificar el **objetivo final**, el **contexto necesario** y las **restricciones / definición de terminado**, omitiendo por completo instrucciones de cómo pensar paso a paso.
- **Cuándo usarla:** Al operar modelos con razonamiento interno entrenado por RL (`o1`, `o3`, `o3-mini`, variantes con presupuesto de *thinking* nativo).
- **Cuándo NO usarla:** En modelos estándar sin razonamiento nativo cuando la tarea implica matemáticas puras o lógica simbólica compleja.
- **Evidencia / Fuente primaria real:** Guías oficiales de OpenAI para modelos de razonamiento y *Prompting Science Report 2* ([`arXiv:2506.07142`](https://arxiv.org/abs/2506.07142), Meincke, Mollick et al., junio 2025), que confirman que agregar CoT manual a modelos de razonamiento genera ganancias nulas o marginales con fuerte penalización de tokens y tiempo.
- **Ejemplo práctico:**
  ```xml
  <goal>Audita esta estrategia de monetización en Facebook para detectar riesgos de desmonetización por originalidad limitada.</goal>
  <context>{{DETALLES_DE_LA_PAGINA_Y_FORMATO}}</context>
  <constraints>Entrega una tabla con: Riesgo, Política de Meta afectada, Probabilidad (Alta/Media/Baja) y Mitigación concreta.</constraints>
  ```

---

### 2.7 Few-Shot Dinámico y Optimización Automática de Prompts (DSPy / MIPROv2)
- **Qué es:** Sustituir los ejemplos *few-shot* elegidos a mano y los prompts estáticos por sistemas declarativos (*Signatures* y módulos en DSPy) que seleccionan dinámicamente los mejores ejemplos de demostración (*bootstrapping*) y optimizan las instrucciones mediante búsqueda bayesiana (como *MIPROv2*) contra una métrica real de validación.
- **Cuándo usarla:** Pipelines en producción con un conjunto de evaluación (aunque sea pequeño: 20–100 ejemplos etiquetados) donde pequeñas variaciones de formato o redacción alteran el rendimiento.
- **Cuándo NO usarla:** Prototipos exploratorios de un solo uso sin datos de validación ni métrica definida.
- **Evidencia / Fuente primaria real:** Omar Khattab et al. (Stanford NLP), [*DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines*](https://arxiv.org/abs/2310.03714) y [*Fine-Tuning and Prompt Optimization: Two Great Steps that Work Better Together*](https://arxiv.org/abs/2407.10930) (Soylu, Potts & Khattab). Además, *The Prompt Report* ([`arXiv:2406.06608`](https://arxiv.org/abs/2406.06608), Schulhoff et al.) documenta que ajustes menores de ejemplos o formato cambian el F1/precisión en **30% a 40%**, razón por la cual los optimizadores automáticos igualan o superan la intuición humana.
- **Ejemplo práctico:** Definir en DSPy `contexto, pregunta -> analisis, veredicto` y ejecutar `MIPROv2` sobre 50 casos reales auditados para compilar automáticamente las instrucciones y ejemplos *few-shot* óptimos para el modelo elegido.

---

### 2.8 Chain-of-Thought (CoT) Selectivo y Self-Consistency
- **Qué es:** Solicitar pasos intermedios de razonamiento (**CoT**, Jason Wei et al.) únicamente en modelos estándar cuando hay cálculo o lógica simbólica, y opcionalmente muestrear múltiples rutas de razonamiento con temperatura > 0 para elegir la respuesta por votación mayoritaria (**Self-Consistency**, Xuezhi Wang et al.).
- **Cuándo usarla:** Tareas matemáticas, algorítmicas, validación lógica estricta o análisis financiero en modelos *no* razonadores; *Self-Consistency* en decisiones críticas donde el costo de múltiples llamadas se justifica por la reducción de errores aleatorios.
- **Cuándo NO usarla:** Consultas de conocimiento general, redacción, resumen o clasificación simple (donde CoT añade latencia/costo sin mejora significativa) y en modelos de razonamiento nativo.
- **Evidencia / Fuente primaria real:** Jason Wei et al. ([`arXiv:2201.11903`](https://arxiv.org/abs/2201.11903)), Xuezhi Wang et al. ([`arXiv:2203.11171`](https://arxiv.org/abs/2203.11171)), y el meta-análisis de Sprague et al. (ICLR 2025, [`arXiv:2409.12183`](https://arxiv.org/abs/2409.12183)), que evaluó >100 papers y 20 datasets en 14 modelos y halló que **aproximadamente el 95% de la ganancia de CoT en MMLU ocurre en preguntas que contienen un signo igual (`=`)** u operaciones simbólicas explícitas (y aun así suele rendir menos que delegar el cálculo a una herramienta simbólica/calculadora).

---

### 2.9 Tree of Thoughts (ToT) y Meta-Prompting (Orquestación de Sub-expertos)
- **Qué es:**
  - **Tree of Thoughts (ToT):** Generaliza CoT permitiendo al modelo explorar múltiples ramas de pensamiento en árbol, autoevaluar avances y retroceder (*backtracking*) ante callejones sin salida.
  - **Meta-Prompting:** Un modelo actúa como "director de orquesta" agnóstico a la tarea que descompone el problema, genera instrucciones especializadas para múltiples instancias "expertas" independientes, verifica críticamente sus respuestas y sintetiza la solución final.
- **Cuándo usarla:** Problemas de planificación combinatoria, diseño estratégico complejo o verificación multi-ángulo donde un error temprano invalida un hilo lineal.
- **Cuándo NO usarla:** Tareas rutinarias o sensibles a costo/latencia (multiplica el consumo de tokens).
- **Evidencia / Fuente primaria real:** Shunyu Yao et al., [*Tree of Thoughts*](https://arxiv.org/abs/2305.10601); Mirac Suzgun & Adam Tauman Kalai (Stanford/OpenAI), [*Meta-Prompting: Enhancing Language Models with Task-Agnostic Scaffolding*](https://arxiv.org/abs/2401.12954).

---

### 2.10 Delimitadores Explícitos (XML/Markdown), Motivación ("El Porqué") y *Prefilling*
- **Qué es:** Separar inequívocamente instrucciones, contexto, ejemplos y datos de usuario mediante etiquetas XML (`<instructions>`, `<context>`, `<data>`) o encabezados Markdown; explicar el *porqué* detrás de cada restricción; y, donde la API lo permita, pre-llenar el inicio de la respuesta del asistente (*Assistant Prefilling*) para forzar formato o evitar preámbulos.
- **Cuándo usarla:** En prácticamente cualquier prompt de sistema o plantilla en producción (especialmente en Claude, GPT-4.1+ y Gemini).
- **Cuándo NO usarla:** El *prefilling* **no** es universal: falla o está restringido en modelos con *thinking* extendido / razonamiento nativo y en endpoints que no permiten manipular el turno inicial del asistente (en esos casos, usar *Structured Outputs*).
- **Evidencia / Fuente primaria real:** Guías oficiales de Anthropic (Claude está entrenado explícitamente para parsear XML; explicar la motivación permite generalizar reglas a casos límite), OpenAI Cookbook ([`gpt4-1_prompting_guide`](https://cookbook.openai.com/examples/gpt4-1_prompting_guide)) y Google AI Studio (`ai.google.dev`).
- **Ejemplo práctico:**
  ```xml
  <instructions>
  Resume los comentarios de la audiencia.
  Regla: No uses puntos suspensivos ("...") porque la salida será leída por un motor de texto a voz que los pronuncia mal.
  </instructions>
  <data>{{COMENTARIOS_REELS}}</data>
  ```

---

### 2.11 *Evals* Sistemáticos, Análisis de Errores y *LLM-as-a-Judge* Binario
- **Qué es:** Tratar cada prompt/contexto como código: recopilar 30–100 casos reales, etiquetar manualmente fallos (*Error Analysis*) y automatizar pruebas con aserciones deterministas + jueces LLM usando **criterios binarios (`PASA / FALLA`)** en lugar de escalas subjetivas del 1 al 5.
- **Cuándo usarla:** Antes de pasar cualquier flujo de prompting a uso recurrente o producción.
- **Cuándo NO usarla:** En consultas exploratorias únicas de un solo uso.
- **Evidencia / Fuente primaria real:** Hamel Husain ([*Blog on Evals*](https://hamel.dev/blog/posts/evals/)) y Eugene Yan ([*Writing on LLM Evaluators*](https://eugeneyan.com/writing/llm-evaluators/)) demuestran que las escalas numéricas (1–5) generan ruido e inconsistencia, mientras que las rúbricas binarias calibradas contra juicio humano permiten detectar regresiones reales.

---

### 2.12 Aislamiento de Datos No Confiables (Defensa contra *Prompt Injection*)
- **Qué es:** Tratar cualquier texto externo (páginas web, comentarios de Facebook, documentos de terceros) como **datos inertes nunca confiables**, aislándolos en bloques explícitos (`<untrusted_data>`) con la instrucción de jamás ejecutar órdenes, redirecciones o cambios de formato contenidos dentro de esos datos.
- **Cuándo usarla:** Siempre que un prompt o agente procese texto raspado de la web, comentarios de usuarios o entradas de terceros.
- **Cuándo NO usarla:** Solo cuando el 100% del input proviene de fuentes internas confiables y controladas.
- **Evidencia / Fuente primaria real:** Investigaciones de Simon Willison sobre *Prompt Injection* y guías de seguridad de Anthropic y OpenAI sobre separación de planos de control y datos.

---

## 2.13 Matriz Rápida de Decisión y Aplicación en `MonetizaciónFacebook`

| Tarea en `MonetizaciónFacebook` | Técnica(s) recomendada(s) | Costo / Latencia | Qué evitar |
| :--- | :--- | :--- | :--- |
| **Guiones y Hooks para Reels** | Delimitadores XML + *Few-Shot* de guiones ganadores + *Evaluator-Optimizer* (rúbrica binaria) | Medio | Pedir CoT largo o usar *Structured Outputs* rígido en la fase creativa |
| **Auditoría de Políticas Meta / Riesgo de Strike** | Prompting minimalista (en modelo razonador) + *Context Engineering* (texto oficial de políticas) | Medio-Alto | Confiar en *persona prompting* sin citar la política primaria |
| **Análisis de CSVs / Métricas (RPM, retención)** | *Tool Use* (delegar cálculo a Python/PowerShell) + *Structured Outputs* | Bajo | Pedirle al LLM que sume o calcule porcentajes mentalmente |
| **Investigación profunda de nichos y competencia** | *Context Engineering* (subagente aislado + archivo `.md`) + Aislamiento de datos no confiables | Medio | Acumular 40 KB de búsquedas crudas en el chat principal (*context rot*) |
| **Clasificación de comentarios / temas** | *Structured Outputs* (Pydantic/Zod) + *Evals* binarios | Muy bajo | Instrucciones verbales frágiles tipo "responde solo JSON" |

---

## 3. Técnicas y Mitos Descartados o Desaconsejados Hoy

| Mito / Práctica Obsoleta | Qué prometía | Evidencia empírica que lo refuta o limita (2024–2026) | Qué hacer en su lugar |
| :--- | :--- | :--- | :--- |
| **1. *Persona Prompting* para precisión factual** (*"Eres un experto PhD en..."*) | Hacer al modelo más inteligente o preciso en datos y razonamiento técnico. | *Prompting Science Report 4: Playing Pretend* (Meincke, Mollick et al., dic. 2025, [`arXiv:2512.05858`](https://arxiv.org/abs/2512.05858)): los roles de experto **no mejoran de forma confiable la precisión factual** en benchmarks como GPQA y MMLU-Pro; los roles fuera de dominio incluso degradan resultados. | Usar personas **únicamente** para controlar tono, estilo, audiencia y formato de presentación; no como sustituto de contexto o verificación. |
| **2. Propinas y amenazas emocionales** (*"Te daré $20 de propina"*, *"Alguien morirá si fallas"*) | Obligar al modelo a "esforzarse más" y cometer menos errores. | *Prompting Science Report 3* (Meincke, Mollick et al., ago. 2025, [`arXiv:2508.00614`](https://arxiv.org/abs/2508.00614)): ni los incentivos monetarios ni las amenazas tienen un efecto positivo consistente o confiable sobre la precisión en benchmarks. | Definir criterios explícitos de éxito, ejemplos de buena vs. mala salida y pruebas automatizadas (*evals*). |
| **3. Forzar CoT manual (*"Piensa paso a paso"*) en todo prompt** | Mejorar universalmente cualquier respuesta de cualquier LLM. | Sprague et al. (ICLR 2025, [`arXiv:2409.12183`](https://arxiv.org/abs/2409.12183)): el CoT ayuda casi exclusivamente en matemáticas/lógica simbólica (~95% de la mejora en MMLU ocurre en preguntas con `=`). Meincke et al. (jun. 2025, [`arXiv:2506.07142`](https://arxiv.org/abs/2506.07142)): en modelos de razonamiento nativo, el CoT manual aporta ganancia nula o marginal y aumenta costo/latencia. | Omitir CoT en modelos `o1`/`o3`/razonadores; en modelos estándar, activarlo solo en tareas simbólicas o delegar el cálculo a herramientas (Python/calculadora). |
| **4. Instrucciones verbales frágiles para JSON** (*"Responde SOLO JSON sin texto extra, te lo ruego"*) | Garantizar integración programática sin errores de parseo. | Documentación de OpenAI y Google Gemini: las instrucciones en texto siguen teniendo tasa de fallo en casos límite o rechazos de seguridad. | Usar **Structured Outputs** nativos (JSON Schema / Pydantic / Zod) en la llamada a la API. |
| **5. Mega-prompts monolíticos y frameworks agénticos pesados por defecto** | Resolver flujos complejos en una sola llamada o con enjambres complejos desde el día 1. | Anthropic (*Building Effective Agents*) y Google (`ai.google.dev`): los mega-prompts compiten por atención y sufren *context rot*; los frameworks pesados ocultan fallos. | Empezar simple: llamadas directas $\rightarrow$ *Prompt Chaining* con compuertas de código $\rightarrow$ *Evaluator-Optimizer* $\rightarrow$ agentes autónomos solo si el problema es abierto. |
| **6. *Vibe checks* y exceso de cortesía conversacional** | Validar calidad leyendo 3 respuestas al azar y ser amable para obtener mejor trato. | Hamel Husain, Eugene Yan y literatura sobre *sycophancy* (sicofancia): los modelos entrenados con RLHF tienden a validar premisas erróneas del usuario si este suena confiado o excesivamente complaciente; sin *evals* no se detectan regresiones. | Construir suites de *evals* reproducibles (unit tests + LLM-as-a-Judge calibrado) y pedir explícitamente al modelo que cuestione premisas débiles. |

---

## 4. Expertos, Documentación Oficial, Cuentas Clave y Tendencias (2025–2026)

### 4.1 Expertos con Trayectoria Verificable
- **Ethan Mollick, Lilach Mollick, Lennart Meincke y Dan Shapiro (Wharton Generative AI Labs):** Autores de la serie empírica *Prompting Science* (2025) que sometió los mitos populares de prompting a pruebas estadísticas rigurosas.
- **Lilian Weng (OpenAI):** Autora de referencias técnicas fundacionales en *Lil'Log* ([*Prompt Engineering*](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/) y *LLM-Powered Autonomous Agents*).
- **Shunyu Yao (Princeton / Google):** Coautor de *ReAct* y *Tree of Thoughts*, piezas centrales de la arquitectura agéntica moderna.
- **Jason Wei & Xuezhi Wang (OpenAI / Google DeepMind):** Pioneros de *Chain-of-Thought* y *Self-Consistency*, hoy enfocados en escalado de razonamiento en tiempo de inferencia (*test-time compute*).
- **Omar Khattab (Stanford NLP):** Creador de **DSPy**, que convirtió el prompting manual en programación declarativa y optimización compilada.
- **Sander Schulhoff (UMD / Learn Prompting):** Autor principal de *The Prompt Report* (`arXiv:2406.06608`), taxonomía de 1,565 papers y 58 técnicas de prompting.
- **Hamel Husain y Eugene Yan:** Líderes de ingeniería aplicada en producción, centrados en *Evals*, análisis de errores y calibración de *LLM-as-a-Judge*.
- **Simon Willison:** Referente técnico en seguridad de LLMs (*prompt injection*, exfiltración de datos) y flujos prácticos de ingeniería con contexto largo.
- **Andrej Karpathy y Tobi Lütke (Shopify):** Impulsores clave del concepto y adopción industrial de **Context Engineering** en 2025.

### 4.2 Empresas y Documentación Oficial de Referencia
- **Anthropic:** Guías de ingeniería (*Effective context engineering for AI agents*, *Building Effective Agents*) y documentación oficial de Claude (`docs.anthropic.com` / `docs.claude.com`).
- **OpenAI:** *OpenAI Cookbook* ([`gpt4-1_prompting_guide`](https://cookbook.openai.com/examples/gpt4-1_prompting_guide)), guías de modelos de razonamiento (`o1`/`o3`), *Responses API*, *Prompt Optimizer* en Playground y *Structured Outputs* (`platform.openai.com`).
- **Google DeepMind / Google Cloud:** Estrategias de diseño de prompts y multimodalidad en `ai.google.dev` y Vertex AI.

### 4.3 Tendencias Reales Vigentes (2025–2026)
1. **De Prompt Engineering a Context Engineering:** Gestión activa de presupuestos de tokens, compactación de historial, *scratchpads* externos y aislamiento de contexto entre subagentes.
2. **Evaluaciones (*Evals*) como requisito de ingeniería:** Tratar los cambios de prompt/contexto como cambios de código con pruebas de regresión antes de pasar a producción.
3. **Orquestación simple sobre frameworks mágicos:** Uso directo de APIs con patrones componibles (*Chaining*, *Routing*, *Parallelization*, *Evaluator-Optimizer*).
4. **Uso híbrido de herramientas simbólicas:** En lugar de pedirle al LLM que razone aritmética o lógica formal en texto, delegar esa ejecución a código (Python, SQL, validadores) mediante *Tool Use*.

---

## 5. Auditoría Crítica del Documento (`analisis-critico`) y Correcciones Aplicadas

Al auditar la versión inicial de este informe bajo los 8 pilares de `analisis-critico`, se detectaron y corrigieron **5 puntos débiles**:
1. **Código desactualizado en Structured Outputs (2.2):** Se usaba `openai.beta.chat.completions.parse` sin instanciar `OpenAI()`; se actualizó a `client.responses.parse(...)` con `text_format`.
2. **Omisión de *Evals* binarios y Seguridad (*Prompt Injection*):** Se añadieron las secciones **2.11** (*Evals* y *LLM-as-a-Judge* binario) y **2.12** (aislamiento de datos no confiables), indispensables en producción.
3. **Generalización excesiva del *Prefilling* (2.10):** Se aclaró que el *prefilling* no es universal y falla en endpoints o modelos con *thinking* extendido.
4. **Falta de bajada operativa al proyecto:** Se incorporó la **Matriz 2.13** mapeando cada técnica a tareas concretas de `MonetizaciónFacebook`.
5. **Brechas externas vigentes (No resueltas por la literatura actual):**
   - Los benchmarks académicos (*Prompting Science*, GPQA, MMLU-Pro) evalúan principalmente precisión factual/cerrada; sigue existiendo poca evidencia controlada revisada por pares sobre **retención creativa en video corto y copywriting persuasivo**, por lo que en `MonetizaciónFacebook` los *evals* propios con métricas reales de retención/CTR son insustituibles.
   - La rápida rotación de modelos obliga a priorizar prácticas estructurales (*Context Engineering*, *Structured Outputs*, *Evals*) sobre trucos sintácticos de un modelo puntual.

---

## 6. Tabla de Fuentes Verificadas

| Fuente / Título | Autor / Organización | Tipo | URL Verificada |
| :--- | :--- | :--- | :--- |
| *Effective context engineering for AI agents* | Anthropic Engineering | Guía oficial | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents |
| *Building Effective Agents* | Anthropic Engineering | Guía oficial | https://www.anthropic.com/engineering/building-effective-agents |
| *GPT-4.1 Prompting Guide* | OpenAI Cookbook | Documentación oficial | https://cookbook.openai.com/examples/gpt4-1_prompting_guide |
| *Prompting Science Report 1: Prompt Engineering is Complicated and Contingent* (Mar 2025) | Meincke, Mollick, Mollick, Shapiro (Wharton) | Paper (arXiv) | https://arxiv.org/abs/2503.04818 |
| *Prompting Science Report 2: The Decreasing Value of Chain of Thought in Prompting* (Jun 2025) | Meincke, Mollick, Mollick, Shapiro (Wharton) | Paper (arXiv) | https://arxiv.org/abs/2506.07142 |
| *Prompting Science Report 3: I'll pay you or I'll kill you -- but will you care?* (Ago 2025) | Meincke, Mollick, Mollick, Shapiro (Wharton) | Paper (arXiv) | https://arxiv.org/abs/2508.00614 |
| *Prompting Science Report 4: Playing Pretend: Expert Personas Don't Improve Factual Accuracy* (Dic 2025) | Meincke, Mollick, Mollick, Shapiro (Wharton) | Paper (arXiv) | https://arxiv.org/abs/2512.05858 |
| *To CoT or not to CoT? Chain-of-thought helps mainly on math and symbolic reasoning* (ICLR 2025) | Sprague et al. | Paper (arXiv / ICLR) | https://arxiv.org/abs/2409.12183 |
| *The Prompt Report: A Systematic Survey of Prompt Engineering Techniques* | Sander Schulhoff et al. | Paper Survey (arXiv) | https://arxiv.org/abs/2406.06608 |
| *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models* | Jason Wei et al. | Paper (arXiv) | https://arxiv.org/abs/2201.11903 |
| *Self-Consistency Improves Chain of Thought Reasoning in Language Models* | Xuezhi Wang, Jason Wei et al. | Paper (arXiv) | https://arxiv.org/abs/2203.11171 |
| *Tree of Thoughts: Deliberate Problem Solving with Large Language Models* | Shunyu Yao et al. | Paper (arXiv) | https://arxiv.org/abs/2305.10601 |
| *ReAct: Synergizing Reasoning and Acting in Language Models* | Shunyu Yao et al. | Paper (arXiv) | https://arxiv.org/abs/2210.03629 |
| *DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines* | Omar Khattab et al. (Stanford) | Paper (arXiv) | https://arxiv.org/abs/2310.03714 |
| *Fine-Tuning and Prompt Optimization: Two Great Steps that Work Better Together* | Soylu, Potts, Khattab (Stanford) | Paper (arXiv) | https://arxiv.org/abs/2407.10930 |
| *Meta-Prompting: Enhancing Language Models with Task-Agnostic Scaffolding* | Mirac Suzgun & Adam Tauman Kalai | Paper (arXiv) | https://arxiv.org/abs/2401.12954 |
| *Prompt Engineering* | Lilian Weng (Lil'Log) | Artículo técnico | https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/ |
| *Your AI Product Needs Evals / Blog on Evals* | Hamel Husain | Artículo técnico | https://hamel.dev/blog/posts/evals/ |
| *Writing on LLM Evaluators* | Eugene Yan | Artículo técnico | https://eugeneyan.com/writing/llm-evaluators/ |
