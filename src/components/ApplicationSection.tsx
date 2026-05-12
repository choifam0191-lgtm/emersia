"use client";

import { Building2, Factory, HardHat, Landmark, Package, Settings } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { SectionTitle } from "@/components/SectionTitle";

const applications = [
  {
    Icon: HardHat,
    title: "건설현장",
    desc: "아파트·오피스·대형 건설현장의 현장 방송 및 안전 안내",
  },
  {
    Icon: Factory,
    title: "플랜트",
    desc: "화공·에너지 플랜트의 긴급방송 및 작업 공지",
  },
  {
    Icon: Settings,
    title: "제조공장",
    desc: "생산 라인 공지, 안전 안내, 긴급 대피 방송",
  },
  {
    Icon: Package,
    title: "물류센터",
    desc: "넓은 물류 시설의 작업 공지 및 안전 방송",
  },
  {
    Icon: Landmark,
    title: "공공시설",
    desc: "공공시설·공원의 안전 안내 및 긴급방송",
  },
  {
    Icon: Building2,
    title: "학교·병원 등 대형 시설",
    desc: "대형 시설의 구역별 방송 및 안내",
  },
] as const;

export function ApplicationSection() {
  return (
    <section className="border-t border-slate-200/50 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <MotionInView>
          <SectionTitle
            eyebrow="적용 현장"
            title="다양한 현장에서 활용됩니다."
          />
        </MotionInView>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {applications.map((app, idx) => (
            <MotionInView key={app.title} delay={0.04 + idx * 0.04}>
              <div className="flex flex-col items-center rounded-2xl border border-slate-200/60 bg-slate-50 px-4 py-6 text-center">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <app.Icon className="h-5 w-5 text-blue-600" strokeWidth={1.8} aria-hidden />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-900">{app.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{app.desc}</p>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
