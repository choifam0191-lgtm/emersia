import { getContent } from "@/lib/content";

export function Footer() {
  const { contact } = getContent();

  return (
    <footer className="border-t border-hairline/60 bg-canvas">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">

        {/* ── 4열 가로 배치 (모바일 2×2 → 데스크탑 4열) ── */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-[1.2fr_1.1fr_1fr_1fr] lg:gap-x-8 lg:gap-y-0">

          {/* ── 1열: emersia 브랜드 ── */}
          <div>
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/footer-logos/YT_3S_logo.png"
                alt="3S Smart Safety System 로고"
                className="h-9 w-auto object-contain object-left"
              />
              <p className="text-xl font-bold text-ink-900">emersia</p>
            </div>
            <p className="mt-1 text-xs text-mist">㈜영우테크</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              LTE 기반 스마트 안전방송 시스템으로
              <br />건설현장 안전을 지원합니다.
            </p>
          </div>

          {/* ── 2열: 연락처 ── */}
          <div>
            <p className="text-sm font-semibold text-ink-900">연락처</p>
            <ul className="mt-3 space-y-1.5 text-xs text-ink-600">
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

          {/* ── 3열: 영우테크 (flex-col, 로고 mt-auto 하단 고정) ── */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-safety-blue">제조·공급</p>
            <div className="mt-2 space-y-1">
              <p className="text-sm font-semibold text-ink-900">㈜영우테크</p>
              <p className="text-xs text-mist">대표: 최종임</p>
              <p className="text-xs text-mist">사업자번호: 132-81-89811</p>
              <p className="text-xs text-mist">통신판매업: 제 2011-경기구리-0315호</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/footer-logos/YT_logo.png"
              alt="영우테크 인증 로고 (KC, 메인비즈, ISO 9001, G-CERTi)"
              className="mt-auto block h-[44px] w-auto object-contain object-left pt-4 md:h-[52px]"
            />
          </div>

          {/* ── 4열: 메디피아 (flex-col, 로고 mt-auto 하단 고정) ── */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-safety-blue">판매</p>
            <div className="mt-2 space-y-1">
              <p className="text-sm font-semibold text-ink-900">메디피아(주)</p>
              <p className="text-xs text-mist">대표: 최종임</p>
              <p className="text-xs text-mist">사업자번호: 726-87-03153</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/footer-logos/MP_logo.png"
              alt="메디피아 인증 로고 (한국ESG기업협회, 벤처확인기업)"
              className="mt-auto block h-[44px] w-auto object-contain object-left pt-4 md:h-[52px]"
            />
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
