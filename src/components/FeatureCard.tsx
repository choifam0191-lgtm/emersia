import type { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

export function FeatureCard({ Icon, title, description }: Props) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-shadow hover:shadow-md lg:p-7">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
        <Icon className="h-6 w-6 text-blue-600" strokeWidth={1.8} aria-hidden />
      </div>
      <p className="mt-4 text-lg font-bold tracking-tight text-slate-900">{title}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}
