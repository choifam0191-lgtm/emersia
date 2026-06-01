import fs from "fs";
import path from "path";
import { ResourceCard } from "@/components/ResourceCard";
import { getContent } from "@/lib/content";

// PDF 파일 실존 여부를 서버사이드에서 확인 → 없으면 ready=false 로 덮어씀
const PDF_PATHS: Record<string, string> = {
  "/api/catalog/download": path.join(process.cwd(), "public", "3S_catalog.pdf"),
};

function isPdfReady(href: string): boolean {
  const p = PDF_PATHS[href];
  return p ? fs.existsSync(p) : true;
}

export function ResourcesFilterSection() {
  const { resources } = getContent();

  return (
    <section className="border-t border-slate-200/50 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {resources.cards.map((r) => (
            <ResourceCard
              key={r.title}
              category={r.category}
              title={r.title}
              description={r.description}
              buttonLabel={r.buttonLabel}
              href={r.href}
              download={r.download ?? undefined}
              ready={r.ready && isPdfReady(r.href)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
