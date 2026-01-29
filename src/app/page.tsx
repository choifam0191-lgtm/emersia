"use client";

import {
  ArrowRight,
  Cpu,
  Download,
  Headphones,
  Radio,
  ShieldCheck,
  Megaphone,
  Shield,
  TowerControl
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { MotionInView } from "@/components/MotionInView";

const features = [
  {
    title: "스마트 제어",
    desc: "직관적인 운영 흐름으로 방송 장비 제어를 더 빠르고 정확하게.",
    Icon: Cpu,
    size: "large" as const
  },
  {
    title: "고신뢰 전송",
    desc: "중요 신호를 안정적으로 전달하는 최적화된 연결/전송 설계.",
    Icon: Radio,
    size: "normal" as const
  },
  {
    title: "현장 친화 UX",
    desc: "현장 운영자 관점에서 필요한 정보만, 더 명확하게.",
    Icon: Headphones,
    size: "normal" as const
  },
  {
    title: "보안/안정성",
    desc: "운영 안정성을 위한 검증된 설계와 관리 체계.",
    Icon: ShieldCheck,
    size: "wide" as const
  }
];

const heroCards = [
  {
    title: "LTE 통신 지원",
    desc: "전국 통신 가능",
    Icon: TowerControl
  },
  {
    title: "위급상황대처",
    desc: "신속한 상황 전파",
    Icon: Shield
  },
  {
    title: "안전 안내 방송",
    desc: "원하는 시간에 방송",
    Icon: Megaphone
  }
] as const;

function DuotoneIcon({ Icon }: { Icon: typeof Cpu }) {
  return (
    <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100/80">
      <Icon
        className="h-6 w-6 text-brand-700"
        strokeWidth={1.8}
        aria-hidden
      />
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-dvh bg-canvas">
      {/* Top Nav */}
      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="group inline-flex items-center">
            <img
              src="/icon.png"
              alt="영우테크"
              className="h-9 w-auto"
              width={36}
              height={36}
            />
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink-600 md:flex">
            <a className="transition hover:text-brand-600" href="#about">
              회사 소개
            </a>
            <a className="transition hover:text-brand-600" href="#products">
              상품 특징
            </a>
            <a className="transition hover:text-brand-600" href="#catalog">
              카탈로그
            </a>
            <a className="transition hover:text-brand-600" href="#contact">
              견적 문의
            </a>
          </nav>
          <a
            href="#contact"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 hover:shadow-soft-lg"
          >
            문의하기
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative bg-canvas">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center md:py-28">
            <div>
              <MotionInView delay={0.06}>
                <h1 className="text-balance text-4xl font-extrabold tracking-tight text-ink-900 md:text-5xl lg:text-[2.75rem]">
                  전국 어디서나 끊김 없는{" "}
                  <span className="text-brand-600">안전 방송!</span>
                  <br />
                  스마트 <span className="text-brand-600">LTE</span> 방송 시스템{" "}
                  <span className="text-brand-600">3S</span>
                </h1>
              </MotionInView>
              <MotionInView delay={0.12}>
                <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-600 md:text-lg">
                  효율적인 현장 안전 관리와 위급 상황 시 효과적인 대처를
                  지원합니다.
                </p>
              </MotionInView>
              <MotionInView delay={0.18}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="/catalog/catalog-2026.pdf"
                    download
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
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {heroCards.map((c) => (
                    <div
                      key={c.title}
                      className="rounded-2xl bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-soft-lg"
                    >
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                          <c.Icon className="h-5 w-5 text-brand-600" />
                        </span>
                        <div>
                          <p className="text-sm font-bold leading-tight text-ink-900">
                            {c.title}
                          </p>
                          <p className="mt-1 text-xs text-ink-600">{c.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MotionInView>
            </div>

            {/* Hero: 장비 이미지 (테두리/박스/칩 제거) */}
            <MotionInView className="relative" delay={0.08}>
              <div className="relative mx-auto w-full max-w-[640px]">
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

        {/* About */}
        <section
          id="about"
          className="border-t border-slate-200/50 bg-white"
        >
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <div className="grid gap-12 md:grid-cols-12 md:items-start">
              <MotionInView className="md:col-span-5">
                <p className="text-sm font-semibold text-brand-600">
                  혁신적인 방송 환경을 선도하는 파트너
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
                  영우테크는 ‘현장’에서
                  <br className="hidden md:block" /> 답을 찾습니다.
                </h2>
              </MotionInView>
              <MotionInView className="md:col-span-7" delay={0.06}>
                <p className="text-base leading-relaxed text-ink-600 md:text-lg">
                  영우테크는 방송 운영의 복잡함을 줄이고, 신뢰할 수 있는 품질을
                  제공하기 위해 스마트 방송장비 솔루션을 설계합니다. 장비 도입부터
                  운영, 확장까지—필요한 흐름을 명확하게 정리해 드립니다.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <MotionInView asCard delay={0.1}>
                    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-soft transition-shadow hover:shadow-soft-lg">
                      <p className="text-sm font-bold text-ink-900">
                        운영 최적화
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">
                        반복 업무를 줄이고 중요한 신호에 집중할 수 있도록.
                      </p>
                    </div>
                  </MotionInView>
                  <MotionInView asCard delay={0.14}>
                    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-soft transition-shadow hover:shadow-soft-lg">
                      <p className="text-sm font-bold text-ink-900">
                        구축/연동 지원
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">
                        현장 환경에 맞춘 구성, 안정적인 연동을 지원합니다.
                      </p>
                    </div>
                  </MotionInView>
                </div>
              </MotionInView>
            </div>
          </div>
        </section>

        {/* Products - Bento Grid */}
        <section
          id="products"
          className="border-t border-slate-200/50 bg-tech-grid py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl px-5">
            <MotionInView>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
                스마트 방송장비, 핵심 특징
              </h2>
              <p className="mt-3 max-w-2xl text-base text-ink-600 md:text-lg">
                도입 즉시 체감되는 운영 효율과 안정성을 위해, 필요한 요소만
                명확하게 구성했습니다.
              </p>
            </MotionInView>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
              {features.map((f, idx) => (
                <MotionInView
                  key={f.title}
                  delay={0.06 + idx * 0.06}
                  asCard
                  className={
                    f.size === "large"
                      ? "lg:col-span-2 lg:row-span-2"
                      : f.size === "wide"
                        ? "lg:col-span-3"
                        : ""
                  }
                >
                  <div className="group flex h-full flex-col rounded-2xl border border-slate-200/60 bg-white p-6 shadow-soft transition-all hover:shadow-soft-lg lg:p-8">
                    <DuotoneIcon Icon={f.Icon} />
                    <p className="mt-4 text-lg font-bold tracking-tight text-ink-900 lg:text-xl">
                      {f.title}
                    </p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                      {f.desc}
                    </p>
                  </div>
                </MotionInView>
              ))}
            </div>
          </div>
        </section>

        {/* Catalog - CTA 강조 */}
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
                    download
                    className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-4 text-sm font-semibold text-white shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-cta-hover"
                  >
                    2026 최신 카탈로그 다운로드
                    <Download className="h-4 w-4" />
                  </a>
                  <p className="mt-3 text-center text-xs text-ink-500">
                    파일 경로: /catalog/catalog-2026.pdf
                  </p>
                </div>
              </MotionInView>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="border-t border-slate-200/50 bg-tech-grid py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-12 md:grid-cols-12 md:items-start">
              <MotionInView className="md:col-span-5">
                <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
                  견적 문의
                </h2>
                <p className="mt-3 text-base text-ink-600 md:text-lg">
                  아래 폼으로 남겨주시면 빠르게 연락드리겠습니다.
                </p>
                <div className="mt-8 space-y-3 text-sm text-ink-600">
                  <p className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-brand-600" />
                    필요 환경에 맞춘 구성 제안
                  </p>
                  <p className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-brand-600" />
                    설치/연동/운영 고려한 설계
                  </p>
                  <p className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-brand-600" />
                    유지보수/확장성까지 지원
                  </p>
                </div>
              </MotionInView>

              <MotionInView className="md:col-span-7" delay={0.06}>
                <ContactForm />
              </MotionInView>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/60 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-10 text-sm text-ink-600 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-ink-900">영우테크</p>
          <p>© {new Date().getFullYear()} Youngwoo Tech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
