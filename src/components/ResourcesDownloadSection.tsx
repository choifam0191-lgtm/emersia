"use client";

import { Download, FileText, LayoutDashboard } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { SectionTitle } from "@/components/SectionTitle";

const resources = [
  {
    Icon: Download,
    title: "제품 카탈로그",
    desc: "제품 라인업, 스펙, 구성 예시를 한 번에 확인하세요.",
    href: "/api/catalog/download",
    download: "3S_catalog.pdf",
    ready: true,
  },
  {
    Icon: FileText,
    title: "건설현장 적용 제안서",
    desc: "건설현장 도입 시 검토에 참고할 수 있는 제안서입니다.",
    href: "#",
    download: undefined,
    ready: false,
  },
  {
    Icon: LayoutDashboard,
    title: "시스템 구성도",
    desc: "장비 구성 및 설치 환경을 도식화한 자료입니다.",
    href: "#",
    download: undefined,
    ready: false,
  },
] as const;

export function ResourcesDownloadSection() {
  return (
    <section className="border-t border-slate-200/50 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <MotionInView>
          <SectionTitle
            eyebrow="자료실"
            title="검토에 필요한 자료를 확인하세요."
          />
        </MotionInView>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {resources.map((r, idx) => (
            <MotionInView key={r.title} delay={0.06 + idx * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200/60 bg-slate-50 p-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                  <r.Icon className="h-6 w-6 text-blue-600" strokeWidth={1.8} aria-hidden />
                </div>
                <p className="mt-4 font-bold text-slate-900">{r.title}</p>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">
                  {r.desc}
                </p>

                {r.ready ? (
                  <a
                    href={r.href}
                    download={r.download}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    다운로드
                    <Download className="h-4 w-4" />
                  </a>
                ) : (
                  /* TODO: PDF 준비 완료 시 위의 ready: true 로 변경하고 href 연결 */
                  <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-400">
                    준비중
                  </div>
                )}
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
