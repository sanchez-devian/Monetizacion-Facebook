import { NextRequest, NextResponse } from 'next/server';
import { getAuth0Client } from '@/lib/auth0';

export async function proxy(request: NextRequest) {
  const auth0 = getAuth0Client();
  if (!auth0) {
    return NextResponse.next();
  }
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|sw.js|icons/.*|sitemap.xml|robots.txt).*)',
  ],
};
