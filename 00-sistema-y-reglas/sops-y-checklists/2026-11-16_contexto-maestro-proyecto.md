# Contexto Maestro del Proyecto — `MonetizaciónFacebook`

> **Propósito de este documento:** Ser la fuente única de verdad (*Single Source of Truth*) sobre la visión, objetivos financieros, modelo operativo, estilo de contenido y capacidades técnicas que debe tener este proyecto. Todo agente o subagente que trabaje aquí debe alinear sus decisiones a este contexto.

---

## 1. Objetivo Principal y Meta Financiera

- **Objetivo Principal:** **Monetizar Facebook** de forma legítima, sostenible y escalable, cumpliendo al 100% las políticas de Meta para evitar desmonetizaciones o *strikes*.
- **Objetivo Secundario Crítico (Velocidad de Tracción):** Crear contenido de alto impacto diseñado para las **masas**, maximizando retención, comentarios y compartidos para desbloquear los requisitos de monetización en el menor tiempo posible.
- **Meta Financiera:** Alcanzar **$50,000 MXN mensuales** (~$2,500–$2,800 USD/mes aprox., sujeto a tipo de cambio) mediante la monetización de Facebook (Reels, anuncios In-Stream, bonificaciones por rendimiento y formatos elegibles vigentes en Meta).
- **Exigencia de Realismo:** La estrategia y proyecciones deben basarse en **investigación profunda (`deep-research` + `AGENTS.md §0.1`)** sobre páginas y creadores reales que ya generan $\ge \$50,000\text{ MXN/mes}$, analizando sus RPM reales en México/LATAM, volumen de vistas necesario y formatos ganadores.

---

## 2. Modelo Editorial y Nicho Dinámico (*Trend-Jacking* Secuencial)

El proyecto **no** es una página rígida de un solo micro-nicho estático; opera como un **medio ágil de entretenimiento, ocio, humor y actualidad viral**:

1. **Enfoque en tendencias masivas del momento:** Apalancarse en sucesos, polémicas, *realities*, *lives* y eventos culturales de altísima conversación en tiempo real (ejemplo de referencia: *"La Mansión VIP 2"* de HotSpanish).
2. **Explotación total de la ola (*360° Content Extraction*):** Mientras una tendencia esté viva y dominando la conversación, la página se vuelca a exprimir cada ángulo posible sin saturar con un solo formato:
   - **Resúmenes diarios ("Últimas 24h"):** Lo más importante que ocurrió en el *live* o evento.
   - **Memes y humor:** Reacciones rápidas a partir de momentos o frases virales.
   - **Críticas y opinión polarizante (sin discurso de odio):** Análisis que detonan debate sano y comentarios masivos.
   - **Noticias formales / datos relevantes:** Cobertura tipo medio informativo de sucesos clave dentro de la tendencia.
   - **Meta-reacción:** Qué están opinando otros creadores, redes o la audiencia sobre el suceso.
3. **Pivoteo Secuencial (Cero atadura eterna):** Una tendencia nunca dura para siempre. No se mezclan muchos temas inconexos al mismo tiempo para no confundir al algoritmo; **mientras dure una gran tendencia, la página la exprime al máximo**, y cuando otra tendencia la supere en volumen e interés masivo, la página pivota de forma limpia hacia la nueva ola.

---

## 3. Producción, Insumos y Cumplimiento de Políticas Meta

- **Uso de clips e imágenes de terceros (Zona de Alto Riesgo — Regla Estricta):** El flujo contempla descargar imágenes, capturas o fragmentos de video de otras cuentas/plataformas para construir resúmenes, memes, críticas y noticias.
  - **Mandato innegociable:** Queda prohibido resubir material crudo (*reuploads*). Todo material de terceros debe pasar por **transformación sustancial** (narración propia/voz, edición dinámica, contexto periodístico/crítico, guion original, gráficos/subtítulos propios y valor añadido claro) para cumplir con las **Políticas de Monetización de Contenido (Originalidad / Contenido No Original)** y *Fair Use* / derechos de autor en Meta.
- **Sistematización y Automatización:** Reducir el trabajo manual repetitivo automatizando el monitoreo de tendencias, descarga de insumos, estructuración de guiones/memes, programación/registro y recolección de métricas.

---

## 4. Sistema Nervioso del Proyecto: "Ojos", Métricas y Mejora Continua

1. **Ojos en el mundo social (*Social Listening & Trend Radar*):** El proyecto debe contar con herramientas, skills y flujos para observar activamente qué está explotando en Facebook, TikTok, X, YouTube y Google Trends en México/LATAM, detectando técnicas actuales de viralización y formatos que el algoritmo está premiando hoy.
2. **Conexión directa a Estadísticas de Facebook:** Conectar el proyecto a la página/perfil de Facebook (vía Meta Graph API / Insights y/o exportación estructurada de Meta Business Suite) para extraer el rendimiento real de cada publicación (alcance, retención 3s/1min, compartidos, comentarios, RPM/ingresos).
3. **Bucle de Aprendizaje Continuo:** Analizar cada post con criterio objetivo (`analisis-critico`), registrar errores y aciertos en `05-bitacora-y-errores/`, y ajustar hooks, formatos y horarios en el siguiente post hasta optimizar la retención y el ingreso por cada mil vistas.
4. **Configuración Estratégica del Perfil/Página:** Configurar la página y/o perfil profesional desde cero con buenas prácticas de Meta (categoría correcta, branding adaptable a tendencias, seguridad de cuenta, 2FA, elegibilidad limpia sin infracciones previas).
5. **Ecosistema Completo de Habilidades:** Instalar y construir todas las skills, scripts y conectores necesarios dentro de `.agents/skills/` y `06-automatizaciones/scripts/` para operar este sistema de punta a punta.
