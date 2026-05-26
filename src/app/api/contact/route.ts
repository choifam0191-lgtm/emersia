import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
  const { company, name, phone, email, location, purpose, inquiryType, message } =
    await req.json();

  if (!company || !name || !phone || !email || !purpose || !message) {
    return NextResponse.json({ error: "필수 항목을 모두 입력해주세요." }, { status: 400 });
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
          <p style="margin:4px 0 0;font-size:13px;color:#93c5fd;">${inquiryType ?? "문의"}</p>
        </td></tr>
        <tr><td style="padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0 0 8px 8px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;width:90px;font-weight:600;color:#64748b;">문의 유형</td>
              <td style="padding:8px 0;">${inquiryType ?? "-"}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#64748b;">회사명</td>
              <td style="padding:8px 0;">${company}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#64748b;">담당자명</td>
              <td style="padding:8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#64748b;">연락처</td>
              <td style="padding:8px 0;">${phone}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#64748b;">이메일</td>
              <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#0f4c81;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#64748b;">현장 위치</td>
              <td style="padding:8px 0;">${location || "-"}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#64748b;">도입 목적</td>
              <td style="padding:8px 0;">${purpose}</td>
            </tr>
            <tr>
              <td style="padding:16px 0 8px;font-weight:600;color:#64748b;vertical-align:top;">문의 내용</td>
              <td style="padding:16px 0 8px;white-space:pre-line;">${message}</td>
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
