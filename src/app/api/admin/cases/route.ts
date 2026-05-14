import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CASES_PATH = path.join(process.cwd(), "src", "data", "cases.json");

type CaseEntry = {
  slug: string;
  tags: string[];
  siteType: string;
  title: string;
  purpose: string;
  setup: string;
  features: string;
  effect: string;
  mainImage: string;
  gallery: string[];
  detail: {
    overview: string;
    problem: string;
    installConfig: string;
    operation: string;
    outcome: string;
  };
};

function read(): { cases: CaseEntry[] } {
  return JSON.parse(fs.readFileSync(CASES_PATH, "utf-8"));
}

function write(data: { cases: CaseEntry[] }) {
  fs.writeFileSync(CASES_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    return NextResponse.json(read());
  } catch {
    return NextResponse.json({ error: "cases.json 읽기 실패" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { slug, title, siteType } = await req.json();

    if (!slug || !title) {
      return NextResponse.json({ error: "slug와 title은 필수입니다." }, { status: 400 });
    }

    const safeSlug = slug.replace(/[^a-z0-9-]/g, "");
    if (!safeSlug) {
      return NextResponse.json({ error: "유효하지 않은 slug (영문 소문자·숫자·하이픈만 사용)" }, { status: 400 });
    }

    const data = read();
    if (data.cases.some((c) => c.slug === safeSlug)) {
      return NextResponse.json({ error: "이미 존재하는 slug입니다." }, { status: 409 });
    }

    const newCase: CaseEntry = {
      slug: safeSlug,
      tags: [],
      siteType: siteType ?? "",
      title,
      purpose: "",
      setup: "",
      features: "",
      effect: "",
      mainImage: "",
      gallery: [],
      detail: {
        overview: "",
        problem: "",
        installConfig: "",
        operation: "",
        outcome: "",
      },
    };

    data.cases.push(newCase);
    write(data);

    return NextResponse.json({ ok: true, slug: safeSlug });
  } catch {
    return NextResponse.json({ error: "사례 추가 실패" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { slug, data: patch } = await req.json();

    if (!slug || !patch) {
      return NextResponse.json({ error: "slug와 data는 필수입니다." }, { status: 400 });
    }

    const data = read();
    const idx = data.cases.findIndex((c) => c.slug === slug);
    if (idx === -1) {
      return NextResponse.json({ error: "사례를 찾을 수 없습니다." }, { status: 404 });
    }

    // merge — preserve photos
    data.cases[idx] = {
      ...data.cases[idx],
      ...patch,
      slug: data.cases[idx].slug,         // slug 변경 불가
      mainImage: data.cases[idx].mainImage, // 사진은 upload API로만
      gallery: data.cases[idx].gallery,
    };

    write(data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "사례 수정 실패" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { slug } = await req.json();
    if (!slug) return NextResponse.json({ error: "slug 필수" }, { status: 400 });

    const data = read();
    const before = data.cases.length;
    data.cases = data.cases.filter((c) => c.slug !== slug);

    if (data.cases.length === before) {
      return NextResponse.json({ error: "사례를 찾을 수 없습니다." }, { status: 404 });
    }

    write(data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "사례 삭제 실패" }, { status: 500 });
  }
}
