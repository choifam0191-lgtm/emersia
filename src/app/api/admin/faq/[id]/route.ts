import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FAQ_PATH = path.join(process.cwd(), "src", "data", "faq.json");

function readFaq(): { id: string; question: string; answer: string }[] {
  try {
    return JSON.parse(fs.readFileSync(FAQ_PATH, "utf-8")).items ?? [];
  } catch {
    return [];
  }
}

function writeFaq(items: { id: string; question: string; answer: string }[]) {
  fs.writeFileSync(FAQ_PATH, JSON.stringify({ items }, null, 2), "utf-8");
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { question, answer, direction } = await req.json();
    const items = readFaq();
    const idx = items.findIndex((x) => x.id === id);
    if (idx === -1) return NextResponse.json({ error: "항목 없음" }, { status: 404 });

    if (direction === "up" && idx > 0) {
      [items[idx - 1], items[idx]] = [items[idx], items[idx - 1]];
    } else if (direction === "down" && idx < items.length - 1) {
      [items[idx], items[idx + 1]] = [items[idx + 1], items[idx]];
    } else if (question !== undefined || answer !== undefined) {
      if (question !== undefined) items[idx].question = question;
      if (answer !== undefined) items[idx].answer = answer;
    }

    writeFaq(items);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const items = readFaq().filter((x) => x.id !== id);
    writeFaq(items);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
