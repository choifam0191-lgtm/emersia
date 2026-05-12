"use client";

import { HardHat, Monitor, Radio, Settings, Volume2 } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { SectionTitle } from "@/components/SectionTitle";

const products = [
  {
    Icon: Monitor,
    title: "상황실 장비",
    description: "현장 방송을 원격으로 제어하는 마스터 장비입니다.",
  },
  {
    Icon: Volume2,
    title: "현장 방송장비",
    description: "LTE 통신으로 음원을 수신하여 현장에 방송하는 장비입니다.",
  },
  {
    Icon: Radio,
    title: "LTE 무전기 / 통신 장비",
    description: "현장 내 즉시 통신과 방송 연동을 지원합니다.",
  },
  {
    Icon: HardHat,
    title: "안내표지판",
    description: "방송과 연동되는 현장 안전 안내 표시 장비입니다.",
  },
  {
    Icon: Settings,
    title: "옵션 장비",
    description: "현장 환경에 따라 추가 구성이 가능한 보조 장비입니다.",
  },
] as const;

export function ProductCompositionSection() {
  return (
    <section className="border-t border-slate-200/50 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <MotionInView>
          <SectionTitle
            eyebrow="제품 구성"
            title="현장 조건에 맞게 구성합니다."
          />
        </MotionInView>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, idx) => (
            <MotionInView key={p.title} delay={0.06 + idx * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm lg:p-7">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <p.Icon className="h-6 w-6 text-slate-700" strokeWidth={1.8} aria-hidden />
                </div>
                <p className="mt-4 text-lg font-bold tracking-tight text-slate-900">
                  {p.title}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {p.description}
                </p>
              </div>
            </MotionInView>
          ))}
        </div>

        <MotionInView delay={0.2}>
          <p className="mt-8 text-center text-sm text-slate-500">
            자세한 구성은 현장 조건에 따라 달라질 수 있습니다. 문의 시 담당자가 현장에 맞는 구성을 안내드립니다.
          </p>
        </MotionInView>
      </div>
    </section>
  );
}
