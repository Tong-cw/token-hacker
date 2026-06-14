import { auth } from '@/lib/auth';

// Only protect pages that require login
const PROTECTED_ROUTES = ['/dashboard', '/settings', '/topup'];

export default auth((req) => {
  // Redirect root to default locale
  const pathname = req.nextUrl.pathname;
  if (pathname === '/') {
    const url = new URL('/en', req.url);
    return Response.redirect(url);
  }

  // Allow unauthenticated access to most pages
  // Only redirect to login for protected routes
  if (!req.auth) {
    const pathname = req.nextUrl.pathname;
    const isProtected = PROTECTED_ROUTES.some(route =>
      pathname.startsWith(`/en${route}`) ||
      pathname.startsWith(`/zh${route}`)
    );
    if (isProtected) {
      const locale = pathname.startsWith('/zh') ? 'zh' : 'en';
      const url = new URL(`/${locale}/login`, req.url);
      url.searchParams.set('callbackUrl', req.url);
      return Response.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
