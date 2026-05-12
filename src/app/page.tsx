import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { ProductCompositionSection } from "@/components/ProductCompositionSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ApplicationSection } from "@/components/ApplicationSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ResourcesDownloadSection } from "@/components/ResourcesDownloadSection";
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
      {/* 2. 현장 문제 제기 */}
      <ProblemSection />
      {/* 3. 솔루션 개요 */}
      <SolutionSection />
      {/* 4. 주요 사용 장면 */}
      <UseCasesSection />
      {/* 5. 제품 구성 */}
      <ProductCompositionSection />
      {/* 6. 핵심 기능 */}
      <FeaturesSection />
      {/* 7. 적용 현장 */}
      <ApplicationSection />
      {/* 8. 도입 절차 */}
      <ProcessSection />
      {/* 9. 자료 다운로드 */}
      <ResourcesDownloadSection />
      {/* 10. 최종 CTA */}
      <CTASection />
    </main>
  );
}
