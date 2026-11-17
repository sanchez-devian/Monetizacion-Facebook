import { getAuth0Client, isAuth0Configured } from '@/lib/auth0';
import { getProjectState } from '@/lib/project';
import { DashboardClient } from '@/components/DashboardClient';
import { LoginGate } from '@/components/LoginGate';

export default async function HomePage() {
  const authConfigured = isAuth0Configured();
  const auth0 = getAuth0Client();

  if (authConfigured && auth0) {
    const session = await auth0.getSession();
    if (!session) {
      return <LoginGate authConfigured={true} />;
    }
    const state = getProjectState();
    return (
      <DashboardClient
        state={state}
        user={{ name: session.user.name, email: session.user.email }}
        authConfigured={true}
      />
    );
  }

  // Fallback when Auth0 env vars are not yet configured locally
  const state = getProjectState();
  return <DashboardClient state={state} user={null} authConfigured={false} />;
}
