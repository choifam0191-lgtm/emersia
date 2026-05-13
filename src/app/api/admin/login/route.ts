import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function computeToken(password: string): string {
  return crypto
    .createHash("sha256")
    .update(`${password}:emersia-admin-session`)
    .digest("hex");
}

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "비밀번호를 입력해 주세요." }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!adminPassword) {
    return NextResponse.json({ error: "서버 설정 오류." }, { status: 500 });
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const token = computeToken(adminPassword);

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8시간
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
