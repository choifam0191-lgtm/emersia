import { getContent } from "@/lib/content";

export function Footer() {
  const { contact } = getContent();

  return (
    <footer className="border-t border-hairline/60 bg-canvas">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">

        {/* ── 상단 블록: 2열 ── */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">

          {/* 좌측: 브랜드 소개 */}
          <div>
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/footer-logos/YT_3S_logo.png"
                alt="3S Smart Safety System 로고"
                className="h-8 w-auto object-contain"
              />
              <p className="text-base font-bold text-ink-900">emersia</p>
            </div>
            <p className="mt-1 text-xs text-mist">㈜영우테크</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              LTE 기반 스마트 안전방송 시스템으로
              <br />건설현장 안전을 지원합니다.
            </p>
          </div>

          {/* 우측: 연락처 */}
          <div>
            <p className="text-sm font-bold text-ink-900">연락처</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-600">
              <li>
                이메일:{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="text-safety-blue hover:underline"
                >
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
                  aria-label="카카오톡 채널 바로가기 (새 창으로 열림)"
                  className="text-safety-blue hover:underline"
                >
                  채널 바로가기
                </a>
              </li>
              <li>주소: {contact.address}</li>
            </ul>
          </div>
        </div>

        {/* ── 전체 너비 구분선 ── */}
        <hr className="my-8 border-hairline/60" />

        {/* ── 하단 블록: 2열 (영우테크 / 메디피아) ── */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">

          {/* 좌측 하단: 영우테크 인증 */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/footer-logos/YT_logo.png"
              alt="영우테크 인증 로고 (KC, 메인비즈, ISO 9001, G-CERTi)"
              className="h-10 w-auto object-contain md:h-12"
            />
            <p className="mt-3 text-xs font-semibold text-safety-blue">제조·공급</p>
            <div className="mt-2 space-y-1">
              <p className="text-sm font-semibold text-ink-900">㈜영우테크</p>
              <p className="text-xs text-mist">대표: 최종임</p>
              <p className="text-xs text-mist">사업자번호: 132-81-89811</p>
              <p className="text-xs text-mist">통신판매업: 제 2011-경기구리-0315호</p>
            </div>
          </div>

          {/* 우측 하단: 메디피아 인증 */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/footer-logos/MP_logo.png"
              alt="메디피아 인증 로고 (한국ESG기업협회, 벤처확인기업)"
              className="h-10 w-auto object-contain md:h-12"
            />
            <p className="mt-3 text-xs font-semibold text-safety-blue">판매</p>
            <div className="mt-2 space-y-1">
              <p className="text-sm font-semibold text-ink-900">메디피아(주)</p>
              <p className="text-xs text-mist">대표: 최종임</p>
              <p className="text-xs text-mist">사업자번호: 726-87-03153</p>
            </div>
          </div>
        </div>

        {/* ── 카피라이트 바 ── */}
        <div className="mt-10 border-t border-hairline/40 pt-6 text-center">
          <p className="text-xs text-mist/70">
            © {new Date().getFullYear()} ㈜영우테크. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
