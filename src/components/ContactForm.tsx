"use client";

import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ phone?: string; email?: string }>({});

  function handlePhoneInput(e: React.FormEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    input.value = input.value.replace(/\D/g, "").slice(0, 11);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const form = e.currentTarget;
    const company = (form.elements.namedItem("company") as HTMLInputElement).value;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    const errors: { phone?: string; email?: string } = {};
    if (phone.length < 8) errors.phone = "올바른 연락처를 입력해주세요";
    if (!EMAIL_RE.test(email)) errors.email = "올바른 이메일 형식이 아닙니다";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, name, phone, email, message }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "전송 실패");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "오류가 발생했습니다.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex w-full max-w-xl flex-col items-center gap-3 rounded-2xl border border-slate-200/60 bg-white p-8 text-center shadow-soft">
        <CheckCircle className="h-10 w-10 text-brand-600" />
        <p className="text-base font-bold text-ink-900">문의가 접수됐습니다!</p>
        <p className="text-sm text-ink-600">빠른 시일 내로 연락드리겠습니다.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-brand-600 underline-offset-2 hover:underline"
        >
          다시 문의하기
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl rounded-2xl border border-slate-200/60 bg-white p-6 text-left shadow-soft">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink-800">회사명</span>
          <input
            className="focus-ring h-12 rounded-xl border-0 bg-slate-50/80 px-4 text-sm text-ink-900 transition-colors placeholder:text-ink-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
            name="company"
            placeholder="(주)에머시아"
            required
            disabled={status === "loading"}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-ink-800">이름</span>
            <input
              className="focus-ring h-12 rounded-xl border-0 bg-slate-50/80 px-4 text-sm text-ink-900 transition-colors placeholder:text-ink-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
              name="name"
              placeholder="홍길동"
              required
              disabled={status === "loading"}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-ink-800">연락처</span>
            <input
              className={`focus-ring h-12 rounded-xl border-0 bg-slate-50/80 px-4 text-sm text-ink-900 transition-colors placeholder:text-ink-500 focus:bg-white focus:ring-2 ${fieldErrors.phone ? "ring-2 ring-red-400" : "focus:ring-brand-500"}`}
              name="phone"
              placeholder="01012345678"
              inputMode="numeric"
              maxLength={11}
              pattern="[0-9]{8,11}"
              required
              onInput={handlePhoneInput}
              disabled={status === "loading"}
            />
            {fieldErrors.phone && (
              <span className="text-xs text-red-500">{fieldErrors.phone}</span>
            )}
          </label>
        </div>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink-800">이메일</span>
          <input
            className={`focus-ring h-12 rounded-xl border-0 bg-slate-50/80 px-4 text-sm text-ink-900 transition-colors placeholder:text-ink-500 focus:bg-white focus:ring-2 ${fieldErrors.email ? "ring-2 ring-red-400" : "focus:ring-brand-500"}`}
            type="text"
            name="email"
            placeholder="name@company.com"
            required
            disabled={status === "loading"}
          />
          {fieldErrors.email && (
            <span className="text-xs text-red-500">{fieldErrors.email}</span>
          )}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink-800">문의 내용</span>
          <textarea
            className="focus-ring min-h-32 resize-y rounded-xl border-0 bg-slate-50/80 px-4 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-500 focus:bg-white focus:ring-2 focus:ring-brand-500"
            name="message"
            placeholder="필요하신 장비/수량/설치 환경 등을 간단히 적어주세요."
            required
            disabled={status === "loading"}
          />
        </label>

        {status === "error" && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="focus-ring mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-4 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 hover:shadow-soft-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              전송 중...
            </>
          ) : (
            <>
              견적 문의 보내기
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
