"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="divide-y divide-hairline rounded-2xl border border-hairline bg-surface">
      {items.map((item, idx) => (
        <div key={idx} className="px-6">
          <button
            className="flex w-full items-center justify-between py-5 text-left"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            aria-expanded={openIdx === idx}
          >
            <span className="pr-4 text-sm font-semibold text-ink-900 md:text-base">
              {item.question}
            </span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-mist transition-transform duration-200 ${
                openIdx === idx ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>
          {openIdx === idx && (
            <p className="pb-5 text-sm leading-relaxed text-ink-600">
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
