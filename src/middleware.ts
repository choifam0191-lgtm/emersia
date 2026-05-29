import { NextRequest, NextResponse } from "next/server";

async function computeToken(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${password}:emersia-admin-session`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("admin_token")?.value ?? "";
  const password = process.env.ADMIN_PASSWORD ?? "";
  const expected = password ? await computeToken(password) : "";
  const isAuthenticated = !!token && !!expected && timingSafeEqual(token, expected);

  // 로그인 페이지: 이미 인증된 경우 대시보드로
  if (pathname === "/admin") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 로그인 API: 항상 허용
  if (pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  // 나머지 /admin/* 및 /api/admin/*: 인증 필요
  if (!isAuthenticated) {
    // /api/admin/*: JSON 401 (API 친화)
    if (pathname.startsWith("/api/admin/")) {
      const res = NextResponse.json({ error: "unauthorized" }, { status: 401 });
      if (token) res.cookies.delete("admin_token");
      return res;
    }
    // /admin/*: 로그인 페이지로 리다이렉트 (브라우저 UX 유지)
    const res = NextResponse.redirect(new URL("/admin", req.url));
    if (token) res.cookies.delete("admin_token");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
