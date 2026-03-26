/**
 * RAHN Weekly Analytics Cron Job
 *
 * Runs every Monday at 08:00 SAST (UTC+2 = 06:00 UTC).
 * Sends a weekly analytics report email to the RAHN team.
 *
 * Usage:
 *   npx ts-node scripts/cron.ts
 *   OR via pm2:
 *   pm2 start "npx ts-node scripts/cron.ts" --name rahn-cron
 *
 * Required env var:
 *   CRON_SECRET=<your-secret>  (must match env.local)
 */

import * as cron from 'node-cron';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load env variables from project root
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
// Fallback to env.local (the project uses env.local as the convention)
dotenv.config({ path: path.resolve(__dirname, '../env.local') });

import { runWeeklyAnalyticsEmail } from '../pages/api/cron/weekly-analytics';

const CRON_SCHEDULE = '0 6 * * 1'; // Every Monday at 06:00 UTC (= 08:00 SAST)

console.log(`[RAHN Cron] Starting — schedule: ${CRON_SCHEDULE} (Mon 08:00 SAST)`);
console.log(`[RAHN Cron] Next run: ${getNextMonday()}`);

function getNextMonday(): string {
  const now = new Date();
  const daysUntilMonday = (8 - now.getDay()) % 7 || 7;
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntilMonday);
  next.setHours(8, 0, 0, 0);
  return next.toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' }) + ' SAST';
}

cron.schedule(
  CRON_SCHEDULE,
  async () => {
    const timestamp = new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' });
    console.log(`[RAHN Cron] ${timestamp} — Running weekly analytics email...`);
    try {
      const result = await runWeeklyAnalyticsEmail();
      if (result.success) {
        console.log(`[RAHN Cron] ✓ ${result.message}`);
      } else {
        console.error(`[RAHN Cron] ✗ ${result.message}`);
      }
    } catch (err: any) {
      console.error('[RAHN Cron] ✗ Error:', err.message || err);
    }
  },
  {
    timezone: 'UTC',
  }
);

// Keep process alive
process.on('SIGINT', () => {
  console.log('\n[RAHN Cron] Shutting down gracefully.');
  process.exit(0);
});
