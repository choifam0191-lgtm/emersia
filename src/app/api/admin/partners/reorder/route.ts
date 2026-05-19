import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PARTNERS_PATH = path.join(process.cwd(), "src", "data", "partners.json");

type Partner = { id: string; name: string; logo: string };

function read(): { partners: Partner[] } {
  return JSON.parse(fs.readFileSync(PARTNERS_PATH, "utf-8"));
}

function write(data: { partners: Partner[] }) {
  fs.writeFileSync(PARTNERS_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
  try {
    const { orderedIds } = await req.json() as { orderedIds: string[] };
    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: "orderedIds 배열 필수" }, { status: 400 });
    }

    const data = read();
    const map = new Map(data.partners.map((p) => [p.id, p]));

    // orderedIds 기준으로 재정렬, 포함 안 된 항목은 뒤에 붙임
    const reordered: Partner[] = [];
    for (const id of orderedIds) {
      const p = map.get(id);
      if (p) reordered.push(p);
    }
    // orderedIds에 없는 항목은 그대로 append
    for (const p of data.partners) {
      if (!orderedIds.includes(p.id)) reordered.push(p);
    }

    data.partners = reordered;
    write(data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[reorder]", err);
    return NextResponse.json({ error: "순서 저장 실패" }, { status: 500 });
  }
}
