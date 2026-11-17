# MonetizaciónFacebook — Estructura y Orden Implacable de Archivos

Este repositorio centraliza toda la inteligencia, estrategia, producción de contenido, analítica y operación local para **monetizar en Facebook**. Ningún archivo se crea fuera de su carpeta designada.

---

## 1. Reglas Implacables de Archivo

1. **Cero archivos sueltos en la raíz:** En la raíz del proyecto **solo** pueden existir `AGENTS.md` y `README.md` (más la carpeta oculta `.agents/`). Todo lo demás va dentro de `00-` a `99-`.
2. **Convención estricta de nombres:**
   - Documentos, informes, investigaciones, análisis y entradas de bitácora/errores:
     `YYYY-MM-DD_<tema-en-kebab-case>.md` (ej. `2026-11-16_rpm-reels-finanzas-latam.md`).
   - Carpetas de piezas de producción en `04-contenido/produccion/`:
     `YYYY-MM-DD_<pagina>_<slug>/` (ej. `2026-11-16_finanzas-pro_regla-50-30-20/`).
   - Sin espacios, sin tildes ni caracteres especiales en nombres de archivo (usa guiones `-` y minúsculas).
3. **Separación de dato crudo vs. análisis:** Los CSV/JSON exportados de Meta van intactos en `03-analisis-y-estadisticas/datos-crudos/`; nunca se mezclan con informes ni auditorías.
4. **Trazabilidad por pieza:** Toda pieza que pasa a producción (guion + copy + imagen + audio + video) vive junta dentro de su propia subcarpeta en `04-contenido/produccion/`. Los recursos reutilizables (música base, logos, prompts maestros) van en `04-contenido/recursos-compartidos/`.
5. **Nada se borra a ciegas:** Lo obsoleto, descartado o de campañas cerradas se mueve a `99-archivo/`.
6. **Auditoría automática:** Ejecuta `powershell -ExecutionPolicy Bypass -File 06-automatizaciones/scripts/auditar_orden.ps1` para verificar que no existan archivos fuera de regla.

---

## 2. Mapa Maestro (Qué va dónde)

| Carpeta | Qué se guarda exactamente aquí |
| :--- | :--- |
| `00-sistema-y-reglas/politicas-meta/` | Políticas oficiales vigentes de Meta (Monetización para Socios, Contenido, Normas Comunitarias, copyright). |
| `00-sistema-y-reglas/sops-y-checklists/` | Procesos estándar (checklist pre-publicación, revisión de originalidad, flujo de edición). |
| `00-sistema-y-reglas/plantillas/` | Plantillas base (`plantilla-bitacora.md`, `plantilla-error.md`, `plantilla-pieza-contenido.md`). |
| `01-estrategia-y-nichos/nichos/` | Evaluaciones de nichos, potencial de RPM/CPM, saturación y barreras de entrada. |
| `01-estrategia-y-nichos/estrategias/` | Planes de monetización (Reels, In-Stream, Bonificaciones, Suscripciones, Tráfico/Afiliados). |
| `01-estrategia-y-nichos/activos-y-paginas/` | Ficha técnica de cada página o perfil profesional de Facebook (requisitos, estado, métricas meta). |
| `02-investigacion/profunda/` | Informes completos de `deep-research` (con los 8 pilares de `AGENTS.md §0.1`). |
| `02-investigacion/tendencias/` | Tendencias vigentes de algoritmo, formatos premiados, audios y retención en Facebook. |
| `02-investigacion/competencia/` | Benchmarking real de páginas y creadores que monetizan hoy. |
| `02-investigacion/descubrimientos/` | Hallazgos puntuales, experimentos externos u oportunidades detectadas. |
| `03-analisis-y-estadisticas/datos-crudos/` | Exportaciones originales (CSV, JSON, capturas de Meta Business Suite) sin editar. |
| `03-analisis-y-estadisticas/informes/` | Reportes semanales/mensuales de rendimiento (alcance, retención 3s/1m, CTR, RPM, ingresos). |
| `03-analisis-y-estadisticas/auditorias-criticas/` | Diagnósticos y veredictos bajo `analisis-critico` (caídas de alcance, viabilidad, riesgos). |
| `04-contenido/estrategias-viralidad/` | Bancos de hooks, estructuras de retención, calendarios editoriales y ángulos virales. |
| `04-contenido/guiones-y-redacciones/` | Guiones sueltos, borradores de copies, captions y redacciones independientes. |
| `04-contenido/produccion/` | **Subcarpetas por pieza** (`YYYY-MM-DD_<pagina>_<slug>/`) con su guion, copy, imágenes, audios y video final. |
| `04-contenido/recursos-compartidos/` | `imagenes/`, `audios/` y `prompts/` reutilizables en múltiples publicaciones. |
| `05-bitacora-y-errores/bitacora/` | Registro cronológico de hitos, pruebas A/B, cambios de estrategia y resultados. |
| `05-bitacora-y-errores/errores-y-lecciones/` | Fallos operativos, rechazos de monetización, strikes, bajas de alcance y su solución. |
| `06-automatizaciones/scripts/` | Scripts de analítica, limpieza de datos, automatización y auditoría (`auditar_orden.ps1`). |
| `99-archivo/` | Material descartado, versiones viejas o campañas concluidas. |
