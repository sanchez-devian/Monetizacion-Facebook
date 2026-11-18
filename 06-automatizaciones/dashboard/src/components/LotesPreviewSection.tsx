'use client';

import React, { useState } from 'react';
import { Check, Copy, Download, Image as ImageIcon, Layers } from 'lucide-react';
import type { ProjectLote } from '@/lib/project';

export function LotesPreviewSection({ lotes }: { lotes: ProjectLote[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string>(lotes[0]?.slug || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!lotes.length) {
    return (
      <section className="space-y-4">
        <h1 className="text-xl font-bold">Lotes de Contenido (Vista Previa)</h1>
        <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-8 text-center text-sm text-[var(--text-muted)]">
          No hay lotes sincronizados todavía en <code>04-contenido/produccion/</code>.
        </div>
      </section>
    );
  }

  const activeLote = lotes.find((l) => l.slug === selectedSlug) || lotes[0];

  async function handleCopy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 1800);
    } catch {
      // ignore clipboard errors
    }
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-500" />
            Lotes Listos para Programar
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Copia el texto en 1 clic y descarga las imágenes directo para Meta Business Suite.
          </p>
        </div>

        {lotes.length > 1 && (
          <select
            value={activeLote.slug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-medium"
          >
            {lotes.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.date} · {l.title} ({l.postsCount} posts)
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="space-y-4">
        {activeLote.posts.map((post) => {
          const copyKey = `${activeLote.slug}-${post.index}`;
          const isCopied = copiedId === copyKey;
          return (
            <div
              key={copyKey}
              className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-4 sm:p-5 space-y-4"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/15 text-amber-400">
                  <ImageIcon className="w-3.5 h-3.5" />
                  POST #{post.index} · {post.imagenes.length}{' '}
                  {post.imagenes.length === 1 ? 'imagen' : 'láminas'}
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono">{activeLote.slug}</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 items-start">
                <div className="grid grid-cols-2 gap-2.5">
                  {post.imagenes.map((imgSrc, i) => {
                    const fileName = imgSrc.split('/').pop() || `post-${post.index}-${i + 1}.png`;
                    return (
                      <div
                        key={imgSrc}
                        className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface-muted)] flex flex-col"
                      >
                        <a href={imgSrc} target="_blank" rel="noreferrer" className="block">
                          <img
                            src={imgSrc}
                            alt={`Post ${post.index} - ${i + 1}`}
                            className="w-full h-auto object-cover"
                          />
                        </a>
                        <a
                          href={imgSrc}
                          download={fileName}
                          className="flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold bg-[var(--surface)] hover:bg-blue-500/10 text-blue-500 border-t border-[var(--border)] transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Descargar
                        </a>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] p-4 text-sm whitespace-pre-wrap leading-relaxed">
                    {post.message}
                  </div>
                  <button
                    onClick={() => handleCopy(copyKey, post.message)}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                      isCopied
                        ? 'bg-emerald-500 text-white'
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {isCopied ? '¡Copy copiado!' : `Copiar Copy #${post.index}`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
