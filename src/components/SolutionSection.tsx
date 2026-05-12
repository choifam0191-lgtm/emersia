"use client";

import { Monitor, Signal, Users, Volume2 } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { SectionTitle } from "@/components/SectionTitle";

const nodes = [
  {
    Icon: Monitor,
    label: "상황실 장비",
    sub: "방송 명령 송출",
    primary: true,
  },
  {
    Icon: Signal,
    label: "LTE 통신망",
    sub: "원격 전달",
    primary: false,
  },
  {
    Icon: Volume2,
    label: "현장 방송장비",
    sub: "수신 및 재생",
    primary: true,
  },
  {
    Icon: Users,
    label: "작업자 / 현장",
    sub: "안내 수신",
    primary: false,
  },
] as const;

export function SolutionSection() {
  return (
    <section className="border-t border-slate-200/50 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <MotionInView>
          <SectionTitle
            eyebrow="솔루션 개요"
            title="상황실에서 현장 방송장비를 LTE로 원격 운영합니다."
            description="상황실 장비에서 방송 명령을 송출하면 LTE 통신을 통해 현장 방송장비로 전달되어 안내방송, 긴급방송, 예약방송을 운영할 수 있습니다."
          />
        </MotionInView>

        {/* 구성도 */}
        <MotionInView delay={0.1}>
          <div className="mt-14 rounded-2xl border border-slate-200/60 bg-slate-50 p-8 md:p-10">
            {/* 데스크탑: 가로 흐름 */}
            <div className="hidden items-center justify-center gap-3 md:flex">
              {nodes.map((node, idx) => (
                <div key={node.label} className="flex items-center gap-3">
                  <div
                    className={`flex flex-col items-center gap-2 rounded-2xl border px-6 py-5 text-center ${
                      node.primary
                        ? "border-blue-200 bg-blue-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <node.Icon
                      className={`h-7 w-7 ${node.primary ? "text-blue-600" : "text-slate-500"}`}
                      strokeWidth={1.6}
                    />
                    <p className="text-sm font-bold text-slate-900">{node.label}</p>
                    <p className="text-xs text-slate-500">{node.sub}</p>
                  </div>
                  {idx < nodes.length - 1 && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-px w-8 border-t-2 border-dashed border-slate-300" />
                      <span className="text-[10px] text-slate-400">▶</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 모바일: 세로 흐름 */}
            <div className="flex flex-col items-center gap-3 md:hidden">
              {nodes.map((node, idx) => (
                <div key={node.label} className="flex w-full max-w-xs flex-col items-center gap-2">
                  <div
                    className={`flex w-full items-center gap-4 rounded-2xl border px-5 py-4 ${
                      node.primary
                        ? "border-blue-200 bg-blue-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <node.Icon
                      className={`h-6 w-6 shrink-0 ${node.primary ? "text-blue-600" : "text-slate-500"}`}
                      strokeWidth={1.6}
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{node.label}</p>
                      <p className="text-xs text-slate-500">{node.sub}</p>
                    </div>
                  </div>
                  {idx < nodes.length - 1 && (
                    <span className="text-slate-400">▼</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </MotionInView>
      </div>
    </section>
  );
}
