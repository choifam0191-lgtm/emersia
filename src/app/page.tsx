"use client";

import {
  ArrowRight,
  BadgeCheck,
  Download,
  Megaphone,
  Shield,
  TowerControl,
  Signal,
  AlertTriangle,
  Globe
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { MotionInView } from "@/components/MotionInView";

const features = [
  {
    title: "LTE 연동 시스템",
    desc: "LTE 연동으로 거리·장애물 제약 없이 전국 현장과 지하 음영 지역까지 안정적인 통신 품질을 유지합니다.",
    Icon: Signal
  },
  {
    title: "신속한 위급상황 대처",
    desc: "무전기·마스터·방송 설비를 통합해 비상 버튼 즉시 전파와 양방향 지시로 신속한 대피를 유도해 골든타임을 확보합니다.",
    Icon: AlertTriangle
  },
  {
    title: "사용자 맞춤형 방송 솔루션",
    desc: "현장별 음원을 자유롭게 구성하고 스케줄링과 텍스트 음성 안내로 녹음 없이도 자동 방송을 즉시 운영합니다.",
    Icon: Megaphone
  },
  {
    title: "외국어 방송 지원",
    desc: "다국어 방송으로 국적별 안내를 제공해 언어 장벽 없이 안전 지침을 전달하고 사고 예방 효과를 높입니다.",
    Icon: Globe
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

function DuotoneIcon({ Icon }: { Icon: typeof Signal }) {
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

            {/* Hero: 장비 이미지 (테두리/박스/칩 제거) */}
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

        {/* About */}
        <section
          id="about"
          className="border-t border-slate-200/50 bg-white"
        >
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              <MotionInView className="md:col-span-5">
                <p className="text-sm font-semibold text-brand-600">
                  현장의 안전을 최우선으로 생각하는 파트너
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
                  <span className="text-[#001f3f]" style={{ color: "#001f3f" }}>
                    영우테크
                  </span>
                  는 ‘현장’에서
                  <br className="hidden md:block" /> 답을 찾습니다.
                </h2>
              </MotionInView>
              <MotionInView
                className="mt-6 md:mt-0 md:col-span-7"
                delay={0.06}
              >
                <div
                  className="relative h-auto w-full overflow-x-auto rounded-2xl border border-slate-200/70 bg-white px-6 py-7 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-8 md:py-8 md:pb-9 lg:px-9 lg:py-9 lg:pb-10"
                  style={{ maxWidth: "1000px" }}
                >
                  <div className="absolute inset-y-6 left-6 w-px bg-slate-200 md:inset-y-7 md:left-7" />
                  <div className="space-y-4 pl-6 text-[15px] leading-relaxed text-ink-600 md:pl-7 md:text-[16px]">
                    <p>
                      영우테크는 30년 업력을 가진 무전기 유통 및 통신 솔루션 전문
                      기업으로,
                      <br />
                      <span className="whitespace-nowrap">
                        오랜 현장 경험을 바탕으로 건설 현장에 가장 알맞은 통신
                        환경을 제안해 왔습니다.
                      </span>
                    </p>
                    <p>
                      2022년 &apos;3S&apos;의 첫선을 보인 이래, 수많은 현장 피드백과
                      기술 혁신을 거쳐
                      <br />
                      2026년 드디어 현장 최적화{" "}
                      <strong className="font-extrabold text-ink-900">
                        스마트 LTE 방송 시스템
                      </strong>
                      을 정식 출시했습니다.
                    </p>
                    <p>
                      <span className="whitespace-nowrap">
                        장비 도입부터 운영 지원까지 모든 영역에서 현장의 안전을
                        끝까지 생각하겠습니다.
                      </span>
                    </p>
                  </div>
                </div>
              </MotionInView>
            </div>

            {/* Clients */}
            <MotionInView delay={0.12}>
              <div className="mt-12 flex w-full flex-col items-center justify-center">
                <p className="w-full text-center text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
                  영우테크 주요 거래처
                </p>
                <img
                  src="/clients_all.png"
                  alt="영우테크 주요 거래처"
                  className="mx-auto mt-5 w-full max-w-3xl rounded-xl bg-white object-contain"
                />
              </div>
            </MotionInView>
          </div>
        </section>

        {/* Products - 4열 카드 */}
        <section
          id="products"
          className="border-t border-slate-200/50 bg-tech-grid py-20 md:py-28"
        >
          <div className="mx-auto max-w-6xl px-5">
            <MotionInView>
              <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-4xl md:leading-snug">
                스마트 LTE 방송 시스템의 핵심 기능
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-600 md:text-lg md:leading-relaxed">
                도입 즉시 현장 안전 운영 효율을 끌어올립니다.
              </p>
            </MotionInView>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f, idx) => (
                <MotionInView
                  key={f.title}
                  delay={0.06 + idx * 0.06}
                  asCard
                >
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200/60 bg-white p-6 shadow-soft transition-all hover:shadow-soft-lg lg:p-7">
                    <DuotoneIcon Icon={f.Icon} />
                    <p className="mt-4 text-lg font-bold tracking-tight text-ink-900">
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
