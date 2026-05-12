"use client";

import {
  BookOpen,
  FileText,
  Headphones,
  MapPin,
  MessageSquare,
  Monitor,
} from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { SectionTitle } from "@/components/SectionTitle";

const steps = [
  {
    Icon: MessageSquare,
    title: "문의 접수",
    desc: "이메일 또는 전화로 기본 정보를 남겨주시면 담당자가 연락드립니다.",
  },
  {
    Icon: MapPin,
    title: "현장 조건 확인",
    desc: "현장 규모, 통신 환경, 방송 운영 목적을 함께 확인합니다.",
  },
  {
    Icon: Monitor,
    title: "방문시연 또는 구성 제안",
    desc: "현장 조건에 맞는 장비 구성과 설치 방안을 제안드립니다.",
  },
  {
    Icon: FileText,
    title: "견적 제출",
    desc: "확정된 구성을 바탕으로 견적서를 제출합니다.",
  },
  {
    Icon: BookOpen,
    title: "설치 및 사용 교육",
    desc: "장비 설치 완료 후 현장 담당자 대상 사용 교육을 진행합니다.",
  },
  {
    Icon: Headphones,
    title: "운영 지원",
    desc: "도입 후 운영 중 발생하는 문의에 지속적으로 대응합니다.",
  },
] as const;

export function ProcessSection() {
  return (
    <section className="border-t border-slate-200/50 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <MotionInView>
          <SectionTitle
            eyebrow="도입 절차"
            title="이렇게 진행됩니다."
          />
        </MotionInView>

        <div className="relative mt-14">
          {/* 연결선 (데스크탑) */}
          <div
            aria-hidden
            className="absolute left-[calc(1.5rem)] right-[calc(1.5rem)] top-6 hidden h-px bg-slate-200 lg:block"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {steps.map((step, idx) => (
              <MotionInView key={step.title} delay={0.04 + idx * 0.05}>
                <div className="relative flex flex-col items-center text-center">
                  {/* 번호 원 */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm">
                    {idx + 1}
                  </div>
                  <step.Icon
                    className="mt-3 h-5 w-5 text-slate-400"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                  <p className="mt-2 text-sm font-bold text-slate-900">{step.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{step.desc}</p>
                </div>
              </MotionInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
