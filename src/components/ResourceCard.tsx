"use client";
import { useState } from "react";
import { BookOpen, Download, ExternalLink, FileText, HelpCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";

// 아이콘 매핑을 클라이언트 컴포넌트 내부에서 처리 (서버→클라이언트 직렬화 이슈 회피)
const ICONS: Record<string, React.ElementType> = {
  카탈로그: BookOpen,
  제안서: FileText,
  FAQ: HelpCircle,
};

type Props = {
  category: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  download?: string;
  ready: boolean;
};

export function ResourceCard({
  category,
  title,
  description,
  buttonLabel,
  href,
  download,
  ready,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const Icon = ICONS[category] ?? FileText;

  async function handleDownload(e: React.MouseEvent) {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");
    try {
      const res = await fetch(href);
      if (!res.ok) {
        setErrMsg("파일을 준비 중입니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = download ?? "download.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setErrMsg("다운로드 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="flex h-full flex-col">
      <Badge variant="brand">{category}</Badge>
      <div className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
        <Icon className="h-5 w-5 text-ink-700" strokeWidth={1.8} aria-hidden />
      </div>
      <p className="mt-3 font-bold text-ink-900">{title}</p>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-600">{description}</p>

      {errMsg && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">{errMsg}</p>
      )}

      {ready ? (
        download ? (
          <button
            onClick={handleDownload}
            disabled={loading}
            className={buttonVariants({
              variant: "primary",
              size: "sm",
              className: "mt-5 rounded-lg",
            })}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                다운로드 중…
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                {buttonLabel}
              </>
            )}
          </button>
        ) : (
          <a
            href={href}
            className={buttonVariants({
              variant: "primary",
              size: "sm",
              className: "mt-5 rounded-lg",
            })}
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
