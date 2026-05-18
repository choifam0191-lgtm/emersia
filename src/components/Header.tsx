"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";

const navLinks = [
  { label: "홈", href: "/" },
  { label: "회사소개", href: "/company" },
  { label: "자료실", href: "/resources" },
  { label: "설치사례", href: "/cases" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        {/* 로고 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
          onClick={() => setOpen(false)}
        >
          <img src="/icon.png" alt="emersia" className="h-9 w-auto" width={36} height={36} />
          <span className="text-base font-bold tracking-tight text-slate-900">emersia</span>
        </Link>

        {/* 데스크탑 내비게이션 */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:text-blue-600 ${
                pathname === link.href ? "font-semibold text-blue-600" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 데스크탑 CTA */}
        <div className="hidden items-center gap-2.5 md:flex">
          <Link
            href="/contact?type=quote"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            견적문의
          </Link>
          <Link
            href="/contact?type=demo"
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            무료 방문시연
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <nav className="flex flex-col gap-1 px-5 py-4">
            <Link
              href="/"
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-slate-50 ${
                pathname === "/" ? "bg-blue-50 text-blue-600" : "text-slate-700"
              }`}
              onClick={() => setOpen(false)}
            >
              홈
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-slate-50 ${
                  pathname === link.href ? "bg-blue-50 text-blue-600" : "text-slate-700"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
              <Link
                href="/contact?type=demo"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                onClick={() => setOpen(false)}
              >
                무료 방문시연 신청
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact?type=quote"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                견적문의
              </Link>
              <a
                href="tel:031-523-2340"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                <Phone className="h-4 w-4" />
                031-523-2340
              </a>
              <a
                href="https://pf.kakao.com/_texjAX/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-yellow-300 px-4 py-3 text-sm font-semibold text-yellow-800 transition hover:bg-yellow-50"
                style={{ backgroundColor: "#FFFBEB" }}
                onClick={() => setOpen(false)}
              >
                카카오톡 상담
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
