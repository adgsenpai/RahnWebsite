import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { requireAdmin } from '../../../lib/auth';

// Cast to access PageView model (types update after prisma generate)
const db = prisma as any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Total views
    const totalViews = await db.pageView.count();
    const todayViews = await db.pageView.count({
      where: { createdAt: { gte: todayStart } },
    });
    const weekViews = await db.pageView.count({
      where: { createdAt: { gte: weekAgo } },
    });
    const monthViews = await db.pageView.count({
      where: { createdAt: { gte: monthAgo } },
    });

    // Unique IPs (approximate unique visitors)
    const uniqueVisitors = await db.pageView.groupBy({
      by: ['ip'],
      _count: true,
    });

    // Top pages
    const topPages = await db.pageView.groupBy({
      by: ['path'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 20,
    });

    // Top countries
    const topCountries = await db.pageView.groupBy({
      by: ['country'],
      where: { country: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 20,
    });

    // Top cities
    const topCities = await db.pageView.groupBy({
      by: ['city', 'country'],
      where: { city: { not: null } },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 20,
    });

    // Recent visits (last 50)
    const recentVisits = await db.pageView.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        path: true,
        ip: true,
        country: true,
        city: true,
        userAgent: true,
        referer: true,
        createdAt: true,
      },
    });

    // Daily views for the last 30 days
    const dailyViews = await db.pageView.groupBy({
      by: ['createdAt'],
      where: { createdAt: { gte: monthAgo } },
      _count: { id: true },
    });

    // Aggregate daily views by date string
    const dailyMap: Record<string, number> = {};
    dailyViews.forEach((dv: any) => {
      const dateStr = new Date(dv.createdAt).toISOString().split('T')[0];
      dailyMap[dateStr] = (dailyMap[dateStr] || 0) + dv._count.id;
    });

    // Fill missing dates
    const dailyChart: { date: string; views: number }[] = [];
    for (let d = new Date(monthAgo); d <= now; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      dailyChart.push({ date: dateStr, views: dailyMap[dateStr] || 0 });
    }

    return res.json({
      totalViews,
      todayViews,
      weekViews,
      monthViews,
      uniqueVisitors: uniqueVisitors.length,
      topPages: topPages.map((p: any) => ({ path: p.path, views: p._count.id })),
      topCountries: topCountries.map((c: any) => ({
        country: c.country,
        views: c._count.id,
      })),
      topCities: topCities.map((c: any) => ({
        city: c.city,
        country: c.country,
        views: c._count.id,
      })),
      recentVisits,
      dailyChart,
    });
  } catch (err: any) {
    console.error('Analytics error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
