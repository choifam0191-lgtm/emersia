"use client";

import { AlertTriangle, Globe, Megaphone, Thermometer } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { SectionTitle } from "@/components/SectionTitle";
import type { ProblemData } from "@/lib/content";

// Icons fixed by card position — not admin-editable
const CARD_ICONS = [Thermometer, AlertTriangle, Globe, Megaphone];

type Props = { data: ProblemData };

export function ProblemSection({ data }: Props) {
  return (
    <section className="border-t border-slate-200/50 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <MotionInView>
          <SectionTitle eyebrow={data.eyebrow} title={data.title} />
        </MotionInView>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {data.cards.map((p, idx) => {
            const Icon = CARD_ICONS[idx % CARD_ICONS.length];
            return (
              <MotionInView key={idx} delay={0.06 + idx * 0.05}>
                <div
                  className={`flex gap-4 rounded-2xl border p-6 ${
                    p.alert ? "border-red-200 bg-red-50" : "border-slate-200/60 bg-white"
                  }`}
                >
                  <div
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      p.alert ? "bg-red-100" : "bg-slate-100"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${p.alert ? "text-red-600" : "text-slate-600"}`}
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{p.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{p.desc}</p>
                  </div>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
