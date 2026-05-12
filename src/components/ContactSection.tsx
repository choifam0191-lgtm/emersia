"use client";

import { MessageCircle } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { ContactForm } from "@/components/ContactForm";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-slate-200/50 bg-tech-grid py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <MotionInView className="mx-auto flex max-w-xl flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-4xl md:leading-snug">
            스마트 LTE 방송 시스템,
            <br />
            합리적인 견적으로 상담 받아보세요.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-600 md:text-lg">
            구성·설치·운영까지 현장에 맞춘 상세 안내를 드립니다.
          </p>
          <a
            href="https://pf.kakao.com/_texjAX/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-6 inline-flex w-full max-w-xl items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-4 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 hover:shadow-soft-lg"
          >
            카카오톡 상담하기
            <MessageCircle className="h-4 w-4" />
          </a>
          <div className="mt-3 w-full max-w-xl rounded-2xl border border-slate-200/60 bg-white p-6 text-left shadow-soft">
            <p className="text-sm font-bold text-ink-900">전화 및 메일 문의</p>
            <div className="mt-3 space-y-1 text-sm text-ink-600">
              <p>전화번호: 031-523-2340</p>
              <p>이메일: hichoi333@naver.com</p>
            </div>
          </div>
          <ContactForm />
        </MotionInView>
      </div>
    </section>
  );
}
