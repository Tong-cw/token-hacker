import { NextResponse } from 'next/server';
import { getModelRank } from '@/lib/model-rank';

const BACKEND_URL = process.env.NEW_API_URL || 'https://api.aiapisave.xyz';
const BACKEND_TOKEN = process.env.NEW_API_TOKEN || 'hTaKeyojP8ptefzfc6KbDPuopy5BSE7zIbiAm62rboS8CVQw';

// Base: $5 = 500,000 tokens at ratio 1
const QUOTA_PER_UNIT = 500000;
const PRICE_PER_UNIT = 5; // dollars
const DEFAULT_BULK_RATIO = 37.5;

export async function GET() {
  try {
    const [modelsRes, pricingRes] = await Promise.all([
      fetch(`${BACKEND_URL}/v1/models`, {
        headers: { Authorization: `Bearer ${BACKEND_TOKEN}` },
        cache: 'no-store',
      }),
      fetch(`${BACKEND_URL}/api/pricing`, {
        headers: { Authorization: `Bearer ${BACKEND_TOKEN}` },
        cache: 'no-store',
      }),
    ]);

    // Also include models with ratio=0 (explicitly set to free)
    function ratioToPrice(ratio: number): string {
      if (ratio === DEFAULT_BULK_RATIO) return '—';
      const pricePer1M = (ratio * PRICE_PER_UNIT * 1000000) / QUOTA_PER_UNIT;
      if (pricePer1M === 0) return 'Free';
      if (pricePer1M < 0.01) return '$' + pricePer1M.toFixed(4);
      return '$' + pricePer1M.toFixed(2);
    }

    const modelsData = await modelsRes.json();
    const pricingData = pricingRes.ok ? await pricingRes.json() : { data: [] };

    // Build pricing map: model_name → { input, output }
    const priceMap: Record<string, { input: string; output: string }> = {};
    (pricingData.data || []).forEach((p: any) => {
      priceMap[p.model_name] = {
        input: ratioToPrice(p.model_ratio || 1),
        output: ratioToPrice(p.completion_ratio || 1),
      };
    });

    type ModelEntry = { id: string; owned_by: string; pricing: { input: string; output: string } | null };
    const allModels: ModelEntry[] = (modelsData.data || []).map((m: any) => {
      const pricing = priceMap[m.id] || null;
      return { id: m.id, owned_by: m.owned_by || 'unknown', pricing };
    });

    // Only show models with both input AND output pricing configured
    const pricedModels = allModels.filter(
      (m: ModelEntry): boolean => (!!m.pricing && m.pricing.input !== '—' && m.pricing.output !== '—')
    );

    // Sort by usage frequency rank (descending), then alphabetically
    const sortedModels = pricedModels.sort((a: ModelEntry, b: ModelEntry) => {
      const rankA = getModelRank(a.id);
      const rankB = getModelRank(b.id);
      if (rankB !== rankA) return rankB - rankA;
      return a.id.localeCompare(b.id);
    });

    return NextResponse.json({ models: sortedModels });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 });
  }
}
