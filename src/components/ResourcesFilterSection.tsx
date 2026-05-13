import { BookOpen, FileText, HelpCircle } from "lucide-react";
import { ResourceCard } from "@/components/ResourceCard";

const resources = [
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
    category: "제안서",
    Icon: FileText,
    title: "건설현장 적용 제안서",
    description:
      "혹서기 안내, 비상대피, 외국인 근로자 안내방송 적용 예시를 정리한 자료입니다.",
    buttonLabel: "다운로드",
    href: "#",
    ready: false,
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
] as const;

export function ResourcesFilterSection() {
  return (
    <section className="border-t border-slate-200/50 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {resources.map((r) => (
            <ResourceCard
              key={r.title}
              Icon={r.Icon}
              category={r.category}
              title={r.title}
              description={r.description}
              buttonLabel={r.buttonLabel}
              href={r.href}
              download={"download" in r ? r.download : undefined}
              ready={r.ready}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
