import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { ApplicationSection } from "@/components/ApplicationSection";
import { ProcessSection } from "@/components/ProcessSection";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "스마트 LTE 방송시스템 | 건설현장 안전방송 솔루션",
  description:
    "혹서기 안내, 비상대피, 외국인 근로자 다국어 안내, 작업 공지 방송을 지원하는 건설현장 LTE 안전방송 시스템입니다.",
};

export default function Page() {
  return (
    <main>
      {/* 1. 히어로 */}
      <HeroSection />
      {/* 2. 문제점 */}
      <ProblemSection />
      {/* 3. 우리의 솔루션 */}
      <SolutionSection />
      {/* 4. 적용 현장 */}
      <ApplicationSection />
      {/* 5. 도입 절차 */}
      <ProcessSection />
      {/* 6. 최종 CTA */}
      <CTASection />
    </main>
  );
}
