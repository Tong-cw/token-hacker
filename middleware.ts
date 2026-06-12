import { auth } from '@/lib/auth';

export default auth((req) => {
  if (!req.auth) {
    const url = new URL('/en/login', req.url);
    url.searchParams.set('callbackUrl', req.url);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|en/login|zh/login).*)',
  ],
};
