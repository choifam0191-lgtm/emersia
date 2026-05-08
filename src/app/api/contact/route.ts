import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { company, name, phone, email, message } = await req.json();

  if (!company || !name || !phone || !email || !message) {
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
  });

  const today = new Date().toISOString().slice(0, 10);

  await transporter.sendMail({
    from: `"emersia" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject: `[emersia] 견적 요청 메일_${today}`,
    text: `회사명: ${company}\n이름: ${name}\n연락처: ${phone}\n이메일: ${email}\n\n문의 내용:\n${message}`,
    html: `
      <table style="font-family:sans-serif;font-size:14px;color:#1e293b;width:100%;max-width:560px;border-collapse:collapse;">
        <tr><td style="padding:24px 24px 0;background:#0f4c81;border-radius:8px 8px 0 0;">
          <p style="margin:0;font-size:18px;font-weight:700;color:#fff;">emersia 견적 문의</p>
        </td></tr>
        <tr><td style="padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0 0 8px 8px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;width:80px;font-weight:600;color:#64748b;">회사명</td>
              <td style="padding:8px 0;">${company}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#64748b;">이름</td>
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
              <td style="padding:16px 0 8px;font-weight:600;color:#64748b;vertical-align:top;">문의 내용</td>
              <td style="padding:16px 0 8px;white-space:pre-line;">${message}</td>
            </tr>
          </table>
        </td></tr>
      </table>
    `,
  });

  return NextResponse.json({ ok: true });
}
