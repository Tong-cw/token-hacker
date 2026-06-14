import { auth } from '@/lib/auth';
import { NextResponse, NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - get current user's API key or create one
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  const email = session.user.email;
  const username = email.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30);

  // Step 1: Login as admin
  const adminLogin = await fetch('https://api.aiapisave.xyz/api/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'Wzxhn.521' }),
    cache: 'no-store',
  });

  if (!adminLogin.ok) {
    return NextResponse.json({ success: false, message: 'Admin login failed' }, { status: 500 });
  }

  const cookies = adminLogin.headers.get('set-cookie') || '';

  // Step 2: Search for existing user
  const searchResp = await fetch(`https://api.aiapisave.xyz/api/user/?p=0&size=50&username=${username}`, {
    headers: { 'Content-Type': 'application/json', 'Cookie': cookies, 'New-Api-User': '1' },
    cache: 'no-store',
  });
  const searchData = await searchResp.json();

  let userId: number;

  if (searchData.success && searchData.data?.items?.length > 0) {
    userId = searchData.data.items[0].id;
  } else {
    // Step 3: Create new user
    const autogenPassword = `Auto${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    const createResp = await fetch('https://api.aiapisave.xyz/api/user/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookies, 'New-Api-User': '1' },
      body: JSON.stringify({
        username, password: autogenPassword, email, role: 1, group: 'default',
      }),
      cache: 'no-store',
    });
    const createData = await createResp.json();
    if (!createData.success) {
      return NextResponse.json({ success: false, message: 'Failed to create user', detail: createData.message }, { status: 500 });
    }

    // Look up again to get ID
    const searchAgain = await fetch(`https://api.aiapisave.xyz/api/user/?p=0&size=50&username=${username}`, {
      headers: { 'Content-Type': 'application/json', 'Cookie': cookies, 'New-Api-User': '1' },
      cache: 'no-store',
    });
    const searchAgainData = await searchAgain.json();
    userId = searchAgainData.data?.items?.[0]?.id;
    if (!userId) {
      return NextResponse.json({ success: false, message: 'User created but not found' }, { status: 500 });
    }
  }

  // Step 4: Search for existing token
  const tokenSearch = await fetch(`https://api.aiapisave.xyz/api/token/?p=0&size=50&user_id=${userId}`, {
    headers: { 'Content-Type': 'application/json', 'Cookie': cookies, 'New-Api-User': '1' },
    cache: 'no-store',
  });
  const tokenData = await tokenSearch.json();

  let tokenKey = '';
  if (tokenData.success && tokenData.data?.items?.length > 0) {
    tokenKey = tokenData.data.items[0].key || '';
  }

  if (!tokenKey) {
    // Try generate via token POST
    const createTokenResp = await fetch('https://api.aiapisave.xyz/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': cookies, 'New-Api-User': '1' },
      body: JSON.stringify({
        user_id: userId, name: 'Auto-generated Key',
        remain_quota: 500000, unlimited_quota: true, expired_time: -1,
      }),
      cache: 'no-store',
    });
    const createTokenData = await createTokenResp.json();
    if (createTokenData.success) {
      // Re-fetch tokens to get the key
      const refetch = await fetch(`https://api.aiapisave.xyz/api/token/?p=0&size=50&user_id=${userId}`, {
        headers: { 'Content-Type': 'application/json', 'Cookie': cookies, 'New-Api-User': '1' },
        cache: 'no-store',
      });
      const refetchData = await refetch.json();
      tokenKey = refetchData.data?.items?.[0]?.key || '';
    }
  }

  if (!tokenKey) {
    return NextResponse.json({ success: false, message: 'Failed to create token' }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    data: { apiKey: tokenKey, username, userId },
  });
}
