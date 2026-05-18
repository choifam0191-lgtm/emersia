"use client";

import { useState, useEffect, useRef } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  Loader2,
  Upload,
  Trash2,
  ImageIcon,
  Plus,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

type Partner = { id: string; name: string; logo: string };

function PartnerCard({
  partner,
  isFirst,
  isLast,
  onDeleted,
  onMoved,
}: {
  partner: Partner;
  isFirst: boolean;
  isLast: boolean;
  onDeleted: (id: string) => void;
  onMoved: (id: string, direction: "up" | "down") => void;
}) {
  const [imgErr, setImgErr] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [moving, setMoving] = useState(false);

  async function handleDelete() {
    if (!confirm(`"${partner.name}" 로고를 삭제하시겠습니까?`)) return;
    setDeleting(true);
    const res = await fetch("/api/admin/partners", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: partner.id }),
    });
    if (res.ok) {
      onDeleted(partner.id);
    } else {
      const d = await res.json();
      alert(d.error ?? "삭제 실패");
    }
    setDeleting(false);
  }

  async function handleMove(direction: "up" | "down") {
    setMoving(true);
    const res = await fetch("/api/admin/partners", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: partner.id, direction }),
    });
    if (res.ok) {
      onMoved(partner.id, direction);
    }
    setMoving(false);
  }

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      {/* 썸네일 */}
      <div className="flex h-14 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
        {imgErr ? (
          <ImageIcon className="h-6 w-6 text-slate-300" />
        ) : (
          <Image
            src={partner.logo}
            alt={partner.name}
            width={96}
            height={56}
            className="max-h-12 max-w-[88px] object-contain"
            onError={() => setImgErr(true)}
            unoptimized
          />
        )}
      </div>

      {/* 이름 */}
      <p className="flex-1 text-sm font-medium text-slate-800">{partner.name}</p>
      <p className="text-xs text-slate-400 font-mono hidden sm:block">{partner.logo}</p>

      {/* 순서 버튼 */}
      <div className="flex flex-col gap-0.5">
        <button
          onClick={() => handleMove("up")}
          disabled={isFirst || moving}
          className="flex h-6 w-6 items-center justify-center rounded text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={() => handleMove("down")}
          disabled={isLast || moving}
          className="flex h-6 w-6 items-center justify-center rounded text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* 삭제 */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="flex items-center gap-1 rounded-lg border border-red-100 px-2.5 py-1.5 text-xs text-red-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
      >
        {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

function AddPartnerForm({ onAdded }: { onAdded: (partner: Partner) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleAdd() {
    if (!name.trim() || !file) {
      setError("회사명과 로고 파일을 모두 입력해주세요.");
      return;
    }
    setLoading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("name", name.trim());
    const res = await fetch("/api/admin/partners", { method: "POST", body: fd });
    const data = await res.json();
    setLoading(false);
    if (res.ok && data.partner) {
      onAdded(data.partner);
      setOpen(false);
      setName("");
      setFile(null);
      setPreview(null);
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
        <Plus className="h-4 w-4" /> 협력사 로고 추가
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
      <p className="mb-4 font-semibold text-blue-900">협력사 로고 추가</p>
      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">회사명</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 삼성물산"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">
            로고 이미지{" "}
            <span className="font-normal text-slate-400">(PNG, SVG 권장 / 최대 5MB)</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              <Upload className="h-4 w-4" />
              {file ? "파일 변경" : "파일 선택"}
            </button>
            {preview && (
              <div className="flex h-12 w-20 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="미리보기" className="max-h-10 max-w-[72px] object-contain" />
              </div>
            )}
            {file && <span className="text-xs text-slate-500 truncate max-w-[200px]">{file.name}</span>}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={handleFileChange}
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
            추가
          </button>
          <button
            onClick={() => {
              setOpen(false);
              setName("");
              setFile(null);
              setPreview(null);
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

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loaded, setLoaded] = useState(false);

  function load() {
    fetch("/api/admin/partners")
      .then((r) => r.json())
      .then((d) => {
        setPartners(d.partners ?? []);
        setLoaded(true);
      });
  }

  useEffect(() => { load(); }, []);

  function handleMoved(id: string, direction: "up" | "down") {
    setPartners((prev) => {
      const arr = [...prev];
      const idx = arr.findIndex((p) => p.id === id);
      const newIdx = direction === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= arr.length) return prev;
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return arr;
    });
  }

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminHeader title="협력사 로고 관리" />
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader title="협력사 로고 관리" />
      <main className="mx-auto max-w-3xl space-y-3 px-6 py-10">
        <p className="text-sm text-slate-500 mb-6">
          로고는 회사소개 페이지 협력사 섹션에서 좌→우 슬라이더로 표시됩니다.
        </p>
        {partners.length === 0 && (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-12">
            <p className="text-sm text-slate-400">등록된 협력사 로고가 없습니다.</p>
          </div>
        )}
        {partners.map((p, i) => (
          <PartnerCard
            key={p.id}
            partner={p}
            isFirst={i === 0}
            isLast={i === partners.length - 1}
            onDeleted={(id) => setPartners((prev) => prev.filter((x) => x.id !== id))}
            onMoved={handleMoved}
          />
        ))}
        <AddPartnerForm onAdded={(p) => setPartners((prev) => [...prev, p])} />
      </main>
    </div>
  );
}
