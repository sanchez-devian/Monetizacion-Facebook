'use client';

import React, { useMemo, useState } from 'react';
import {
  Activity,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  FolderGit2,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Moon,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Wrench,
} from 'lucide-react';
import type { AtomStatus, ProjectState } from '@/lib/project';
import { Fase0DocsSection } from './Fase0DocsSection';
import { useTheme } from './ThemeProvider';

type TabKey = 'overview' | 'fase0' | 'plan' | 'stats' | 'repo';

interface UserInfo {
  name?: string | null;
  email?: string | null;
}

function StatusBadge({ status }: { status: AtomStatus }) {
  if (status === 'completed') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-500">
        <CheckCircle2 className="w-3.5 h-3.5" /> Completado
      </span>
    );
  }
  if (status === 'in_progress') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/15 text-blue-500">
        <Clock className="w-3.5 h-3.5" /> En curso
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-500/15 text-[var(--text-muted)]">
      <Circle className="w-3.5 h-3.5" /> Pendiente
    </span>
  );
}

export function DashboardClient({
  state,
  user,
  authConfigured,
}: {
  state: ProjectState;
  user: UserInfo | null;
  authConfigured: boolean;
}) {
  const { theme, toggleTheme } = useTheme();
  const [tab, setTab] = useState<TabKey>('overview');
  const [filterPhase, setFilterPhase] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | AtomStatus>('all');
  const [expandedAtom, setExpandedAtom] = useState<string | null>(null);

  const planPct = useMemo(() => {
    if (!state.plan.totalAtoms) return 0;
    return Math.round((state.plan.completedAtoms / state.plan.totalAtoms) * 100);
  }, [state.plan]);

  const revenuePct = useMemo(() => {
    if (!state.goalMxnMonthly) return 0;
    return Math.min(100, Math.round((state.kpis.monthlyRevenueMxn / state.goalMxnMonthly) * 100));
  }, [state.kpis.monthlyRevenueMxn, state.goalMxnMonthly]);

  const filteredPhases = useMemo(() => {
    return state.plan.phases
      .filter((p) => filterPhase === 'all' || p.id === filterPhase)
      .map((p) => ({
        ...p,
        atoms: p.atoms.filter((a) => filterStatus === 'all' || a.status === filterStatus),
      }))
      .filter((p) => p.atoms.length > 0);
  }, [state.plan.phases, filterPhase, filterStatus]);

  const navItems: Array<{ key: TabKey; label: string; icon: React.ReactNode }> = [
    { key: 'overview', label: 'Resumen', icon: <LayoutDashboard className="w-5 h-5" /> },
    { key: 'fase0', label: 'Fase 0 Docs', icon: <BookOpen className="w-5 h-5" /> },
    { key: 'plan', label: 'Plan Atómico', icon: <ListChecks className="w-5 h-5" /> },
    { key: 'stats', label: 'Estadísticas', icon: <BarChart3 className="w-5 h-5" /> },
    { key: 'repo', label: 'Proyecto', icon: <FolderGit2 className="w-5 h-5" /> },
  ];

  const syncedDate = new Date(state.syncedAt).toLocaleString('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--bg)] text-[var(--text)]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-[var(--border)] bg-[var(--surface)] p-5 justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">MonetizaciónFB</p>
              <p className="text-xs text-[var(--text-muted)]">Meta $50K MXN/mes</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  tab === item.key
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-3 pt-4 border-t border-[var(--border)]">
          <div className="text-xs text-[var(--text-muted)] px-1">
            <p className="font-medium text-[var(--text)] truncate">{user?.name || user?.email || 'Modo Local'}</p>
            <p className="truncate">Sync: {syncedDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-muted)] text-xs font-medium transition"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              {theme === 'dark' ? 'Claro' : 'Oscuro'}
            </button>
            {authConfigured && (
              <a
                href="/api/auth/logout"
                title="Cerrar sesión"
                className="p-2 rounded-xl border border-[var(--border)] hover:bg-red-500/10 hover:text-red-500 transition"
              >
                <LogOut className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-30 pt-safe bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-sm leading-none">MonetizaciónFB</p>
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Sync: {syncedDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="p-2 rounded-xl bg-[var(--surface-muted)]"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          {authConfigured && (
            <a href="/api/auth/logout" aria-label="Cerrar sesión" className="p-2 rounded-xl bg-[var(--surface-muted)]">
              <LogOut className="w-4 h-4" />
            </a>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 md:pl-64 pb-24 md:pb-10">
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
          {tab === 'overview' && (
            <>
              {/* Hero Status */}
              <section className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full">
                    <Activity className="w-3.5 h-3.5" /> {state.currentStatus.activePhase}
                  </span>
                  <span className="text-xs bg-white/15 px-3 py-1 rounded-full">
                    Tendencia: {state.currentStatus.activeTrend}
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold mb-1">Trabajando ahora</h1>
                <p className="text-sm md:text-base text-blue-100 mb-4">{state.currentStatus.workingOn}</p>
                <div className="p-3.5 rounded-2xl bg-black/20 text-xs md:text-sm flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>
                    <strong>Siguiente paso:</strong> {state.currentStatus.nextStep}
                  </span>
                </div>
              </section>

              {/* Top KPI Grid */}
              <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4">
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2">
                    <span>Meta Mensual</span>
                    <Target className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-xl font-bold">
                    ${state.kpis.monthlyRevenueMxn.toLocaleString('es-MX')} <span className="text-xs font-normal">MXN</span>
                  </p>
                  <div className="mt-2 h-1.5 rounded-full bg-[var(--surface-muted)] overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${revenuePct}%` }} />
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">
                    {revenuePct}% de ${state.goalMxnMonthly.toLocaleString('es-MX')} MXN
                  </p>
                </div>

                <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4">
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2">
                    <span>Progreso del Plan</span>
                    <ListChecks className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-xl font-bold">
                    {state.plan.completedAtoms}/{state.plan.totalAtoms}
                  </p>
                  <div className="mt-2 h-1.5 rounded-full bg-[var(--surface-muted)] overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${planPct}%` }} />
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">{planPct}% átomos completados</p>
                </div>

                <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4">
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2">
                    <span>Salud de Políticas</span>
                    {state.kpis.policyStrikes === 0 ? (
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <ShieldAlert className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <p className="text-xl font-bold">{state.kpis.policyStrikes} strikes</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-2">{state.currentStatus.policyHealth}</p>
                </div>

                <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4">
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2">
                    <span>Skills & Docs</span>
                    <Wrench className="w-4 h-4 text-violet-500" />
                  </div>
                  <p className="text-xl font-bold">{state.counts.skills} skills</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-2">
                    {state.counts.totalDocs} documentos locales activos
                  </p>
                </div>
              </section>

              {/* Recent Updates */}
              <section className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-5">
                <h2 className="text-base font-bold mb-4">Bitácora Reciente (Chats & Proyecto Local)</h2>
                <div className="space-y-3">
                  {state.recentUpdates.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[var(--surface-muted)] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.summary}</p>
                      </div>
                      <span className="text-[11px] font-mono text-[var(--text-muted)] shrink-0">{item.date}</span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {tab === 'plan' && (
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold">Plan Maestro Atómico</h1>
                  <p className="text-xs text-[var(--text-muted)]">
                    {state.plan.completedAtoms} completados · {state.plan.totalAtoms} átomos en 7 fases
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={filterPhase}
                    onChange={(e) => setFilterPhase(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-medium"
                  >
                    <option value="all">Todas las fases</option>
                    {state.plan.phases.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.code}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as 'all' | AtomStatus)}
                    className="px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-medium"
                  >
                    <option value="all">Todos los estados</option>
                    <option value="completed">Completados</option>
                    <option value="in_progress">En curso</option>
                    <option value="pending">Pendientes</option>
                  </select>
                </div>
              </div>

              {filteredPhases.map((phase) => (
                <div key={phase.id} className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-sm md:text-base">
                      {phase.code} — {phase.title}
                    </h2>
                    <span className="text-xs text-[var(--text-muted)]">{phase.atoms.length} átomos</span>
                  </div>
                  <div className="space-y-2.5">
                    {phase.atoms.map((atom) => {
                      const isOpen = expandedAtom === atom.id;
                      return (
                        <div
                          key={atom.id}
                          className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/60 overflow-hidden"
                        >
                          <button
                            onClick={() => setExpandedAtom(isOpen ? null : atom.id)}
                            className="w-full p-3.5 flex items-center justify-between gap-3 text-left"
                          >
                            <div>
                              <span className="text-xs font-mono text-blue-500 font-semibold">{atom.code}</span>
                              <p className="text-sm font-semibold">{atom.title}</p>
                            </div>
                            <StatusBadge status={atom.status} />
                          </button>
                          {isOpen && (
                            <div className="px-3.5 pb-3.5 pt-1 text-xs space-y-2 border-t border-[var(--border)]">
                              {atom.action && (
                                <p>
                                  <strong>Acción:</strong> {atom.action}
                                </p>
                              )}
                              {atom.deliverable && (
                                <p>
                                  <strong>Entregable:</strong> {atom.deliverable}
                                </p>
                              )}
                              {atom.criteria && (
                                <p>
                                  <strong>Criterio PASA/FALLA:</strong> {atom.criteria}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </section>
          )}

          {tab === 'fase0' && <Fase0DocsSection />}

          {tab === 'stats' && (
            <section className="space-y-5">
              <div>
                <h1 className="text-xl font-bold">Estadísticas y Monetización</h1>
                <p className="text-xs text-[var(--text-muted)]">Fuente: {state.kpis.dataSource}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
                {[
                  { label: 'Ingresos 30d', value: `$${state.kpis.monthlyRevenueMxn.toLocaleString('es-MX')} MXN` },
                  { label: 'Vistas 30d', value: state.kpis.monthlyViews.toLocaleString('es-MX') },
                  { label: 'RPM Promedio', value: `$${state.kpis.avgRpmMxn.toFixed(2)} MXN` },
                  { label: 'Seguidores', value: state.kpis.followers.toLocaleString('es-MX') },
                  { label: 'Posts Publicados', value: String(state.kpis.postsPublished) },
                  { label: 'Retención 3s Prom.', value: `${state.kpis.retention3sAvgPct}%` },
                ].map((m) => (
                  <div key={m.label} className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4">
                    <p className="text-xs text-[var(--text-muted)]">{m.label}</p>
                    <p className="text-xl font-bold mt-1">{m.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-5 text-sm space-y-2">
                <h2 className="font-bold">Conexión Automática a Facebook (Átomo 3.1)</h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Una vez ejecutado el Átomo 3.1, este panel leerá automáticamente los reportes exportados de Meta
                  Business Suite y/o Meta Graph API desde <code>03-analisis-y-estadisticas/</code> sin inventar cifras.
                </p>
              </div>
            </section>
          )}

          {tab === 'repo' && (
            <section className="space-y-5">
              <div>
                <h1 className="text-xl font-bold">Repositorio Local y Skills</h1>
                <p className="text-xs text-[var(--text-muted)]">
                  Sincronizado desde las carpetas locales de <code>MonetizaciónFacebook</code>
                </p>
              </div>

              <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-5 space-y-3">
                <h2 className="font-bold text-sm">Skills Instaladas ({state.skills.length})</h2>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {state.skills.map((s) => (
                    <div key={s.name} className="p-3 rounded-2xl bg-[var(--surface-muted)]">
                      <p className="text-sm font-semibold font-mono">{s.name}</p>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-0.5">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-5 space-y-3">
                <h2 className="font-bold text-sm">Documentos Locales ({state.counts.totalDocs})</h2>
                <div className="space-y-2">
                  {Object.entries(state.docs).flatMap(([folder, items]) =>
                    items.map((doc) => (
                      <div
                        key={doc.path}
                        className="p-3 rounded-2xl bg-[var(--surface-muted)] flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{doc.title}</p>
                          <p className="text-[11px] font-mono text-[var(--text-muted)] truncate">
                            {folder} · {doc.path}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Mobile Native-App Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 pb-safe bg-[var(--surface)]/95 backdrop-blur-md border-t border-[var(--border)] flex justify-around px-2 pt-2">
        {navItems.map((item) => {
          const active = tab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl text-[11px] font-medium transition ${
                active ? 'text-blue-500' : 'text-[var(--text-muted)]'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
