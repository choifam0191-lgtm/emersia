"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import type { HeroData } from "@/lib/content";

type Props = { data: HeroData };

export function HeroSection({ data }: Props) {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-20 md:flex-row md:items-center md:justify-between md:gap-8 md:py-28">
        {/* 텍스트 */}
        <div className="md:max-w-[660px]">
          <MotionInView delay={0.04}>
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {data.eyebrow}
            </span>
          </MotionInView>

          <MotionInView delay={0.08}>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-[2.4rem] md:leading-snug">
              {data.headline}
            </h1>
          </MotionInView>

          <MotionInView delay={0.12}>
            <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
              {data.subtext}
            </p>
          </MotionInView>

          <MotionInView delay={0.16}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact?type=demo"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                무료 방문시연 신청
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact?type=quote"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                견적 문의하기
              </Link>
              <a
                href="/api/catalog/download"
                download="emersia-catalog.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                카탈로그 다운로드
                <Download className="h-4 w-4" />
              </a>
            </div>
          </MotionInView>

          <MotionInView delay={0.2}>
            <p className="mt-6 text-sm leading-relaxed text-slate-500">
              {data.supportText}
            </p>
          </MotionInView>
        </div>

        {/* 이미지 */}
        <MotionInView
          className="relative mx-auto w-full max-w-[420px] md:mx-0 md:shrink-0"
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
