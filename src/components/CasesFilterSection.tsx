"use client";

import { useState } from "react";
import { ArrowRight, Download, X } from "lucide-react";
import Link from "next/link";
import { CaseCard, type CaseItem } from "@/components/CaseCard";

const FILTERS = [
  "전체",
  "건설현장",
  "공장·산업현장",
  "공공시설",
  "혹서기 대응",
  "비상대피",
  "다국어 안내",
] as const;
type Filter = (typeof FILTERS)[number];

const cases: CaseItem[] = [
  {
    id: "case-1",
    tags: ["건설현장", "혹서기 대응"],
    fieldType: "건설현장",
    title: "건설현장 혹서기 안전방송 구성 사례",
    purpose: "혹서기 안전방송, 작업 공지",
    config: "상황실 장비 1대 + 현장 방송장비 3대",
    features: ["예약방송", "긴급방송"],
    effect: "반복 안내방송 업무 감소, 현장 전달력 개선",
    detail: {
      overview:
        "대형 건설현장에서 혹서기 반복 안전방송과 작업 공지 자동화가 필요한 적용 예시입니다.",
      problem:
        "혹서기 반복 안내방송을 담당자가 수동으로 진행하면서 업무 부담이 가중되었고, 현장 전체에 일관된 안내 전달이 어려웠습니다.",
      installConfig:
        "상황실에 마스터 장비 1대를 설치하고, 현장 주요 구역에 방송장비 3대를 배치하여 LTE 통신으로 연결했습니다.",
      operation:
        "예약방송 기능으로 정시에 혹서기 안전 안내(폭염주의, 휴식, 수분 섭취 등)를 자동 방송하고, 긴급 상황 발생 시 즉시 방송이 가능합니다.",
      outcome:
        "반복 안내방송 업무가 감소하였으며, 현장 전 구역에 일관된 안내 전달이 가능해졌습니다.",
    },
  },
  {
    id: "case-2",
    tags: ["공장·산업현장", "다국어 안내"],
    fieldType: "산업현장",
    title: "외국인 근로자 다국어 안내방송 적용 사례",
    purpose: "다국어 안전안내",
    config: "상황실 장비 + 현장 방송장비 + 다국어 음원",
    features: ["다국어 방송", "작업 공지"],
    effect: "안전수칙 전달력 개선",
    detail: {
      overview:
        "외국인 근로자 비율이 높은 산업현장에서 언어별 안전수칙 안내가 필요한 적용 예시입니다.",
      problem:
        "언어 장벽으로 인해 외국인 근로자에게 안전수칙을 전달하기 어려웠고, 구두 안내만으로는 한계가 있었습니다.",
      installConfig:
        "상황실 장비와 현장 방송장비를 LTE로 연결하고, 다국어 음원(한국어·영어 등)을 등록했습니다.",
      operation:
        "현장 상황에 맞게 언어별 음원을 선택하여 방송하거나, 예약방송으로 정기 안내가 가능합니다.",
      outcome:
        "안전수칙의 언어별 전달이 가능해졌으며, 외국인 근로자의 안전 안내 이해도 향상에 기여했습니다.",
    },
  },
  {
    id: "case-3",
    tags: ["건설현장", "비상대피"],
    fieldType: "건설현장",
    title: "비상상황 대피방송 구성 사례",
    purpose: "긴급 대피방송",
    config: "상황실 장비 + 현장 방송장비 복수",
    features: ["긴급방송", "현장 공지"],
    effect: "비상상황 발생 시 신속한 안내방송 지원",
    detail: {
      overview:
        "대규모 건설현장에서 비상상황 발생 시 전 구역 즉각 대피방송이 필요한 적용 예시입니다.",
      problem:
        "비상상황 발생 시 전 구역 작업자에게 신속히 대피를 안내할 수 있는 체계가 필요했습니다.",
      installConfig:
        "상황실 장비와 현장 주요 구역의 방송장비를 복수로 구성하여 전 구역 동시 방송이 가능하도록 했습니다.",
      operation:
        "비상상황 발생 시 상황실에서 긴급방송 버튼 한 번으로 전 구역에 즉시 대피 안내방송을 송출할 수 있습니다.",
      outcome:
        "비상상황 발생 시 전 구역에 신속한 안내방송 지원이 가능한 구성을 갖추었습니다.",
    },
  },
  {
    id: "case-4",
    tags: ["공장·산업현장"],
    fieldType: "공장·물류센터",
    title: "공장/물류센터 작업 공지방송 적용 예시",
    purpose: "작업 공지, 안전 안내",
    config: "현장 조건에 따른 방송장비 구성",
    features: ["예약방송", "안내방송"],
    effect: "반복 공지 업무 감소",
    detail: {
      overview:
        "넓은 공장 또는 물류센터에서 작업 공지와 안전 안내를 일괄 전달하는 적용 예시입니다.",
      problem:
        "넓은 시설 내에서 작업 변경 사항이나 공지를 전 구역에 즉시 전달하기 어려웠습니다.",
      installConfig:
        "현장 규모와 통신 환경에 맞게 방송장비를 구성하고, 상황실에서 원격 운영이 가능하도록 했습니다.",
      operation:
        "예약방송으로 정기 공지를 자동화하고, 즉시 방송으로 변경 사항이나 안전 안내를 빠르게 전달합니다.",
      outcome:
        "반복 공지 업무가 감소하였으며, 넓은 시설 전체에 일관된 공지 전달이 가능해졌습니다.",
    },
  },
];

