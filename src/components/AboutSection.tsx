"use client";

import { MotionInView } from "@/components/MotionInView";

export function AboutSection() {
  return (
    <section id="about" className="border-t border-slate-200/50 bg-white">
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
              는 &apos;현장&apos;에서
              <br className="hidden md:block" /> 답을 찾습니다.
            </h2>
          </MotionInView>
          <MotionInView className="mt-6 md:mt-0 md:col-span-7" delay={0.06}>
            <div className="relative h-auto w-full min-w-0 overflow-visible rounded-2xl border border-slate-200/70 bg-white px-6 py-7 pb-8 md:px-8 md:py-8 md:pb-9 lg:px-9 lg:py-9 lg:pb-10">
              <div className="absolute inset-y-6 left-6 w-px bg-slate-200 md:inset-y-7 md:left-7" />
              <div
                className="min-w-0 max-w-full space-y-4 pl-6 text-[15px] leading-relaxed text-ink-600 md:pl-7 md:text-[16px]"
                style={{ overflowWrap: "break-word", wordBreak: "keep-all" }}
              >
                <p>
                  영우테크는 30년 업력을 가진 무전기 유통 및 통신 솔루션 전문 기업으로,
                  <br />
                  오랜 현장 경험을 바탕으로 건설 현장에 가장 알맞은 통신 환경을 제안해 왔습니다.
                </p>
                <p>
                  2022년 &apos;3S&apos;의 첫선을 보인 이래, 수많은 현장 피드백과 기술 혁신을 거쳐
                  <br />
                  2026년 드디어 현장 최적화{" "}
                  <strong className="font-extrabold text-ink-900">스마트 LTE 방송 시스템</strong>을
                  정식 출시했습니다.
                </p>
                <p>
                  장비 도입부터 운영 지원까지 모든 영역에서 현장의 안전을 끝까지 생각하겠습니다.
                </p>
              </div>
            </div>
          </MotionInView>
        </div>

        <MotionInView delay={0.12}>
          <div className="mt-12 flex w-full flex-col items-center justify-center">
            <p className="w-full text-center font-extrabold tracking-tight text-ink-900 [font-size:clamp(1.25rem,2.5vw,1.8rem)] md:text-2xl">
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
  );
}
