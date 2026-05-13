import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CASES_PATH = path.join(process.cwd(), "src", "data", "cases.json");

export async function GET() {
  try {
    const raw = fs.readFileSync(CASES_PATH, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ error: "cases.json 읽기 실패" }, { status: 500 });
  }
}
