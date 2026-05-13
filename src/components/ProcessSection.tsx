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
import type { ProcessData } from "@/lib/content";

// Icons fixed by step position — not admin-editable
const STEP_ICONS = [MessageSquare, MapPin, Monitor, FileText, BookOpen, Headphones];

type Props = { data: ProcessData };

export function ProcessSection({ data }: Props) {
  return (
    <section className="border-t border-slate-200/50 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <MotionInView>
          <SectionTitle eyebrow={data.eyebrow} title={data.title} />
        </MotionInView>

        <div className="relative mt-14">
          {/* 연결선 (데스크탑) */}
          <div
            aria-hidden
            className="absolute left-[calc(1.5rem)] right-[calc(1.5rem)] top-6 hidden h-px bg-slate-200 lg:block"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {data.steps.map((step, idx) => {
              const Icon = STEP_ICONS[idx % STEP_ICONS.length];
              return (
                <MotionInView key={idx} delay={0.04 + idx * 0.05}>
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm">
                      {idx + 1}
                    </div>
                    <Icon
                      className="mt-3 h-5 w-5 text-slate-400"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                    <p className="mt-2 text-sm font-bold text-slate-900">{step.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{step.desc}</p>
                  </div>
                </MotionInView>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
