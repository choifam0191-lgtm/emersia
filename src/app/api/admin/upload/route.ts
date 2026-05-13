import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CASES_PATH = path.join(process.cwd(), "src", "data", "cases.json");
const PUBLIC_CASES = path.join(process.cwd(), "public", "cases");

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

function slugSafe(s: string): string {
  return s.replace(/[^a-z0-9-]/g, "");
}

function readCases() {
  return JSON.parse(fs.readFileSync(CASES_PATH, "utf-8")) as {
    cases: { slug: string; mainImage: string; gallery: string[] }[];
  };
}

function writeCases(data: ReturnType<typeof readCases>) {
  fs.writeFileSync(CASES_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const rawSlug = formData.get("slug") as string | null;
    const type = formData.get("type") as "main" | "gallery" | null;

    if (!file || !rawSlug || !type) {
      return NextResponse.json({ error: "file, slug, type 필수입니다." }, { status: 400 });
    }

    const slug = slugSafe(rawSlug);
    if (!slug) return NextResponse.json({ error: "유효하지 않은 slug" }, { status: 400 });

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "JPEG, PNG, WEBP, GIF만 업로드 가능합니다." }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "파일 크기는 10MB 이하여야 합니다." }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const filename = type === "main" ? `main.${ext}` : `gallery-${Date.now()}.${ext}`;
    const dir = path.join(PUBLIC_CASES, slug);
    fs.mkdirSync(dir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(dir, filename), buffer);

    const publicPath = `/cases/${slug}/${filename}`;

    // Update cases.json
    const data = readCases();
    const caseIndex = data.cases.findIndex((c) => c.slug === slug);
    if (caseIndex !== -1) {
      if (type === "main") {
        data.cases[caseIndex].mainImage = publicPath;
      } else {
        if (!Array.isArray(data.cases[caseIndex].gallery)) {
          data.cases[caseIndex].gallery = [];
        }
        data.cases[caseIndex].gallery.push(publicPath);
      }
      writeCases(data);
    }

    return NextResponse.json({ ok: true, path: publicPath });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "업로드 실패" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { slug: rawSlug, filePath } = await req.json();
    const slug = slugSafe(rawSlug ?? "");

    if (!slug || !filePath) {
      return NextResponse.json({ error: "slug와 filePath 필수입니다." }, { status: 400 });
    }

    // filePath must start with /cases/[slug]/
    const expectedPrefix = `/cases/${slug}/`;
    if (!filePath.startsWith(expectedPrefix)) {
      return NextResponse.json({ error: "접근 불가 경로입니다." }, { status: 403 });
    }

    const absPath = path.join(process.cwd(), "public", filePath);
    if (fs.existsSync(absPath)) {
      fs.unlinkSync(absPath);
    }

    // Update cases.json
    const data = readCases();
    const caseIndex = data.cases.findIndex((c) => c.slug === slug);
    if (caseIndex !== -1) {
      const c = data.cases[caseIndex];
      if (c.mainImage === filePath) {
        c.mainImage = "";
      } else {
        c.gallery = (c.gallery ?? []).filter((g) => g !== filePath);
      }
      writeCases(data);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
