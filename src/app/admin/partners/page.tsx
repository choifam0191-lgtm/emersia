"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  Loader2,
  Upload,
  Trash2,
  ImageIcon,
  Plus,
  ChevronUp,
  ChevronDown,
  GripVertical,
} from "lucide-react";
import Image from "next/image";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Partner = { id: string; name: string; logo: string };

// ─── reorder API 호출 ────────────────────────────────────────────────────────

async function saveOrder(partners: Partner[]): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/partners/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds: partners.map((p) => p.id) }),
    });
    if (!res.ok) {
      const d = await res.json();
      console.error("[partners] 순서 저장 실패:", d.error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[partners] 순서 저장 오류:", err);
    return false;
  }
}

// ─── 드래그 오버레이용 카드 (드래그 중 떠다니는 복사본) ─────────────────────

function DragCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-blue-300 bg-white px-5 py-4 shadow-2xl ring-2 ring-blue-200 opacity-95">
      <GripVertical className="h-5 w-5 flex-shrink-0 text-blue-400" />
      <div className="flex h-14 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={partner.logo}
          alt={partner.name}
          className="max-h-12 max-w-[88px] object-contain"
        />
      </div>
      <p className="flex-1 text-sm font-medium text-slate-800">{partner.name}</p>
    </div>
  );
}

// ─── 정렬 가능한 카드 ────────────────────────────────────────────────────────

function SortablePartnerCard({
  partner,
  isFirst,
  isLast,
  reordering,
  onDeleted,
  onMoveUp,
  onMoveDown,
}: {
  partner: Partner;
  isFirst: boolean;
  isLast: boolean;
  reordering: boolean;
  onDeleted: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: partner.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  };

  const [imgErr, setImgErr] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
      setDeleting(false);
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
    >
      {/* 드래그 핸들 */}
      <button
        {...attributes}
        {...listeners}
        className="flex-shrink-0 cursor-grab touch-none rounded p-1 text-slate-300 transition hover:text-slate-500 active:cursor-grabbing"
        aria-label="드래그하여 순서 변경"
      >
        <GripVertical className="h-5 w-5" />
      </button>

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

      {/* 이름 + 경로 */}
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-sm font-medium text-slate-800">{partner.name}</p>
        <p className="truncate text-xs text-slate-400 font-mono">{partner.logo}</p>
      </div>

      {/* 화살표 버튼 */}
      <div className="flex flex-col gap-0.5">
        <button
          onClick={() => onMoveUp(partner.id)}
          disabled={isFirst || reordering}
          className="flex h-6 w-6 items-center justify-center rounded text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-25 disabled:cursor-not-allowed"
          aria-label="위로"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={() => onMoveDown(partner.id)}
          disabled={isLast || reordering}
          className="flex h-6 w-6 items-center justify-center rounded text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-25 disabled:cursor-not-allowed"
          aria-label="아래로"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* 삭제 */}
      <button
        onClick={handleDelete}
        disabled={deleting || reordering}
        className="flex items-center gap-1 rounded-lg border border-red-100 px-2.5 py-1.5 text-xs text-red-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
      >
        {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

// ─── 추가 폼 ─────────────────────────────────────────────────────────────────

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
            onClick={() => { setOpen(false); setName(""); setFile(null); setPreview(null); setError(""); }}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 메인 페이지 ─────────────────────────────────────────────────────────────

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/partners")
      .then((r) => r.json())
      .then((d) => { setPartners(d.partners ?? []); setLoaded(true); });
  }, []);

  // 낙관적 업데이트 후 API 저장, 실패 시 롤백
  const applyReorder = useCallback(async (next: Partner[], prev: Partner[]) => {
    setPartners(next);
    setReordering(true);
    const ok = await saveOrder(next);
    if (!ok) {
      console.error("[partners] 순서 저장 실패 — 원래 순서로 복원합니다.");
      setPartners(prev);
    }
    setReordering(false);
  }, []);

  function handleMoveUp(id: string) {
    setPartners((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx <= 0) return prev;
      const next = arrayMove(prev, idx, idx - 1);
      applyReorder(next, prev);
      return next;
    });
  }

  function handleMoveDown(id: string) {
    setPartners((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const next = arrayMove(prev, idx, idx + 1);
      applyReorder(next, prev);
      return next;
    });
  }

  // dnd-kit 센서 설정: PointerSensor는 8px 이동해야 드래그 시작 (클릭 오작동 방지)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setPartners((prev) => {
      const oldIdx = prev.findIndex((p) => p.id === active.id);
      const newIdx = prev.findIndex((p) => p.id === over.id);
      if (oldIdx === -1 || newIdx === -1) return prev;
      const next = arrayMove(prev, oldIdx, newIdx);
      applyReorder(next, prev);
      return next;
    });
  }

  const activePartner = partners.find((p) => p.id === activeId);

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
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            로고는 회사소개 페이지 슬라이더로 표시됩니다. 드래그하거나 화살표로 순서를 변경하세요.
          </p>
          {reordering && (
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> 저장 중
            </span>
          )}
        </div>

        {partners.length === 0 && (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-12">
            <p className="text-sm text-slate-400">등록된 협력사 로고가 없습니다.</p>
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={partners.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {partners.map((p, i) => (
                <SortablePartnerCard
                  key={p.id}
                  partner={p}
                  isFirst={i === 0}
                  isLast={i === partners.length - 1}
                  reordering={reordering}
                  onDeleted={(id) => setPartners((prev) => prev.filter((x) => x.id !== id))}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                />
              ))}
            </div>
          </SortableContext>

          {/* 드래그 중 떠다니는 복사본 */}
          <DragOverlay>
            {activePartner ? <DragCard partner={activePartner} /> : null}
          </DragOverlay>
        </DndContext>

        <AddPartnerForm onAdded={(p) => setPartners((prev) => [...prev, p])} />
      </main>
    </div>
  );
}
