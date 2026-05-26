"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { CaseCard } from "@/components/CaseCard";
import type { Case } from "@/lib/cases";

function DetailRow({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-700">{text}</p>
    </div>
  );
}

function ModalImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-[291px] items-center justify-center bg-slate-100">
        <p className="text-xs text-slate-400">이미지 준비중</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-[291px] w-full object-cover"
      onError={() => setError(true)}
    />
  );
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <img
      src={src}
      alt={alt}
      className="h-24 w-full rounded-xl object-cover bg-slate-100"
      onError={() => setError(true)}
    />
  );
}

export function CasesFilterSection({ cases }: { cases: Case[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const openCase: Case | undefined = cases.find((c) => c.slug === openSlug);

  return (
    <section className="border-t border-slate-200/50 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        {/* 사례 카드 그리드 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {cases.map((c) => (
            <CaseCard key={c.slug} item={c} onOpen={() => setOpenSlug(c.slug)} />
          ))}
        </div>
      </div>

      {/* 모달 오버레이 */}
      {openCase && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 py-8"
          onClick={() => setOpenSlug(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 대표 사진 */}
            <ModalImage src={openCase.mainImage} alt={openCase.title} />

            {/* 모달 헤더 */}
            <div className="flex items-start justify-between border-b border-slate-100 p-6">
              <div>
                <span className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  {openCase.siteType}
                </span>
                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  {openCase.title}
                </h2>
              </div>
              <button
                onClick={() => setOpenSlug(null)}
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

              {/* 추가 사진 갤러리 */}
              {openCase.gallery.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-500">현장 사진</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {openCase.gallery.map((img, i) => (
                      <GalleryImage key={i} src={img} alt={`${openCase.title} 사진 ${i + 1}`} />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">
                <Link
                  href="/contact?type=demo"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  onClick={() => setOpenSlug(null)}
                >
                  무료 방문시연 신청
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact?type=quote"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  onClick={() => setOpenSlug(null)}
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
