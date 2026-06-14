import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NEW_API = 'https://api.aiapisave.xyz';
const ADMIN_ACCESS_TOKEN = process.env.NEWAPI_ACCESS_TOKEN || '05b0870fa1bbf5fccc6bee49c798b048';

async function adminFetch(path: string, options: RequestInit = {}) {
  return fetch(`${NEW_API}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADMIN_ACCESS_TOKEN}`,
      'New-Api-User': '1',
    },
    cache: 'no-store',
  });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Fetch in parallel
    const [selfRes, logsRes, channelsRes] = await Promise.all([
      adminFetch('/api/user/self'),
      adminFetch('/api/log/self?p=0&size=20'),
      adminFetch('/api/channel/?p=0&size=10'),
    ]);

    const [selfData, logsData, channelsData] = await Promise.all([
      selfRes.json() as Promise<any>,
      logsRes.json() as Promise<any>,
      channelsRes.json() as Promise<any>,
    ]);

    // Parse user data
    const user = selfData?.data || {};
    const balance = typeof user.quota === 'number' ? user.quota : 0;
    const usedQuota = typeof user.used_quota === 'number' ? user.used_quota : 0;
    const requestCount = typeof user.request_count === 'number' ? user.request_count : 0;

    // Parse logs
    const logItems = logsData?.data?.items || [];
    const totalLogs = logsData?.data?.total || 0;

    // Aggregate hourly usage (last 24h)
    const now = Math.floor(Date.now() / 1000);
    const dayAgo = now - 86400;
    const hourlyRequests: number[] = new Array(24).fill(0);
    const hourlyQuota: number[] = new Array(24).fill(0);

    let todayTokens = 0;
    let todayQuota = 0;
    let monthTokens = 0;
    let monthQuota = 0;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayTs = Math.floor(todayStart.getTime() / 1000);
    const monthStart = new Date(todayStart.getFullYear(), todayStart.getMonth(), 1);
    const monthTs = Math.floor(monthStart.getTime() / 1000);

    const recentLogs: Array<{
      model: string;
      tokens: number;
      quota: number;
      time: number;
      channel_id: number;
    }> = [];

    for (const log of logItems) {
      const hour = new Date(log.created_at * 1000).getHours();
      hourlyRequests[hour]++;
      hourlyQuota[hour] += log.quota || 0;

      const tokens = (log.prompt_tokens || 0) + (log.completion_tokens || 0);
      if (log.created_at >= todayTs) {
        todayTokens += tokens;
        todayQuota += log.quota || 0;
      }
      if (log.created_at >= monthTs) {
        monthTokens += tokens;
        monthQuota += log.quota || 0;
      }

      // Recent 10 for activity table
      if (recentLogs.length < 10) {
        recentLogs.push({
          model: log.model_name || 'unknown',
          tokens,
          quota: log.quota || 0,
          time: log.created_at,
          channel_id: log.channel,
        });
      }
    }

    // Parse channels
    const rawChannels = channelsData?.data?.items || [];
    const channels = rawChannels.map((ch: any) => ({
      id: ch.id,
      name: ch.name,
      provider: ch.name,
      models: ch.models ? ch.models.split(',').length : 0,
      status: ch.status === 1 ? 'active' : 'inactive',
      used_quota: ch.used_quota || 0,
    }));

    return NextResponse.json({
      success: true,
      data: {
        user: {
          username: user.username || session.user.name || 'User',
          email: session.user.email,
          balance,
          used_quota: usedQuota,
          request_count: requestCount,
        },
        stats: {
          today_tokens: todayTokens,
          today_quota: todayQuota,
          month_tokens: monthTokens,
          month_quota: monthQuota,
          total_requests: totalLogs,
        },
        hourly: {
          requests: hourlyRequests,
          quota: hourlyQuota,
        },
        channels,
        recent_logs: recentLogs,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || 'Dashboard fetch failed',
    }, { status: 500 });
  }
}
