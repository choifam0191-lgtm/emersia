import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "src", "data", "content.json");
const PUBLIC_COMPANY = path.join(process.cwd(), "public", "company");

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

function readContent() {
  return JSON.parse(fs.readFileSync(CONTENT_PATH, "utf-8"));
}

function writeContent(data: unknown) {
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function deleteCurrentHeroFile(content: { company?: { heroImage?: string | null } }) {
  const existing = content.company?.heroImage;
  if (existing && existing.startsWith("/company/")) {
    const absPath = path.join(process.cwd(), "public", existing);
    if (fs.existsSync(absPath)) fs.unlinkSync(absPath);
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "file 필수입니다." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "JPEG, PNG, WEBP만 업로드 가능합니다." }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "파일 크기는 10MB 이하여야 합니다." }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const filename = `hero.${ext}`;

    fs.mkdirSync(PUBLIC_COMPANY, { recursive: true });

    const content = readContent();
    deleteCurrentHeroFile(content); // 기존 파일 삭제
    fs.writeFileSync(path.join(PUBLIC_COMPANY, filename), Buffer.from(await file.arrayBuffer()));

    const publicPath = `/company/${filename}`;
    content.company.heroImage = publicPath;
    writeContent(content);

    return NextResponse.json({ ok: true, path: publicPath });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "업로드 실패" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const content = readContent();
    deleteCurrentHeroFile(content);
    content.company.heroImage = null;
    writeContent(content);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
