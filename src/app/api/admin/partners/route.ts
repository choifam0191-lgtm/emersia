import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PARTNERS_PATH = path.join(process.cwd(), "src", "data", "partners.json");
const PUBLIC_PARTNERS = path.join(process.cwd(), "public", "partners");

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

type Partner = { id: string; name: string; logo: string };

function read(): { partners: Partner[] } {
  return JSON.parse(fs.readFileSync(PARTNERS_PATH, "utf-8"));
}

function write(data: { partners: Partner[] }) {
  fs.writeFileSync(PARTNERS_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    return NextResponse.json(read());
  } catch {
    return NextResponse.json({ error: "파일 읽기 실패" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const name = (formData.get("name") as string | null)?.trim();

    if (!file || !name) {
      return NextResponse.json({ error: "file과 name은 필수입니다." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "JPEG, PNG, WEBP, GIF만 업로드 가능합니다." },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "파일 크기는 5MB 이하여야 합니다." }, { status: 400 });
    }

    const id = Date.now().toString();
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "png";
    const filename = `partner-${id}.${ext}`;

    fs.mkdirSync(PUBLIC_PARTNERS, { recursive: true });
    fs.writeFileSync(path.join(PUBLIC_PARTNERS, filename), Buffer.from(await file.arrayBuffer()));

    const publicPath = `/partners/${filename}`;
    const data = read();
    const newPartner: Partner = { id, name, logo: publicPath };
    data.partners.push(newPartner);
    write(data);

    return NextResponse.json({ ok: true, partner: newPartner });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "업로드 실패" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "id 필수" }, { status: 400 });

    const data = read();
    const partner = data.partners.find((p) => p.id === id);
    if (!partner) {
      return NextResponse.json({ error: "해당 협력사를 찾을 수 없습니다." }, { status: 404 });
    }

    if (partner.logo.startsWith("/partners/")) {
      const absPath = path.join(process.cwd(), "public", partner.logo);
      if (fs.existsSync(absPath)) fs.unlinkSync(absPath);
    }

    data.partners = data.partners.filter((p) => p.id !== id);
    write(data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, direction } = await req.json();
    if (!id || !direction) {
      return NextResponse.json({ error: "id와 direction 필수" }, { status: 400 });
    }

    const data = read();
    const idx = data.partners.findIndex((p) => p.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "해당 협력사를 찾을 수 없습니다." }, { status: 404 });
    }

    const newIdx = direction === "up" ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= data.partners.length) {
      return NextResponse.json({ error: "이동 불가" }, { status: 400 });
    }

    [data.partners[idx], data.partners[newIdx]] = [data.partners[newIdx], data.partners[idx]];
    write(data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "순서 변경 실패" }, { status: 500 });
  }
}
