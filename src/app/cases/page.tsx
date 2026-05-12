import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "설치사례",
  description: "emersia 스마트 LTE 안전방송 시스템 설치사례를 확인하세요.",
};

export default function CasesPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-slate-50">
      <div className="text-center">
        <p className="text-sm font-semibold text-blue-600">준비중</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
          설치사례
        </h1>
        <p className="mt-3 text-base text-slate-600">콘텐츠를 준비하고 있습니다.</p>
      </div>
    </main>
  );
}
