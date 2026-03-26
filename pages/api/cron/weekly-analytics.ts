import type { NextApiRequest, NextApiResponse } from 'next';
import * as nodemailer from 'nodemailer';
import { emailConfig } from '../../../email/config';
import prisma from '../../../lib/prisma';

const RECIPIENTS = [
  'sybil@rahn.co.za',
  'ashlin@rahn.co.za',
  'raymondvdb@rahn.co.za',
];

const db = prisma as any;

function isAuthorized(req: NextApiRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers['authorization'];
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) return true;
  // Also allow if called with admin session cookie (for manual sends)
  const cookie = req.cookies?.admin_session;
  if (cookie) {
    try {
      const { verifySession } = require('../../../lib/auth');
      return verifySession(cookie);
    } catch {
      return false;
    }
  }
  return false;
}

function bar(value: number, max: number, width = 20): string {
  const filled = max > 0 ? Math.round((value / max) * width) : 0;
  return '█'.repeat(filled) + '░'.repeat(width - filled);
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-ZA', { weekday: 'short', month: 'short', day: 'numeric' });
}

function pctChange(current: number, previous: number): string {
  if (previous === 0) return current > 0 ? '+100%' : '0%';
  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
}

function pctColor(current: number, previous: number): string {
  if (current >= previous) return '#22c55e';
  return '#ef4444';
}

