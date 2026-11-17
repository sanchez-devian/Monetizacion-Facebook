# Manual Técnico y Matrices de `analisis-critico`

Documento de referencia bajo demanda para análisis en modo **Estándar** y **Profundo**.

---

## 1. Mapa de Integración sin Contaminación (Orquestación con otras Skills)

Cuando `maestro` combine `analisis-critico` con habilidades especialistas, la regla es **Separación Estricta Insumo → Juicio**:

| Habilidad Complementaria | Qué SÍ aporta (Insumos) | Qué NO puede hacer (Contaminación bloqueada) |
| :--- | :--- | :--- |
| `deep-research` + `AGENTS.md §0.1` | Fuentes primarias, expertos validados, noticias tier-1, cifras verificadas | Dar por cierta una conclusión sin cruzar hipótesis rivales ni auditar incentivos |
| `competitor-profiling` | Precios reales, posicionamiento público, reseñas verificadas, hechos vs. inferencias | Asumir que copiar al líder funciona sin evaluar tasa base ni capacidades reales |
| `seo-audit` / `ai-seo` | Datos técnicos de indexación, arquitectura, Core Web Vitals, citabilidad | Imponer checklists genéricos como prioridad sin probar impacto real en negocio |
| `cro` / `marketing-psychology` | Puntos de fricción en embudo, sesgos conductuales aplicables, métricas | Recomendar tácticas manipulativas o suponer aumento de conversión sin evidencia |
| `design-critique` / `frontend-design` | Jerarquía visual, usabilidad, accesibilidad, consistencia UI | Dictar veredicto desde gusto estético personal ignorando objetivo y usuario real |
| `copy-editing` / `copywriting` / `offers` | Claridad de mensaje, propuesta de valor, fricción persuasiva | Maquillar fallos reales del producto/negocio con mejor redacción o promesas vacías |
| `proactive-agent` | Detección de riesgos futuros y anticipación de dependencias | Sustituir la verificación empírica por suposiciones optimistas |

---

## 2. Matriz de Análisis de Hipótesis en Competencia (ACH — Richards Heuer)

Usar en modo **Profundo** o cuando haya ambigüedad seria entre explicaciones:

1. Listar 3+ hipótesis mutuamente excluyentes (`H1`, `H2`, `H3` — incluir siempre la tesis contraria a la intuición inicial).
2. Listar únicamente evidencias y observaciones clave verificadas (`E1`, `E2`, ...).
3. Evaluar cada celda con **`C`** (Consistente), **`I`** (Inconsistente / Refuta) o **`N`** (No diagnóstica / Neutral).
4. **Regla de decisión:** No gana la hipótesis con más `C` (datos ambiguos suman `C` falsos); gana la que sobrevive con **menos `I` (refutaciones)** y mejor explica la **evidencia diagnóstica** (aquella donde unas hipótesis son `C` y otras `I`).

| Evidencia verificada (Fuente primaria) | H1: Tesis inicial | H2: Tesis rival (Steelman) | H3: Causa externa / Ruido | Diagnóstica? |
| :--- | :---: | :---: | :---: | :---: |
| `E1: ...` | C / I / N | C / I / N | C / I / N | Sí / No |
| `E2: ...` | C / I / N | C / I / N | C / I / N | Sí / No |

---

## 3. Escala de Probabilidad Estimativa (Sherman Kent + Tetlock)

Prohibido esconder incertidumbre detrás de adjetivos vagos. Usar esta referencia explícita al estimar:

| Expresión calibrada | Rango probabilístico | Nivel de respaldo exigido |
| :--- | :---: | :--- |
| Prácticamente seguro | **90% – 99%** | Múltiples fuentes primarias convergentes, tasa base favorable y cero refutaciones críticas |
| Muy probable | **75% – 89%** | Evidencia primaria sólida; hipótesis rivales explican peor los datos diagnósticos |
| Probable / Inclinación favorable | **55% – 74%** | Evidencia positiva supera a la negativa, pero existen brechas de datos relevantes |
| Incertidumbre equilibrada (50/50) | **45% – 54%** | Datos insuficientes o igualmente consistentes con hipótesis opuestas (declarar falta de veredicto firme) |
| Improbable | **15% – 44%** | La tasa base o evidencia diagnóstica favorece a una hipótesis rival |
| Muy improbable | **1% – 14%** | Contradicción directa con restricciones físicas, financieras o evidencia primaria sólida |

---

## 4. Antipatrones de los Grandes Críticos (Auto-auditoría Obligatoria)

Antes de cerrar un análisis Profundo, verifica que tu propio veredicto no esté cayendo en los 5 fallos documentados de los mejores críticos del mundo:

1. **Conflicto de interés / incentivo oculto** *(Lección Markopolos en GE, 2019)*: ¿Están tus conclusiones infladas para sonar contundentes, vender miedo o justificar una acción preconcebida?
2. **Modo Erizo / Sesgo ideológico previo** *(Lección Ioannidis en Santa Clara, 2020; NIE Irak, 2002)*: ¿Ya habías elegido el veredicto antes de mirar los datos y flexibilizaste tus criterios para encajarlo?
3. **Dogmatismo teórico sin contacto directo** *(Lección Ebert con videojuegos antes de 2010)*: ¿Estás juzgando algo desde teoría abstracta sin haber inspeccionado o probado la cosa real?
4. **Enamorarse de la narrativa del modelo** *(Lección Chanos en Tesla; Munger en Alibaba)*: ¿Estás ignorando una fuerza real del mercado/entorno solo porque "no debería funcionar según tu libro"?
5. **Ceguera ante efectos de segundo orden** *(Lección Jane Jacobs y oferta de vivienda)*: ¿Tu recomendación resuelve el problema inmediato creando una distorsión peor a mediano plazo?

---

## 5. Protocolo de *Premortem* e Inversión (3 Preguntas Rápidas)

1. **Inversión:** *Si quisiéramos garantizar que esta decisión/proyecto/tesis fracase en 6–12 meses, ¿qué 3 cosas tendríamos que hacer?* ¿Cuántas de esas 3 ya están ocurriendo hoy?
2. **Via Negativa:** *¿Qué parte de esto sobra, genera fragilidad o daña resultados y debería eliminarse hoy mismo antes de agregar nada nuevo?*
3. **Criterio de Actualización:** *¿Qué métrica, fecha o evento concreto usaré para auditar si este veredicto fue acertado o erróneo?*
