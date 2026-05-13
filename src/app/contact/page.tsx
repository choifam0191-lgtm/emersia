import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "문의 | 무료 방문시연 및 견적 문의",
  description:
    "스마트 LTE 방송시스템 도입 상담, 무료 방문시연 신청, 견적 문의를 남겨주시면 빠르게 안내드립니다.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const type = params?.type;

  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-900 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-semibold text-blue-400">문의</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            문의하기
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
            현장 조건과 필요 사항을 남겨주시면 구성 방안과 비용을 안내드립니다.
          </p>
        </div>
      </section>

      {/* 2-column: form + sidebar */}
      <section className="border-t border-slate-200/50 bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
            {/* 폼 */}
            <ContactForm initialType={type} />

            {/* 사이드바 */}
            <aside className="space-y-5">
              <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-slate-900">문의 안내</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    접수 후 영업일 기준 1~2일 내 연락드립니다.
                  </li>
                  <li className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    현장 방문시연은 일정 조율 후 진행됩니다.
                  </li>
                  <li className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    견적은 현장 조건 확인 후 제안드립니다.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-slate-900">연락처</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                    <a
                      href="mailto:hichoi333@naver.com"
                      className="text-sm text-slate-700 transition hover:text-blue-600"
                    >
                      hichoi333@naver.com
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                    <a
                      href="tel:031-523-2340"
                      className="text-sm text-slate-700 transition hover:text-blue-600"
                    >
                      031-523-2340
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "#FEE500" }}
                    >
                      <svg viewBox="0 0 24 24" fill="#3A1D1D" className="h-2.5 w-2.5" aria-hidden="true">
                        <path d="M12 3C6.477 3 2 6.72 2 11.3c0 2.94 1.874 5.522 4.683 7.07L5.5 22l4.132-2.297A11.8 11.8 0 0 0 12 19.6c5.523 0 10-3.72 10-8.3C22 6.72 17.523 3 12 3z" />
                      </svg>
                    </span>
                    <a
                      href="https://pf.kakao.com/_texjAX/chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-700 transition hover:text-blue-600"
                    >
                      카카오톡 채널 바로가기
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
