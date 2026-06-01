import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { getContent } from "@/lib/content";
import { buttonVariants } from "@/components/ui/Button";

export function CTASection() {
  const { cta, contact } = getContent();

  return (
    <section className="bg-deep-navy py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 text-center">
        <p className="text-sm font-semibold text-blue-400">{cta.eyebrow}</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl md:leading-snug">
          {cta.headline.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < cta.headline.split("\n").length - 1 && (
                <br className="hidden md:block" />
              )}
            </span>
          ))}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400 md:max-w-2xl">
          {cta.subtext}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact?type=demo"
            className={buttonVariants({ variant: "primary", className: "w-full rounded-full sm:w-auto" })}
          >
            무료 방문시연 신청
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact?type=quote"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-600 bg-transparent px-7 py-3.5 text-sm font-medium text-white transition hover:border-slate-400 hover:bg-slate-800 sm:w-auto"
          >
            견적 문의하기
          </Link>
          <a
            href="/api/catalog/download"
            download="3S_catalog.pdf"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-600 bg-transparent px-7 py-3.5 text-sm font-medium text-slate-300 transition hover:border-slate-400 hover:bg-slate-800 sm:w-auto"
          >
            카탈로그 다운로드
            <Download className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-8 flex flex-col items-center gap-2 text-sm text-slate-500 sm:flex-row sm:justify-center sm:gap-0">
          <span>
            이메일:{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-slate-400 transition hover:text-white"
            >
              {contact.email}
            </a>
          </span>
          <span className="hidden sm:mx-3 sm:inline">|</span>
          <span>
            전화:{" "}
            <a
              href={`tel:${contact.phone}`}
              className="text-slate-400 transition hover:text-white"
            >
              {contact.phone}
            </a>
          </span>
        </p>
      </div>
    </section>
  );
}
