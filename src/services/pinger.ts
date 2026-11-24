export interface PingResult {
  url: string;
  ok: boolean;
  statusCode: number;
  latencyMs: number;
  checkedAt: string;
  error?: string;
}

export async function pingEndpoint(url: string, timeoutMs = 8000): Promise<PingResult> {
  const start = performance.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { method: "GET", signal: controller.signal });
    const latencyMs = Math.round(performance.now() - start);
    return {
      url,
      ok: res.ok,
      statusCode: res.status,
      latencyMs,
      checkedAt: new Date().toISOString()
    };
  } catch (err) {
    return {
      url,
      ok: false,
      statusCode: 0,
      latencyMs: Math.round(performance.now() - start),
      checkedAt: new Date().toISOString(),
      error: err instanceof Error ? err.message : "Unknown network error"
    };
  } finally {
    clearTimeout(timer);
  }
}
