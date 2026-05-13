import type { Metadata } from "next";
import { ResourcesFilterSection } from "@/components/ResourcesFilterSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "자료실 | 스마트 LTE 방송시스템 카탈로그 및 제안자료",
  description:
    "스마트 LTE 방송시스템 카탈로그, 제안자료, 구성도, FAQ를 확인할 수 있는 자료실입니다.",
};

export default function ResourcesPage() {
  const { resources, faq } = getContent();

  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-900 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-semibold text-blue-400">{resources.hero.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {resources.hero.headline}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
            {resources.hero.subtext}
          </p>
        </div>
      </section>

      {/* 자료 카드 */}
      <ResourcesFilterSection />

      {/* FAQ */}
      <section
        id="faq"
        className="border-t border-slate-200/50 bg-white py-20 md:py-28"
      >
        <div className="mx-auto max-w-3xl px-5">
          <p className="text-sm font-semibold text-blue-600">FAQ</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            자주 묻는 질문
          </h2>
          <p className="mt-3 text-base text-slate-600">
            도입 전 자주 묻는 질문에 답변드립니다.
          </p>
          <div className="mt-8">
            <FAQAccordion items={faq} />
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
