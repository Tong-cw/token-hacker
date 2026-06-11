import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// ⚠️ MVP: File-based storage. Swap to Supabase/Postgres for production.
// Store in memory: in production, use a real database.
// Deploy-friendly in-memory store (resets on cold start — use DB for production)

declare global {
  var __users: Map<string, any> | undefined;
  var __apiKeys: Map<string, any> | undefined;
  var __usage: Map<string, any> | undefined;
}

if (!globalThis.__users) globalThis.__users = new Map();
if (!globalThis.__apiKeys) globalThis.__apiKeys = new Map();
if (!globalThis.__usage) globalThis.__usage = new Map();

const users = globalThis.__users!;
const apiKeys = globalThis.__apiKeys!;
const usage = globalThis.__usage!;

function generateToken(userId?: string): string {
  return crypto.randomBytes(32).toString('hex');
}

function generateApiKey(): string {
  return 'th_' + crypto.randomBytes(16).toString('hex');
}

function getUserFromToken(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!auth) {
    const cookie = req.cookies.get('token')?.value;
    if (!cookie) return null;
    return users.get('session_' + cookie) || null;
  }
  return users.get('session_' + auth) || null;
}

export async function GET(req: NextRequest) {
  const user = getUserFromToken(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      apiKey: user.apiKey,
      balance: user.balance,
      monthlyTokens: user.monthlyTokens || 0,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, action } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    if (action === 'register') {
      if (users.has('email_' + email)) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
      }

      const id = crypto.randomUUID();
      const hashedPassword = await bcrypt.hash(password, 10);
      const apiKey = generateApiKey();

      const user = {
        id,
        email,
        password: hashedPassword,
        apiKey,
        balance: 200, // $2 free credit
        monthlyTokens: 0,
        createdAt: new Date().toISOString(),
      };

      users.set('id_' + id, user);
      users.set('email_' + email, user);
      apiKeys.set(apiKey, user);

      const token = generateToken();
      users.set('session_' + token, user);

      return NextResponse.json({ token, user: { id, email, apiKey, balance: user.balance } });
    }

    // Login
    if (action === 'login') {
      const user = users.get('email_' + email);
      if (!user) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      const token = generateToken();
      users.set('session_' + token, user);

      return NextResponse.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          apiKey: user.apiKey,
          balance: user.balance,
        },
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
