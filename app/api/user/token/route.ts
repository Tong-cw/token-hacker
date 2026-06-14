export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({ alive: true, route: '/api/user/token', time: Date.now() });
}
