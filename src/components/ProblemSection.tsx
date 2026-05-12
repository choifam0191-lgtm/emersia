"use client";

import { AlertTriangle, Globe, Megaphone, Thermometer } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { SectionTitle } from "@/components/SectionTitle";

const problems = [
  {
    Icon: Thermometer,
    title: "혹서기 안전 안내 반복 필요",
    desc: "폭염 예보 시 현장 전체에 정기적인 휴식 안내와 수분 섭취 안내를 반복 전달해야 합니다.",
    alert: false,
  },
  {
    Icon: AlertTriangle,
    title: "비상상황 시 신속한 대피방송 필요",
    desc: "사고 발생 시 전 구역 작업자에게 즉각적인 대피 안내가 가능한 시스템이 필요합니다.",
    alert: true,
  },
  {
    Icon: Globe,
    title: "외국인 근로자 다국어 안내 필요",
    desc: "다양한 국적의 근로자에게 안전수칙을 해당 언어로 전달하기 어렵습니다.",
    alert: false,
  },
  {
    Icon: Megaphone,
    title: "넓은 현장의 작업 공지 전달 어려움",
    desc: "광범위한 현장에 작업 변경 사항이나 공지를 일괄 전달하기 어렵습니다.",
    alert: false,
  },
] as const;

export function ProblemSection() {
  return (
    <section className="border-t border-slate-200/50 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <MotionInView>
          <SectionTitle
            eyebrow="현장의 과제"
            title="현장 방송이 늦으면, 안전 대응도 늦어집니다."
          />
        </MotionInView>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {problems.map((p, idx) => (
            <MotionInView key={p.title} delay={0.06 + idx * 0.05}>
              <div
                className={`flex gap-4 rounded-2xl border p-6 ${
                  p.alert
                    ? "border-red-200 bg-red-50"
                    : "border-slate-200/60 bg-white"
                }`}
              >
                <div
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    p.alert ? "bg-red-100" : "bg-slate-100"
                  }`}
                >
                  <p.Icon
                    className={`h-5 w-5 ${p.alert ? "text-red-600" : "text-slate-600"}`}
                    strokeWidth={1.8}
                    aria-hidden
                  />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{p.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {p.desc}
                  </p>
                </div>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
