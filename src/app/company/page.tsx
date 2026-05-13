import type { Metadata } from "next";
import { CompanyContent } from "@/components/CompanyContent";
import { CTASection } from "@/components/CTASection";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "회사소개 | 영우테크",
  description:
    "무전기·통신 솔루션 분야에서 축적한 현장 경험을 바탕으로 스마트 LTE 방송시스템을 개발·공급하는 영우테크입니다.",
};

export default function CompanyPage() {
  const { company, contact } = getContent();

  return (
    <main>
      <CompanyContent data={company} contact={contact} />
      <CTASection />
    </main>
  );
}
