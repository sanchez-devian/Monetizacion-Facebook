'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Cpu,
  DollarSign,
  ExternalLink,
  FileCheck2,
  ShieldAlert,
  ShieldCheck,
  Users,
} from 'lucide-react';

type DocSectionKey = 'auditoria' | 'ingenieria' | 'politicas' | 'algoritmo';

const CHECKLIST_ITEMS = [
  {
    id: 1,
    title: 'Cero Marcas de Agua de Terceros',
    rule: '100% libre de logos, usuarios flotantes o marcas de agua de TikTok, IG, YouTube, CapCut o páginas ajenas.',
  },
  {
    id: 2,
    title: 'Transformación Sustancial (No Reupload)',
    rule: 'Si usa material externo, aporta guion propio, contexto periodístico/crítico y narrativa original (sin compilaciones pasivas ni edición cosmética).',
  },
  {
    id: 3,
    title: 'Presencia / Voz Humana Real',
    rule: 'Cuenta con voz humana real (locución propia o cámara) o producción nativa; cero voz TTS genérica sobre clips pasivos o reacciones mudas.',
  },
  {
    id: 4,
    title: 'Ruptura de Huella Visual (Anti-Rights Manager)',
    rule: 'Fragmentos externos cortados en citas breves, integrados con capas propias (titulares, B-roll, reencuadre dinámico o PiP).',
  },
  {
    id: 5,
    title: 'Audio 100% Seguro / Licenciado',
    rule: 'Música y SFX de Meta Sound Collection, producción propia o (orgánicos ≥60s) Licensed Music Library de Meta.',
  },
  {
    id: 6,
    title: 'Cero Engagement Bait',
    rule: 'Evita pedir likes, reacciones para votar, comentarios clave, compartir para ganar o etiquetar amigos.',
  },
  {
    id: 7,
    title: 'CTA Seguro (Interacción Genuina)',
    rule: 'Invita a una opinión abierta, debate real o experiencia personal que pasaría la "Prueba del Amigo".',
  },
  {
    id: 8,
    title: 'Caption Limpio para Recomendaciones',
    rule: 'Sin enlaces externos en el cuerpo principal, uso mínimo de MAYÚSCULAS sostenidas y máximo 5 hashtags relevantes.',
  },
  {
    id: 9,
    title: 'Cumplimiento CMP & Normas Comunitarias',
    rule: 'Libre de violencia gráfica, discurso de odio, desnudez, acoso, desinformación verificable o explotación de tragedias.',
  },
  {
    id: 10,
    title: 'Estado de Salud de Cuenta Verificado',
    rule: 'Confirmado en Support Home / Monetization que la página está en verde y sin alertas activas antes de publicar.',
  },
];

