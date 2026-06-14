export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    hasGitHubId: !!process.env.AUTH_GITHUB_ID,
    hasGitHubSecret: !!process.env.AUTH_GITHUB_SECRET,
    githubSecretLength: process.env.AUTH_GITHUB_SECRET?.length || 0,
    hasGoogleId: !!process.env.AUTH_GOOGLE_ID,
    hasGoogleSecret: !!process.env.AUTH_GOOGLE_SECRET,
    googleSecretLength: process.env.AUTH_GOOGLE_SECRET?.length || 0,
    hasAuthUrl: !!process.env.AUTH_URL,
    authUrl: process.env.AUTH_URL || 'none',
    hasAuthSecret: !!process.env.AUTH_SECRET,
    authSecretLength: process.env.AUTH_SECRET?.length || 0,
    // Show first/last chars to verify values
    githubIdPrefix: process.env.AUTH_GITHUB_ID?.substring(0, 10) || 'none',
    githubSecretSuffix: process.env.AUTH_GITHUB_SECRET?.substring(Math.max(0, (process.env.AUTH_GITHUB_SECRET?.length || 0) - 8)) || 'none',
    googleIdPrefix: process.env.AUTH_GOOGLE_ID?.substring(0, 10) || 'none',
    googleSecretSuffix: process.env.AUTH_GOOGLE_SECRET?.substring(Math.max(0, (process.env.AUTH_GOOGLE_SECRET?.length || 0) - 8)) || 'none',
    authSecretSuffix: process.env.AUTH_SECRET?.substring(Math.max(0, (process.env.AUTH_SECRET?.length || 0) - 8)) || 'none',
    nodeEnv: process.env.NODE_ENV,
    runtime: typeof window === 'undefined' ? 'server' : 'client',
  });
}
