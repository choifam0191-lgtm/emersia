import { NextRequest, NextResponse } from "next/server";

async function computeToken(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${password}:emersia-admin-session`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("admin_token")?.value;
  const password = process.env.ADMIN_PASSWORD ?? "";
  const expected = await computeToken(password);
  const isAuthenticated = !!token && token === expected;

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
    const res = NextResponse.redirect(new URL("/admin", req.url));
    if (token) res.cookies.delete("admin_token");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
