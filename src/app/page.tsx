import {
  ArrowRight,
  BadgeCheck,
  Cpu,
  Download,
  Headphones,
  Radio,
  ShieldCheck
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { MotionInView } from "@/components/MotionInView";

const features = [
  {
    title: "스마트 제어",
    desc: "직관적인 운영 흐름으로 방송 장비 제어를 더 빠르고 정확하게.",
    Icon: Cpu
  },
  {
    title: "고신뢰 전송",
    desc: "중요 신호를 안정적으로 전달하는 최적화된 연결/전송 설계.",
    Icon: Radio
  },
  {
    title: "현장 친화 UX",
    desc: "현장 운영자 관점에서 필요한 정보만, 더 명확하게.",
    Icon: Headphones
  },
  {
    title: "보안/안정성",
    desc: "운영 안정성을 위한 검증된 설계와 관리 체계.",
    Icon: ShieldCheck
  }
] as const;

export default function Page() {
  return (
    <div className="min-h-dvh bg-white">
      {/* Top Nav */}
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/75 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="group inline-flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
              <BadgeCheck className="h-5 w-5 text-brand-600" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-ink-900">
              영우테크
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
            <a className="hover:text-slate-900" href="#about">
              회사 소개
            </a>
            <a className="hover:text-slate-900" href="#products">
              상품 특징
            </a>
            <a className="hover:text-slate-900" href="#catalog">
              카탈로그
            </a>
            <a className="hover:text-slate-900" href="#contact">
              견적 문의
            </a>
          </nav>
          <a
            href="#contact"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-ink-700"
          >
            문의하기
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-subtle-grid opacity-50" />
          <div className="absolute -top-24 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-brand-600/10 blur-3xl" />
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
            <div className="relative">
              <MotionInView>
                <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                  스마트 방송장비 솔루션
                </p>
              </MotionInView>
              <MotionInView delay={0.06}>
                <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-ink-900 md:text-5xl">
                  방송의 미래,
                  <br className="hidden md:block" /> 영우테크가{" "}
                  <span className="text-brand-700">스마트하게</span> 바꿉니다
                </h1>
              </MotionInView>
              <MotionInView delay={0.12}>
                <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 md:text-lg">
                  현장 운영을 단순화하고, 전송 품질을 안정화하며, 운영 데이터를
                  기반으로 효율을 높이는 스마트 방송장비를 제안합니다.
                </p>
              </MotionInView>
              <MotionInView delay={0.18}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#catalog"
                    className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-600"
                  >
                    2026 최신 카탈로그
                    <Download className="h-4 w-4" />
                  </a>
                  <a
                    href="#products"
                    className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
                  >
                    주요 특징 보기
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </MotionInView>
              <MotionInView delay={0.24}>
                <div className="mt-10 grid grid-cols-3 gap-4 text-xs text-slate-600">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-ink-900">운영 효율</p>
                    <p className="mt-1">간결한 제어/모니터링</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-ink-900">신뢰성</p>
                    <p className="mt-1">끊김 최소화 설계</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-ink-900">확장성</p>
                    <p className="mt-1">구성/연동 유연성</p>
                  </div>
                </div>
              </MotionInView>
            </div>

            {/* Image Placeholder */}
            <MotionInView className="relative" delay={0.08}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-soft">
                <div className="absolute inset-0">
                  <div className="absolute -right-12 -top-10 h-40 w-40 rounded-full bg-brand-600/15 blur-2xl" />
                  <div className="absolute -bottom-14 -left-10 h-56 w-56 rounded-full bg-slate-900/10 blur-3xl" />
                </div>
                <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
                  <p className="text-sm font-semibold text-slate-700">
                    고해상도 장비 이미지 영역
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    실제 제품 사진(또는 렌더)을 여기에 교체해 넣으세요.
                  </p>
                  <div className="mt-6 w-full max-w-sm rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6">
                    <p className="text-xs text-slate-500">
                      권장: 1600×1200 이상, 밝은 배경/제품 중심 구도
                    </p>
                  </div>
                </div>
              </div>
            </MotionInView>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-slate-200/70 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              <MotionInView className="md:col-span-5">
                <p className="text-sm font-semibold text-brand-700">
                  혁신적인 방송 환경을 선도하는 파트너
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
                  영우테크는 ‘현장’에서
                  <br className="hidden md:block" /> 답을 찾습니다.
                </h2>
              </MotionInView>
              <MotionInView className="md:col-span-7" delay={0.06}>
                <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                  영우테크는 방송 운영의 복잡함을 줄이고, 신뢰할 수 있는 품질을
                  제공하기 위해 스마트 방송장비 솔루션을 설계합니다. 장비 도입부터
                  운영, 확장까지—필요한 흐름을 명확하게 정리해 드립니다.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold text-ink-900">
                      운영 최적화
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      반복 업무를 줄이고 중요한 신호에 집중할 수 있도록.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold text-ink-900">
                      구축/연동 지원
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      현장 환경에 맞춘 구성, 안정적인 연동을 지원합니다.
                    </p>
                  </div>
                </div>
              </MotionInView>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="border-t border-slate-200/70 bg-slate-50/40">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <MotionInView>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
                스마트 방송장비, 핵심 특징
              </h2>
              <p className="mt-3 max-w-2xl text-base text-slate-600 md:text-lg">
                도입 즉시 체감되는 운영 효율과 안정성을 위해, 필요한 요소만
                명확하게 구성했습니다.
              </p>
            </MotionInView>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {features.map((f, idx) => (
                <MotionInView key={f.title} delay={0.06 + idx * 0.06}>
                  <div className="group h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                        <f.Icon className="h-6 w-6 text-brand-700" />
                      </div>
                      <div>
                        <p className="text-lg font-bold tracking-tight text-ink-900">
                          {f.title}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </MotionInView>
              ))}
            </div>
          </div>
        </section>

        {/* Catalog */}
        <section id="catalog" className="border-t border-slate-200/70 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <div className="grid gap-8 md:grid-cols-12 md:items-center">
              <MotionInView className="md:col-span-7">
                <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
                  2026 최신 카탈로그 다운로드
                </h2>
                <p className="mt-3 max-w-2xl text-base text-slate-600 md:text-lg">
                  제품 라인업/스펙/구성 예시를 한 번에 확인하세요. 실제 PDF 파일을
                  준비하시면 버튼 링크만 교체하면 됩니다.
                </p>
              </MotionInView>
              <MotionInView className="md:col-span-5" delay={0.06}>
                <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm">
                  <a
                    href="/catalog-2026.pdf"
                    className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ink-900 px-6 py-4 text-sm font-semibold text-white shadow-soft hover:bg-ink-700"
                  >
                    2026 최신 카탈로그 다운로드
                    <Download className="h-4 w-4" />
                  </a>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    파일 경로: <span className="font-semibold">/public/catalog-2026.pdf</span>
                  </p>
                </div>
              </MotionInView>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-slate-200/70 bg-slate-50/40">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              <MotionInView className="md:col-span-5">
                <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 md:text-4xl">
                  견적 문의
                </h2>
                <p className="mt-3 text-base text-slate-600 md:text-lg">
                  아래 폼으로 남겨주시면 빠르게 연락드리겠습니다.
                </p>
                <div className="mt-8 space-y-3 text-sm text-slate-600">
                  <p className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-brand-700" />
                    필요 환경에 맞춘 구성 제안
                  </p>
                  <p className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-brand-700" />
                    설치/연동/운영 고려한 설계
                  </p>
                  <p className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-brand-700" />
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

      <footer className="border-t border-slate-200/70 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-10 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-ink-900">영우테크</p>
          <p>© {new Date().getFullYear()} Youngwoo Tech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

