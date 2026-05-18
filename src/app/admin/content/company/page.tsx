"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Check, ImagePlus, Loader2, Plus, Trash2, X } from "lucide-react";

type ContactData = { email: string; phone: string; address: string; kakao: string };
type CompanyHero = { eyebrow: string; headline: string; paragraphs: string[] };
type CompanyClients = { eyebrow: string; title: string; note: string };
type CompanyData = { heroImage?: string | null; hero: CompanyHero; clients: CompanyClients };

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

function HeroImageCard({
  initial,
}: {
  initial: string | null | undefined;
}) {
  const [current, setCurrent] = useState<string | null>(initial ?? null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/company-image", { method: "POST", body: fd });
    const data = await res.json();
    if (data.ok) {
      setCurrent(data.path + "?t=" + Date.now());
      setPreview(null);
    }
    setUploading(false);
  }

  async function handleDelete() {
    if (!confirm("대표 이미지를 삭제할까요?")) return;
    setDeleting(true);
    await fetch("/api/admin/company-image", { method: "DELETE" });
    setCurrent(null);
    setDeleting(false);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    handleUpload(file);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-base font-bold text-slate-900">회사소개 대표 이미지</h2>
      <p className="mb-4 text-xs text-slate-500">
        회사소개 Hero 섹션 우측에 표시됩니다. JPEG / PNG / WEBP, 10MB 이하.
      </p>

      {current ? (
        <div className="relative w-full max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current}
            alt="대표 이미지"
            className="w-full rounded-xl object-cover aspect-[4/3] border border-slate-200"
          />
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-600"
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
          </button>
        </div>
      ) : (
        <div
          className="flex w-full max-w-sm cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 py-10 transition hover:border-blue-400"
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          ) : preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="미리보기" className="h-24 w-auto rounded-lg object-cover" />
          ) : (
            <>
              <ImagePlus className="h-8 w-8 text-slate-300" />
              <p className="text-sm text-slate-400">클릭하여 이미지 업로드</p>
            </>
          )}
        </div>
      )}

      {!current && (
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="mt-3 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
          <ImagePlus className="h-4 w-4" />
          이미지 업로드
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
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

        {/* 대표 이미지 */}
        <HeroImageCard initial={company.heroImage} />

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
