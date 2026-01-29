"use client";

import { ArrowRight } from "lucide-react";

export function ContactForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert(
      "데모 폼입니다. 실제 전송(메일/CRM/API) 연동을 원하시면 말씀해주세요."
    );
  }

  return (
    <div className="rounded-3xl bg-white/80 p-7 shadow-soft backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-ink-800">이름</span>
            <input
              className="focus-ring h-12 rounded-xl border-0 bg-slate-50/80 px-4 text-sm text-ink-900 transition-colors placeholder:text-ink-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
              name="name"
              placeholder="홍길동"
              required
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-ink-800">연락처</span>
            <input
              className="focus-ring h-12 rounded-xl border-0 bg-slate-50/80 px-4 text-sm text-ink-900 transition-colors placeholder:text-ink-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
              name="phone"
              placeholder="010-1234-5678"
              required
            />
          </label>
        </div>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink-800">이메일</span>
          <input
            className="focus-ring h-12 rounded-xl border-0 bg-slate-50/80 px-4 text-sm text-ink-900 transition-colors placeholder:text-ink-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
            type="email"
            name="email"
            placeholder="name@company.com"
            required
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink-800">문의 내용</span>
          <textarea
            className="focus-ring min-h-32 resize-y rounded-xl border-0 bg-slate-50/80 px-4 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
            name="message"
            placeholder="필요하신 장비/수량/설치 환경 등을 간단히 적어주세요."
            required
          />
        </label>

        <button
          type="submit"
          className="focus-ring mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-4 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 hover:shadow-soft-lg"
        >
          견적 문의 보내기
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <p className="mt-4 text-center text-xs text-ink-500">
        실제 전송 연동(이메일, 노션, 구글시트, CRM 등)도 가능합니다.
      </p>
    </div>
  );
}
