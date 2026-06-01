import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

const ANALYTICS_PATH = path.join(process.cwd(), "src", "data", "analytics.json");
const PDF_PATH = path.join(process.cwd(), "public", "3S_catalog.pdf");
const BOT_RE = /bot|crawler|spider|crawling|slurp|mediapartners|facebookexternalhit|twitterbot|linkedinbot|pingdom|uptimerobot/i;

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

export async function GET(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  if (!BOT_RE.test(ua)) {
    try {
      const date = today();
      const data = readAnalytics();
      data.catalogDownloads = increment(data.catalogDownloads, date);
      writeAnalytics(data);
    } catch (err) {
      console.error("[catalog/download] analytics 기록 실패:", err);
    }
  }

  try {
    const stat = fs.statSync(PDF_PATH);
    const nodeStream = fs.createReadStream(PDF_PATH);
    const webStream = Readable.toWeb(nodeStream) as unknown as ReadableStream;
    return new NextResponse(webStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="3S_catalog.pdf"',
        "Content-Length": String(stat.size),
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "PDF 파일을 찾을 수 없습니다." }, { status: 404 });
  }
}
