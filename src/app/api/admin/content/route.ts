import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "src", "data", "content.json");

export async function GET() {
  try {
    const raw = fs.readFileSync(CONTENT_PATH, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ error: "content.json 읽기 실패" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { section, data } = await req.json();
    if (!section || data === undefined) {
      return NextResponse.json({ error: "section과 data가 필요합니다." }, { status: 400 });
    }
    const current = JSON.parse(fs.readFileSync(CONTENT_PATH, "utf-8"));
    current[section] = data;
    fs.writeFileSync(CONTENT_PATH, JSON.stringify(current, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "content.json 저장 실패" }, { status: 500 });
  }
}
