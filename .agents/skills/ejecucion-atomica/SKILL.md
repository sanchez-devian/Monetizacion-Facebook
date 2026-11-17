---
name: ejecucion-atomica
description: >-
  MANDATORY anti-crash and task-decomposition protocol for EVERY user request that
  contains multiple tasks, broad research, or bulk creations/writes (e.g. Notion
  courses, multi-module databases, multi-tool pipelines). Forces decomposing heavy
  prompts into isolated, sequential atomic steps—offloading heavy research to a
  `self` subagent + local files, capping write batch sizes, preventing parallel
  heavy MCP calls, avoiding Notion JSON/SQLite quoting traps, and verifying real
  completion so the agent never hits HTTP 400 INVALID_ARGUMENT or loops.
---

# Ejecución Atómica y Anti-Saturación (`ejecucion-atomica`)

> **Mandato:** Cuando el usuario pide varias cosas en un mismo mensaje (ej. buscar/instalar skills + investigar a fondo + estructurar un proyecto/curso + guardarlo en Notion/archivos), **PROHIBIDO ejecutar todo junto en el mismo turno o acumular toda la investigación cruda en el hilo principal.** Cada tarea se aísla y ejecuta en pasos atómicos secuenciales, como si se procesaran una por una en turnos ligeros.

---

## 1. Triaje de Entrada (En el primer razonamiento de CADA petición)

Clasifica la petición antes de llamar herramientas:
- **Atómica (1 tarea ligera):** Ejecución directa.
- **Compuesta o Pesada (cualquiera de estos signos):**
  1. Contiene **2 o más verbos/entregables distintos** (ej. *buscar skill + investigar + estructurar + guardar en Notion*).
  2. Implica **investigación externa amplia** (>3 búsquedas web o lectura de múltiples páginas largas).
  3. Implica **escritura/creación múltiple** (>3 páginas/filas en Notion, o varios documentos largos).

Si es **Compuesta o Pesada**, activa obligatoriamente las 5 fases siguientes.

---

## 2. Las 5 Fases Obligatorias

### Fase 1 — Descomponer en Cola Secuencial (`T1 → T2 → T3…`)
1. Numera explícitamente las tareas independientes que pidió el usuario (ej. `T1: Marketplace`, `T2: Investigación`, `T3: Diseño local`, `T4: Estructura Notion`, `T5: Carga por lotes y verificación`).
2. **Una sola fase activa a la vez:** No mezcles llamadas pesadas de `T1`, `T2` y `T4` en un mismo turno.
3. **Autonomía secuencial:** No te detengas a pedir permiso entre subtareas que el usuario ya pidió explícitamente (ejecuta `T1 → T2 → T3…` en cadena continua); solo pregunta si hay ambigüedad crítica real, acción destructiva irreversible o bloqueo tras 2 intentos fallidos.

### Fase 2 — Aislamiento de Contexto (Research Offloading + Borrador Local)
1. **Investigación fuera del hilo principal:** Si `T2` requiere >3 `search_web` o múltiples lecturas largas (`notion-fetch` extensos, documentos), **NO** la ejecutes toda en el chat principal (infla el contexto de `30k` a `130k+` tokens antes de empezar a construir).
   - Delega la investigación a **un subagente `self`** (no `research`, porque `research` no tiene acceso a red; usa `Model: "inherit"` o `"flash"` según complejidad) con orden estricta de:
     1. Aplicar `AGENTS.md §0.1` (8 pilares de investigación).
     2. Guardar el informe completo y estructurado en un archivo local (en `<Artifact Directory Path>/scratch/` o carpeta del proyecto si aplica).
     3. Devolver al chat principal **únicamente** la ruta del archivo y un resumen ejecutivo breve (<300 palabras).
2. **Borrador local antes de escribir en APIs externas:** Para entregables grandes (cursos, manuales, bases con >3 registros largos), redacta y guarda primero el contenido completo en un archivo `.md` local. Así el contexto del chat no carga kilobytes repetidos y cualquier fallo externo es reanudable sin rehacer la investigación.

### Fase 3 — Límites Duros de Carga por Turno (Prevención de `HTTP 400 INVALID_ARGUMENT`)
El error `HTTP 400 INVALID_ARGUMENT` / `output_truncation` ocurre cuando la sesión acumula demasiado contexto sin caché junto con respuestas de salida masivas o múltiples llamadas MCP paralelas muy pesadas. Reglas estrictas:
1. **Cero escrituras pesadas en paralelo:** **Máximo 1 llamada** de escritura masiva por turno (ej. 1 `notion-create-pages` por turno; nunca 2–3 `notion-create-pages` de 20 KB en paralelo).
2. **Lote pequeño obligatorio:** En `notion-create-pages` o equivalentes, envía **máximo 2–3 páginas por llamada** (manteniendo el turno por debajo de ~6,000 tokens de salida / ~15 KB de JSON).
3. **Marketplace sin desperdicio:** Máximo **1–2 llamadas** a `search_marketplace` con palabras clave limpias. Si devuelve vacío, informa al usuario en el cierre y sigue adelante; nunca gastes 4 turnos probando sinónimos mientras lees esquemas innecesarios.
4. **Techo de contexto sano (`~110k–120k` tokens):** Si la sesión se acerca a ese volumen y aún faltan lotes de escritura, guarda el estado en un archivo local y delega los lotes restantes a un `self` subagent fresco (que lea el archivo `.md` local y suba de 2 en 2 páginas) o recomienda `/compact`.

### Fase 4 — Reglas Anti-Bucle para Notion MCP
1. **Trampa de `<sqlite-table>` vs `<data-source-state>`:**
   - Al consultar o crear una base de datos, `<sqlite-table>` muestra los nombres de columna entre comillas SQL (`"Plan mínimo"`, `"Práctica completada"`).
   - Al pasar `properties` en `notion-create-pages` o `notion-update-page`, usa **exactamente las claves del JSON `<data-source-state>` SIN comillas literales extra**: `"Plan mínimo"`, **JAMÁS** `"\"Plan mínimo\""`.
2. **Cero reintentos ciegos:** Si Notion devuelve `validation_error` (400), detente de inmediato, lee las claves válidas del error o de `<data-source-state>`, corrige y valida con **1 sola página de prueba** antes de enviar el resto.
3. **Prohibido `allow_async: true` a ciegas:** Que Notion responda `{"status": "queued"}` **no** significa éxito. Prefiere `allow_async: false` con lotes de 2–3 páginas; si usas `allow_async: true`, haz polling obligatorio con `notion-get-async-task` hasta confirmar `"status": "succeeded"` antes de continuar al siguiente lote.

### Fase 5 — Verificación Real antes de Responder
Antes de dar la tarea por terminada:
1. Consulta el destino real (ej. `notion-query-data-sources` en modo `rows` o `sql` con `COUNT(*)`) para verificar que **todas** las filas/páginas existen realmente.
2. Verifica las rutas locales/enlaces y reporta únicamente hechos observados en herramientas.
