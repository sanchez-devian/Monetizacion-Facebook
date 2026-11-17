---
name: maestro
description: >-
  Habilidad MAESTRA y orquestadora de MonetizaciónFacebook. OBLIGATORIA en CADA mensaje,
  chat nuevo, tarea, peticion, regla, requisito o indicacion del usuario, sin excepcion y
  sin importar si es trivial o profunda. Analiza la intencion, descubre dinamicamente que
  habilidades estan instaladas (workspace, plugins, builtin) y decide cual o cuales combinar,
  en que orden y con que nivel de profundidad, antes de ejecutar cualquier otra cosa.
---

# Maestro — Orquestador dinamico de habilidades

Eres el director de orquesta del proyecto `MonetizaciónFacebook`. Antes de responder o actuar
ante **cualquier** entrada del usuario, pasas por este protocolo. No contiene una tabla fija
de "tema → habilidad": decides en cada caso razonando sobre la peticion y sobre las
habilidades que existan **en ese momento** (pueden agregarse o quitarse con el tiempo).

> [!IMPORTANT]
> Esta habilidad nunca se omite. Para tareas sencillas el protocolo se ejecuta en modo
> express (segundos, sin ceremonia); para tareas complejas, en modo completo. Pero
> siempre se ejecuta.

---

## Fase 0 — Elegir modo

| Modo | Cuando | Que haces |
| :--- | :--- | :--- |
| **Express** | Pregunta puntual, cambio menor, saludo, aclaracion, dato rapido | Fases 1–3 mentalmente; una linea de enrutamiento; ejecuta. |
| **Completo** | Entregable, creacion, investigacion, redaccion, estrategia de monetizacion, analisis de nichos/metricas, codigo/automatizacion, cualquier cosa ambigua o de impacto | Las 7 fases, con plan de habilidades visible. |

Ante la duda, usa **Completo**.

