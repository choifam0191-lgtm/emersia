"use client";

import { AlertTriangle, Globe, Megaphone, Signal } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";

const features = [
  {
    title: "LTE 연동 시스템",
    desc: "LTE 연동으로 거리·장애물 제약 없이 전국 현장과 지하 음영 지역까지 안정적인 통신 품질을 유지합니다.",
    Icon: Signal,
  },
  {
    title: "신속한 위급상황 대처",
    desc: "무전기·마스터·방송 설비를 통합해 비상 버튼 즉시 전파와 양방향 지시로 신속한 대피를 유도해 골든타임을 확보합니다.",
    Icon: AlertTriangle,
  },
  {
    title: "사용자 맞춤형 방송 솔루션",
    desc: "현장별 음원을 자유롭게 구성하고 스케줄링과 텍스트 음성 안내로 녹음 없이도 자동 방송을 즉시 운영합니다.",
    Icon: Megaphone,
  },
  {
    title: "외국어 방송 지원",
    desc: "다국어 방송으로 국적별 안내를 제공해 언어 장벽 없이 안전 지침을 전달하고 사고 예방 효과를 높입니다.",
    Icon: Globe,
  },
];

function DuotoneIcon({ Icon }: { Icon: typeof Signal }) {
  return (
    <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100/80">
      <Icon className="h-6 w-6 text-brand-700" strokeWidth={1.8} aria-hidden />
    </div>
  );
}

export function ProductsSection() {
  return (
    <section
      id="products"
      className="border-t border-slate-200/50 bg-tech-grid py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <MotionInView>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-4xl md:leading-snug md:max-w-2xl">
            스마트 LTE 방송 시스템의 핵심 기능
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-600 md:max-w-2xl md:text-lg md:leading-relaxed">
            도입 즉시 현장 안전 운영 효율을 끌어올립니다.
          </p>
        </MotionInView>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((f, idx) => (
            <MotionInView key={f.title} delay={0.06 + idx * 0.06} asCard>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200/60 bg-white p-6 shadow-soft transition-all hover:shadow-soft-lg lg:p-7">
                <DuotoneIcon Icon={f.Icon} />
                <p className="mt-4 text-lg font-bold tracking-tight text-ink-900">
                  {f.title}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                  {f.desc}
                </p>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
