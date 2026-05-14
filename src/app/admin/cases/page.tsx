"use client";

import { useState, useEffect, useRef } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  Loader2,
  Upload,
  Trash2,
  ImageIcon,
  Plus,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CaseItem = {
  slug: string;
  title: string;
  siteType: string;
  mainImage: string;
  gallery: string[];
};

function PhotoBox({
  src,
  alt,
  onDelete,
}: {
  src: string;
  alt: string;
  onDelete: () => void;
}) {
  const [err, setErr] = useState(false);
  return (
    <div className="group relative h-28 w-28 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
      {err ? (
        <div className="flex h-full items-center justify-center text-slate-300">
          <ImageIcon className="h-6 w-6" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setErr(true)}
          unoptimized
        />
      )}
      <button
        onClick={onDelete}
        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition group-hover:opacity-100"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function CasePhotoCard({
  caseItem,
  onDeleted,
}: {
  caseItem: CaseItem;
  onDeleted: (slug: string) => void;
}) {
  const [item, setItem] = useState<CaseItem>(caseItem);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const mainInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(
    file: File,
    type: "main" | "gallery",
    setLoading: (v: boolean) => void
  ) {
    setLoading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("slug", item.slug);
    fd.append("type", type);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok && data.path) {
      setItem((prev) =>
        type === "main"
          ? { ...prev, mainImage: data.path }
          : { ...prev, gallery: [...prev.gallery, data.path] }
      );
    } else {
      alert(data.error ?? "업로드 실패");
    }
    setLoading(false);
  }

  async function deleteImage(filePath: string) {
    if (!confirm("이미지를 삭제하시겠습니까?")) return;
    const res = await fetch("/api/admin/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: item.slug, filePath }),
    });
    if (res.ok) {
      setItem((prev) => ({
        ...prev,
        mainImage: prev.mainImage === filePath ? "" : prev.mainImage,
        gallery: prev.gallery.filter((g) => g !== filePath),
      }));
    } else {
      const d = await res.json();
      alert(d.error ?? "삭제 실패");
    }
  }

  async function handleDeleteCase() {
    if (!confirm(`"${item.title}" 사례를 삭제하시겠습니까?`)) return;
    const res = await fetch("/api/admin/cases", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: item.slug }),
    });
    if (res.ok) {
      onDeleted(item.slug);
    } else {
      const d = await res.json();
      alert(d.error ?? "삭제 실패");
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* 헤더 */}
      <div className="flex items-start justify-between px-6 py-4">
        <div>
          <p className="font-semibold text-slate-900">{item.title}</p>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500">
              {item.slug}
            </span>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
              {item.siteType}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/cases/${item.slug}`}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
          >
            <FileText className="h-3.5 w-3.5" />
            텍스트 편집
          </Link>
          <button
            onClick={handleDeleteCase}
            className="flex items-center gap-1 rounded-lg border border-red-100 px-2.5 py-1.5 text-xs text-red-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 사진 섹션 (토글) */}
      <div className="border-t border-slate-100">
        <button
          onClick={() => setPhotoOpen((v) => !v)}
          className="flex w-full items-center justify-between px-6 py-3 text-sm text-slate-500 transition hover:bg-slate-50"
        >
          <span className="font-medium">
            사진 관리{" "}
            <span className="ml-1 text-xs text-slate-400">
              (대표 {item.mainImage ? "1" : "0"} / 갤러리 {item.gallery.length})
            </span>
          </span>
          {photoOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {photoOpen && (
          <div className="space-y-5 px-6 pb-6">
            {/* 대표 이미지 */}
            <div>
              <p className="mb-2 text-xs font-semibold text-slate-500">대표 이미지</p>
              <div className="flex items-center gap-3">
                <div className="relative h-28 w-28 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                  {item.mainImage ? (
                    <Image
                      src={`${item.mainImage}?t=${Date.now()}`}
                      alt="대표 이미지"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-1 text-slate-300">
                      <ImageIcon className="h-7 w-7" />
                      <span className="text-xs">없음</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => mainInputRef.current?.click()}
                    disabled={uploadingMain}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 disabled:opacity-60"
                  >
                    {uploadingMain ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                    {item.mainImage ? "교체" : "업로드"}
                  </button>
                  {item.mainImage && (
                    <button
                      onClick={() => deleteImage(item.mainImage)}
                      className="flex items-center gap-1 text-xs text-red-400 transition hover:text-red-600"
                    >
                      <Trash2 className="h-3 w-3" /> 삭제
                    </button>
                  )}
                </div>
                <input
                  ref={mainInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadFile(f, "main", setUploadingMain);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>

            {/* 갤러리 */}
            <div>
              <p className="mb-2 text-xs font-semibold text-slate-500">갤러리</p>
              <div className="flex flex-wrap gap-2">
                {item.gallery.map((g) => (
                  <PhotoBox
                    key={g}
                    src={g}
                    alt="갤러리"
                    onDelete={() => deleteImage(g)}
                  />
                ))}
                <button
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={uploadingGallery}
                  className="flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-slate-300 text-slate-400 transition hover:border-blue-400 hover:text-blue-500 disabled:opacity-60"
                >
                  {uploadingGallery ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      <span className="text-xs">추가</span>
                    </>
                  )}
                </button>
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadFile(f, "gallery", setUploadingGallery);
                    e.target.value = "";
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-400">
                이미지에 마우스를 올리면 삭제 버튼이 나타납니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AddCaseForm({ onAdded }: { onAdded: () => void }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [siteType, setSiteType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAdd() {
    if (!slug || !title) {
      setError("slug와 제목은 필수입니다.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/cases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, title, siteType }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      onAdded();
      router.push(`/admin/cases/${data.slug}`);
    } else {
      setError(data.error ?? "추가 실패");
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 py-4 text-sm font-medium text-slate-500 transition hover:border-blue-400 hover:text-blue-600"
      >
        <Plus className="h-4 w-4" /> 새 사례 추가
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
      <p className="mb-4 font-semibold text-blue-900">새 사례 추가</p>
      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">
            slug <span className="font-normal text-slate-400">(영문 소문자·숫자·하이픈, 변경 불가)</span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            placeholder="예: logistics-safety"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 물류센터 안전방송 구성 사례"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">현장 유형</label>
          <input
            type="text"
            value={siteType}
            onChange={(e) => setSiteType(e.target.value)}
            placeholder="예: 물류센터"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleAdd}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            추가 및 편집 페이지로
          </button>
          <button
            onClick={() => {
              setOpen(false);
              setSlug("");
              setTitle("");
              setSiteType("");
              setError("");
            }}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminCasesPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  function load() {
    fetch("/api/admin/cases")
      .then((r) => r.json())
      .then((d) => {
        setCases(d.cases ?? []);
        setLoaded(true);
      });
  }

  useEffect(() => {
    load();
  }, []);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminHeader title="설치사례 관리" />
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader title="설치사례 관리" />
      <main className="mx-auto max-w-3xl space-y-4 px-6 py-10">
        {cases.map((c) => (
          <CasePhotoCard
            key={c.slug}
            caseItem={c}
            onDeleted={(slug) => setCases((prev) => prev.filter((x) => x.slug !== slug))}
          />
        ))}
        <AddCaseForm onAdded={load} />
      </main>
    </div>
  );
}
