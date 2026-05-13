import Link from "next/link";

const siteLinks = [
  { label: "홈", href: "/" },
  { label: "회사소개", href: "/company" },
  { label: "자료실", href: "/resources" },
  { label: "설치사례", href: "/cases" },
  { label: "문의", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* 브랜드 */}
          <div>
            <p className="text-sm font-bold text-slate-900">emersia</p>
            <p className="mt-1 text-xs text-slate-500">(주)영우테크</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              LTE 기반 스마트 안전방송 시스템으로
              <br />건설현장 안전을 지원합니다.
            </p>
          </div>

          {/* 사이트맵 */}
          <div>
            <p className="text-sm font-semibold text-slate-900">사이트맵</p>
            <ul className="mt-3 space-y-2">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <p className="text-sm font-semibold text-slate-900">연락처</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                이메일:{" "}
                <a
                  href="mailto:hichoi333@naver.com"
                  className="text-blue-600 hover:underline"
                >
                  hichoi333@naver.com
                </a>
              </li>
              <li>
                전화:{" "}
                <a href="tel:031-523-2340" className="hover:text-blue-600 transition">
                  031-523-2340
                </a>
              </li>
              <li>
                카카오톡:{" "}
                <a
                  href="https://pf.kakao.com/_texjAX/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  채널 바로가기
                </a>
              </li>
              <li>주소: 경기도 구리시 이문안로 138 2층</li>
            </ul>
          </div>
        </div>

        {/* 사업자 정보 */}
        <div className="mt-10 border-t border-slate-100 pt-8">
          <div className="space-y-1 text-xs leading-relaxed text-slate-500">
            <p>대표: 최종임 | 사업자등록번호: 132-81-89811</p>
            <p>통신판매업 신고증 번호: 제 2011-경기구리-0315호</p>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            © {new Date().getFullYear()} (주)영우테크. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
