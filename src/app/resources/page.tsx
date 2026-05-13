import type { Metadata } from "next";
import { ResourcesFilterSection } from "@/components/ResourcesFilterSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "자료실 | 스마트 LTE 방송시스템 카탈로그 및 제안자료",
  description:
    "스마트 LTE 방송시스템 카탈로그, 제안자료, 구성도, FAQ를 확인할 수 있는 자료실입니다.",
};

const faqItems = [
  {
    question: "구매 전 현장 시연이 가능한가요?",
    answer:
      "가능합니다. 현장 조건과 일정 확인 후 방문시연 또는 상담 일정을 조율할 수 있습니다.",
  },
  {
    question: "LTE 통신비는 어떻게 되나요?",
    answer:
      "현장 구성과 통신 방식에 따라 달라질 수 있어 상담 시 별도로 안내드립니다.",
  },
  {
    question: "기존 방송장비와 연동 가능한가요?",
    answer:
      "기존 장비의 사양과 현장 구성에 따라 연동 가능 여부를 검토합니다.",
  },
  {
    question: "외국어 방송은 어떻게 운영하나요?",
    answer:
      "필요한 안내 문안을 번역하거나 음원으로 제작하여 현장 상황에 맞게 사용할 수 있습니다.",
  },
  {
    question: "현장 방송장비에 전원이 필요한가요?",
    answer:
      "현장 방송장비는 기본적으로 AC 220V 전원 사용을 전제로 합니다.",
  },
  {
    question: "산업안전보건관리비로 검토할 수 있나요?",
    answer:
      "현장 조건과 사용 목적에 따라 검토 가능성이 있으므로, 관련 자료와 함께 상담을 진행하는 것을 권장드립니다.",
  },
];

export default function ResourcesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-900 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-semibold text-blue-400">자료실</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            자료실
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
            스마트 LTE 방송시스템 검토에 필요한 카탈로그, 제안자료, 구성도, FAQ를
            확인하실 수 있습니다.
          </p>
        </div>
      </section>

      {/* 카테고리 필터 + 자료 카드 */}
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
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
