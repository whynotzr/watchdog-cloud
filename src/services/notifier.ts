import { env } from "../config/env.js";
import type { PingResult } from "./pinger.js";

export async function dispatchIncidentAlert(result: PingResult): Promise<void> {
  const message = `🚨 [WATCHDOG] Service DOWN: ${result.url} | HTTP ${result.statusCode} (${result.latencyMs}ms)`;

  const tasks: Promise<unknown>[] = [];

  if (env.DISCORD_WEBHOOK_URL) {
    tasks.push(
      fetch(env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message })
      })
    );
  }

  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    const tgUrl = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    tasks.push(
      fetch(tgUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: message })
      })
    );
  }

  await Promise.allSettled(tasks);
}
