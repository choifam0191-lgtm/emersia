"use client";

import { Monitor, Signal, Users, Volume2 } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { SectionTitle } from "@/components/SectionTitle";
import type { SolutionData } from "@/lib/content";

// Icons fixed — not admin-editable
const NODE_ICONS = [Monitor, Signal, Volume2, Users];
const NODE_PRIMARY = [true, false, true, false];

type Props = { data: SolutionData };

export function SolutionSection({ data }: Props) {
  return (
    <section className="border-t border-slate-200/50 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <MotionInView>
          <SectionTitle
            eyebrow={data.eyebrow}
            title={data.title}
            description={data.description}
          />
        </MotionInView>

        {/* 구성도 */}
        <MotionInView delay={0.1}>
          <div className="mt-14 rounded-2xl border border-slate-200/60 bg-slate-50 p-8 md:p-10">
            {/* 데스크탑: 가로 흐름 */}
            <div className="hidden items-center justify-center gap-3 md:flex">
              {NODE_ICONS.map((Icon, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className={`flex flex-col items-center gap-2 rounded-2xl border px-6 py-5 text-center ${
                      NODE_PRIMARY[idx]
                        ? "border-blue-200 bg-blue-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <Icon
                      className={`h-7 w-7 ${NODE_PRIMARY[idx] ? "text-blue-600" : "text-slate-500"}`}
                      strokeWidth={1.6}
                    />
                    <p className="text-sm font-bold text-slate-900">
                      {["상황실 장비", "LTE 통신망", "현장 방송장비", "작업자 / 현장"][idx]}
                    </p>
                    <p className="text-xs text-slate-500">
                      {["방송 명령 송출", "원격 전달", "수신 및 재생", "안내 수신"][idx]}
                    </p>
                  </div>
                  {idx < NODE_ICONS.length - 1 && (
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
              {NODE_ICONS.map((Icon, idx) => (
                <div key={idx} className="flex w-full max-w-xs flex-col items-center gap-2">
                  <div
                    className={`flex w-full items-center gap-4 rounded-2xl border px-5 py-4 ${
                      NODE_PRIMARY[idx]
                        ? "border-blue-200 bg-blue-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 shrink-0 ${NODE_PRIMARY[idx] ? "text-blue-600" : "text-slate-500"}`}
                      strokeWidth={1.6}
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {["상황실 장비", "LTE 통신망", "현장 방송장비", "작업자 / 현장"][idx]}
                      </p>
                      <p className="text-xs text-slate-500">
                        {["방송 명령 송출", "원격 전달", "수신 및 재생", "안내 수신"][idx]}
                      </p>
                    </div>
                  </div>
                  {idx < NODE_ICONS.length - 1 && (
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
