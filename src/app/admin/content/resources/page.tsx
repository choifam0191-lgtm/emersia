"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Check, Loader2 } from "lucide-react";

type ResourcesHero = { eyebrow: string; headline: string; subtext: string };
type ResourceCard = {
  category: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  download: string | null;
  ready: boolean;
};
type ResourcesData = { hero: ResourcesHero; cards: ResourceCard[] };
type CtaData = { eyebrow: string; headline: string; subtext: string };

function Field({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-500">{label}</label>
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

export default function ResourcesEditorPage() {
  const [resources, setResources] = useState<ResourcesData | null>(null);
  const [cta, setCta] = useState<CtaData | null>(null);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((d) => {
        setResources(d.resources);
        setCta(d.cta);
      });
  }, []);

  const saveSection = useCallback(async (sectionName: string, data: unknown) => {
    setSavingSection(sectionName);
    await fetch("/api/admin/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: sectionName, data }),
    });
    setSavingSection(null);
    setSavedSection(sectionName);
    setTimeout(() => setSavedSection(null), 2500);
  }, []);

  if (!resources || !cta) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminHeader title="자료실 편집" />
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader title="자료실 편집" />
      <main className="mx-auto max-w-3xl space-y-6 px-6 py-10">

        {/* 자료실 Hero */}
        <SectionCard
          title="자료실 Hero"
          onSave={() => saveSection("resources", resources)}
          saving={savingSection === "resources"}
          saved={savedSection === "resources"}
        >
          <Field
            label="eyebrow"
            value={resources.hero.eyebrow}
            onChange={(v) =>
              setResources((r) => r && { ...r, hero: { ...r.hero, eyebrow: v } })
            }
          />
          <Field
            label="헤드라인"
            value={resources.hero.headline}
            onChange={(v) =>
              setResources((r) => r && { ...r, hero: { ...r.hero, headline: v } })
            }
          />
          <Field
            label="서브텍스트"
            value={resources.hero.subtext}
            onChange={(v) =>
              setResources((r) => r && { ...r, hero: { ...r.hero, subtext: v } })
            }
            rows={2}
          />
        </SectionCard>

        {/* 자료 카드 */}
        <SectionCard
          title="자료 카드"
          onSave={() => saveSection("resources", resources)}
          saving={savingSection === "resources_cards"}
          saved={savedSection === "resources_cards"}
        >
          {resources.cards.map((card, i) => (
            <div key={i} className="space-y-3 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-400">카드 {i + 1} — {card.category}</p>
              <Field
                label="카테고리"
                value={card.category}
                onChange={(v) =>
                  setResources((r) => {
                    if (!r) return r;
                    const cards = [...r.cards];
                    cards[i] = { ...cards[i], category: v };
                    return { ...r, cards };
                  })
                }
              />
              <Field
                label="제목"
                value={card.title}
                onChange={(v) =>
                  setResources((r) => {
                    if (!r) return r;
                    const cards = [...r.cards];
                    cards[i] = { ...cards[i], title: v };
                    return { ...r, cards };
                  })
                }
              />
              <Field
                label="설명"
                value={card.description}
                rows={2}
                onChange={(v) =>
                  setResources((r) => {
                    if (!r) return r;
                    const cards = [...r.cards];
                    cards[i] = { ...cards[i], description: v };
                    return { ...r, cards };
                  })
                }
              />
              <Field
                label="버튼 텍스트"
                value={card.buttonLabel}
                onChange={(v) =>
                  setResources((r) => {
                    if (!r) return r;
                    const cards = [...r.cards];
                    cards[i] = { ...cards[i], buttonLabel: v };
                    return { ...r, cards };
                  })
                }
              />
              <Field
                label="링크 URL"
                value={card.href}
                onChange={(v) =>
                  setResources((r) => {
                    if (!r) return r;
                    const cards = [...r.cards];
                    cards[i] = { ...cards[i], href: v };
                    return { ...r, cards };
                  })
                }
              />
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={card.ready}
                  onChange={(e) =>
                    setResources((r) => {
                      if (!r) return r;
                      const cards = [...r.cards];
                      cards[i] = { ...cards[i], ready: e.target.checked };
                      return { ...r, cards };
                    })
                  }
                  className="rounded"
                />
                파일 준비 완료 (체크 해제 시 "준비 중" 표시)
              </label>
            </div>
          ))}
        </SectionCard>

        {/* CTA */}
        <SectionCard
          title="공통 CTA 섹션"
          onSave={() => saveSection("cta", cta)}
          saving={savingSection === "cta"}
          saved={savedSection === "cta"}
        >
          <Field
            label="eyebrow"
            value={cta.eyebrow}
            onChange={(v) => setCta((c) => c && { ...c, eyebrow: v })}
          />
          <Field
            label="헤드라인 (줄바꿈은 \\n 입력)"
            value={cta.headline}
            onChange={(v) => setCta((c) => c && { ...c, headline: v })}
            rows={2}
          />
          <Field
            label="서브텍스트"
            value={cta.subtext}
            onChange={(v) => setCta((c) => c && { ...c, subtext: v })}
            rows={2}
          />
        </SectionCard>

      </main>
    </div>
  );
}
