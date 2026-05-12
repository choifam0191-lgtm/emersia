"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";

export function HeroSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-20 md:flex-row md:items-center md:justify-between md:gap-16 md:py-28">
        {/* 텍스트 */}
        <div className="md:max-w-[560px]">
          <MotionInView delay={0.04}>
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              스마트 LTE 방송시스템
            </span>
          </MotionInView>

          <MotionInView delay={0.08}>
            <h1 className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-[2.4rem] md:leading-snug">
              건설현장 안전방송,
              <br className="hidden md:block" /> LTE로 빠르게 구축하십시오
            </h1>
          </MotionInView>

          <MotionInView delay={0.12}>
            <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
              유선 공사 부담 없이 상황실에서 현장 방송장비를 원격 운영하고,
              혹서기 안내·비상대피·외국인 근로자 다국어 안내·작업 공지 방송을
              신속하게 전달합니다.
            </p>
          </MotionInView>

          <MotionInView delay={0.16}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                무료 방문시연 신청
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                견적 문의하기
              </Link>
              <a
                href="/catalog/catalog-2026.pdf"
                download="catalog-2026.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                카탈로그 다운로드
                <Download className="h-4 w-4" />
              </a>
            </div>
          </MotionInView>

          <MotionInView delay={0.2}>
            <p className="mt-6 text-sm leading-relaxed text-slate-500">
              무전기·통신 솔루션 현장 경험을 바탕으로 장비 구성, 설치,
              사용 교육, 운영 지원까지 함께 제공합니다.
            </p>
          </MotionInView>
        </div>

        {/* 이미지 */}
        <MotionInView
          className="relative mx-auto w-full max-w-[480px] md:mx-0 md:shrink-0"
          delay={0.06}
        >
          <img
            src="/main/device-photo.jpg"
            alt="스마트 LTE 방송장비"
            className="h-auto w-full rounded-2xl object-cover shadow-sm"
            width={960}
            height={720}
          />
        </MotionInView>
      </div>
    </section>
  );
}
