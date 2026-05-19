import Link from "next/link";
import { getContent } from "@/lib/content";

const siteLinks = [
  { label: "홈", href: "/" },
  { label: "회사소개", href: "/company" },
  { label: "자료실", href: "/resources" },
  { label: "설치사례", href: "/cases" },
  { label: "문의", href: "/contact" },
];

export function Footer() {
  const { contact } = getContent();

  return (
    <footer className="border-t border-hairline/60 bg-canvas">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* 브랜드 */}
          <div>
            <p className="text-sm font-bold text-ink-900">emersia</p>
            <p className="mt-1 text-xs text-mist">(주)영우테크</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              LTE 기반 스마트 안전방송 시스템으로
              <br />건설현장 안전을 지원합니다.
            </p>
          </div>

          {/* 사이트맵 */}
          <div>
            <p className="text-sm font-semibold text-ink-900">사이트맵</p>
            <ul className="mt-3 space-y-2">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-600 transition hover:text-safety-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <p className="text-sm font-semibold text-ink-900">연락처</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-600">
              <li>
                이메일:{" "}
                <a href={`mailto:${contact.email}`} className="text-safety-blue hover:underline">
                  {contact.email}
                </a>
              </li>
              <li>
                전화:{" "}
                <a href={`tel:${contact.phone}`} className="transition hover:text-safety-blue">
                  {contact.phone}
                </a>
              </li>
              <li>
                카카오톡:{" "}
                <a
                  href={contact.kakao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-safety-blue hover:underline"
                >
                  채널 바로가기
                </a>
              </li>
              <li>주소: {contact.address}</li>
            </ul>
          </div>
        </div>

        {/* 사업자 정보 */}
        <div className="mt-10 border-t border-hairline/40 pt-8">
          <div className="space-y-1 text-xs leading-relaxed text-mist">
            <p>대표: 최종임 | 사업자등록번호: 132-81-89811</p>
            <p>통신판매업 신고증 번호: 제 2011-경기구리-0315호</p>
          </div>
          <p className="mt-4 text-xs text-mist/70">
            © {new Date().getFullYear()} (주)영우테크. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
