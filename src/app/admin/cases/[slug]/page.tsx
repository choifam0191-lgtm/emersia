"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Check, Loader2 } from "lucide-react";

type Detail = {
  overview: string;
  problem: string;
  installConfig: string;
  operation: string;
  outcome: string;
};

type CaseData = {
  slug: string;
  title: string;
  siteType: string;
  tags: string[];
  purpose: string;
  setup: string;
  features: string;
  effect: string;
  detail: Detail;
};

function Field({
  label,
  value,
  onChange,
  rows,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-500">
        {label}
        {hint && <span className="ml-1.5 font-normal text-slate-400">{hint}</span>}
      </label>
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      )}
    </div>
  );
}

function SectionCard({
  title,
  children,
  onSave,
  saving,
  saved,
}: {
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-base font-bold text-slate-900">{title}</h2>
      <div className="space-y-4">{children}</div>
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          저장
        </button>
        {saved && (
          <span className="flex items-center gap-1 text-sm text-green-600">
            <Check className="h-4 w-4" /> 저장됐습니다
          </span>
        )}
      </div>
    </div>
  );
}

export default function CaseEditorPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSection, setSavedSection] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch("/api/admin/cases")
      .then((r) => r.json())
      .then((d) => {
        const found = (d.cases ?? []).find(
          (c: CaseData) => c.slug === slug
        );
        if (!found) {
          setNotFound(true);
          return;
        }
        setCaseData(found);
        setTagsInput((found.tags ?? []).join(", "));
      });
  }, [slug]);

  const save = useCallback(
    async (sectionName: string, patch: Partial<CaseData>) => {
      if (!caseData) return;
      setSavingSection(sectionName);
      const res = await fetch("/api/admin/cases", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, data: patch }),
      });
      setSavingSection(null);
      if (res.ok) {
        setSavedSection(sectionName);
        setTimeout(() => setSavedSection(null), 2500);
      }
    },
    [caseData, slug]
  );

  function saveBasic() {
    if (!caseData) return;
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const patch = {
      title: caseData.title,
      siteType: caseData.siteType,
      tags,
      purpose: caseData.purpose,
      setup: caseData.setup,
      features: caseData.features,
      effect: caseData.effect,
    };
    setCaseData((d) => d && { ...d, tags });
    save("basic", patch);
  }

  function saveDetail() {
    if (!caseData) return;
    save("detail", { detail: caseData.detail });
  }

  async function handleDelete() {
    if (
      !confirm(
        `"${caseData?.title ?? slug}" 사례를 삭제하시겠습니까?\n사진 파일은 서버에 남아있으며 별도로 정리해야 합니다.`
      )
    )
      return;
    const res = await fetch("/api/admin/cases", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    if (res.ok) {
      router.push("/admin/cases");
    } else {
      const d = await res.json();
      alert(d.error ?? "삭제 실패");
    }
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminHeader title="사례 편집" backHref="/admin/cases" />
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="text-slate-500">존재하지 않는 사례입니다.</p>
          <button
            onClick={() => router.push("/admin/cases")}
            className="mt-4 text-sm text-blue-600 underline"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminHeader title="사례 편집" backHref="/admin/cases" />
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader title={`사례 편집: ${caseData.title}`} backHref="/admin/cases" />
      <main className="mx-auto max-w-3xl space-y-6 px-6 py-10">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-slate-200 px-2.5 py-0.5 font-mono text-xs text-slate-600">
            slug: {slug}
          </span>
          <button
            onClick={handleDelete}
            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
          >
            이 사례 삭제
          </button>
        </div>

        {/* 기본 정보 */}
        <SectionCard
          title="기본 정보"
          onSave={saveBasic}
          saving={savingSection === "basic"}
          saved={savedSection === "basic"}
        >
          <Field
            label="제목"
            value={caseData.title}
            onChange={(v) => setCaseData((d) => d && { ...d, title: v })}
          />
          <Field
            label="현장 유형"
            value={caseData.siteType}
            hint="(예: 건설현장, 산업현장, 물류센터)"
            onChange={(v) => setCaseData((d) => d && { ...d, siteType: v })}
          />
          <Field
            label="태그"
            value={tagsInput}
            hint="(쉼표로 구분, 예: 건설현장, 혹서기 대응)"
            onChange={setTagsInput}
          />
          <Field
            label="도입 목적"
            value={caseData.purpose}
            onChange={(v) => setCaseData((d) => d && { ...d, purpose: v })}
          />
          <Field
            label="구성"
            value={caseData.setup}
            hint="(예: 상황실 장비 1대 + 현장 방송장비 3대)"
            onChange={(v) => setCaseData((d) => d && { ...d, setup: v })}
          />
          <Field
            label="주요 기능"
            value={caseData.features}
            hint="(예: 예약방송, 긴급방송)"
            onChange={(v) => setCaseData((d) => d && { ...d, features: v })}
          />
          <Field
            label="도입 효과"
            value={caseData.effect}
            onChange={(v) => setCaseData((d) => d && { ...d, effect: v })}
          />
        </SectionCard>

        {/* 상세 내용 */}
        <SectionCard
          title="상세 내용 (모달 팝업에 표시)"
          onSave={saveDetail}
          saving={savingSection === "detail"}
          saved={savedSection === "detail"}
        >
          <Field
            label="개요"
            value={caseData.detail.overview}
            rows={2}
            onChange={(v) =>
              setCaseData((d) =>
                d ? { ...d, detail: { ...d.detail, overview: v } } : d
              )
            }
          />
          <Field
            label="문제 상황"
            value={caseData.detail.problem}
            rows={2}
            onChange={(v) =>
              setCaseData((d) =>
                d ? { ...d, detail: { ...d.detail, problem: v } } : d
              )
            }
          />
          <Field
            label="설치 구성"
            value={caseData.detail.installConfig}
            rows={2}
            onChange={(v) =>
              setCaseData((d) =>
                d ? { ...d, detail: { ...d.detail, installConfig: v } } : d
              )
            }
          />
          <Field
            label="운영 방식"
            value={caseData.detail.operation}
            rows={2}
            onChange={(v) =>
              setCaseData((d) =>
                d ? { ...d, detail: { ...d.detail, operation: v } } : d
              )
            }
          />
          <Field
            label="결과"
            value={caseData.detail.outcome}
            rows={2}
            onChange={(v) =>
              setCaseData((d) =>
                d ? { ...d, detail: { ...d.detail, outcome: v } } : d
              )
            }
          />
        </SectionCard>
      </main>
    </div>
  );
}
