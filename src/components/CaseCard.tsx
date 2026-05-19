"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import type { Case } from "@/lib/cases";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

function CardImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-44 items-center justify-center bg-muted">
        <p className="text-xs text-mist">이미지 준비중</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-44 w-full object-cover"
      onError={() => setError(true)}
    />
  );
}

type Props = {
  item: Case;
  onOpen: () => void;
};

export function CaseCard({ item, onOpen }: Props) {
  return (
    <Card className="flex h-full flex-col overflow-hidden !p-0">
      <CardImage src={item.mainImage} alt={item.title} />

      <div className="flex flex-1 flex-col p-6">
        <Badge variant="brand">{item.siteType}</Badge>

        <p className="mt-3 text-lg font-bold text-ink-900">{item.title}</p>

        <dl className="mt-4 grid grid-cols-1 gap-2 text-sm">
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 font-semibold text-ink-500">도입 목적</dt>
            <dd className="text-ink-700">{item.purpose}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 font-semibold text-ink-500">설치 구성</dt>
            <dd className="text-ink-700">{item.setup}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 font-semibold text-ink-500">주요 기능</dt>
            <dd className="text-ink-700">{item.features}</dd>
          </div>
        </dl>

        <div className="mt-4 flex-1 rounded-xl bg-muted px-4 py-3">
          <p className="text-xs font-semibold text-ink-500">도입 효과</p>
          <p className="mt-1 text-sm text-ink-700">{item.effect}</p>
        </div>

        <button
          onClick={onOpen}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-safety-blue transition hover:text-safety-blue-hover"
        >
          자세히 보기
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
}
