"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import type { Case } from "@/lib/cases";

function CardImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-44 items-center justify-center bg-slate-100">
        <p className="text-xs text-slate-400">이미지 준비중</p>
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
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm">
      {/* 대표 사진 */}
      <CardImage src={item.mainImage} alt={item.title} />

      <div className="flex flex-1 flex-col p-6">
        <span className="inline-block self-start rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
          {item.siteType}
        </span>

        <p className="mt-3 text-lg font-bold text-slate-900">{item.title}</p>

        <dl className="mt-4 grid grid-cols-1 gap-2 text-sm">
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 font-semibold text-slate-500">도입 목적</dt>
            <dd className="text-slate-700">{item.purpose}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 font-semibold text-slate-500">설치 구성</dt>
            <dd className="text-slate-700">{item.setup}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 shrink-0 font-semibold text-slate-500">주요 기능</dt>
            <dd className="text-slate-700">{item.features}</dd>
          </div>
        </dl>

        <div className="mt-4 flex-1 rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-semibold text-slate-500">도입 효과</p>
          <p className="mt-1 text-sm text-slate-700">{item.effect}</p>
        </div>

        <button
          onClick={onOpen}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          자세히 보기
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
