'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Moon, ShieldCheck, Smartphone, Sun, TrendingUp } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function LoginGate() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Credenciales inválidas.');
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError('Error de red al iniciar sesión.');
      setLoading(false);
    }
  }

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

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">
              Correo de acceso
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full px-4 py-3 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 pr-11 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                aria-label="Mostrar contraseña"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-500 font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm transition shadow-lg shadow-blue-600/25"
          >
            <Lock className="w-4 h-4" />
            {loading ? 'Verificando...' : 'Entrar al Centro de Mando'}
          </button>
        </form>

        <div className="space-y-2.5 pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-2.5 text-xs text-[var(--text-muted)]">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Sesión persistente cifrada (JWT `jose` + cookie HttpOnly 7 días).</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[var(--text-muted)]">
            <Smartphone className="w-4 h-4 text-blue-500 shrink-0" />
            <span>Instalable en móvil como App Nativa (PWA).</span>
          </div>
        </div>
      </div>
    </div>
  );
}
