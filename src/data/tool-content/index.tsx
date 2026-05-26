import type { ReactNode } from "react";
import type { FAQItem } from "@/components/tool/ToolFAQ";
import { getToolBySlug } from "@/lib/tools";

export interface ToolContent {
  howItWorks: ReactNode;
  useCases: ReactNode;
  faq: FAQItem[];
}

/**
 * Per-tool content registry. Add entries here as tools are implemented.
 *
 * Each entry: ~150 words in `howItWorks`, ~150 words in `useCases`, 5 Q&A in `faq`.
 * Together with the ~100-word hero copy these hit the 600-800 word target per page.
 */
const TOOL_CONTENT: Record<string, ToolContent> = {
  // Populated when each tool is implemented. Example shape:
  //
  // "token-counter": {
  //   howItWorks: (
  //     <>
  //       <p>...~150 words...</p>
  //     </>
  //   ),
  //   useCases: (
  //     <>
  //       <p>...~150 words...</p>
  //     </>
  //   ),
  //   faq: [
  //     { question: "...", answer: "..." },
  //     // 5 total
  //   ],
  // },
};

/**
 * Returns the content for a tool slug, or a generic fallback that still satisfies
 * the page structure (so coming-soon stubs render correctly with valid schema).
 */
export function getToolContent(slug: string): ToolContent {
  const explicit = TOOL_CONTENT[slug];
  if (explicit) return explicit;

  const tool = getToolBySlug(slug);
  const name = tool?.name ?? "This tool";
  const lower = name.toLowerCase();

  return {
    howItWorks: (
      <>
        <p>
          {name} runs fully in your browser. We never send your data to a server —
          all processing happens locally using JavaScript so prompts, code, and
          documents you paste in stay on your device.
        </p>
        <p>
          The implementation is being finalized. Once live, the tool will be
          available here at this same URL with no signup, no ads injected
          mid-flow, and no rate limits.
        </p>
      </>
    ),
    useCases: (
      <>
        <p>
          Developers, prompt engineers, technical writers, and AI creators reach
          for {lower} when shipping LLM features, optimizing prompts, debugging
          model output, or preparing data for retrieval and fine-tuning.
        </p>
        <p>
          Use it any time you need quick, repeatable answers without spinning up
          a notebook or wiring an API.
        </p>
      </>
    ),
    faq: [
      {
        question: `Is ${name} free?`,
        answer: `Yes. ${name} is part of llmdesk's free toolkit. There is no signup, no usage cap, and no paywall.`,
      },
      {
        question: "Does this tool send my data anywhere?",
        answer:
          "No. Every llmdesk tool runs 100% client-side in your browser. Nothing you paste leaves your device.",
      },
      {
        question: "Do I need an API key?",
        answer:
          "No. llmdesk tools never call LLM APIs and never require credentials.",
      },
      {
        question: "When will this tool be live?",
        answer:
          "It is currently in development. Check back soon or browse our other tools while you wait.",
      },
      {
        question: "Can I suggest a feature?",
        answer:
          "Yes — visit the contact page and tell us what would make this tool more useful for your workflow.",
      },
    ],
  };
}
