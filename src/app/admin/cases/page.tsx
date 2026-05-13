"use client";

import { useState, useEffect, useRef } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Loader2, Upload, Trash2, ImageIcon, Plus } from "lucide-react";
import Image from "next/image";

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

function CasePhotoCard({ caseItem }: { caseItem: CaseItem }) {
  const [item, setItem] = useState<CaseItem>(caseItem);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
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
      setItem((prev) => {
        if (type === "main") {
          return { ...prev, mainImage: data.path };
        } else {
          return { ...prev, gallery: [...prev.gallery, data.path] };
        }
      });
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

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="font-semibold text-slate-900">{item.title}</p>
          <span className="mt-0.5 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
            {item.slug}
          </span>
        </div>
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs text-blue-600">
          {item.siteType}
        </span>
      </div>

      {/* 대표 이미지 */}
      <div className="mb-5">
        <p className="mb-2 text-xs font-semibold text-slate-500">대표 이미지</p>
        <div className="flex items-center gap-3">
          <div className="relative h-28 w-28 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            {item.mainImage ? (
              <>
                <Image
                  src={`${item.mainImage}?t=${Date.now()}`}
                  alt="대표 이미지"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  onClick={() => deleteImage(item.mainImage)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition hover:opacity-100 group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </>
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
            <p className="text-xs text-slate-400">JPEG·PNG·WEBP, 최대 10MB</p>
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
        {item.mainImage && (
          <button
            onClick={() => deleteImage(item.mainImage)}
            className="mt-2 flex items-center gap-1 text-xs text-red-400 transition hover:text-red-600"
          >
            <Trash2 className="h-3 w-3" /> 대표 이미지 삭제
          </button>
        )}
      </div>

      {/* 갤러리 */}
      <div>
        <p className="mb-2 text-xs font-semibold text-slate-500">갤러리</p>
        <div className="flex flex-wrap gap-2">
          {item.gallery.map((g) => (
            <PhotoBox key={g} src={g} alt="갤러리 이미지" onDelete={() => deleteImage(g)} />
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
        <p className="mt-2 text-xs text-slate-400">이미지 위에 마우스를 올리면 삭제 버튼이 나타납니다.</p>
      </div>
    </div>
  );
}

export default function AdminCasesPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/admin/cases")
      .then((r) => r.json())
      .then((d) => {
        setCases(d.cases ?? []);
        setLoaded(true);
      });
  }, []);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminHeader title="설치사례 사진 관리" />
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader title="설치사례 사진 관리" />
      <main className="mx-auto max-w-3xl space-y-6 px-6 py-10">
        <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          사례 텍스트(제목·태그 등) 편집은 다음 단계에서 지원됩니다. 현재는 사진만 업로드·삭제 가능합니다.
        </div>
        {cases.map((c) => (
          <CasePhotoCard key={c.slug} caseItem={c} />
        ))}
      </main>
    </div>
  );
}
