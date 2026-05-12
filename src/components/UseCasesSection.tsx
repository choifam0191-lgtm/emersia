"use client";

import { AlertTriangle, Globe, Megaphone, Thermometer } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionTitle } from "@/components/SectionTitle";

const cases = [
  {
    Icon: Thermometer,
    title: "혹서기 안내방송",
    description:
      "폭염주의, 정기 휴식 안내, 수분 섭취 안내 등 반복 안전방송을 시간표에 맞춰 자동 운영합니다.",
  },
  {
    Icon: AlertTriangle,
    title: "긴급 대피방송",
    description:
      "위험상황 발생 시 상황실에서 즉시 전 구역에 대피 안내방송을 송출합니다.",
  },
  {
    Icon: Globe,
    title: "다국어 안전안내",
    description:
      "외국인 근로자에게 필요한 안전수칙을 다국어 음원으로 전달합니다.",
  },
  {
    Icon: Megaphone,
    title: "작업 공지방송",
    description:
      "작업시간, 이동 동선, 장비 운행, 공정 변경 사항을 현장 전체에 일괄 안내합니다.",
  },
] as const;

export function UseCasesSection() {
  return (
    <section className="border-t border-slate-200/50 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <MotionInView>
          <SectionTitle
            eyebrow="주요 사용 장면"
            title="이런 상황에서 활용합니다."
          />
        </MotionInView>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((c, idx) => (
            <MotionInView key={c.title} delay={0.06 + idx * 0.05} asCard>
              <FeatureCard
                Icon={c.Icon}
                title={c.title}
                description={c.description}
              />
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
