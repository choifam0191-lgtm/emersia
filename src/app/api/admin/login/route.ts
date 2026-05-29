import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function computeToken(password: string): string {
  return crypto
    .createHash("sha256")
    .update(`${password}:emersia-admin-session`)
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf-8");
  const bb = Buffer.from(b, "utf-8");
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

// IP 별 실패 횟수 (모듈 단일톤; PM2 fork 모드 단일 인스턴스에서 유지)
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 10;
const BLOCK_MS = 15 * 60 * 1000;
type Entry = { count: number; firstAt: number; blockedUntil: number };
const attempts = new Map<string, Entry>();

function getIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkRate(ip: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const e = attempts.get(ip);
  if (e?.blockedUntil && e.blockedUntil > now) {
    return { ok: false, retryAfter: Math.ceil((e.blockedUntil - now) / 1000) };
  }
  if (!e || now - e.firstAt > WINDOW_MS) {
    attempts.set(ip, { count: 0, firstAt: now, blockedUntil: 0 });
  }
  return { ok: true };
}

function recordFail(ip: string) {
  const now = Date.now();
  const e = attempts.get(ip) ?? { count: 0, firstAt: now, blockedUntil: 0 };
  e.count += 1;
  if (e.count >= MAX_FAILS) e.blockedUntil = now + BLOCK_MS;
  attempts.set(ip, e);
}

function recordSuccess(ip: string) {
  attempts.delete(ip);
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const rate = checkRate(ip);
  if (!rate.ok) {
    return NextResponse.json(
      { error: `잠시 후 다시 시도해주세요. (${rate.retryAfter}초)` },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } }
    );
  }

  const { password } = await req.json();

  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "비밀번호를 입력해 주세요." }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  // 미설정 시에도 일반 401로 응답 — 서버 상태를 외부에 노출하지 않음
  if (!adminPassword) {
    console.error("[admin/login] ADMIN_PASSWORD env not set");
    recordFail(ip);
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  if (!safeEqual(password, adminPassword)) {
    recordFail(ip);
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  recordSuccess(ip);
  const token = computeToken(adminPassword);

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
