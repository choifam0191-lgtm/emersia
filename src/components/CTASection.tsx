import Link from "next/link";
import { ArrowRight, Download, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-slate-900 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 text-center">
        <p className="text-sm font-semibold text-blue-400">현장 맞춤 안내</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl md:leading-snug">
          현장에 맞는 안전방송 구성이<br className="hidden md:block" /> 필요하신가요?
        </h2>
        <p className="mt-4 mx-auto max-w-xl text-base leading-relaxed text-slate-400">
          간단한 문의만 남겨주시면 현장 조건에 맞춰 장비 구성, 설치 방식,
          도입 가능성을 안내드립니다.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact?type=demo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
          >
            무료 방문시연 신청
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact?type=quote"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-600 bg-transparent px-7 py-3.5 text-sm font-semibold text-white transition hover:border-slate-400 hover:bg-slate-800 sm:w-auto"
          >
            견적 문의하기
          </Link>
          <a
            href="/catalog/catalog-2026.pdf"
            download="catalog-2026.pdf"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-600 bg-transparent px-7 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-slate-400 hover:bg-slate-800 sm:w-auto"
          >
            카탈로그 다운로드
            <Download className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          이메일:{" "}
          <a href="mailto:hichoi333@naver.com" className="text-slate-400 hover:text-white transition">
            hichoi333@naver.com
          </a>
          {/* TODO: 전화번호 확정 후 아래 주석 해제 및 번호 입력 */}
          {/* <span className="mx-2">·</span>
          <a href="tel:XXXXXXXX" className="text-slate-400 hover:text-white transition">
            00-0000-0000
          </a> */}
        </p>
      </div>
    </section>
  );
}