function DetailRow({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-700">{text}</p>
    </div>
  );
}

export function CasesFilterSection() {
  const [active, setActive] = useState<Filter>("전체");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered =
    active === "전체" ? cases : cases.filter((c) => c.tags.includes(active));
  const openCase = cases.find((c) => c.id === openId);

  return (
    <section className="border-t border-slate-200/50 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        {/* 필터 버튼 */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === f
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* 사례 카드 그리드 */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {filtered.length > 0 ? (
            filtered.map((c) => (
              <CaseCard key={c.id} item={c} onOpen={() => setOpenId(c.id)} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center sm:col-span-2">
              <p className="text-sm text-slate-500">
                해당 카테고리의 사례를 준비 중입니다.
              </p>
            </div>
          )}
        </div>

        {/* 신뢰 문구 */}
        <p className="mt-8 text-center text-sm text-slate-500">
          현장명 공개가 어려운 경우, 업종과 구성 중심으로 사례를 안내드립니다.
        </p>
      </div>

      {/* 모달 오버레이 */}
      {openCase && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 py-8"
          onClick={() => setOpenId(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="flex items-start justify-between border-b border-slate-100 p-6">
              <div>
                <span className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  {openCase.fieldType}
                </span>
                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  {openCase.title}
                </h2>
              </div>
              <button
                onClick={() => setOpenId(null)}
                className="ml-4 shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* 모달 본문 */}
            <div className="space-y-5 p-6">
              <DetailRow label="현장 개요" text={openCase.detail.overview} />
              <DetailRow label="기존 문제" text={openCase.detail.problem} />
              <DetailRow label="설치 구성" text={openCase.detail.installConfig} />
              <DetailRow label="운영 방식" text={openCase.detail.operation} />
              <DetailRow label="도입 효과" text={openCase.detail.outcome} />

              <div>
                <p className="text-xs font-semibold text-slate-500">관련 자료</p>
                <a
                  href="/catalog/catalog-2026.pdf"
                  download="catalog-2026.pdf"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  제품 카탈로그 다운로드
                  <Download className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">
                <Link
                  href="/contact?type=demo"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  onClick={() => setOpenId(null)}
                >
                  무료 방문시연 신청
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact?type=quote"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  onClick={() => setOpenId(null)}
                >
                  견적 문의
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
