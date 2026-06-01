"use client";

import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";

type Status = "idle" | "loading" | "success" | "error";
type InquiryType = "무료 방문시연" | "견적문의" | "상담 요청";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INQUIRY_TYPES: InquiryType[] = ["무료 방문시연", "견적문의", "상담 요청"];

const PURPOSE_OPTIONS = [
  "혹서기 안전방송",
  "비상대피방송",
  "외국인 근로자 다국어 안내",
  "작업 공지",
  "복합 구성",
  "기타",
];

function resolveInitialType(type?: string): InquiryType {
  if (type === "demo") return "무료 방문시연";
  if (type === "quote") return "견적문의";
  return "상담 요청";
}

const labelClass = "text-sm font-semibold text-ink-800";

type Props = { initialType?: string };

export function ContactForm({ initialType }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ phone?: string; email?: string }>({});
  const [inquiryType, setInquiryType] = useState<InquiryType>(resolveInitialType(initialType));

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
    const location = (form.elements.namedItem("location") as HTMLInputElement).value;
    const purpose = (form.elements.namedItem("purpose") as HTMLSelectElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const website = (form.elements.namedItem("website") as HTMLInputElement)?.value ?? "";

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
        body: JSON.stringify({ company, name, phone, email, location, purpose, inquiryType, message, website }),
      });

      if (!res.ok) {
        let msg = "전송 실패. 잠시 후 다시 시도해주세요.";
        try {
          if (res.headers.get("content-type")?.includes("application/json")) {
            const body = await res.json();
            if (body.error) msg = body.error;
          }
        } catch {}
        throw new Error(msg);
      }

      setStatus("success");
      form.reset();
      setInquiryType(resolveInitialType(initialType));
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "오류가 발생했습니다.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Card className="flex flex-col items-center gap-3 text-center">
        <CheckCircle className="h-10 w-10 text-safety-blue" />
        <p className="text-base font-bold text-ink-900">문의가 접수됐습니다!</p>
        <p className="text-sm text-ink-600">빠른 시일 내로 연락드리겠습니다.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-safety-blue underline-offset-2 hover:underline"
        >
          다시 문의하기
        </button>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="grid gap-5">
        {/* 허니팟: 봇 차단용 숨김 필드 (사람에게는 보이지 않음) */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
          <label>
            웹사이트
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        {/* 문의 유형 */}
        <div className="grid gap-2">
          <span className={labelClass}>문의 유형</span>
          <div className="flex flex-wrap gap-2">
            {INQUIRY_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setInquiryType(t)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  inquiryType === t
                    ? "bg-safety-blue text-white shadow-btn"
                    : "border border-hairline bg-surface text-ink-600 hover:bg-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 회사명 */}
        <label className="grid gap-1.5">
          <span className={labelClass}>회사명</span>
          <Input
            name="company"
            placeholder="(주)에머시아"
            required
            disabled={status === "loading"}
          />
        </label>

        {/* 담당자명 + 연락처 */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5">
            <span className={labelClass}>담당자명</span>
            <Input
              name="name"
              placeholder="홍길동"
              required
              disabled={status === "loading"}
            />
          </label>
          <label className="grid gap-1.5">
            <span className={labelClass}>연락처</span>
            <Input
              name="phone"
              placeholder="01012345678"
              inputMode="numeric"
              maxLength={11}
              pattern="[0-9]{8,11}"
              required
              error={!!fieldErrors.phone}
              onInput={handlePhoneInput}
              disabled={status === "loading"}
            />
            {fieldErrors.phone && (
              <span className="text-xs text-alert-red">{fieldErrors.phone}</span>
            )}
          </label>
        </div>

        {/* 이메일 */}
        <label className="grid gap-1.5">
          <span className={labelClass}>이메일</span>
          <Input
            type="text"
            name="email"
            placeholder="name@company.com"
            required
            error={!!fieldErrors.email}
            disabled={status === "loading"}
          />
          {fieldErrors.email && (
            <span className="text-xs text-alert-red">{fieldErrors.email}</span>
          )}
        </label>

        {/* 현장 위치 */}
        <label className="grid gap-1.5">
          <span className={labelClass}>
            현장 위치{" "}
            <span className="font-normal text-mist">(선택)</span>
          </span>
          <Input
            name="location"
            placeholder="예: 경기 수원시"
            disabled={status === "loading"}
          />
        </label>

        {/* 도입 목적 */}
        <label className="grid gap-1.5">
          <span className={labelClass}>도입 목적</span>
          <Select name="purpose" required disabled={status === "loading"} defaultValue="">
            <option value="" disabled>선택해주세요</option>
            {PURPOSE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </Select>
        </label>

        {/* 문의 내용 */}
        <label className="grid gap-1.5">
          <span className={labelClass}>문의 내용</span>
          <Textarea
            name="message"
            placeholder="필요하신 장비/수량/설치 환경 등을 간단히 적어주세요."
            required
            disabled={status === "loading"}
            className="min-h-32"
          />
        </label>

        {status === "error" && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-alert-red">
            {errorMsg}
          </p>
        )}

        <Button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 rounded-xl py-4"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              전송 중...
            </>
          ) : (
            <>
              문의 보내기
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
