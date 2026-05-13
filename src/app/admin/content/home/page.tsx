"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Check, Loader2 } from "lucide-react";

type HeroData = { eyebrow: string; headline: string; subtext: string; supportText: string };
type ProblemCard = { title: string; desc: string; alert: boolean };
type ProblemData = { eyebrow: string; title: string; cards: ProblemCard[] };
type SolutionData = { eyebrow: string; title: string; description: string };
type AppCard = { title: string; desc: string };
type ApplicationData = { eyebrow: string; title: string; cards: AppCard[] };
type ProcessStep = { title: string; desc: string };
type ProcessData = { eyebrow: string; title: string; steps: ProcessStep[] };
type HomeData = {
  hero: HeroData;
  problem: ProblemData;
  solution: SolutionData;
  application: ApplicationData;
  process: ProcessData;
};

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

export default function HomeEditorPage() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((d) => setHomeData(d.home));
  }, []);

  const saveSection = useCallback(
    async (sectionName: string) => {
      if (!homeData) return;
      setSavingSection(sectionName);
      await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "home", data: homeData }),
      });
      setSavingSection(null);
      setSavedSection(sectionName);
      setTimeout(() => setSavedSection(null), 2500);
    },
    [homeData]
  );

  if (!homeData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminHeader title="홈 문구 편집" />
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  const { hero, problem, solution, application, process } = homeData;

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader title="홈 문구 편집" />
      <main className="mx-auto max-w-3xl space-y-6 px-6 py-10">
        {/* Hero */}
        <SectionCard
          title="Hero 섹션"
          onSave={() => saveSection("hero")}
          saving={savingSection === "hero"}
          saved={savedSection === "hero"}
        >
          <Field
            label="eyebrow (상단 태그)"
            value={hero.eyebrow}
            onChange={(v) =>
              setHomeData((d) => d && { ...d, hero: { ...d.hero, eyebrow: v } })
            }
          />
          <Field
            label="헤드라인"
            value={hero.headline}
            onChange={(v) =>
              setHomeData((d) => d && { ...d, hero: { ...d.hero, headline: v } })
            }
          />
          <Field
            label="서브텍스트"
            value={hero.subtext}
            onChange={(v) =>
              setHomeData((d) => d && { ...d, hero: { ...d.hero, subtext: v } })
            }
            rows={3}
          />
          <Field
            label="하단 보조 문구"
            value={hero.supportText}
            onChange={(v) =>
              setHomeData((d) => d && { ...d, hero: { ...d.hero, supportText: v } })
            }
            rows={2}
          />
        </SectionCard>

        {/* Problem */}
        <SectionCard
          title="문제점 섹션"
          onSave={() => saveSection("problem")}
          saving={savingSection === "problem"}
          saved={savedSection === "problem"}
        >
          <Field
            label="eyebrow"
            value={problem.eyebrow}
            onChange={(v) =>
              setHomeData((d) => d && { ...d, problem: { ...d.problem, eyebrow: v } })
            }
          />
          <Field
            label="제목"
            value={problem.title}
            onChange={(v) =>
              setHomeData((d) => d && { ...d, problem: { ...d.problem, title: v } })
            }
          />
          {problem.cards.map((card, i) => (
            <div key={i} className="space-y-2 rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-400">카드 {i + 1}</p>
              <Field
                label="제목"
                value={card.title}
                onChange={(v) =>
                  setHomeData((d) => {
                    if (!d) return d;
                    const cards = [...d.problem.cards];
                    cards[i] = { ...cards[i], title: v };
                    return { ...d, problem: { ...d.problem, cards } };
                  })
                }
              />
              <Field
                label="설명"
                value={card.desc}
                rows={2}
                onChange={(v) =>
                  setHomeData((d) => {
                    if (!d) return d;
                    const cards = [...d.problem.cards];
                    cards[i] = { ...cards[i], desc: v };
                    return { ...d, problem: { ...d.problem, cards } };
                  })
                }
              />
            </div>
          ))}
        </SectionCard>

        {/* Solution */}
        <SectionCard
          title="솔루션 섹션"
          onSave={() => saveSection("solution")}
          saving={savingSection === "solution"}
          saved={savedSection === "solution"}
        >
          <Field
            label="eyebrow"
            value={solution.eyebrow}
            onChange={(v) =>
              setHomeData((d) => d && { ...d, solution: { ...d.solution, eyebrow: v } })
            }
          />
          <Field
            label="제목"
            value={solution.title}
            onChange={(v) =>
              setHomeData((d) => d && { ...d, solution: { ...d.solution, title: v } })
            }
          />
          <Field
            label="설명"
            value={solution.description}
            onChange={(v) =>
              setHomeData((d) => d && { ...d, solution: { ...d.solution, description: v } })
            }
            rows={3}
          />
        </SectionCard>

        {/* Application */}
        <SectionCard
          title="적용 현장 섹션"
          onSave={() => saveSection("application")}
          saving={savingSection === "application"}
          saved={savedSection === "application"}
        >
          <Field
            label="eyebrow"
            value={application.eyebrow}
            onChange={(v) =>
              setHomeData((d) => d && { ...d, application: { ...d.application, eyebrow: v } })
            }
          />
          <Field
            label="제목"
            value={application.title}
            onChange={(v) =>
              setHomeData((d) => d && { ...d, application: { ...d.application, title: v } })
            }
          />
          {application.cards.map((card, i) => (
            <div key={i} className="space-y-2 rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-400">카드 {i + 1}</p>
              <Field
                label="제목"
                value={card.title}
                onChange={(v) =>
                  setHomeData((d) => {
                    if (!d) return d;
                    const cards = [...d.application.cards];
                    cards[i] = { ...cards[i], title: v };
                    return { ...d, application: { ...d.application, cards } };
                  })
                }
              />
              <Field
                label="설명"
                value={card.desc}
                onChange={(v) =>
                  setHomeData((d) => {
                    if (!d) return d;
                    const cards = [...d.application.cards];
                    cards[i] = { ...cards[i], desc: v };
                    return { ...d, application: { ...d.application, cards } };
                  })
                }
              />
            </div>
          ))}
        </SectionCard>

        {/* Process */}
        <SectionCard
          title="도입 절차 섹션"
          onSave={() => saveSection("process")}
          saving={savingSection === "process"}
          saved={savedSection === "process"}
        >
          <Field
            label="eyebrow"
            value={process.eyebrow}
            onChange={(v) =>
              setHomeData((d) => d && { ...d, process: { ...d.process, eyebrow: v } })
            }
          />
          <Field
            label="제목"
            value={process.title}
            onChange={(v) =>
              setHomeData((d) => d && { ...d, process: { ...d.process, title: v } })
            }
          />
          {process.steps.map((step, i) => (
            <div key={i} className="space-y-2 rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-400">단계 {i + 1}</p>
              <Field
                label="제목"
                value={step.title}
                onChange={(v) =>
                  setHomeData((d) => {
                    if (!d) return d;
                    const steps = [...d.process.steps];
                    steps[i] = { ...steps[i], title: v };
                    return { ...d, process: { ...d.process, steps } };
                  })
                }
              />
              <Field
                label="설명"
                value={step.desc}
                rows={2}
                onChange={(v) =>
                  setHomeData((d) => {
                    if (!d) return d;
                    const steps = [...d.process.steps];
                    steps[i] = { ...steps[i], desc: v };
                    return { ...d, process: { ...d.process, steps } };
                  })
                }
              />
            </div>
          ))}
        </SectionCard>
      </main>
    </div>
  );
}
