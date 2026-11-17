'use client';

import { Lock, Moon, ShieldCheck, Smartphone, Sun, TrendingUp } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function LoginGate({ authConfigured }: { authConfigured: boolean }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-[var(--bg)]">
      <button
        onClick={toggleTheme}
        aria-label="Cambiar tema"
        className="fixed top-5 right-5 p-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:opacity-80 transition"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
      </button>

      <div className="w-full max-w-md rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-7 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/25">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">MonetizaciónFacebook</h1>
            <p className="text-xs text-[var(--text-muted)]">Centro de Mando · Meta $50K MXN/mes</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[var(--surface-muted)]">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Acceso privado con Auth0</p>
              <p className="text-xs text-[var(--text-muted)]">
                Sesión cifrada persistente para consultar el plan atómico, métricas y estado en vivo.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[var(--surface-muted)]">
            <Smartphone className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Instalable como App Nativa (PWA)</p>
              <p className="text-xs text-[var(--text-muted)]">
                Abre en Chrome o Safari móvil y selecciona &ldquo;Agregar a pantalla de inicio&rdquo;.
              </p>
            </div>
          </div>
        </div>

        {authConfigured ? (
          <div className="space-y-3">
            <a
              href="/auth/login"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-lg shadow-blue-600/25"
            >
              <Lock className="w-4 h-4" />
              Iniciar sesión con Auth0
            </a>
            <a
              href="/auth/login?screen_hint=signup"
              className="w-full flex items-center justify-center py-3 px-4 rounded-2xl border border-[var(--border)] hover:bg-[var(--surface-muted)] text-sm font-medium transition"
            >
              Crear cuenta nueva
            </a>
          </div>
        ) : (
          <div className="p-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 text-sm space-y-1.5">
            <p className="font-semibold text-amber-500">Auth0 pendiente de credenciales</p>
            <p className="text-xs text-[var(--text-muted)]">
              Configura <code>AUTH0_DOMAIN</code>, <code>AUTH0_CLIENT_ID</code>, <code>AUTH0_CLIENT_SECRET</code> y{' '}
              <code>AUTH0_SECRET</code> en Vercel / <code>.env.local</code> para habilitar el acceso.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
