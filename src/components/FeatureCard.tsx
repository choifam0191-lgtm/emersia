import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

type Props = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

export function FeatureCard({ Icon, title, description }: Props) {
  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-card-hover">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-safety-blue-soft">
        <Icon className="h-6 w-6 text-safety-blue" strokeWidth={1.8} aria-hidden />
      </div>
      <p className="mt-4 text-lg font-bold tracking-tight text-ink-900">{title}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{description}</p>
    </Card>
  );
}
