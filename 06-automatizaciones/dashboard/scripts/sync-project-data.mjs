import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dashboardRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(dashboardRoot, '..', '..');
const outputPath = path.join(dashboardRoot, 'src', 'data', 'project-state.json');

function existsSafe(p) {
  try {
    return fs.existsSync(p);
  } catch {
    return false;
  }
}

function listMarkdownFiles(relDir) {
  const fullDir = path.join(repoRoot, relDir);
  if (!existsSafe(fullDir)) return [];
  const results = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const stat = fs.statSync(full);
        const rel = path.relative(repoRoot, full).replace(/\\/g, '/');
        const content = fs.readFileSync(full, 'utf8');
        const titleMatch = content.match(/^#\s+(.+)$/m);
        results.push({
          name: entry.name,
          path: rel,
          title: titleMatch ? titleMatch[1].trim() : entry.name.replace(/\.md$/, ''),
          updatedAt: stat.mtime.toISOString(),
          sizeBytes: stat.size,
        });
      }
    }
  }
  walk(fullDir);
  return results.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

function listSkills() {
  const skillsDir = path.join(repoRoot, '.agents', 'skills');
  if (!existsSafe(skillsDir)) return [];
  const skills = [];
  for (const entry of fs.readdirSync(skillsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skillMd = path.join(skillsDir, entry.name, 'SKILL.md');
    if (!existsSafe(skillMd)) continue;
    const raw = fs.readFileSync(skillMd, 'utf8');
    const descMatch = raw.match(/description:\s*>?-?\s*([\s\S]*?)(?=\n[a-zA-Z_-]+:|\n---)/);
    const description = descMatch
      ? descMatch[1].replace(/\s+/g, ' ').trim()
      : 'Habilidad del proyecto';
    skills.push({
      name: entry.name,
      description,
      path: `.agents/skills/${entry.name}/SKILL.md`,
    });
  }
  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

function parseAtomicPlan(existingAtomsMap = {}) {
  const strategiesDir = path.join(repoRoot, '01-estrategia-y-nichos', 'estrategias');
  let planPath = path.join(strategiesDir, '2026-11-17_plan-maestro-50k-sistema-hibrido.md');
  if (!existsSafe(planPath) && existsSafe(strategiesDir)) {
    const mdFiles = fs.readdirSync(strategiesDir).filter((f) => f.endsWith('.md')).sort().reverse();
    if (mdFiles.length > 0) {
      planPath = path.join(strategiesDir, mdFiles[0]);
    }
  }
  if (!existsSafe(planPath)) return { phases: [], totalAtoms: 0, completedAtoms: 0 };

  const md = fs.readFileSync(planPath, 'utf8');
  const lines = md.split(/\r?\n/);
  const phases = [];
  let currentPhase = null;
  let currentAtom = null;

  for (const line of lines) {
    const phaseMatch = line.match(/^#{2,3}\s+(Fase\s+\d+)\s+[—-]\s+(.+)$/);
    if (phaseMatch) {
      currentAtom = null;
      currentPhase = {
        id: phaseMatch[1].toLowerCase().replace(/\s+/g, '-'),
        code: phaseMatch[1],
        title: phaseMatch[2].trim(),
        atoms: [],
      };
      if (line.includes('*(Completada)*')) {
        currentPhase.atoms.push({
          id: `${currentPhase.id}-completada`,
          code: 'Fase 0',
          title: 'Cimientos, políticas y análisis crítico inicial',
          status: 'completed',
          action: 'Investigación de ingeniería inversa, políticas Meta y mecánica del algoritmo.',
          deliverable: '02-investigacion/profunda/2026-11-17_ingenieria-inversa-50k-mxn-facebook.md',
          criteria: 'PASA (3/3 Átomos auditados)',
        });
      }
      phases.push(currentPhase);
      continue;
    }

    const atomHeadingMatch = line.match(/^###\s+(Átomo\s+\d+\.\d+)\s+[—-]\s+(.+)$/);
    const atomBulletMatch = line.match(/^\d+\.\s+\*\*(Átomo\s+\d+\.\d+)\s+[—-]\s+([^*]+?):\*\*\s*(.*)$/);
    if ((atomHeadingMatch || atomBulletMatch) && currentPhase) {
      const m = atomHeadingMatch || atomBulletMatch;
      const id = m[1].toLowerCase().replace(/[á]/g, 'a').replace(/\s+/g, '-');
      const prev = existingAtomsMap[id];
      const completedByDefault = ['atomo-1.1', 'atomo-1.2', 'atomo-1.3', 'atomo-2.1'].includes(id);
      currentAtom = {
        id,
        code: m[1],
        title: m[2].trim(),
        status: completedByDefault ? 'completed' : prev?.status || 'pending',
        action: atomBulletMatch ? m[3].trim() : '',
        deliverable: '',
        criteria: '',
      };
      currentPhase.atoms.push(currentAtom);
      continue;
    }

    if (currentAtom) {
      if (line.startsWith('- **Acción:**')) {
        currentAtom.action = line.replace('- **Acción:**', '').trim();
      } else if (line.startsWith('- **Entregable:**')) {
        currentAtom.deliverable = line.replace('- **Entregable:**', '').trim();
      } else if (line.startsWith('- **Criterio de terminado:**')) {
        currentAtom.criteria = line.replace('- **Criterio de terminado:**', '').trim();
      }
    }
  }

  // Mark deliverable existence automatically if a concrete file path is mentioned and exists
  for (const phase of phases) {
    for (const atom of phase.atoms) {
      const pathMatches = atom.deliverable.match(/`([^`]+\.(md|py|ps1))`/g);
      if (pathMatches && atom.status === 'pending') {
        const allExist = pathMatches.every((m) => {
          const rel = m.replace(/`/g, '');
          return existsSafe(path.join(repoRoot, rel));
        });
        if (allExist && pathMatches.length > 0) {
          atom.status = 'completed';
        }
      }
    }
  }

  const allAtoms = phases.flatMap((p) => p.atoms);
  return {
    phases,
    totalAtoms: allAtoms.length,
    completedAtoms: allAtoms.filter((a) => a.status === 'completed').length,
    inProgressAtoms: allAtoms.filter((a) => a.status === 'in_progress').length,
  };
}

