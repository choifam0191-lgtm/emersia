"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, Upload, Loader2 } from "lucide-react";

type FileStatus = { catalog: boolean; proposal: boolean };
type UploadState = "idle" | "uploading" | "success" | "error";
type FileType = "catalog" | "proposal";

const FILE_INFO: Record<FileType, { label: string; path: string }> = {
  catalog: { label: "카탈로그", path: "public/catalog/catalog-2026.pdf" },
  proposal: { label: "제안서", path: "public/3S_propo.pdf" },
};

export default function AdminFilesPage() {
  const [status, setStatus] = useState<FileStatus | null>(null);
  const [uploadState, setUploadState] = useState<Record<FileType, UploadState>>({
    catalog: "idle",
    proposal: "idle",
  });
  const [uploadMsg, setUploadMsg] = useState<Record<FileType, string>>({
    catalog: "",
    proposal: "",
  });
  const fileRefs = useRef<Record<FileType, HTMLInputElement | null>>({
    catalog: null,
    proposal: null,
  });

  async function fetchStatus() {
    try {
      const res = await fetch("/api/admin/files/status");
      if (res.ok) setStatus(await res.json());
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  async function handleUpload(type: FileType) {
    const input = fileRefs.current[type];
    if (!input?.files?.[0]) return;

    setUploadState((prev) => ({ ...prev, [type]: "uploading" }));
    setUploadMsg((prev) => ({ ...prev, [type]: "" }));

    const body = new FormData();
    body.append("type", type);
    body.append("file", input.files[0]);

    try {
      const res = await fetch("/api/admin/files/upload", { method: "POST", body });
      const data = await res.json();
      if (res.ok) {
        setUploadState((prev) => ({ ...prev, [type]: "success" }));
        setUploadMsg((prev) => ({ ...prev, [type]: "파일이 성공적으로 교체되었습니다." }));
        await fetchStatus();
        input.value = "";
      } else {
        setUploadState((prev) => ({ ...prev, [type]: "error" }));
        setUploadMsg((prev) => ({ ...prev, [type]: data.error ?? "업로드 실패" }));
      }
    } catch {
      setUploadState((prev) => ({ ...prev, [type]: "error" }));
      setUploadMsg((prev) => ({ ...prev, [type]: "업로드 중 오류가 발생했습니다." }));
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center gap-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            대시보드
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">영우테크</p>
            <h1 className="text-lg font-extrabold text-slate-900">자료 파일 관리</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-6 py-10">
        {(["catalog", "proposal"] as FileType[]).map((type) => {
          const info = FILE_INFO[type];
          const exists = status?.[type];
          const state = uploadState[type];
          const msg = uploadMsg[type];

          return (
            <div key={type} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">{info.label}</p>
                  <p className="mt-0.5 font-mono text-xs text-slate-500">{info.path}</p>
                </div>
                {status === null ? (
                  <span className="text-sm text-slate-400">확인 중…</span>
                ) : exists ? (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    등록됨
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                    <XCircle className="h-3.5 w-3.5" />
                    파일 없음
                  </span>
                )}
              </div>

              <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="mb-3 text-sm font-medium text-slate-700">
                  {exists ? "파일 교체" : "파일 등록"} — PDF만 허용, 최대 50 MB
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    ref={(el) => {
                      fileRefs.current[type] = el;
                    }}
                    type="file"
                    accept="application/pdf,.pdf"
                    className="text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <button
                    onClick={() => handleUpload(type)}
                    disabled={state === "uploading"}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {state === "uploading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        업로드 중…
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        업로드
                      </>
                    )}
                  </button>
                </div>
                {msg && (
                  <p
                    className={`mt-3 text-sm ${
                      state === "success" ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {msg}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 text-sm">
          <p className="font-semibold text-amber-800">배포 환경 안내</p>
          <ul className="mt-2 space-y-1 text-amber-700">
            <li>
              • 업로드한 파일은 서버의{" "}
              <code className="rounded bg-amber-100 px-1 font-mono">public/</code> 폴더에 직접 저장됩니다.
            </li>
            <li>• PM2 + Node.js 직접 배포 환경(현재 오라클 서버)에서 정상 작동합니다.</li>
            <li>
              • Next.js{" "}
              <code className="rounded bg-amber-100 px-1 font-mono">standalone</code> 빌드 사용 시
              파일 저장 경로가 달라질 수 있으니 확인이 필요합니다.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
