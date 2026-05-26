export const CATEGORY_IDS = [
  "tokens",
  "prompts",
  "outputs",
  "rag",
  "reference",
  "creator",
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  /** Lucide icon name */
  icon: string;
  /** URL slug — same as id by default */
  slug: string;
}

export const categories: Category[] = [
  {
    id: "tokens",
    slug: "tokens",
    name: "Tokens & Cost",
    description:
      "Count tokens, estimate API spend, and visualize context windows for GPT, Claude, and Gemini.",
    icon: "Coins",
  },
  {
    id: "prompts",
    slug: "prompts",
    name: "Prompt Builders",
    description:
      "Compose, structure, and refactor prompts with templates for system messages, few-shot examples, and chain-of-thought.",
    icon: "Sparkles",
  },
  {
    id: "outputs",
    slug: "outputs",
    name: "Output Cleaners",
    description:
      "Strip markdown, fix broken JSON, extract code blocks, and polish raw LLM responses for production use.",
    icon: "Wand2",
  },
  {
    id: "rag",
    slug: "rag",
    name: "RAG & Data Prep",
    description:
      "Chunk text, deduplicate datasets, and convert files into formats ready for retrieval augmented generation and fine-tuning.",
    icon: "Database",
  },
  {
    id: "reference",
    slug: "reference",
    name: "Model Reference",
    description:
      "Side-by-side comparisons of model context windows, speeds, capabilities, and pricing across vendors.",
    icon: "BookOpen",
  },
  {
    id: "creator",
    slug: "creator",
    name: "AI Creator Tools",
    description:
      "Utilities for AI image, video, and social content creators — aspect ratios, seeds, subtitles, and disclosure helpers.",
    icon: "Palette",
  },
];

export function getCategoryById(id: CategoryId): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