function main() {
  // Only sync if running inside the full MonetizaciónFacebook repo
  if (!existsSafe(path.join(repoRoot, 'AGENTS.md'))) {
    console.log('[sync] Repo root not found (likely running in isolated build). Keeping existing project-state.json.');
    return;
  }

  let existing = {};
  if (existsSafe(outputPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    } catch {
      existing = {};
    }
  }

  const existingAtomsMap = {};
  for (const p of existing?.plan?.phases || []) {
    for (const a of p.atoms || []) {
      existingAtomsMap[a.id] = a;
    }
  }

  const plan = parseAtomicPlan(existingAtomsMap);
  const skills = listSkills();
  const docs = {
    reglas: listMarkdownFiles('00-sistema-y-reglas'),
    estrategia: listMarkdownFiles('01-estrategia-y-nichos'),
    investigacion: listMarkdownFiles('02-investigacion'),
    analisis: listMarkdownFiles('03-analisis-y-estadisticas'),
    contenido: listMarkdownFiles('04-contenido'),
    bitacora: listMarkdownFiles('05-bitacora-y-errores'),
  };

  // Sync production lotes (images -> public/lotes/<slug>/ + manifest -> project-state.json)
  const lotes = [];
  const prodDir = path.join(repoRoot, '04-contenido', 'produccion');
  const publicLotesDir = path.join(dashboardRoot, 'public', 'lotes');
  if (existsSafe(prodDir)) {
    fs.mkdirSync(publicLotesDir, { recursive: true });
    const entries = fs.readdirSync(prodDir, { withFileTypes: true }).filter((e) => e.isDirectory());
    for (const entry of entries.sort((a, b) => b.name.localeCompare(a.name))) {
      const manifestPath = path.join(prodDir, entry.name, 'lote_programacion.json');
      if (!existsSafe(manifestPath)) continue;
      try {
        const rawPosts = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        const destFolder = path.join(publicLotesDir, entry.name);
        fs.mkdirSync(destFolder, { recursive: true });
        const posts = rawPosts.map((p, idx) => {
          const publicImgs = (p.imagenes || []).map((relImg) => {
            const srcImg = path.join(prodDir, entry.name, relImg);
            const fileName = path.basename(relImg);
            const destImg = path.join(destFolder, fileName);
            if (existsSafe(srcImg)) {
              fs.copyFileSync(srcImg, destImg);
            }
            return `/lotes/${entry.name}/${fileName}`;
          });
          return {
            index: idx + 1,
            message: p.message || '',
            imagenes: publicImgs,
          };
        });
        lotes.push({
          slug: entry.name,
          title: entry.name.replace(/^\d{4}-\d{2}-\d{2}_/, '').replace(/[-_]/g, ' '),
          date: entry.name.slice(0, 10),
          postsCount: posts.length,
          posts,
        });
      } catch (err) {
        console.warn(`[sync] Error reading lote ${entry.name}:`, err.message);
      }
    }
  }

  const state = {
    projectName: 'MonetizaciónFacebook',
    syncedAt: new Date().toISOString(),
    goalMxnMonthly: 50000,
    currentStatus: {
      activePhase: 'Fase 1–2: Fábrica Visual + Cultura En Corto',
      workingOn: 'Plan Maestro v2 ($50K Híbrido) y Lote Piloto listo para programar',
      nextStep: 'Programar los 4 posts del Lote Piloto y grabar el primer video Capa 2 (120–180s)',
      policyHealth: 'Limpio (10/10 Anti-Strike)',
      activeTrend: 'Cultura Pop, Misterios y Tendencias MX/US (The Game Awards, Corona Capital)',
    },
    kpis: existing.kpis || {
      monthlyRevenueMxn: 0,
      monthlyViews: 0,
      avgRpmMxn: 0,
      followers: 0,
      postsPublished: 0,
      retention3sAvgPct: 0,
      policyStrikes: 0,
      dataSource: 'Pre-lanzamiento (pendiente conexión Meta Insights / CSV en Átomo 3.1)',
    },
    recentUpdates: [
      {
        date: '2026-11-17',
        title: 'Plan Maestro v2 + Cultura En Corto + Lote Piloto',
        summary: 'Pivote estratégico a sistema híbrido (imágenes 4:5 para alcance + video 120–180s para RPM) con vista previa integrada en la web.',
        type: 'plan',
      },
      {
        date: '2026-11-17',
        title: 'Investigación Imágenes vs. Video en FCM 2025–2026',
        summary: 'Validado que fotos pagan $0.01–$0.04 USD en LATAM; se usarán como embudo hacia video narrado y Branded Content.',
        type: 'research',
      },
      {
        date: '2026-11-17',
        title: 'Dashboard PWA + Auth0 + Repositorio GitHub/Vercel',
        summary: 'Creación del panel web responsive con tema claro/oscuro, PWA móvil y sincronización dinámica con archivos locales.',
        type: 'infra',
      },
    ],
    lotes,
    plan,
    skills,
    docs,
    counts: {
      skills: skills.length,
      totalDocs: Object.values(docs).reduce((acc, list) => acc + list.length, 0),
      investigations: docs.investigacion.length,
      audits: docs.analisis.length,
      logs: docs.bitacora.length,
    },
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(state, null, 2), 'utf8');
  console.log(`[sync] Updated ${outputPath} (${plan.totalAtoms} atoms, ${skills.length} skills, ${state.counts.totalDocs} docs).`);
}

main();
