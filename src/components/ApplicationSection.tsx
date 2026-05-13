"use client";

import { Building2, Factory, HardHat, Landmark, Package, Settings } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { SectionTitle } from "@/components/SectionTitle";
import type { ApplicationData } from "@/lib/content";

// Icons fixed by card position — not admin-editable
const CARD_ICONS = [HardHat, Factory, Settings, Package, Landmark, Building2];

type Props = { data: ApplicationData };

export function ApplicationSection({ data }: Props) {
  return (
    <section className="border-t border-slate-200/50 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <MotionInView>
          <SectionTitle eyebrow={data.eyebrow} title={data.title} />
        </MotionInView>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {data.cards.map((app, idx) => {
            const Icon = CARD_ICONS[idx % CARD_ICONS.length];
            return (
              <MotionInView key={idx} delay={0.04 + idx * 0.04}>
                <div className="flex flex-col items-center rounded-2xl border border-slate-200/60 bg-slate-50 px-4 py-6 text-center">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <Icon className="h-5 w-5 text-blue-600" strokeWidth={1.8} aria-hidden />
                  </div>
                  <p className="mt-3 text-sm font-bold text-slate-900">{app.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{app.desc}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
