import { NextRequest, NextResponse } from 'next/server';

// ⚠️ Set STRIPE_SECRET_KEY in Vercel environment variables
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aiapisave.xyz';

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = globalThis.__users?.get('session_' + auth);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { amount } = await req.json();
    if (!amount || amount < 100) {
      return NextResponse.json({ error: 'Minimum amount is $1.00' }, { status: 400 });
    }

    if (!STRIPE_SECRET_KEY) {
      // Dev mode: simulate payment
      user.balance = (user.balance || 0) + amount;
      globalThis.__users?.set('session_' + auth, user);
      return NextResponse.json({ success: true, url: null });
    }

    // Real Stripe checkout
    const stripe = require('stripe')(STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'alipay'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Token Hacker Balance Top-Up' },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${BASE_URL}/en/topup?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/en/topup`,
      metadata: { userId: user.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
