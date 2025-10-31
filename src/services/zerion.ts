// Zerion API integration helpers
// NOTE: Requires env var VITE_ZERION_API_KEY

export type ZerionPortfolio = {
  total_value_usd: number;
};

export type ZerionHistoryPoint = {
  // timestamp in seconds or ISO string; we only need value
  date?: string;
  time?: number;
  value: number; // USD value
};

const ZERION_API = "https://api.zerion.io";
const ZERION_API_PROXY = "/api/zerion"; // vite dev proxy fallback

export function hasZerionApiKey(): boolean {
  const bearer = import.meta.env.VITE_ZERION_API_KEY as string | undefined;
  const basic = import.meta.env.VITE_ZERION_BASIC_TOKEN as string | undefined;
  return Boolean(bearer || basic);
}

function getApiKey(): string | null {
  const key = import.meta.env.VITE_ZERION_API_KEY as string | undefined;
  return key || null;
}

function getAuthHeaderValue(): string | null {
  // Prefer Basic if provided, else Bearer
  const basicRaw = (import.meta.env.VITE_ZERION_BASIC_TOKEN as string | undefined) || null;
  if (basicRaw) {
    const token = basicRaw.replace(/^Basic\s+/i, "");
    return `Basic ${token}`;
  }
  const bearer = getApiKey();
  if (bearer) return `Bearer ${bearer}`;
  return null;
}

function authHeaders(): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json", accept: "application/json" };
  const auth = getAuthHeaderValue();
  if (auth) headers["Authorization"] = auth;
  return headers;
}

async function tryFetchJson(url: string, headers: HeadersInit): Promise<any | null> {
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchZerionPortfolioUsd(address: string): Promise<number | null> {
  const headers = authHeaders();
  if (!("Authorization" in headers)) return null; // no api key

  // Zerion portfolio endpoint (currency in USD)
  const direct = `${ZERION_API}/v1/wallets/${address}/portfolio?filter[positions]=only_simple&currency=usd`;
  const proxied = `${ZERION_API_PROXY}/v1/wallets/${address}/portfolio?filter[positions]=only_simple&currency=usd`;
  const data = (await tryFetchJson(direct, headers)) ?? (await tryFetchJson(proxied, headers));
  // Try to be resilient to different response shapes
  const value =
    data?.data?.attributes?.positions?.total ||
    data?.data?.attributes?.total?.positions ||
    data?.data?.attributes?.position_total ||
    data?.data?.attributes?.total_value ||
    data?.data?.attributes?.value ||
    data?.data?.attributes?.portfolio?.total_value ||
    data?.data?.attributes?.portfolio?.value ||
    data?.total_value_usd;

  if (typeof value === "number") return value;

  // Some portfolio endpoints return an array of items with a summary field
  const maybeValue = data?.data?.[0]?.attributes?.portfolio?.value;
  return typeof maybeValue === "number" ? maybeValue : null;
}

export async function fetchZerionPortfolioHistoryUsd(
  address: string,
  opts?: { period?: string; resolution?: string },
): Promise<ZerionHistoryPoint[] | null> {
  const headers = authHeaders();
  if (!("Authorization" in headers)) return null; // no api key

  const period = opts?.period ?? "30d"; // 30 days by default
  const resolution = opts?.resolution ?? "1d";
  // A generic history endpoint (exact path may vary by plan/version). We try a common pattern.
  const candidates = [
    `${ZERION_API}/v1/wallets/${address}/portfolio/history?currency=usd&filter[positions]=only_simple&period=${period}&resolution=${resolution}`,
    `${ZERION_API}/v1/wallets/${address}/history?currency=usd&period=${period}&resolution=${resolution}`,
    `${ZERION_API_PROXY}/v1/wallets/${address}/portfolio/history?currency=usd&filter[positions]=only_simple&period=${period}&resolution=${resolution}`,
    `${ZERION_API_PROXY}/v1/wallets/${address}/history?currency=usd&period=${period}&resolution=${resolution}`,
  ];

  for (const url of candidates) {
    try {
      const data = await tryFetchJson(url, headers);
      if (!data) continue;
      // Normalize to array of points with value in USD
      // Common shapes: { data: { attributes: { history: [{ date, value }]}}}
      const arr: any[] =
        data?.data?.attributes?.history || data?.data?.attributes?.portfolio_history || data?.history || data?.data;
      if (Array.isArray(arr)) {
        const points: ZerionHistoryPoint[] = arr
          .map((p) => ({ value: p?.value ?? p?.attributes?.value ?? p?.portfolio_value, date: p?.date, time: p?.time }))
          .filter((p) => typeof p.value === "number");
        if (points.length) return points;
      }
    } catch {
      // try next candidate
    }
  }
  return null;
}

export function computeCreditScoreFromHistory(points: ZerionHistoryPoint[] | null): number | null {
  if (!points || !points.length) return null;
  const avg = points.reduce((sum, p) => sum + (p.value || 0), 0) / points.length;
  const score = 0.2 * avg; // 20% of average portfolio value over the period
  return Math.round(score);
}