async function getGeminiTrends(summary: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return '';
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are analyzing website analytics for RAHN Consolidated, a South African compliance and recruitment consultancy. Write a 3-4 sentence professional insight about these weekly analytics: ${summary}. Focus on notable trends, growth patterns, and any recommendations. Be concise and professional.`
            }]
          }]
        }),
        signal: AbortSignal.timeout(8000),
      }
    );
    const data = await res.json();
    if (data.error) return '';
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
  } catch {
    return '';
  }
}

export async function runWeeklyAnalyticsEmail(): Promise<{ success: boolean; message: string }> {
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - 7);
  weekStart.setHours(0, 0, 0, 0);

  const prevWeekStart = new Date(weekStart);
  prevWeekStart.setDate(prevWeekStart.getDate() - 7);
  const prevWeekEnd = new Date(weekStart);

  // Fetch this week + previous week data
  const [thisWeek, lastWeek] = await Promise.all([
    db.pageView.findMany({
      where: { createdAt: { gte: weekStart } },
      select: { path: true, ip: true, country: true, city: true, createdAt: true },
    }),
    db.pageView.findMany({
      where: { createdAt: { gte: prevWeekStart, lt: prevWeekEnd } },
      select: { path: true, ip: true },
    }),
  ]);

  const totalThis = thisWeek.length;
  const totalLast = lastWeek.length;
  const uniqueIPs = new Set(thisWeek.map((v: any) => v.ip).filter(Boolean)).size;
  const uniqueIPsLast = new Set(lastWeek.map((v: any) => v.ip).filter(Boolean)).size;

  // Top pages
  const pageCounts: Record<string, number> = {};
  for (const v of thisWeek) {
    pageCounts[v.path] = (pageCounts[v.path] || 0) + 1;
  }
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // Top countries
  const countryCounts: Record<string, number> = {};
  for (const v of thisWeek) {
    if (v.country) countryCounts[v.country] = (countryCounts[v.country] || 0) + 1;
  }
  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Daily breakdown (last 7 days)
  const dailyMap: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dailyMap[d.toISOString().slice(0, 10)] = 0;
  }
  for (const v of thisWeek) {
    const key = new Date(v.createdAt).toISOString().slice(0, 10);
    if (key in dailyMap) dailyMap[key] = (dailyMap[key] || 0) + 1;
  }
  const dailyEntries = Object.entries(dailyMap);
  const dailyMax = Math.max(...dailyEntries.map(([, c]) => c), 1);

  // AI trend analysis
  const summaryText = `Total views this week: ${totalThis} (vs ${totalLast} last week). Unique visitors: ${uniqueIPs}. Top pages: ${topPages.slice(0, 3).map(([p, c]) => `${p} (${c} views)`).join(', ')}. Top countries: ${topCountries.slice(0, 3).map(([c, n]) => `${c} (${n})`).join(', ')}.`;
  const aiInsights = await getGeminiTrends(summaryText);

  const weekLabel = `${formatDate(weekStart)} – ${formatDate(now)}`;
  const viewChange = pctChange(totalThis, totalLast);
  const viewChangeColor = pctColor(totalThis, totalLast);
  const visitorChange = pctChange(uniqueIPs, uniqueIPsLast);
  const visitorChangeColor = pctColor(uniqueIPs, uniqueIPsLast);

  // Build HTML email
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>RAHN Weekly Analytics Report</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

  <!-- Header -->
  <tr>
    <td style="background:linear-gradient(135deg,#1a3a5c 0%,#2563eb 100%);border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
      <div style="color:#93c5fd;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;">Weekly Report</div>
      <div style="color:#ffffff;font-size:26px;font-weight:700;margin-bottom:4px;">RAHN Analytics</div>
      <div style="color:#bfdbfe;font-size:14px;">${weekLabel}</div>
    </td>
  </tr>

  <!-- Stats row -->
  <tr>
    <td style="background:#ffffff;padding:28px 40px 20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="25%" style="text-align:center;padding:12px 8px;background:#f8fafc;border-radius:10px;margin:0 4px;">
            <div style="font-size:28px;font-weight:700;color:#1a3a5c;">${totalThis.toLocaleString()}</div>
            <div style="font-size:11px;color:#64748b;margin:4px 0 6px;">Total Views</div>
            <div style="font-size:12px;font-weight:600;color:${viewChangeColor};">${viewChange} vs last week</div>
          </td>
          <td width="4%"></td>
          <td width="25%" style="text-align:center;padding:12px 8px;background:#f8fafc;border-radius:10px;">
            <div style="font-size:28px;font-weight:700;color:#1a3a5c;">${uniqueIPs.toLocaleString()}</div>
            <div style="font-size:11px;color:#64748b;margin:4px 0 6px;">Unique Visitors</div>
            <div style="font-size:12px;font-weight:600;color:${visitorChangeColor};">${visitorChange} vs last week</div>
          </td>
          <td width="4%"></td>
          <td width="25%" style="text-align:center;padding:12px 8px;background:#f8fafc;border-radius:10px;">
            <div style="font-size:28px;font-weight:700;color:#1a3a5c;">${totalLast.toLocaleString()}</div>
            <div style="font-size:11px;color:#64748b;margin:4px 0 6px;">Last Week Views</div>
            <div style="font-size:12px;font-weight:600;color:#94a3b8;">comparison</div>
          </td>
          <td width="4%"></td>
          <td width="25%" style="text-align:center;padding:12px 8px;background:#f8fafc;border-radius:10px;">
            <div style="font-size:28px;font-weight:700;color:#1a3a5c;">${topCountries.length}</div>
            <div style="font-size:11px;color:#64748b;margin:4px 0 6px;">Countries</div>
            <div style="font-size:12px;font-weight:600;color:#94a3b8;">reached</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Daily chart -->
  <tr>
    <td style="background:#ffffff;padding:0 40px 24px;">
      <div style="font-size:14px;font-weight:700;color:#1a3a5c;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid #e2e8f0;">📈 Daily Views</div>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${dailyEntries.map(([date, count]) => {
    const barWidth = dailyMax > 0 ? Math.round((count / dailyMax) * 100) : 0;
    const label = new Date(date + 'T12:00:00').toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' });
    return `<tr>
          <td style="width:80px;font-size:11px;color:#64748b;padding:3px 8px 3px 0;">${label}</td>
          <td style="padding:3px 0;">
            <div style="display:inline-block;background:linear-gradient(90deg,#2563eb,#3b82f6);height:18px;width:${Math.max(barWidth, 2)}%;border-radius:3px;vertical-align:middle;min-width:4px;"></div>
          </td>
          <td style="width:30px;font-size:11px;color:#1a3a5c;font-weight:600;padding:3px 0 3px 8px;">${count}</td>
        </tr>`;
  }).join('')}
      </table>
    </td>
  </tr>

  <!-- Top pages -->
  <tr>
    <td style="background:#ffffff;padding:0 40px 24px;">
      <div style="font-size:14px;font-weight:700;color:#1a3a5c;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid #e2e8f0;">🏆 Top Pages</div>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr style="background:#f8fafc;">
          <th style="text-align:left;font-size:11px;color:#64748b;padding:8px 12px;font-weight:600;text-transform:uppercase;">Page</th>
          <th style="text-align:right;font-size:11px;color:#64748b;padding:8px 12px;font-weight:600;text-transform:uppercase;">Views</th>
          <th style="text-align:right;font-size:11px;color:#64748b;padding:8px 12px;font-weight:600;text-transform:uppercase;">Share</th>
        </tr>
        ${topPages.map(([path, count], i) => `
        <tr style="background:${i % 2 === 0 ? '#ffffff' : '#f8fafc'};">
          <td style="font-size:12px;color:#334155;padding:8px 12px;font-family:monospace;">${path}</td>
          <td style="font-size:12px;color:#1a3a5c;font-weight:600;text-align:right;padding:8px 12px;">${count}</td>
          <td style="font-size:12px;color:#64748b;text-align:right;padding:8px 12px;">${totalThis > 0 ? ((count / totalThis) * 100).toFixed(1) : 0}%</td>
        </tr>`).join('')}
        ${topPages.length === 0 ? '<tr><td colspan="3" style="text-align:center;color:#94a3b8;padding:16px;font-size:12px;">No page views this week</td></tr>' : ''}
      </table>
    </td>
  </tr>

  <!-- Top countries -->
  <tr>
    <td style="background:#ffffff;padding:0 40px 24px;">
      <div style="font-size:14px;font-weight:700;color:#1a3a5c;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid #e2e8f0;">🌍 Top Countries</div>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${topCountries.length === 0
    ? '<tr><td style="text-align:center;color:#94a3b8;padding:16px;font-size:12px;">No geo data yet — analytics will populate as visitors arrive</td></tr>'
    : topCountries.map(([country, count], i) => `
        <tr style="background:${i % 2 === 0 ? '#ffffff' : '#f8fafc'};">
          <td style="font-size:13px;color:#334155;padding:8px 12px;">${country}</td>
          <td style="font-size:13px;color:#1a3a5c;font-weight:600;text-align:right;padding:8px 12px;">${count} views</td>
          <td style="font-size:12px;color:#64748b;text-align:right;padding:8px 12px;">${totalThis > 0 ? ((count / totalThis) * 100).toFixed(1) : 0}%</td>
        </tr>`).join('')
  }
      </table>
    </td>
  </tr>

  ${aiInsights ? `
  <!-- AI Insights -->
  <tr>
    <td style="background:#ffffff;padding:0 40px 28px;">
      <div style="background:linear-gradient(135deg,#eff6ff,#dbeafe);border-left:4px solid #2563eb;border-radius:0 8px 8px 0;padding:16px 20px;">
        <div style="font-size:12px;font-weight:700;color:#1d4ed8;margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;">🤖 AI Trend Analysis</div>
        <div style="font-size:13px;color:#1e3a5f;line-height:1.7;">${aiInsights}</div>
      </div>
    </td>
  </tr>` : ''}

  <!-- Footer -->
  <tr>
    <td style="background:#1a3a5c;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
      <div style="color:#bfdbfe;font-size:11px;">RAHN Consolidated &bull; Analytics Report &bull; ${new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
      <div style="color:#60a5fa;font-size:11px;margin-top:4px;">Automated by RAHN CMS &bull; View full analytics at <a href="https://rahn.co.za/admin/analytics" style="color:#93c5fd;">admin dashboard</a></div>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  // Send email
  const transporter = nodemailer.createTransport({
    host: emailConfig.SMTP_SERVER,
    port: emailConfig.SMTP_PORT,
    secure: false,
    auth: { user: emailConfig.SMTP_USERNAME, pass: emailConfig.SMTP_PASSWORD },
  });

  await transporter.sendMail({
    from: `RAHN Analytics <${emailConfig.EMAIL_FROM}>`,
    to: RECIPIENTS.join(', '),
    subject: `📊 RAHN Weekly Analytics Report — ${weekLabel}`,
    html,
    text: `RAHN Weekly Analytics Report (${weekLabel})\n\nTotal Views: ${totalThis} (${viewChange} vs last week)\nUnique Visitors: ${uniqueIPs}\nLast Week Views: ${totalLast}\n\nTop Pages:\n${topPages.map(([p, c]) => `  ${p}: ${c}`).join('\n')}\n\nTop Countries:\n${topCountries.map(([c, n]) => `  ${c}: ${n}`).join('\n')}\n\n${aiInsights ? `AI Insights:\n${aiInsights}` : ''}`,
  });

  return { success: true, message: `Report sent to ${RECIPIENTS.join(', ')}` };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await runWeeklyAnalyticsEmail();
    return res.json(result);
  } catch (error: any) {
    console.error('Weekly analytics email error:', error);
    return res.status(500).json({ error: error.message || 'Failed to send report' });
  }
}
