"use client";

import { Bell, BookOpen, Clock, Globe, Wifi, Wrench } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionTitle } from "@/components/SectionTitle";

const features = [
  {
    Icon: Wifi,
    title: "LTE 기반 원격 방송",
    description:
      "LTE 기반으로 다양한 현장 환경에서 안정적인 안전방송 구축을 지원합니다.",
  },
  {
    Icon: Clock,
    title: "예약방송",
    description:
      "원하는 시간에 반복 방송이 자동 실행되도록 스케줄을 설정할 수 있습니다.",
  },
  {
    Icon: Bell,
    title: "긴급방송",
    description:
      "비상 버튼 한 번으로 전 구역에 즉시 긴급 안내방송을 송출합니다.",
  },
  {
    Icon: Globe,
    title: "다국어 방송 지원",
    description:
      "다국어 음원을 등록하여 외국인 근로자에게 언어별 안전수칙을 안내합니다.",
  },
  {
    Icon: Wrench,
    title: "현장 맞춤형 장비 구성",
    description:
      "현장 통신 환경 확인 후 적합한 설치 위치와 운영 방안을 제안합니다.",
  },
  {
    Icon: BookOpen,
    title: "설치 및 사용 교육 지원",
    description:
      "장비 설치 후 현장 담당자를 대상으로 사용 방법 교육을 제공합니다.",
  },
] as const;

export function FeaturesSection() {
  return (
    <section className="border-t border-slate-200/50 bg-tech-grid py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <MotionInView>
          <SectionTitle
            eyebrow="핵심 기능"
            title="스마트 LTE 방송시스템의 주요 기능"
          />
        </MotionInView>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, idx) => (
            <MotionInView key={f.title} delay={0.06 + idx * 0.04} asCard>
              <FeatureCard
                Icon={f.Icon}
                title={f.title}
                description={f.description}
              />
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
