import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── 공개 엔드포인트 보호: IP별 제출 제한 (PM2 fork 단일 인스턴스에서 유지) ──
const WINDOW_MS = 10 * 60 * 1000; // 10분
const MAX_SUBMITS = 5; // 윈도우당 최대 제출 수
type RateEntry = { count: number; firstAt: number };
const submits = new Map<string, RateEntry>();

function getIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkRate(ip: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const e = submits.get(ip);
  if (!e || now - e.firstAt > WINDOW_MS) {
    submits.set(ip, { count: 1, firstAt: now });
    return { ok: true };
  }
  if (e.count >= MAX_SUBMITS) {
    return { ok: false, retryAfter: Math.ceil((e.firstAt + WINDOW_MS - now) / 1000) };
  }
  e.count += 1;
  return { ok: true };
}

// ── 필드 길이 상한 (대용량 payload·메일 폭주 방지) ──
const LIMITS: Record<string, number> = {
  company: 100,
  name: 50,
  phone: 20,
  email: 100,
  location: 100,
  purpose: 50,
  inquiryType: 30,
  message: 2000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
  const ip = getIp(req);
  const rate = checkRate(ip);
  if (!rate.ok) {
    return NextResponse.json(
      { error: `잠시 후 다시 시도해주세요. (${rate.retryAfter}초)` },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } }
    );
  }

  const body = await req.json();
  const { company, name, phone, email, location, purpose, inquiryType, message, website } = body;

  // 허니팟: 사람에게 보이지 않는 필드가 채워졌으면 봇 → 조용히 성공 처리(메일 미발송)
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!company || !name || !phone || !email || !purpose || !message) {
    return NextResponse.json({ error: "필수 항목을 모두 입력해주세요." }, { status: 400 });
  }

  // 타입·길이 검증 (서버측 — 클라이언트 우회 방지)
  for (const [key, max] of Object.entries(LIMITS)) {
    const v = body[key];
    if (v != null && (typeof v !== "string" || v.length > max)) {
      return NextResponse.json({ error: "입력값이 올바르지 않습니다." }, { status: 400 });
    }
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "올바른 이메일 형식이 아닙니다." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE === "true",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    authMethod: "LOGIN",
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  const today = new Date().toISOString().slice(0, 10);
  const subjectType = inquiryType ?? "문의";

  const e = {
    company: escapeHtml(company),
    name: escapeHtml(name),
    phone: escapeHtml(phone),
    email: escapeHtml(email),
    location: escapeHtml(location || "-"),
    purpose: escapeHtml(purpose),
    message: escapeHtml(message),
    inquiryType: escapeHtml(inquiryType ?? "-"),
  };

  await transporter.sendMail({
    from: `"emersia" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject: `[emersia] ${subjectType}_${today}`,
    text: `문의 유형: ${inquiryType}\n회사명: ${company}\n담당자명: ${name}\n연락처: ${phone}\n이메일: ${email}\n현장 위치: ${location || "-"}\n도입 목적: ${purpose}\n\n문의 내용:\n${message}`,
    html: `
      <table style="font-family:sans-serif;font-size:14px;color:#1e293b;width:100%;max-width:560px;border-collapse:collapse;">
        <tr><td style="padding:24px 24px 0;background:#0f4c81;border-radius:8px 8px 0 0;">
          <p style="margin:0;font-size:18px;font-weight:700;color:#fff;">emersia 문의 접수</p>
          <p style="margin:4px 0 0;font-size:13px;color:#93c5fd;">${e.inquiryType}</p>
        </td></tr>
        <tr><td style="padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0 0 8px 8px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;width:90px;font-weight:600;color:#64748b;">문의 유형</td>
              <td style="padding:8px 0;">${e.inquiryType}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#64748b;">회사명</td>
              <td style="padding:8px 0;">${e.company}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#64748b;">담당자명</td>
              <td style="padding:8px 0;">${e.name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#64748b;">연락처</td>
              <td style="padding:8px 0;">${e.phone}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#64748b;">이메일</td>
              <td style="padding:8px 0;"><a href="mailto:${e.email}" style="color:#0f4c81;">${e.email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#64748b;">현장 위치</td>
              <td style="padding:8px 0;">${e.location}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#64748b;">도입 목적</td>
              <td style="padding:8px 0;">${e.purpose}</td>
            </tr>
            <tr>
              <td style="padding:16px 0 8px;font-weight:600;color:#64748b;vertical-align:top;">문의 내용</td>
              <td style="padding:16px 0 8px;white-space:pre-line;">${e.message}</td>
            </tr>
          </table>
        </td></tr>
      </table>
    `,
  });

  return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] sendMail error:", err);
    return NextResponse.json(
      { error: "메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