function SectionBadge({ label, tone }: { label: string; tone: 'green' | 'amber' | 'red' | 'blue' }) {
  const styles = {
    green: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/20',
    amber: 'bg-amber-500/15 text-amber-500 border-amber-500/20',
    red: 'bg-red-500/15 text-red-500 border-red-500/20',
    blue: 'bg-blue-500/15 text-blue-500 border-blue-500/20',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${styles[tone]}`}>
      {label}
    </span>
  );
}

export function Fase0DocsSection() {
  const [section, setSection] = useState<DocSectionKey>('auditoria');
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const toggleCheck = (id: number) => {
    setCheckedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const navButtons: Array<{ key: DocSectionKey; label: string; icon: React.ReactNode }> = [
    { key: 'auditoria', label: 'Resumen & Auditoría', icon: <FileCheck2 className="w-4 h-4" /> },
    { key: 'ingenieria', label: '0.1 Ingeniería Inversa', icon: <DollarSign className="w-4 h-4" /> },
    { key: 'politicas', label: '0.2 Políticas & Checklist', icon: <ShieldCheck className="w-4 h-4" /> },
    { key: 'algoritmo', label: '0.3 Algoritmo Meta', icon: <Cpu className="w-4 h-4" /> },
  ];

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-5 md:p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-blue-500 mb-1">
              <BookOpen className="w-4 h-4" />
              <span>DOCUMENTACIÓN TÉCNICA · FASE 0 (CERO CEGUERA)</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold">Cimientos de Inteligencia, Políticas y Algoritmo</h1>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Compilado el 2026-11-17 con fuentes verificadas (Meta oficial, estudios multi-millón y operadores reales en México). Cero datos inventados.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <SectionBadge label="3/3 Átomos PASA" tone="green" />
            <SectionBadge label="Auditado · 8 Pilares" tone="blue" />
          </div>
        </div>

        {/* Sub-navigation */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border)]">
          {navButtons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setSection(btn.key)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition ${
                section === btn.key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-[var(--surface-muted)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION: AUDITORÍA & RESUMEN */}
      {section === 'auditoria' && (
        <div className="space-y-5">
          <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-bold text-base flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
                Veredicto Crudo de Auditoría Crítica (8 Pilares)
              </h2>
              <SectionBadge label="APROBADA CON ALERTAS" tone="amber" />
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              La Fase 0 cumple al 100% los criterios binarios de terminado en sus 3 átomos, separando hechos primarios de simulaciones y brechas reales. No obstante, la auditoría bajo <code>analisis-critico</code> expone tres realidades operativas que condicionan las Fases 1–6:
            </p>
            <div className="grid md:grid-cols-3 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-[var(--surface-muted)] space-y-1.5">
                <p className="text-xs font-bold text-amber-500">1. Matemática del $50K MXN/mes</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Con RPM piso de México ($0.05–$0.10 USD), se requieren <strong>27M–53.9M vistas/mes</strong>. Capturar audiencia hispana en EE. UU. ($0.25–$0.80+ USD) reduce la meta a <strong>3.4M–10.8M vistas/mes</strong>.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--surface-muted)] space-y-1.5">
                <p className="text-xs font-bold text-blue-500">2. Acceso por Invitación (FCM)</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Tras el cierre de programas heredados el 31/08/2025, Facebook Content Monetization opera <strong>por invitación</strong> (sin umbral público fijo de 5k seguidores); exige 30–90 días de historial limpio.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--surface-muted)] space-y-1.5">
                <p className="text-xs font-bold text-red-500">3. Cero Reuploads / TTS Pasivo</p>
                <p className="text-xs text-[var(--text-muted)]">
                  La ofensiva de julio 2025 contra <em>Unoriginal Content</em> penaliza el alcance de <strong>toda la página</strong>. Es obligatorio usar voz humana, guion crítico y fragmentación visual real.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-5 space-y-3">
            <h3 className="font-bold text-sm">Mapa de Entregables y Brechas Declaradas</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--text-muted)]">
                    <th className="py-2 pr-3">Átomo</th>
                    <th className="py-2 pr-3">Archivos Fuente en Repo</th>
                    <th className="py-2 pr-3">Estado</th>
                    <th className="py-2">Brechas Transparentadas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr>
                    <td className="py-3 pr-3 font-semibold whitespace-nowrap">0.1 Ingeniería Inversa</td>
                    <td className="py-3 pr-3 font-mono text-[11px] text-[var(--text-muted)]">
                      02-investigacion/profunda/2026-11-17_ingenieria-inversa-50k-mxn-facebook.md<br />
                      02-investigacion/competencia/2026-11-17_benchmark-paginas-tendencias-latam.md
                    </td>
                    <td className="py-3 pr-3"><SectionBadge label="PASA" tone="green" /></td>
                    <td className="py-3 text-[var(--text-muted)]">Sin tabla oficial Meta de RPM por país; Chrome DevTools MCP desconectado impidió conteo en vivo Nov 2026 en Sopitas y Uno TV.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-semibold whitespace-nowrap">0.2 Políticas & Anti-Ban</td>
                    <td className="py-3 pr-3 font-mono text-[11px] text-[var(--text-muted)]">
                      00-sistema-y-reglas/politicas-meta/2026-11-17_reglas-oro-originalidad-y-monetizacion.md<br />
                      00-sistema-y-reglas/sops-y-checklists/2026-11-17_checklist-pre-publicacion-anti-strike.md
                    </td>
                    <td className="py-3 pr-3"><SectionBadge label="PASA" tone="green" /></td>
                    <td className="py-3 text-[var(--text-muted)]">Umbral mínimo universal de Rights Manager (personalizable por titular); tabla exacta de días de castigo por reincidencia; umbral numérico de FCM.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-semibold whitespace-nowrap">0.3 Algoritmo Facebook</td>
                    <td className="py-3 pr-3 font-mono text-[11px] text-[var(--text-muted)]">
                      02-investigacion/tendencias/2026-11-17_mecanica-algoritmo-facebook.md
                    </td>
                    <td className="py-3 pr-3"><SectionBadge label="PASA" tone="green" /></td>
                    <td className="py-3 text-[var(--text-muted)]">Peso porcentual exacto de señales de ranking; umbral oficial de &quot;buen&quot; hook rate orgánico a 3s.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-semibold whitespace-nowrap">Auditoría Fase 0</td>
                    <td className="py-3 pr-3 font-mono text-[11px] text-[var(--text-muted)]">
                      03-analisis-y-estadisticas/auditorias-criticas/2026-11-17_auditoria-fase-0.md
                    </td>
                    <td className="py-3 pr-3"><SectionBadge label="VERIFICADO" tone="blue" /></td>
                    <td className="py-3 text-[var(--text-muted)]">Se recalibrará con RPM real observado en Meta Business Suite al completar 30 días de monetización en Fase 5.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: 0.1 INGENIERÍA INVERSA */}
      {section === 'ingenieria' && (
        <div className="space-y-5">
          <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-bold text-base">Facebook Content Monetization (FCM) 2025–2026</h2>
              <SectionBadge label="VERIFICADO · NIVEL 1/2" tone="green" />
            </div>
            <ul className="text-xs md:text-sm text-[var(--text-muted)] space-y-2 list-disc pl-5">
              <li>
                <strong>Unificación total (31/08/2025):</strong> Cerraron los programas heredados (<em>In-Stream Ads</em>, <em>Ads on Reels</em>, <em>Performance Bonus</em>) para concentrar pagos de Reels, videos largos, fotos, texto y Stories en un solo tablero.
              </li>
              <li>
                <strong>Elegibilidad en México y LATAM:</strong> Habilitado oficialmente en México, Colombia, Argentina y Brasil. Opera <strong>por invitación</strong> (o formulario de expresión de interés en <em>Panel Profesional → Monetización</em>), requiriendo cuenta activa (30–90 días), ≥18 años y cero infracciones de originalidad.
              </li>
              <li>
                <strong>Vistas calificadas:</strong> Meta excluye reproducciones menores a 5 segundos y bucles repetidos del mismo usuario.
              </li>
              <li>
                <strong>Contra-evidencia de mercado:</strong> Creadores reportaron caídas de RPM de ~$100 USD/1M vistas a <strong>$20–$40 USD</strong> (e incluso <strong>$2–$5 USD</strong> en clips cortos automatizados) tras la unificación de agosto 2025.
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-bold text-base">Tabla de Sensibilidad: Vistas × RPM = $50,000 MXN/mes</h2>
              <SectionBadge label="SIMULACIÓN SOBRE RANGOS OBSERVADOS" tone="amber" />
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Tipo de cambio de referencia observado (DOF 2026-11-17): <strong>$18.5525 MXN/USD</strong> → Meta mensual = <strong>$2,695.42 USD/mes</strong>.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--text-muted)]">
                    <th className="py-2 pr-3">Escenario</th>
                    <th className="py-2 pr-3">Perfil de Audiencia y Formato</th>
                    <th className="py-2 pr-3">RPM (USD)</th>
                    <th className="py-2 pr-3">Vistas / Mes</th>
                    <th className="py-2">Vistas / Día</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr>
                    <td className="py-2.5 pr-3 font-semibold">Conservador (Piso)</td>
                    <td className="py-2.5 pr-3 text-[var(--text-muted)]">100% MX/LATAM en Reels cortos / caída post-CMP</td>
                    <td className="py-2.5 pr-3 font-mono">$0.05</td>
                    <td className="py-2.5 pr-3 font-bold">53,908,400</td>
                    <td className="py-2.5">~1,796,947</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-3 font-semibold">Conservador (Techo)</td>
                    <td className="py-2.5 pr-3 text-[var(--text-muted)]">Tráfico MX/LATAM estable con buen share rate</td>
                    <td className="py-2.5 pr-3 font-mono">$0.10</td>
                    <td className="py-2.5 pr-3 font-bold">26,954,200</td>
                    <td className="py-2.5">~898,473</td>
                  </tr>
                  <tr className="bg-blue-500/5">
                    <td className="py-2.5 pr-3 font-semibold text-blue-500">Realista (Piso)</td>
                    <td className="py-2.5 pr-3 text-[var(--text-muted)]">MX/LATAM + 15–25% hispanos EE. UU.; Reels &gt;60s</td>
                    <td className="py-2.5 pr-3 font-mono">$0.25</td>
                    <td className="py-2.5 pr-3 font-bold">10,781,680</td>
                    <td className="py-2.5">~359,389</td>
                  </tr>
                  <tr className="bg-blue-500/5">
                    <td className="py-2.5 pr-3 font-semibold text-blue-500">Realista (Techo)</td>
                    <td className="py-2.5 pr-3 text-[var(--text-muted)]">Cultura pop con alta retención + tráfico hispano EE. UU.</td>
                    <td className="py-2.5 pr-3 font-mono">$0.40</td>
                    <td className="py-2.5 pr-3 font-bold">6,738,550</td>
                    <td className="py-2.5">~224,618</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-3 font-semibold text-emerald-500">Optimista (Piso)</td>
                    <td className="py-2.5 pr-3 text-[var(--text-muted)]">Video largo (&gt;1–3m) + fuerte audiencia hispana EE. UU.</td>
                    <td className="py-2.5 pr-3 font-mono">$0.80</td>
                    <td className="py-2.5 pr-3 font-bold">3,369,280</td>
                    <td className="py-2.5">~112,309</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-3 font-semibold text-emerald-500">Optimista (Techo)</td>
                    <td className="py-2.5 pr-3 text-[var(--text-muted)]">Q4 temporada alta + alto % audiencia EE. UU.</td>
                    <td className="py-2.5 pr-3 font-mono">$1.50</td>
                    <td className="py-2.5 pr-3 font-bold">1,796,950</td>
                    <td className="py-2.5">~59,898</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-5 space-y-3">
            <h2 className="font-bold text-base flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Benchmark: 5 Operadores Reales en México/LATAM
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                {
                  name: 'Badabun',
                  url: 'https://www.facebook.com/BadabunOficial',
                  scale: '~74M seguidores',
                  tactic: 'Producción in-house con talento en cámara, guiones propios y Reels/videos de alta retención.',
                },
                {
                  name: 'El Deforma',
                  url: 'https://www.facebook.com/eldeforma',
                  scale: '3.9M – ~6M seguidores',
                  tactic: 'Sátira redactada desde cero sobre coyuntura + plantillas gráficas de marca propias.',
                },
                {
                  name: 'Pictoline',
                  url: 'https://www.facebook.com/pictoline',
                  scale: '>3M seguidores',
                  tactic: 'Ilustración 100% original ("Bacons"), cómics y explicaciones visuales con estilo patentado.',
                },
                {
                  name: 'Sopitas.com',
                  url: 'https://www.facebook.com/sopitas',
                  scale: 'Top Comscore MX',
                  tactic: 'Curaduría editorial con voz propia en música/cultura pop y adaptación rápida a Reels.',
                },
                {
                  name: 'Uno TV',
                  url: 'https://www.facebook.com/UnoTV',
                  scale: 'Líder Comscore (>10–20M únicos)',
                  tactic: 'Reels informativos verticales (<1 min) con presentadores, voz en off y grafismo de marca.',
                },
              ].map((op) => (
                <div key={op.name} className="p-4 rounded-2xl bg-[var(--surface-muted)] space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-sm">{op.name}</p>
                    <span className="text-[11px] font-medium text-blue-500">{op.scale}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{op.tactic}</p>
                  <a
                    href={op.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-blue-500 hover:underline pt-1"
                  >
                    {op.url.replace('https://www.', '')} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: 0.2 POLÍTICAS META & CHECKLIST */}
      {section === 'politicas' && (
        <div className="space-y-5">
          <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-5 space-y-3">
            <h2 className="font-bold text-base">Matriz de Cumplimiento: Originalidad, Engagement Bait y Audio</h2>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-1.5">
                <p className="font-bold text-red-500">ZONA ROJA (Ban / Degradación)</p>
                <p className="text-[var(--text-muted)]">
                  Reuploads sin edición sustancial, marcas de agua externas (TikTok/IG/CapCut), reacciones mudas, edición cosmética (espejo/velocidad), voz TTS pasiva, o 5 tipos de <em>Engagement Bait</em>.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                <p className="font-bold text-amber-500">ZONA GRIS (Alto Riesgo)</p>
                <p className="text-[var(--text-muted)]">
                  Clips de <em>lives</em> o podcasts con &gt;70% de metraje intacto, música comercial sin licencia de monetización o cross-posting idéntico en páginas no vinculadas.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                <p className="font-bold text-emerald-500">ZONA VERDE (Escalable)</p>
                <p className="text-[var(--text-muted)]">
                  Guion crítico/periodístico propio, voz humana real, citas visuales breves fragmentadas, capas gráficas propias, audio de <strong>Meta Sound Collection</strong>, y CTAs de debate abierto (≤5 hashtags).
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-bold text-base">Checklist Interactivo Pre-Publicación (10/10 Binario)</h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Regla de rechazo inmediato: si falta 1 solo punto, la pieza vuelve a edición.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--surface-muted)]">
                  {checkedIds.length}/10 Aprobados
                </span>
                {checkedIds.length === 10 && <SectionBadge label="LISTO PARA PUBLICAR" tone="green" />}
              </div>
            </div>

            <div className="space-y-2">
              {CHECKLIST_ITEMS.map((item) => {
                const isChecked = checkedIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleCheck(item.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-[var(--surface-muted)] border-transparent hover:border-[var(--border)]'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-5 h-5 shrink-0 mt-0.5 ${isChecked ? 'text-emerald-500' : 'text-[var(--text-muted)]'}`}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">
                        {item.id}. {item.title}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.rule}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: 0.3 ALGORITMO FACEBOOK */}
      {section === 'algoritmo' && (
        <div className="space-y-5">
          <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-bold text-base">Arquitectura y Señales Reales (2025–2026)</h2>
              <SectionBadge label="HECHOS NIVEL 1/2" tone="blue" />
            </div>
            <div className="grid md:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-[var(--surface-muted)] space-y-1.5">
                <p className="font-bold text-emerald-500">Lo que SÍ premia Meta</p>
                <ul className="space-y-1 text-[var(--text-muted)] list-disc pl-4">
                  <li><strong>Unconnected Reach:</strong> 30%–45.6% de vistas del Feed provienen de no-seguidores (<em>Retrieval → ESR → LSR</em>).</li>
                  <li><strong>Unificación en Reels (Jun 2025):</strong> Todo video nuevo se distribuye como Reel sin límite de 90s.</li>
                  <li><strong>Voz + rostro en 3s:</strong> +11.7% retención a 3s y +24.7% a 10s (Emplifi).</li>
                  <li><strong>Responder comentarios:</strong> +9.5% engagement (Buffer, 52M+ posts); el sistema premia diálogo bidireccional y envíos por DM.</li>
                </ul>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--surface-muted)] space-y-1.5">
                <p className="font-bold text-red-500">Penalizaciones y Mitos Refutados</p>
                <ul className="space-y-1 text-[var(--text-muted)] list-disc pl-4">
                  <li><strong>Cero enlaces en caption:</strong> 92%–97.9%+ de vistas del Feed son sin enlace externo; en 2026 se probó límite de 2 links/mes sin Meta Verified (usar primer comentario fijado).</li>
                  <li><strong>Mito refutado (&quot;4+ palabras&quot;):</strong> No existe regla fija de 4–5 palabras en comentarios; el filtro es semántico (NLP), no un conteo duro.</li>
                  <li><strong>Mito refutado (&quot;&gt;60s muere&quot;):</strong> Socialinsider registra pico de engagement de marcas en <strong>120–180s (0.25%)</strong> si hay retención.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-bold text-base">Métricas Objetivo por Formato</h2>
              <SectionBadge label="BENCHMARK + OBJETIVO PROPUESTO" tone="amber" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--text-muted)]">
                    <th className="py-2 pr-3">Formato</th>
                    <th className="py-2 pr-3">Referencia Observada</th>
                    <th className="py-2 pr-3">Objetivo Operativo Propuesto</th>
                    <th className="py-2">Regla Crítica</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr>
                    <td className="py-2.5 pr-3 font-semibold">Reels cortos (15–45s)</td>
                    <td className="py-2.5 pr-3 text-[var(--text-muted)]">Finalización ~70–71% (8–15s) / ~45–55% (30s)</td>
                    <td className="py-2.5 pr-3">Retención 3s ≥65% · Shares/Reach ≥1.5%</td>
                    <td className="py-2.5 text-[var(--text-muted)]">Gancho &lt;1.5s; loop limpio; cero marcas de agua.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-3 font-semibold">Reels largos (&gt;60s)</td>
                    <td className="py-2.5 pr-3 text-[var(--text-muted)]">Finalización ~20–40%; caída frecuente al 0:30</td>
                    <td className="py-2.5 pr-3">Retención 3s ≥60% · al 0:30 ≥40% · Medio ≥35–45s</td>
                    <td className="py-2.5 text-[var(--text-muted)]">Pattern interrupt cada 15–20s; estructura por capítulos.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-3 font-semibold">Video largo (&gt;1–3 min)</td>
                    <td className="py-2.5 pr-3 text-[var(--text-muted)]">Pico de engagement 120–180s (0.25%, Socialinsider)</td>
                    <td className="py-2.5 pr-3">Retención 1m ≥35% · Tiempo medio ≥60–90s</td>
                    <td className="py-2.5 text-[var(--text-muted)]">Solo &gt;3m si hay arco narrativo real; responder 100% comentarios iniciales.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-3 font-semibold">Imágenes / Memes / Texto</td>
                    <td className="py-2.5 pr-3 text-[var(--text-muted)]">Medianas Buffer: Imagen 5.20% · Texto 4.76%</td>
                    <td className="py-2.5 pr-3">Engagement ≥5.0% · Respuesta creador ≥80% en 2h</td>
                    <td className="py-2.5 text-[var(--text-muted)]">Debate genuino sin bait; enlace solo en primer comentario.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 flex items-start gap-3 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[var(--text-muted)]">
              <strong>Transparencia de Brechas:</strong> Meta no publica los pesos porcentuales exactos entre tiempo de reproducción, envíos y comentarios, ni un umbral oficial de <em>hook rate</em> orgánico. Los objetivos propuestos se ajustarán con datos reales propios en la Fase 3 y Fase 5.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
