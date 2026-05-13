import type { Metadata } from "next";
import { CasesFilterSection } from "@/components/CasesFilterSection";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "설치사례 | 건설현장 LTE 안전방송 구성 사례",
  description:
    "건설현장, 공장·산업현장 등 다양한 현장의 스마트 LTE 방송시스템 설치 구성 사례를 확인하세요.",
};

export default function CasesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-900 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-semibold text-blue-400">설치사례</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            설치 사례
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
            건설현장, 공장·산업현장 등 다양한 현장에서 스마트 LTE 방송시스템이
            어떻게 운영되는지 구성 사례를 안내드립니다.
          </p>
        </div>
      </section>

      {/* 필터 + 사례 카드 */}
      <CasesFilterSection />

      <CTASection />
    </main>
  );
}
