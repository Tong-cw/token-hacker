import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NEW_API = 'https://api.aiapisave.xyz';
const ADMIN_ACCESS_TOKEN = process.env.NEWAPI_ACCESS_TOKEN || '05b0870fa1bbf5fccc6bee49c798b048';
const adminHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${ADMIN_ACCESS_TOKEN}`,
  'New-Api-User': '1',
};

async function adminFetch(path: string, options: RequestInit = {}) {
  return fetch(`${NEW_API}${path}`, {
    ...options,
    headers: { ...adminHeaders, ...options.headers },
    cache: 'no-store',
  });
}

export async function GET() {
  try {
    // Read current setup
    const getResp = await adminFetch('/api/setup');
    const setupData = await getResp.json();
    
    // Enable Turnstile in setup
    const currentSetup = setupData?.data?.setup || {};
    // We need to POST to /api/setup to update
    // But let's first check what fields exist
    return NextResponse.json({ success: true, setup: currentSetup });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message });
  }
}
