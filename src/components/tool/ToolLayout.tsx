import type { ReactNode } from "react";

import type { Tool } from "@/lib/tools";
import { getRelatedTools } from "@/lib/tools";

import { AdSlot } from "@/components/layout/AdSlot";
import { ToolHero } from "./ToolHero";
import { ToolHowItWorks } from "./ToolHowItWorks";
import { ToolUseCases } from "./ToolUseCases";
import { ToolFAQ, type FAQItem } from "./ToolFAQ";
import { RelatedTools } from "./RelatedTools";
import { ToolSchema } from "./ToolSchema";

export interface ToolLayoutProps {
  tool: Tool;
  /** The interactive tool component itself. */
  toolComponent: ReactNode;
  /** ~150 words of original content describing how the tool works. */
  howItWorks: ReactNode;
  /** ~150 words on who uses this and how. */
  useCases: ReactNode;
  /** 5 Q&A pairs — also rendered as FAQPage schema. */
  faq: FAQItem[];
  /** Optional override for related tools — defaults to relatedSlugs from registry. */
  relatedTools?: Tool[];
}

/**
 * Canonical structure used by every tool page. Order matches brief section 6:
 *
 *   H1 + value prop
 *   AdSlot (leaderboard)
 *   <THE ACTUAL INTERACTIVE TOOL>
 *   How it works
 *   Use cases
 *   FAQ
 *   AdSlot (in-feed)
 *   Related tools
 */
export function ToolLayout({
  tool,
  toolComponent,
  howItWorks,
  useCases,
  faq,
  relatedTools,
}: ToolLayoutProps) {
  const related = relatedTools ?? getRelatedTools(tool.slug);

  return (
    <article className="container max-w-5xl pb-16">
      <ToolSchema tool={tool} />

      <ToolHero tool={tool} />

      <div className="my-6">
        <AdSlot variant="leaderboard" />
      </div>

      {/* Interactive tool — varies per slug */}
      <section
        id="tool"
        aria-label={`${tool.name} interactive tool`}
        className="my-8"
      >
        {toolComponent}
      </section>

      <ToolHowItWorks>{howItWorks}</ToolHowItWorks>
      <ToolUseCases>{useCases}</ToolUseCases>
      <ToolFAQ items={faq} toolName={tool.name} />

      <div className="my-10">
        <AdSlot variant="in-feed" />
      </div>

      <RelatedTools tools={related} />
    </article>
  );
}
