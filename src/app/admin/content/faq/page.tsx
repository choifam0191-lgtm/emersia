"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";

type FaqItem = { id: string; question: string; answer: string };
type SaveState = "idle" | "saving" | "saved";

function FaqRow({
  item,
  index,
  total,
  onSaved,
  onDeleted,
  onMoved,
}: {
  item: FaqItem;
  index: number;
  total: number;
  onSaved: (updated: FaqItem) => void;
  onDeleted: (id: string) => void;
  onMoved: (id: string, dir: "up" | "down") => void;
}) {
  const [question, setQuestion] = useState(item.question);
  const [answer, setAnswer] = useState(item.answer);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [deleting, setDeleting] = useState(false);

  const dirty = question !== item.question || answer !== item.answer;

  async function handleSave() {
    setSaveState("saving");
    await fetch(`/api/admin/faq/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer }),
    });
    setSaveState("saved");
    onSaved({ ...item, question, answer });
    setTimeout(() => setSaveState("idle"), 2000);
  }

  async function handleDelete() {
    if (!confirm("이 항목을 삭제할까요?")) return;
    setDeleting(true);
    await fetch(`/api/admin/faq/${item.id}`, { method: "DELETE" });
    onDeleted(item.id);
  }

  async function handleMove(dir: "up" | "down") {
    await fetch(`/api/admin/faq/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction: dir }),
    });
    onMoved(item.id, dir);
  }

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">Q{index + 1}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleMove("up")}
            disabled={index === 0}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 disabled:opacity-30"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleMove("down")}
            disabled={index === total - 1}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 disabled:opacity-30"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">질문</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">답변</label>
          <textarea
            value={answer}
            rows={2}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {dirty && (
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={saveState === "saving"}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {saveState === "saving" && <Loader2 className="h-3 w-3 animate-spin" />}
            저장
          </button>
          {saveState === "saved" && (
            <span className="flex items-center gap-1 text-xs text-green-600">
              <Check className="h-3 w-3" /> 저장됐습니다
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function AddFaqForm({ onAdded }: { onAdded: (item: FaqItem) => void }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [adding, setAdding] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleAdd() {
    if (!question.trim() || !answer.trim()) return;
    setAdding(true);
    const res = await fetch("/api/admin/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer }),
    });
    const data = await res.json();
    if (data.ok) {
      onAdded({ id: data.id, question, answer });
      setQuestion("");
      setAnswer("");
      setOpen(false);
    }
    setAdding(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-sm text-slate-500 transition hover:border-blue-400 hover:text-blue-600"
      >
        <Plus className="h-4 w-4" /> FAQ 항목 추가
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
      <p className="mb-3 text-xs font-semibold text-blue-700">새 FAQ 항목</p>
      <div className="space-y-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">질문</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="질문을 입력하세요"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">답변</label>
          <textarea
            value={answer}
            rows={2}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="답변을 입력하세요"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={handleAdd}
          disabled={adding || !question.trim() || !answer.trim()}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {adding && <Loader2 className="h-3 w-3 animate-spin" />}
          추가
        </button>
        <button
          onClick={() => { setOpen(false); setQuestion(""); setAnswer(""); }}
          className="rounded-lg px-3 py-1.5 text-xs text-slate-500 transition hover:bg-slate-200"
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default function FaqEditorPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/admin/faq")
      .then((r) => r.json())
      .then((d) => {
        setItems(d.items ?? []);
        setLoaded(true);
      });
  }, []);

  function handleSaved(updated: FaqItem) {
    setItems((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
  }

  function handleDeleted(id: string) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  function handleMoved(id: string, dir: "up" | "down") {
    setItems((prev) => {
      const next = [...prev];
      const idx = next.findIndex((x) => x.id === id);
      if (dir === "up" && idx > 0) [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      if (dir === "down" && idx < next.length - 1) [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  }

  function handleAdded(item: FaqItem) {
    setItems((prev) => [...prev, item]);
  }

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminHeader title="FAQ 관리" />
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader title="FAQ 관리" />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">FAQ 항목</h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500">
              {items.length}개
            </span>
          </div>

          <div className="space-y-4">
            {items.map((item, i) => (
              <FaqRow
                key={item.id}
                item={item}
                index={i}
                total={items.length}
                onSaved={handleSaved}
                onDeleted={handleDeleted}
                onMoved={handleMoved}
              />
            ))}
            <AddFaqForm onAdded={handleAdded} />
          </div>
        </div>
      </main>
    </div>
  );
}
