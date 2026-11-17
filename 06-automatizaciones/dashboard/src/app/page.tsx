import { Suspense } from 'react';
import { getSession } from '@/lib/session';
import { getProjectState } from '@/lib/project';
import { DashboardClient } from '@/components/DashboardClient';
import { LoginGate } from '@/components/LoginGate';

async function AuthenticatedContent() {
  const session = await getSession();
  if (!session) {
    return <LoginGate />;
  }

  const state = getProjectState();
  return (
    <DashboardClient
      state={state}
      user={{ name: session.name, email: session.email }}
      authConfigured={true}
    />
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] text-sm text-[var(--text-muted)]">
          Cargando Centro de Mando...
        </div>
      }
    >
      <AuthenticatedContent />
    </Suspense>
  );
}
