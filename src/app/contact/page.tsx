import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의",
  description: "emersia 견적문의 및 무료 방문시연 신청 페이지입니다.",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-slate-50">
      <div className="text-center">
        <p className="text-sm font-semibold text-blue-600">준비중</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
          문의
        </h1>
        <p className="mt-3 text-base text-slate-600">콘텐츠를 준비하고 있습니다.</p>
      </div>
    </main>
  );
}
