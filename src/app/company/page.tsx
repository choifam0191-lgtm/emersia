import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회사소개",
  description: "emersia 회사소개 페이지입니다.",
};

export default function CompanyPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-slate-50">
      <div className="text-center">
        <p className="text-sm font-semibold text-blue-600">준비중</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
          회사소개
        </h1>
        <p className="mt-3 text-base text-slate-600">콘텐츠를 준비하고 있습니다.</p>
      </div>
    </main>
  );
}
