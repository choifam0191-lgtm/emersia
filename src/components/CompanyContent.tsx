"use client";

import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { SectionTitle } from "@/components/SectionTitle";
import type { CompanyData, ContactInfo } from "@/lib/content";

type Props = {
  data: CompanyData;
  contact: ContactInfo;
};

export function CompanyContent({ data, contact }: Props) {
  return (
    <>
      {/* 1. Hero */}
      <section className="bg-slate-900 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <MotionInView>
            <p className="text-sm font-semibold text-blue-400">{data.hero.eyebrow}</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl md:leading-snug">
              {data.hero.headline}
            </h1>
          </MotionInView>
          <MotionInView delay={0.08}>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-slate-400 md:text-lg">
              {data.hero.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </MotionInView>
        </div>
      </section>

      {/* 2. 주요 거래처 / 협력사 */}
      <section className="border-t border-slate-200/50 bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <MotionInView>
            <SectionTitle
              center
              eyebrow={data.clients.eyebrow}
              title={data.clients.title}
            />
          </MotionInView>
          <MotionInView delay={0.08}>
            <img
              src="/clients_all.png"
              alt="영우테크 주요 거래처"
              className="mx-auto mt-10 w-full max-w-3xl rounded-xl bg-white object-contain shadow-sm"
            />
          </MotionInView>
          <MotionInView delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
              {data.clients.note}
            </p>
          </MotionInView>
        </div>
      </section>

      {/* 3. 연락처 / 오시는 길 */}
      <section className="border-t border-slate-200/50 bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <MotionInView>
            <SectionTitle eyebrow="연락처" title="연락처 / 오시는 길" />
          </MotionInView>
          <MotionInView delay={0.08}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* 이메일 */}
              <div className="rounded-2xl border border-slate-200/60 bg-slate-50 p-5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <Mail className="h-4 w-4 text-blue-600" aria-hidden />
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">이메일</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 block break-all text-sm font-medium text-blue-600 hover:underline"
                >
                  {contact.email}
                </a>
              </div>

              {/* 전화 */}
              <div className="rounded-2xl border border-slate-200/60 bg-slate-50 p-5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <Phone className="h-4 w-4 text-blue-600" aria-hidden />
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">전화</p>
                <a
                  href={`tel:${contact.phone}`}
                  className="mt-1 block text-sm font-medium text-slate-800 transition hover:text-blue-600"
                >
                  {contact.phone}
                </a>
              </div>

              {/* 카카오톡 */}
              <div className="rounded-2xl border border-slate-200/60 bg-slate-50 p-5">
                <div
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "#FEE500" }}
                >
                  <MessageCircle className="h-4 w-4" style={{ color: "#3A1D1D" }} aria-hidden />
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">카카오톡</p>
                <a
                  href={contact.kakao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm font-medium text-slate-800 transition hover:text-blue-600"
                >
                  채널 바로가기
                </a>
              </div>

              {/* 주소 */}
              <div className="rounded-2xl border border-slate-200/60 bg-slate-50 p-5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <MapPin className="h-4 w-4 text-blue-600" aria-hidden />
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">주소</p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-800">
                  {contact.address}
                </p>
              </div>
            </div>

            {/* 지도 */}
            <div className="mt-4 flex h-52 items-center justify-center rounded-2xl border border-slate-200/60 bg-slate-50">
              {/* TODO: 카카오맵 또는 네이버지도 iframe 삽입 */}
              <p className="text-sm text-slate-400">지도 준비중</p>
            </div>
          </MotionInView>
        </div>
      </section>
    </>
  );
}
