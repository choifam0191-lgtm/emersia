"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  ClipboardList,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Lightbulb,
} from "lucide-react";
import { ResourceCard } from "@/components/ResourceCard";

const CATEGORIES = ["전체", "카탈로그", "제안자료", "구성도", "사양서", "활용자료", "FAQ"] as const;
type Category = (typeof CATEGORIES)[number];

type Resource = {
  category: string;
  Icon: LucideIcon;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  download?: string;
  ready: boolean;
};

const resources: Resource[] = [
  {
    category: "카탈로그",
    Icon: BookOpen,
    title: "스마트 LTE 방송시스템 카탈로그",
    description:
      "제품 구성, 주요 기능, 적용 현장을 한 번에 확인할 수 있는 기본 자료입니다.",
    buttonLabel: "다운로드",
    href: "/catalog/catalog-2026.pdf",
    download: "catalog-2026.pdf",
    ready: true,
  },
  {
    category: "제안자료",
    Icon: FileText,
    title: "건설현장 적용 제안서",
    description:
      "혹서기 안내, 비상대피, 외국인 근로자 안내방송 적용 예시를 정리한 자료입니다.",
    buttonLabel: "다운로드",
    href: "#",
    ready: false, // TODO: PDF 준비 완료 시 href 연결 및 download 속성 추가
  },
  {
    category: "구성도",
    Icon: LayoutDashboard,
    title: "시스템 구성도",
    description:
      "상황실 장비와 현장 방송장비의 LTE 연결 구조를 확인할 수 있습니다.",
    buttonLabel: "보기",
    href: "#",
    ready: false, // TODO: 구성도 파일 준비 완료 시 연결
  },
  {
    category: "사양서",
    Icon: ClipboardList,
    title: "옵션 구성 안내",
    description:
      "안내표지판, 추가 장비, LTE 무전기 등 옵션 구성을 확인할 수 있습니다.",
    buttonLabel: "다운로드",
    href: "#",
    ready: false, // TODO: 옵션 구성 안내서 준비 완료 시 연결
  },
  {
    category: "활용자료",
    Icon: Lightbulb,
    title: "혹서기 안전방송 활용 예시",
    description:
      "폭염주의, 휴식 안내, 수분 섭취 안내 등 현장 방송 문안 예시입니다.",
    buttonLabel: "보기",
    href: "#",
    ready: false, // TODO: 활용 예시 자료 준비 완료 시 연결
  },
  {
    category: "FAQ",
    Icon: HelpCircle,
    title: "자주 묻는 질문",
    description:
      "설치, 통신, 전원, A/S, 외국어 방송 관련 주요 질문을 정리했습니다.",
    buttonLabel: "보기",
    href: "#faq",
    ready: true,
  },
];

export function ResourcesFilterSection() {
  const [active, setActive] = useState<Category>("전체");

  const filtered =
    active === "전체" ? resources : resources.filter((r) => r.category === active);

  return (
    <section className="border-t border-slate-200/50 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 자료 카드 그리드 */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <ResourceCard
              key={r.title}
              Icon={r.Icon}
              category={r.category}
              title={r.title}
              description={r.description}
              buttonLabel={r.buttonLabel}
              href={r.href}
              download={r.download}
              ready={r.ready}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