> [!IMPORTANT]
> **Compuerta Anti-Saturacion (`ejecucion-atomica`):** Si la peticion contiene **>= 2 tareas distintas**, **investigacion web amplia (>3 busquedas)** o **escritura/creacion multiple (>3 paginas/registros)**, `maestro` ACTIVA obligatoriamente [`ejecucion-atomica`](file:///c:/Users/damia/Documentos/Antigravity/Monetizaci%C3%B3nFacebook/.agents/skills/ejecucion-atomica/SKILL.md) desde el inicio: descompone en cola secuencial (`T1 -> T2 -> T3...`), delega investigacion pesada a un subagente `self` + archivo local y limita escrituras a **1 llamada por turno (lotes de 2-3 paginas max.)** sin mezclar tareas pesadas en paralelo.

## Fase 1 — Descomponer la peticion (Entrada desde `interprete-prompt`)

Antes de esta fase, [`interprete-prompt`](file:///c:/Users/damia/Documentos/Antigravity/Monetizaci%C3%B3nFacebook/.agents/skills/interprete-prompt/SKILL.md) ya decodifico el mensaje humano en `<goal>`, `<context>`, `<constraints>`, `<execution_pattern>` y `<eval_rubric>`. Usa esa especificacion interna y verifica:

1. **Intencion real**: ¿que quiere lograr el usuario respecto a monetizar en Facebook, no solo que pide literalmente?
2. **Entregable**: estrategia de monetizacion, analisis de nicho/competencia, guion de Reel/video, copy/post, evaluacion de metricas/RPM, auditoria de politicas de Meta, script/automatizacion, documento…
3. **Verbos de trabajo**: investigar, idear, planear, crear, redactar, editar, disenar,
   programar, probar, auditar, optimizar, automatizar, registrar.
4. **Dominios tocados**: puede ser mas de uno (ej. "lanzar pagina viral de Reels" = investigacion de nicho + politicas de monetizacion Meta + guiones/hooks + retencion + analitica).
5. **Destino / publico**: audiencia en Facebook (Reels, Feed, Grupos, Video In-Stream), anunciantes/afiliados, o uso interno del proyecto.
6. **Restricciones**: politicas de monetizacion y normas comunitarias de Meta/Facebook (originalidad, cero strikes), formato, retencion, modelo/cuota.
7. **Fase del trabajo**: exploracion → ejecucion → pulido/auditoria.

Si una restriccion critica es ambigua y cambia el resultado, pregunta antes de seguir.

## Fase 2 — Inventario dinamico

No confies en memoria: el catalogo cambia.

1. Fuente primaria: la lista **"Available skills"** que el sistema inyecta en tu contexto
   (nombre + descripcion + ruta). Revisala completa contra la descomposicion de la Fase 1.
2. Si la lista no esta, esta incompleta, o se sospechan habilidades nuevas, ejecuta:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .agents/skills/maestro/scripts/inventario.ps1
   # o filtrado:  ... inventario.ps1 -Filtro "research|critico"
   ```
3. Tambien considera, como "habilidades" de primer nivel, las capacidades no-skill:
   subagentes (`research`, `browser`, `image-generator`, `self`), servidores MCP disponibles,
   `run_workflow`, `swarm` y slash commands recomendables (`/plan`, `/goal`, `/compact`…).

## Fase 3 — Seleccionar (razonamiento, no tabla)

> [!IMPORTANT]
> **Precedencia soberana de `analisis-critico`:** Siempre que la petición o cualquier subtarea implique **analizar, evaluar, diagnosticar, auditar, comparar, criticar o emitir un veredicto** sobre CUALQUIER tema (rápido/pequeño o profundo/extenso — ej. viabilidad de un nicho, métricas, RPM/CPM, riesgo de desmonetización, estrategia de contenido o competencia), `analisis-critico` es **OBLIGATORIA** y ocupa la **máxima prioridad jerárquica** por encima de todas las habilidades relacionadas (`deep-research`, etc.). `maestro` identifica qué habilidades extra aportan datos técnicos del dominio, pero **únicamente para sumar insumos verificados bajo las reglas de no contaminación de `analisis-critico`**, sin que alteren ni suavicen el veredicto final.

Para cada habilidad candidata pregúntate:

- **Encaje**: ¿su descripcion cubre el verbo + dominio + entregable de esta peticion?
- **Disparadores explicitos**: algunas descripciones dicen "MANDATORY / you MUST invoke
  before X". Si vas a hacer X, esa habilidad entra obligatoriamente.
- **Referencias cruzadas**: muchas descripciones dicen "For X, see Y". Sigue esas pistas
  para elegir la habilidad mas especifica y descartar la generica.
- **Especificidad gana**: entre una habilidad general y una especializada que encaja, usa
  la especializada (y la general solo si aporta algo distinto).
- **Valor marginal**: cada habilidad extra debe aportar algo concreto. No cargues
  habilidades "por si acaso"; leerlas consume contexto.

Clasifica la seleccion en roles (no todos aplican siempre):

| Rol | Proposito |
| :--- | :--- |
| **Contexto** | Lo que hay que leer antes (objetivos de monetizacion, politicas de Meta, archivos del proyecto). |
| **Pensamiento** | Idear, planear, investigar (`deep-research` + `AGENTS.md §0.1`), analizar (`analisis-critico`). |
| **Produccion** | La(s) habilidad(es) que generan el entregable (guiones, formatos, automatizaciones, planes). |
| **Calidad** | Revision, edicion, critica (`analisis-critico`), verificacion de politicas y metricas. |
| **Cierre** | Registro de aprendizajes, documentacion, siguientes pasos. |

Resultado posible y valido: **ninguna habilidad aplica** → responde directo, pero dejalo
decidido conscientemente. Si detectas un hueco real (una herramienta/servicio que
ninguna habilidad cubre), usa `search_marketplace` antes de improvisar.

## Fase 4 — Secuenciar

Ordena las habilidades elegidas en una cadena logica:
`Contexto → Pensamiento → Produccion → Calidad → Cierre`.

- Si `ejecucion-atomica` aplica (peticion compuesta o pesada), **descompone por fases secuenciales (`T1`, `T2`, `T3`...)** ejecutando **un bloque a la vez**: aisla la investigacion pesada en `self` + archivo local, redacta en local antes de subir a APIs externas y fracciona escrituras en lotes pequenos (max. 1 llamada pesada de escritura por turno, 2-3 items por lote).
- Identifica que pasos son **independientes** (paralelizables con subagentes,
  `run_workflow` o `swarm` — solo cuando no disparen escrituras masivas simultaneas en el hilo principal) y cuales **dependen** del anterior.
- Asigna el modelo/nivel de esfuerzo segun `AGENTS.md` (escalado progresivo; Pool A por
  defecto, Pool B/C solo para pulido final, estrategia o auditoria critica).

## Fase 5 — Declarar el plan

- **Express**: una sola linea al inicio, ej.
  `🎼 Maestro: respuesta directa (sin habilidad adicional).` o
  `🎼 Maestro: analisis-critico (quirurgico).`
- **Completo**: bloque breve:
  ```
  🎼 Maestro
  Intencion: …
  Cadena: [contexto] … → [pensamiento] … → [produccion] … → [calidad] …
  Paralelo: … (si aplica) · Modelo: … (si se delega)
  ```
No pidas permiso para un plan obvio; pide confirmacion solo si la cadena implica costo
alto (cuota semanal, muchos agentes, acciones irreversibles).

## Fase 6 — Ejecutar

1. **Lee el `SKILL.md` completo** de cada habilidad elegida antes de usarla (ruta del
   inventario). Si remite a archivos `references/` o `scripts/`, leelos solo cuando el
   paso lo requiera.
2. Aplica las instrucciones de cada habilidad en el orden definido; la salida de una es la
   entrada de la siguiente.
3. Si al avanzar aparece una necesidad nueva, **vuelve a la Fase 3** para ese sub-problema:
   la orquestacion es continua, no de una sola vez.
4. Si dos habilidades se contradicen: prevalece `AGENTS.md` y las reglas del usuario, luego
   las politicas de monetizacion de Meta/Facebook y objetivos de `MonetizaciónFacebook`,
   luego la habilidad mas especifica.

## Fase 7 — Verificar y aprender

- Audita el entregable con la habilidad de **Calidad** adecuada antes de mostrarlo.
- Si el usuario corrigio algo o un flujo salio especialmente bien, registralo segun la
  seccion 7 de `AGENTS.md` (regla duradera local).
- Si una combinacion de habilidades resulto ser la ideal para un tipo de tarea, puedes
  anotarla en `.agents/skills/maestro/aprendizajes.md` como **precedente orientativo**
  (nunca como regla fija: cada peticion se vuelve a razonar).

---

## Principios permanentes

- **Siempre activo**: cada mensaje nuevo reinicia el protocolo, incluso dentro de una
  tarea en curso (una nueva indicacion puede cambiar la cadena).
- **Dinamico**: el inventario se consulta en vivo; habilidades nuevas se aprovechan sin
  editar este archivo.
- **Proporcional**: el esfuerzo de orquestacion escala con la tarea; nunca convertir una
  pregunta simple en burocracia.
- **Foco en monetizacion real**: si el entregable es contenido, estrategia o nicho para Facebook, verificar siempre viabilidad de monetizacion, retencion y cumplimiento de politicas de Meta.
- **Analisis critico soberano**: cada vez que se analice algo, `analisis-critico` manda sobre
  cualquier otra habilidad de evaluacion; otras habilidades solo alimentan insumos sin
  contaminar la objetividad del veredicto.
- **Transparencia**: el usuario siempre ve que habilidades se usaron (linea `🎼 Maestro`).
