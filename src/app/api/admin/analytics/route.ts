import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ANALYTICS_PATH = path.join(process.cwd(), "src", "data", "analytics.json");

const EMPTY = {
  pageViews: { "/": [], "/company": [], "/resources": [], "/cases": [], "/contact": [] },
  catalogDownloads: [],
  proposalDownloads: [],
};

type DayStat = { date: string; count: number };
type Analytics = {
  pageViews: Record<string, DayStat[]>;
  catalogDownloads: DayStat[];
  proposalDownloads: DayStat[];
};

function readAnalytics(): Analytics {
  try {
    const raw = JSON.parse(fs.readFileSync(ANALYTICS_PATH, "utf-8"));
    return { proposalDownloads: [], ...raw };
  } catch {
    return EMPTY;
  }
}

export async function GET() {
  return NextResponse.json(readAnalytics());
}

export async function DELETE() {
  try {
    fs.writeFileSync(ANALYTICS_PATH, JSON.stringify(EMPTY, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[analytics] 초기화 실패:", err);
    return NextResponse.json({ error: "초기화 실패" }, { status: 500 });
  }
}
