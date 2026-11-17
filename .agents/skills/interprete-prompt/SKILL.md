---
name: interprete-prompt
description: >-
  MANDATORY pre-processing skill executed on EVERY user message before acting or
  orchestrating. Translates natural, colloquial, emotional, or fragmented human input
  into a high-precision internal structured prompt using empirically validated 2025-2026
  prompting and context engineering techniques (XML delimiters, Context Engineering,
  minimalist goal/constraints specification, Evaluator-Optimizer binary rubrics,
  Prompt Chaining, and Tool Use delegation) while preserving 100% fidelity to the
  user's real intent and flagging risky premises.
---

# Intérprete y Arquitecto de Prompts (`interprete-prompt`)

> **Mandato:** Todo mensaje del usuario —por corto, coloquial, emocional o desordenado que sea— pasa **primero** por esta habilidad. Su objetivo es que el usuario pueda hablar **100% humano** y el agente entienda a la perfección **qué necesita, qué busca lograr, qué asume implícitamente y qué ve**, convirtiendo el mensaje en una especificación interna de altísima precisión **sin deformar jamás su objetivo original** ni caer en burocracia.

---

## 1. Fundamento Empírico (Basado en `2026-11-16_tecnicas-prompting-avanzadas.md`)

Aplica **únicamente** técnicas respaldadas por evidencia (2025–2026) y descarta mitos refutados:
- **SÍ aplica:** *Context Engineering* (curación de contexto de alta señal, cero *context rot*), delimitadores XML (`<goal>`, `<context>`, `<constraints>`, `<eval_rubric>`), especificación minimalista orientada a objetivo y definición de terminado, motivación (*"el porqué"* de las reglas), *Few-Shot* en tareas creativas/de estilo, *Prompt Chaining*, *Evaluator-Optimizer* con rúbrica binaria (`PASA / FALLA`), *Tool Use* para cálculos/verificación y aislamiento de datos no confiables (`<untrusted_data>`).
- **NO aplica (prohibido):** *Persona prompting* teatral para "hacer más inteligente al modelo" (*Prompting Science Report 4*), amenazas/propinas (*Report 3*), o forzar *Chain-of-Thought* verbal en tareas que no son matemáticas/simbólicas (*ICLR 2025* / *Report 2*).

---

## 2. Protocolo de 4 Pasos (En cada mensaje)

### Paso 1 — Decodificación Humana Profunda (Sin duplicar a `maestro`)
Extrae mentalmente del mensaje natural del usuario:
1. **Qué pide vs. Qué busca lograr realmente:** Traduce expresiones coloquiales o emociones a su objetivo real en `MonetizaciónFacebook` (ej. *"la página murió otra vez"* $\rightarrow$ diagnosticar causa raíz de caída de alcance/retención o posible restricción de Meta, no dar consuelo vacío).
2. **Resolución de referencias implícitas:** Identifica a qué archivo, página, métrica o turno previo se refiere el usuario cuando dice *"eso"*, *"lo de ayer"*, *"el guion"*.
3. **Detección de premisas ocultas o riesgosas:** Si el usuario asume algo que choca con políticas de Meta o datos reales (ej. *"reutilicemos clips virales de TikTok con marca de agua para subir rápido"*), **preserva el objetivo** (crecer rápido en Reels), pero **marca el medio propuesto** para validarlo/corregirlo con `analisis-critico`.
4. **Nivel de certeza:** Separa lo **explícito** de lo **inferido**. Pregunta solo si una ambigüedad cambia drásticamente el resultado; si es menor, elige el estándar más seguro y decláralo brevemente.

### Paso 2 — Ensamblaje del Prompt Interno (Adaptado al Modelo y Escala)
Traduce el mensaje decodificado en esta estructura interna (en tu razonamiento, sin mostrar XML innecesario al usuario):

- **Nivel Trivial** (saludo, "corre el script", confirmación): Decodificación en 1 segundo; cero XML pesado.
- **Nivel Estándar / Profundo**:
  ```xml
  <goal>
  [Objetivo exacto y medible, preservando 100% el propósito real del usuario]
  </goal>

  <context>
  [Solo archivos, datos verificados y reglas de MonetizaciónFacebook relevantes — cero ruido]
  </context>

  <constraints>
  [Políticas de Meta, orden de archivos en README.md, tono/formato y el PORQUÉ de cada regla]
  </constraints>

  <execution_pattern>
  [Directo | Prompt Chaining | Evaluator-Optimizer | Tool Use / Subagente]
  [Adaptación al modelo: minimalista si es razonador/Argon/Opus; few-shot si es copy/Reels en Hydrogen/Sonnet]
  </execution_pattern>

  <eval_rubric>
  [1-3 criterios binarios PASA/FALLA para validar la respuesta antes de entregarla]
  </eval_rubric>
  ```

### Paso 3 — Ejemplos de Traducción (*Few-Shot* de Referencia)

**Ejemplo A (Mensaje coloquial y vago):**
- *Usuario:* `"Oye dame 3 ideas de reels que sí peguen para finanzas personales, pero que no parezcan de robot."`
- *Prompt interno resultante:*
  - `<goal>` Generar 3 conceptos de Facebook Reels sobre finanzas personales optimizados para retención (0–3s) y compartidos orgánicos, con voz humana natural. `</goal>`
  - `<constraints>` Cero *engagement bait* penalizado por Meta; cero muletillas robóticas de IA; cada idea debe incluir gancho visual/verbal de <3s, ángulo emocional/práctico y CTA natural porque el algoritmo premia retención y guardados/compartidos. `</constraints>`
  - `<eval_rubric>` 1. ¿Evita frases genéricas tipo "en el mundo actual"? PASA/FALLA. 2. ¿Cumple políticas de originalidad de Meta? PASA/FALLA. `</eval_rubric>`

**Ejemplo B (Mensaje emocional con premisa riesgosa):**
- *Usuario:* `"Me tienen harto los de Facebook, no sube nada, mejor voy a resuvir clips virales de podcasts famosos."`
- *Prompt interno resultante:*
  - `<goal>` Recuperar alcance y monetización en Facebook sin exponer la página a desmonetización. `</goal>`
  - `<constraints>` **Alerta de premisa:** Resubir clips de podcasts sin transformación sustancial viola las *Políticas de Monetización de Contenido (Originalidad Limitada)* de Meta. Activar `analisis-critico` para contrastar el riesgo real y proponer alternativas seguras de alto alcance. `</constraints>`

### Paso 4 — Compuerta Anti-Distorsión y Anti-Complacencia
Antes de pasar el control a `maestro`, verifica 3 criterios binarios:
1. *¿El `<goal>` mantiene intacto lo que el usuario busca lograr, sin agregar metas no pedidas?*
2. *¿Separé claramente mis sugerencias de lo que el usuario ordenó?*
3. *¿Evité convertir una premisa riesgosa o falsa del usuario en una orden ciega?*
