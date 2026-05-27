import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ANALYTICS_PATH = path.join(process.cwd(), "src", "data", "analytics.json");
const TRACKED = new Set(["/", "/company", "/resources", "/cases", "/contact"]);
const BOT_RE = /bot|crawler|spider|crawling|slurp|mediapartners|facebookexternalhit|twitterbot|linkedinbot|pingdom|uptimerobot/i;

// IP-based dedup: one count per IP per page per day
const seen = new Set<string>();
let seenDate = "";

function getIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isDupe(ip: string, pagePath: string, date: string): boolean {
  if (date !== seenDate) {
    seen.clear();
    seenDate = date;
  }
  const key = `${ip}:${pagePath}`;
  if (seen.has(key)) return true;
  seen.add(key);
  return false;
}

type DayStat = { date: string; count: number };
type Analytics = { pageViews: Record<string, DayStat[]>; catalogDownloads: DayStat[] };

function today() {
  return new Date().toISOString().slice(0, 10);
}

function readAnalytics(): Analytics {
  try {
    return JSON.parse(fs.readFileSync(ANALYTICS_PATH, "utf-8"));
  } catch {
    return { pageViews: {}, catalogDownloads: [] };
  }
}

function writeAnalytics(data: Analytics) {
  fs.writeFileSync(ANALYTICS_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function increment(arr: DayStat[], date: string): DayStat[] {
  const idx = arr.findIndex((d) => d.date === date);
  if (idx === -1) return [...arr, { date, count: 1 }];
  const next = [...arr];
  next[idx] = { date, count: next[idx].count + 1 };
  return next;
}

export async function POST(req: NextRequest) {
  try {
    const ua = req.headers.get("user-agent") ?? "";
    if (BOT_RE.test(ua)) return NextResponse.json({ ok: true });

    const body = await req.json() as { path?: string };
    const pagePath = body.path;
    if (!pagePath || !TRACKED.has(pagePath)) return NextResponse.json({ ok: true });

    const date = today();
    const ip = getIp(req);
    if (isDupe(ip, pagePath, date)) return NextResponse.json({ ok: true });
    const data = readAnalytics();
    if (!data.pageViews[pagePath]) data.pageViews[pagePath] = [];
    data.pageViews[pagePath] = increment(data.pageViews[pagePath], date);
    writeAnalytics(data);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[pageview]", err);
    return NextResponse.json({ error: "기록 실패" }, { status: 500 });
  }
}
