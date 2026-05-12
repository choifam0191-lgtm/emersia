"use client";

import { Download } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";

export function CatalogSection() {
  return (
    <section
      id="catalog"
      className="border-t border-slate-200/50 bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <MotionInView className="md:col-span-7">
            <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
              2026 최신 카탈로그 다운로드
            </h2>
            <p className="mt-3 max-w-2xl text-base text-ink-600 md:text-lg">
              제품 라인업/스펙/구성 예시를 한 번에 확인하세요.
            </p>
          </MotionInView>
          <MotionInView className="md:col-span-5" delay={0.06}>
            <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-soft">
              <a
                href="/catalog/catalog-2026.pdf"
                download="catalog-2026.pdf"
                className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-4 text-sm font-semibold text-white shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-cta-hover"
                aria-label="2026 최신 카탈로그 PDF 다운로드 (catalog-2026.pdf)"
              >
                2026 최신 카탈로그 다운로드
                <Download className="h-4 w-4" />
              </a>
            </div>
          </MotionInView>
        </div>
      </div>
    </section>
  );
}
