"use client";

import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { SectionTitle } from "@/components/SectionTitle";

export function CompanyContent() {
  return (
    <>
      {/* 1. Hero */}
      <section className="bg-slate-900 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <MotionInView>
            <p className="text-sm font-semibold text-blue-400">회사소개</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl md:leading-snug">
              항상 안전을 생각하는,<br />영우테크입니다
            </h1>
          </MotionInView>
          <MotionInView delay={0.08}>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-slate-400 md:text-lg">
              <p>
                영우테크는 무전기 유통과 통신 솔루션 분야에서 오랜 시간 현장 가까이에서
                일해왔습니다. AED(자동 심장충격기) 유통과 스마트 LTE 방송시스템
                개발·공급까지, 다루는 제품은 달라졌지만 중심에는 항상 현장 안전이 있습니다.
              </p>
              <p>
                저희가 마주한 현장들은 대부분 '안내가 제때 전달되지 않는 곳',
                '위급 상황에서 소통이 어려운 곳'이었습니다. 그 경험에서 출발해,
                현장 담당자가 실제로 사용할 수 있는 방식으로 솔루션을 구성합니다.
                복잡한 공사 없이 LTE 통신으로 빠르게 구축할 수 있는 안전방송 시스템도
                그 고민에서 나왔습니다.
              </p>
              <p>
                단순히 장비를 납품하는 것이 아니라, 구성 상담부터 설치, 사용 교육,
                운영 지원까지 함께합니다. 어떤 현장에서든 안전이 제대로 전달되도록 하는 것,
                그것이 영우테크가 일하는 방식입니다.
              </p>
            </div>
          </MotionInView>
        </div>
      </section>

      {/* 2. 주요 거래처 / 협력사 */}
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

      {/* 3. 연락처 / 오시는 길 */}
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
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <Phone className="h-4 w-4 text-blue-600" aria-hidden />
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">전화</p>
                <a
                  href="tel:031-523-2340"
                  className="mt-1 block text-sm font-medium text-slate-800 transition hover:text-blue-600"
                >
                  031-523-2340
                </a>
              </div>

              {/* 카카오톡 */}
              <div className="rounded-2xl border border-slate-200/60 bg-slate-50 p-5">
                <div
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#FEE500" }}
                >
                  <MessageCircle className="h-4 w-4" style={{ color: "#3A1D1D" }} aria-hidden />
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">카카오톡</p>
                <a
                  href="https://pf.kakao.com/_texjAX/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm font-medium text-slate-800 transition hover:text-blue-600"
                >
                  채널 바로가기
                </a>
              </div>

              {/* 주소 */}
              <div className="rounded-2xl border border-slate-200/60 bg-slate-50 p-5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <MapPin className="h-4 w-4 text-blue-600" aria-hidden />
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">주소</p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-800">
                  경기도 구리시<br />이문안로 138 2층
                </p>
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
