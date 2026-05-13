import { BookOpen, FileText, HelpCircle, type LucideIcon } from "lucide-react";
import { ResourceCard } from "@/components/ResourceCard";
import { getContent } from "@/lib/content";

// Icons fixed by category — not admin-editable
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  카탈로그: BookOpen,
  제안서: FileText,
  FAQ: HelpCircle,
};

export function ResourcesFilterSection() {
  const { resources } = getContent();

  return (
    <section className="border-t border-slate-200/50 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {resources.cards.map((r) => {
            const Icon = CATEGORY_ICONS[r.category] ?? FileText;
            return (
              <ResourceCard
                key={r.title}
                Icon={Icon}
                category={r.category}
                title={r.title}
                description={r.description}
                buttonLabel={r.buttonLabel}
                href={r.href}
                download={r.download ?? undefined}
                ready={r.ready}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
