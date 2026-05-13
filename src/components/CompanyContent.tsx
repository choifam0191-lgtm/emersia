"use client";

import {
  Activity,
  BookOpen,
  CheckCircle,
  HardHat,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Radio,
  Signal,
  TowerControl,
  Wifi,
} from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { SectionTitle } from "@/components/SectionTitle";
import { FeatureCard } from "@/components/FeatureCard";

const strengths = [
  {
    Icon: Signal,
    title: "현장 중심 통신 솔루션 경험",
    description:
      "무전기 유통 및 통신 솔루션 분야에서 쌓은 현장 경험을 바탕으로 실제 운영 환경에 맞는 솔루션을 제안합니다.",
  },
  {
    Icon: HardHat,
    title: "건설현장 적용을 고려한 장비 구성",
    description:
      "건설현장 환경을 고려하여 설치와 운영이 용이한 장비 구성을 제안합니다.",
  },
  {
    Icon: BookOpen,
    title: "설치, 사용 교육, 운영 지원",
    description:
      "장비 설치 이후에도 현장 담당자가 편리하게 사용할 수 있도록 교육과 운영 지원을 제공합니다.",
  },
  {
    Icon: Wifi,
    title: "스마트 LTE 방송시스템 개발 및 공급",
    description:
      "현장 안전방송 요구에 맞춰 LTE 기반 스마트 방송시스템을 개발하고 공급합니다.",
  },
] as const;

const domains = [
  {
    Icon: Wifi,
    title: "스마트 LTE 방송시스템",
    description: "건설현장과 산업현장을 위한 LTE 기반 안전방송 시스템 개발 및 공급",
  },
  {
    Icon: Radio,
    title: "디지털 무전기 유통",
    description: "현장 통신을 위한 디지털 무전기 유통 및 솔루션 제공",
  },
  {
    Icon: Activity,
    title: "AED 개발/유통 관련 사업",
    description: "자동 심장충격기(AED) 관련 개발 및 유통 사업",
  },
  {
    Icon: TowerControl,
    title: "현장 통신 솔루션",
    description: "현장 환경에 맞는 통신 솔루션 설계 및 지원",
  },
] as const;

const supportItems = [
  "현장 상담",
  "장비 구성 제안",
  "설치 지원",
  "사용 교육",
  "운영 문의 대응",
  "카탈로그·제안자료 제공",
] as const;

