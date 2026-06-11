import { NextRequest, NextResponse } from 'next/server';

// SiliconFlow provides OpenAI-compatible API for DeepSeek models
const SILICONFLOW_URL = process.env.SILICONFLOW_BASE_URL || 'https://api.deepseek.com/v1';
const SILICONFLOW_KEY = process.env.DEEPSEEK_API_KEY || '';

// Upstream API endpoints
const UPSTREAM = {
  'deepseek-chat': { url: SILICONFLOW_URL, key: SILICONFLOW_KEY },
  'deepseek-reasoner': { url: SILICONFLOW_URL, key: SILICONFLOW_KEY },
  'qwen-plus': { url: SILICONFLOW_URL, key: SILICONFLOW_KEY },
  'qwen-max': { url: SILICONFLOW_URL, key: SILICONFLOW_KEY },
  'glm-4': { url: SILICONFLOW_URL, key: SILICONFLOW_KEY },
  'gpt-4o': { url: 'https://api.openai.com/v1', key: process.env.OPENAI_API_KEY || '' },
  'gpt-5.5-mini': { url: 'https://api.openai.com/v1', key: process.env.OPENAI_API_KEY || '' },
  'claude-sonnet': { url: 'https://api.anthropic.com/v1', key: process.env.ANTHROPIC_API_KEY || '' },
  'claude-opus': { url: 'https://api.anthropic.com/v1', key: process.env.ANTHROPIC_API_KEY || '' },
};

// Pricing per 1M tokens (in cents USD) — SiliconFlow models priced for profit
const PRICING: Record<string, { input: number; output: number }> = {
  'deepseek-chat': { input: 30, output: 120 },         // cost ~¥0.8/M → sell $0.30/$1.20
  'deepseek-reasoner': { input: 150, output: 600 },    // cost ~¥4/M → sell $1.50/$6
  'qwen-plus': { input: 30, output: 120 },             // cost ~¥0.8/M → sell $0.30/$1.20
  'qwen-max': { input: 50, output: 200 },              // cost ~¥2/M → sell $0.50/$2
  'glm-4': { input: 50, output: 200 },                 // cost ~¥5/M → sell $0.50/$2
  'gpt-4o': { input: 250, output: 1000 },
  'gpt-5.5-mini': { input: 15, output: 60 },
  'claude-sonnet': { input: 300, output: 1500 },
  'claude-opus': { input: 1500, output: 7500 },
};

function getAuthToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization')?.trim() || '';
  if (auth.startsWith('Bearer ')) return auth.slice(7);
  if (auth.startsWith('th_')) return auth; // Direct API key
  return null;
}

async function authenticate(apiKey: string) {
  const user = globalThis.__apiKeys?.get(apiKey);
  if (!user) return null;
  if (user.balance <= 0) return null; // No balance → reject
  return user;
}

function estimateTokens(body: any): { input: number; output: number } {
  // Estimate token count from messages
  // Rough: 1 token ≈ 4 chars for English, 2 chars for Chinese
  let inputTokens = 0;
  const messages = body?.messages || [];
  for (const msg of messages) {
    const content = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content);
    inputTokens += Math.ceil(content.length / 3);
  }
  // Output: use max_tokens if set, else estimate
  const outputTokens = body?.max_tokens || 1000;
  return { input: inputTokens, output: outputTokens };
}

async function proxyRequest(
  upstream: { url: string; key: string },
  path: string,
  req: NextRequest
) {
  const body = await req.text();
  const headers = new Headers();

  // Forward relevant headers
  for (const [key, value] of req.headers.entries()) {
    if (['host', 'authorization', 'content-length', 'connection'].includes(key.toLowerCase())) continue;
    headers.set(key, value);
  }

  headers.set('Authorization', `Bearer ${upstream.key}`);
  headers.set('Content-Type', 'application/json');

  const url = new URL(path, upstream.url);
  url.search = req.nextUrl.search;

  const upstreamReq = new Request(url.toString(), {
    method: req.method,
    headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? body : undefined,
  });

  const res = await fetch(upstreamReq);
  return res;
}

async function handleAll(req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = '/' + (params.path?.join('/') || '');

  // Authenticate
  const token = getAuthToken(req);
  if (!token) {
    return NextResponse.json({ error: 'Missing API key. Get one at aiapisave.xyz' }, { status: 401 });
  }

  const user = await authenticate(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid or expired API key. Get one at aiapisave.xyz' }, { status: 401 });
  }

  // Determine model from request body
  let model = '';
  let body: any = {};
  try {
    body = await req.clone().json();
    model = body?.model || '';
  } catch {}

  // Pick upstream
  const upstream = UPSTREAM[model as keyof typeof UPSTREAM];
  if (!upstream || !upstream.key) {
    // If model not in our map, default to DeepSeek
    const defaultUpstream = UPSTREAM['deepseek-chat'];
    if (!defaultUpstream.key) {
      return NextResponse.json({ error: 'Model not configured' }, { status: 400 });
    }
    const res = await proxyRequest(defaultUpstream, path, req);
    return new NextResponse(res.body, { status: res.status, headers: res.headers });
  }

  // Estimate cost
  const tokens = estimateTokens(body);
  const pricing = PRICING[model as keyof typeof PRICING] || PRICING['deepseek-chat'];
  const costCents = Math.ceil((tokens.input / 1_000_000) * pricing.input + (tokens.output / 1_000_000) * pricing.output);

  // Check balance (allow if cost is negligible)
  if (costCents > 0 && user.balance < costCents) {
    return NextResponse.json({
      error: 'Insufficient balance. Top up at aiapisave.xyz',
      balance: (user.balance / 100).toFixed(2),
      required: (costCents / 100).toFixed(2),
    }, { status: 402 });
  }

  // Forward request
  const res = await proxyRequest(upstream, path, req);

  // Deduct from balance (approximate, refine with actual token usage from response)
  if (costCents > 0) {
    user.balance -= costCents;
    user.monthlyTokens = (user.monthlyTokens || 0) + tokens.input + tokens.output;
    globalThis.__users?.set('id_' + user.id, user);
    globalThis.__apiKeys?.set(user.apiKey, user);
  }

  // Add usage headers
  const responseHeaders = new Headers(res.headers);
  responseHeaders.set('X-Token-Hacker-Balance', (user.balance / 100).toFixed(2));
  responseHeaders.set('X-Token-Hacker-Cost', (costCents / 100).toFixed(4));

  return new NextResponse(res.body, {
    status: res.status,
    headers: responseHeaders,
  });
}

// Handle all HTTP methods
export async function GET(req: NextRequest, ctx: { params: { path: string[] } }) { return handleAll(req, ctx); }
export async function POST(req: NextRequest, ctx: { params: { path: string[] } }) { return handleAll(req, ctx); }
export async function PUT(req: NextRequest, ctx: { params: { path: string[] } }) { return handleAll(req, ctx); }
export async function DELETE(req: NextRequest, ctx: { params: { path: string[] } }) { return handleAll(req, ctx); }
export async function PATCH(req: NextRequest, ctx: { params: { path: string[] } }) { return handleAll(req, ctx); }
