import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { ApplicationSection } from "@/components/ApplicationSection";
import { ProcessSection } from "@/components/ProcessSection";
import { CTASection } from "@/components/CTASection";
import { PageViewTracker } from "@/components/PageViewTracker";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "스마트 LTE 방송시스템 | 건설현장 안전방송 솔루션",
  description:
    "혹서기 안내, 비상대피, 외국인 근로자 다국어 안내, 작업 공지 방송을 지원하는 건설현장 LTE 안전방송 시스템입니다.",
};

export default function Page() {
  const { home } = getContent();

  return (
    <main>
      <PageViewTracker pagePath="/" />
      <HeroSection data={home.hero} />
      <ProblemSection data={home.problem} />
      <SolutionSection data={home.solution} />
      <ApplicationSection data={home.application} />
      <ProcessSection data={home.process} />
      <CTASection />
    </main>
  );
}
