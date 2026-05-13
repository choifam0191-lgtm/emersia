import type { LucideIcon } from "lucide-react";
import { Download, ExternalLink } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  category: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  download?: string;
  ready: boolean;
};

export function ResourceCard({
  Icon,
  category,
  title,
  description,
  buttonLabel,
  href,
  download,
  ready,
}: Props) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200/60 bg-white p-6">
      <span className="inline-block self-start rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
        {category}
      </span>
      <div className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
        <Icon className="h-5 w-5 text-slate-700" strokeWidth={1.8} aria-hidden />
      </div>
      <p className="mt-3 font-bold text-slate-900">{title}</p>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>

      {ready ? (
        download ? (
          <a
            href={href}
            download={download}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {buttonLabel}
            <Download className="h-4 w-4" />
          </a>
        ) : (
          <a
            href={href}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {buttonLabel}
            <ExternalLink className="h-4 w-4" />
          </a>
        )
      ) : (
        // TODO: 자료 준비 완료 시 ready: true 로 변경하고 href 연결
        <div className="mt-5 inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-400">
          준비중
        </div>
      )}
    </div>
  );
}
