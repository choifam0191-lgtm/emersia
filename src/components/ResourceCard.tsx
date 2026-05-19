import type { LucideIcon } from "lucide-react";
import { Download, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";

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
    <Card className="flex h-full flex-col">
      <Badge variant="brand">{category}</Badge>
      <div className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
        <Icon className="h-5 w-5 text-ink-700" strokeWidth={1.8} aria-hidden />
      </div>
      <p className="mt-3 font-bold text-ink-900">{title}</p>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-600">{description}</p>

      {ready ? (
        download ? (
          <a
            href={href}
            download={download}
            className={buttonVariants({ variant: "primary", size: "sm", className: "mt-5 rounded-lg" })}
          >
            {buttonLabel}
            <Download className="h-4 w-4" />
          </a>
        ) : (
          <a
            href={href}
            className={buttonVariants({ variant: "primary", size: "sm", className: "mt-5 rounded-lg" })}
          >
            {buttonLabel}
            <ExternalLink className="h-4 w-4" />
          </a>
        )
      ) : (
        <div className="mt-5 inline-flex items-center rounded-lg border border-hairline bg-muted px-4 py-2.5 text-sm font-medium text-mist">
          준비중
        </div>
      )}
    </Card>
  );
}
