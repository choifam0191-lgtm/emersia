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

export async function GET() {
  return NextResponse.json({ items: readFaq() });
}

export async function POST(req: NextRequest) {
  try {
    const { question, answer } = await req.json();
    if (!question?.trim() || !answer?.trim()) {
      return NextResponse.json({ error: "질문과 답변을 입력하세요." }, { status: 400 });
    }
    const items = readFaq();
    const id = String(Date.now());
    items.push({ id, question: question.trim(), answer: answer.trim() });
    writeFaq(items);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "추가 실패" }, { status: 500 });
  }
}
