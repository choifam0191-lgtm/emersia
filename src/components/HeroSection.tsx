"use client";

import { ArrowRight, Download, Megaphone, Shield, TowerControl } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";

const heroCards = [
  { title: "LTE 통신 지원", desc: "전국 통신 가능", Icon: TowerControl },
  { title: "위급상황대처", desc: "신속한 상황 전파", Icon: Shield },
  { title: "안전 안내 방송", desc: "원하는 시간에 방송", Icon: Megaphone },
] as const;

export function HeroSection() {
  return (
    <section className="relative bg-canvas">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-20 md:flex-row md:items-center md:justify-between md:gap-24 md:py-28 lg:gap-28">
        <div className="md:max-w-[580px]">
          <MotionInView delay={0.06}>
            <h1 className="text-balance font-extrabold leading-tight tracking-tight text-ink-900">
              <span className="block whitespace-nowrap [font-size:clamp(1.45rem,3.2vw,2.15rem)]">
                전국 어디서나 끊김 없는{" "}
                <span className="text-brand-600">안전 방송!</span>
              </span>
              <span className="mt-1 block [font-size:clamp(1.85rem,4.2vw,2.75rem)]">
                스마트 <span className="text-brand-600">LTE</span> 방송 시스템{" "}
                <span className="text-brand-600">3S</span>
              </span>
            </h1>
          </MotionInView>
          <MotionInView delay={0.12}>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-600 md:text-lg">
              효율적인 현장 안전 관리와 위급 상황 시 효과적인 대처를 지원합니다.
            </p>
          </MotionInView>
          <MotionInView delay={0.18}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/catalog/catalog-2026.pdf"
                download="catalog-2026.pdf"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-cta-hover"
              >
                2026 최신 카탈로그
                <Download className="h-4 w-4" />
              </a>
              <a
                href="#products"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-ink-800 shadow-sm transition hover:bg-slate-50"
              >
                주요 특징 보기
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </MotionInView>
          <MotionInView delay={0.24}>
            <div className="mt-10 flex flex-nowrap gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:pb-0">
              {heroCards.map((c) => (
                <div
                  key={c.title}
                  className="min-w-[320px] flex-none rounded-2xl bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-soft-lg lg:min-w-0 lg:flex-1"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                      <c.Icon className="h-5 w-5 text-brand-600" />
                    </span>
                    <div className="pt-0.5">
                      <p className="whitespace-nowrap text-sm font-bold leading-tight text-ink-900">
                        {c.title}
                      </p>
                      <p className="mt-1 whitespace-nowrap text-xs font-medium text-ink-600">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MotionInView>
        </div>

        <MotionInView className="relative" delay={0.08}>
          <div className="relative mx-auto w-full max-w-[512px] md:mx-0 md:shrink-0">
            <img
              src="/main/device-photo.jpg"
              alt="스마트 방송장비"
              className="h-auto w-full"
              width={1600}
              height={1200}
            />
          </div>
        </MotionInView>
      </div>
    </section>
  );
}
