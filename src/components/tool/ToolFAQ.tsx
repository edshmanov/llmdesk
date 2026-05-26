"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  /** Plain-text answer. HTML inside `richAnswer` overrides this for display. */
  answer: string;
  richAnswer?: React.ReactNode;
}

export interface ToolFAQProps {
  items: FAQItem[];
  /** Title of the tool — used only inside the JSON-LD `about` field, not displayed. */
  toolName?: string;
}

export function ToolFAQ({ items, toolName }: ToolFAQProps) {
  // FAQPage schema — Google reads JSON-LD from this <script> tag
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(toolName ? { about: { "@type": "Thing", name: toolName } } : {}),
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };

  return (
    <section className="prose-tool" aria-labelledby="faq-heading">
      <h2 id="faq-heading">Frequently asked questions</h2>

      <div className="not-prose mt-6 divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">
        {items.map((item, i) => (
          <FAQRow key={i} item={item} />
        ))}
      </div>

      <script
        type="application/ld+json"
        // Inline JSON is safe here — we control all fields
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}

function FAQRow({ item }: { item: FAQItem }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="py-2">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-2 text-left"
      >
        <span className="text-base font-medium text-zinc-900 dark:text-zinc-100">
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-zinc-500 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open ? (
        <div className="pb-3 pt-1 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {item.richAnswer ?? item.answer}
        </div>
      ) : null}
    </div>
  );
}
