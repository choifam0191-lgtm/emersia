"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";

type ContactData = { email: string; phone: string; address: string; kakao: string };
type CompanyHero = { eyebrow: string; headline: string; paragraphs: string[] };
type CompanyClients = { eyebrow: string; title: string; note: string };
type CompanyData = { hero: CompanyHero; clients: CompanyClients };

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

export default function CompanyEditorPage() {
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [contact, setContact] = useState<ContactData | null>(null);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((d) => {
        setCompany(d.company);
        setContact(d.contact);
      });
  }, []);

  const saveSection = useCallback(
    async (sectionName: string, data: unknown) => {
      setSavingSection(sectionName);
      await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: sectionName, data }),
      });
      setSavingSection(null);
      setSavedSection(sectionName);
      setTimeout(() => setSavedSection(null), 2500);
    },
    []
  );

  if (!company || !contact) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminHeader title="회사소개 편집" />
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader title="회사소개 편집" />
      <main className="mx-auto max-w-3xl space-y-6 px-6 py-10">

        {/* 연락처 */}
        <SectionCard
          title="연락처 정보"
          onSave={() => saveSection("contact", contact)}
          saving={savingSection === "contact"}
          saved={savedSection === "contact"}
        >
          <Field
            label="전화번호"
            value={contact.phone}
            onChange={(v) => setContact((c) => c && { ...c, phone: v })}
          />
          <Field
            label="이메일"
            value={contact.email}
            onChange={(v) => setContact((c) => c && { ...c, email: v })}
          />
          <Field
            label="주소"
            value={contact.address}
            onChange={(v) => setContact((c) => c && { ...c, address: v })}
          />
          <Field
            label="카카오톡 채널 URL"
            value={contact.kakao}
            onChange={(v) => setContact((c) => c && { ...c, kakao: v })}
          />
        </SectionCard>

        {/* 회사 Hero */}
        <SectionCard
          title="회사소개 Hero"
          onSave={() => saveSection("company", company)}
          saving={savingSection === "company"}
          saved={savedSection === "company"}
        >
          <Field
            label="eyebrow"
            value={company.hero.eyebrow}
            onChange={(v) =>
              setCompany((c) => c && { ...c, hero: { ...c.hero, eyebrow: v } })
            }
          />
          <Field
            label="헤드라인"
            value={company.hero.headline}
            onChange={(v) =>
              setCompany((c) => c && { ...c, hero: { ...c.hero, headline: v } })
            }
          />
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-500">
              소개 문단
            </label>
            <div className="space-y-2">
              {company.hero.paragraphs.map((para, i) => (
                <div key={i} className="flex gap-2">
                  <textarea
                    value={para}
                    rows={3}
                    onChange={(e) =>
                      setCompany((c) => {
                        if (!c) return c;
                        const paragraphs = [...c.hero.paragraphs];
                        paragraphs[i] = e.target.value;
                        return { ...c, hero: { ...c.hero, paragraphs } };
                      })
                    }
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    onClick={() =>
                      setCompany((c) => {
                        if (!c) return c;
                        const paragraphs = c.hero.paragraphs.filter((_, j) => j !== i);
                        return { ...c, hero: { ...c.hero, paragraphs } };
                      })
                    }
                    className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  setCompany((c) => {
                    if (!c) return c;
                    return {
                      ...c,
                      hero: { ...c.hero, paragraphs: [...c.hero.paragraphs, ""] },
                    };
                  })
                }
                className="flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-500 transition hover:border-blue-400 hover:text-blue-600"
              >
                <Plus className="h-4 w-4" /> 문단 추가
              </button>
            </div>
          </div>
        </SectionCard>

        {/* 거래처 섹션 */}
        <SectionCard
          title="거래처 / 협력사 섹션"
          onSave={() => saveSection("company", company)}
          saving={savingSection === "company_clients"}
          saved={savedSection === "company_clients"}
        >
          <Field
            label="eyebrow"
            value={company.clients.eyebrow}
            onChange={(v) =>
              setCompany((c) => c && { ...c, clients: { ...c.clients, eyebrow: v } })
            }
          />
          <Field
            label="제목"
            value={company.clients.title}
            onChange={(v) =>
              setCompany((c) => c && { ...c, clients: { ...c.clients, title: v } })
            }
          />
          <Field
            label="부연 설명"
            value={company.clients.note}
            onChange={(v) =>
              setCompany((c) => c && { ...c, clients: { ...c.clients, note: v } })
            }
            rows={2}
          />
        </SectionCard>

      </main>
    </div>
  );
}
