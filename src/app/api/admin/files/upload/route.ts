import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILES: Record<string, string> = {
  catalog: path.join(process.cwd(), "public", "3S_catalog.pdf"),
  proposal: path.join(process.cwd(), "public", "3S_propo.pdf"),
};

const MAX_BYTES = 50 * 1024 * 1024; // 50 MB

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "요청 파싱 실패" }, { status: 400 });
  }

  const type = formData.get("type");
  const file = formData.get("file");

  if (typeof type !== "string" || !FILES[type]) {
    return NextResponse.json({ error: "잘못된 파일 종류입니다." }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
  }
  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "PDF 파일만 업로드할 수 있습니다." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "파일 크기는 50MB 이하여야 합니다." }, { status: 400 });
  }

  const targetPath = FILES[type];
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const bytes = await file.arrayBuffer();
  fs.writeFileSync(targetPath, Buffer.from(bytes));

  return NextResponse.json({ ok: true });
}