export function CompanyContent() {
  return (
    <>
      {/* 1. Hero */}
      <section className="bg-slate-900 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <MotionInView>
            <p className="text-sm font-semibold text-blue-400">회사소개</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl md:leading-snug">
              현장을 이해하는
              <br />
              통신·안전방송 솔루션 기업
            </h1>
          </MotionInView>
          <MotionInView delay={0.08}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              영우테크는 무전기 유통 및 통신 솔루션 분야에서 축적한 현장 경험을 바탕으로,
              건설현장과 산업현장에 적합한 스마트 LTE 방송시스템을 개발·공급하고 있습니다.
            </p>
          </MotionInView>
        </div>
      </section>

      {/* 2. 핵심 강점 */}
      <section className="border-t border-slate-200/50 bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <MotionInView>
            <SectionTitle
              eyebrow="핵심 강점"
              title="현장 경험에서 출발한 솔루션을 제공합니다."
            />
          </MotionInView>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {strengths.map((s, idx) => (
              <MotionInView key={s.title} delay={0.05 + idx * 0.05} asCard>
                <FeatureCard Icon={s.Icon} title={s.title} description={s.description} />
              </MotionInView>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 사업 분야 */}
      <section className="border-t border-slate-200/50 bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <MotionInView>
            <SectionTitle
              eyebrow="사업 분야"
              title="현장 통신과 안전방송을 핵심 사업으로 합니다."
            />
          </MotionInView>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {domains.map((d, idx) => (
              <MotionInView key={d.title} delay={0.05 + idx * 0.05}>
                <div className="flex gap-4 rounded-2xl border border-slate-200/60 bg-white p-6">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <d.Icon
                      className="h-5 w-5 text-blue-600"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{d.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {d.description}
                    </p>
                  </div>
                </div>
              </MotionInView>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 지원 범위 */}
      <section className="border-t border-slate-200/50 bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <MotionInView>
              <SectionTitle
                eyebrow="지원 범위"
                title="도입 전부터 운영까지 함께합니다."
                description="장비 도입의 모든 단계에서 필요한 지원을 제공합니다."
              />
            </MotionInView>
            <MotionInView delay={0.08}>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {supportItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle
                      className="h-5 w-5 shrink-0 text-blue-600"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </MotionInView>
          </div>
        </div>
      </section>

      {/* 5. 주요 거래처 / 협력사 */}
      <section className="border-t border-slate-200/50 bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <MotionInView>
            <SectionTitle
              center
              eyebrow="주요 거래처 / 협력사"
              title="현장의 신뢰를 바탕으로 함께합니다."
            />
          </MotionInView>
          <MotionInView delay={0.08}>
            <img
              src="/clients_all.png"
              alt="영우테크 주요 거래처"
              className="mx-auto mt-10 w-full max-w-3xl rounded-xl bg-white object-contain shadow-sm"
            />
          </MotionInView>
          <MotionInView delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
              주요 현장과 고객사에 통신 장비 및 현장 솔루션을 공급해온 경험을 바탕으로,
              현장 조건에 맞는 구성을 제안합니다.
            </p>
          </MotionInView>
        </div>
      </section>

      {/* 6. 연락처 / 오시는 길 */}
      <section className="border-t border-slate-200/50 bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <MotionInView>
            <SectionTitle eyebrow="연락처" title="연락처 / 오시는 길" />
          </MotionInView>
          <MotionInView delay={0.08}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* 이메일 */}
              <div className="rounded-2xl border border-slate-200/60 bg-slate-50 p-5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <Mail className="h-4 w-4 text-blue-600" aria-hidden />
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">이메일</p>
                <a
                  href="mailto:hichoi333@naver.com"
                  className="mt-1 block break-all text-sm font-medium text-blue-600 hover:underline"
                >
                  hichoi333@naver.com
                </a>
              </div>

              {/* 전화 */}
              <div className="rounded-2xl border border-slate-200/60 bg-slate-50 p-5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                  <Phone className="h-4 w-4 text-slate-400" aria-hidden />
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">전화</p>
                {/* TODO: 전화번호 확정 후 href="tel:XXXXXXXX" 및 번호 표시 업데이트 */}
                <p className="mt-1 text-sm text-slate-400">준비중</p>
              </div>

              {/* 카카오톡 */}
              <div className="rounded-2xl border border-slate-200/60 bg-slate-50 p-5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                  <MessageCircle className="h-4 w-4 text-slate-400" aria-hidden />
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">카카오톡</p>
                {/* TODO: 카카오 채널 링크 확정 후 <a> 태그로 변경 */}
                <p className="mt-1 text-sm text-slate-400">준비중</p>
              </div>

              {/* 주소 */}
              <div className="rounded-2xl border border-slate-200/60 bg-slate-50 p-5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                  <MapPin className="h-4 w-4 text-slate-400" aria-hidden />
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">주소</p>
                {/* TODO: 주소 확정 후 업데이트 */}
                <p className="mt-1 text-sm text-slate-400">준비중</p>
              </div>
            </div>

            {/* 지도 */}
            <div className="mt-4 flex h-52 items-center justify-center rounded-2xl border border-slate-200/60 bg-slate-50">
              {/* TODO: 카카오맵 또는 네이버지도 iframe 삽입 */}
              <p className="text-sm text-slate-400">지도 준비중</p>
            </div>
          </MotionInView>
        </div>
      </section>
    </>
  );
}
