import type { CategoryId } from "./categories";

export type ToolStatus = "live" | "coming-soon";

export interface Tool {
  slug: string;
  name: string;
  category: CategoryId;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** Lucide icon name */
  icon: string;
  status: ToolStatus;
  featured: boolean;
  relatedSlugs: string[];
}

/**
 * The complete tool registry. Adding a tool here automatically:
 *  - creates a route at /[slug]
 *  - adds it to the sitemap
 *  - lists it on the category page
 *  - makes it searchable from the homepage
 *
 * To wire up the interactive component, drop a file at
 *   src/tools/<slug>/index.tsx
 * exporting a default React component, and import it from
 * the dynamic [tool]/page.tsx switch.
 */
export const tools: Tool[] = [
  // ============================================================
  // A. Tokens & Cost (10)
  // ============================================================
  {
    slug: "token-counter",
    name: "Token Counter",
    category: "tokens",
    shortDescription:
      "Count tokens for GPT, Claude, and Gemini models — runs entirely in your browser.",
    metaTitle: "Token Counter for GPT, Claude & Gemini — Free Online",
    metaDescription:
      "Count tokens for any LLM prompt instantly. Supports GPT-4o, Claude, Gemini, and Llama tokenizers. Free, client-side, no data leaves your browser.",
    primaryKeyword: "token counter",
    secondaryKeywords: ["gpt token counter", "claude token counter", "tiktoken online"],
    icon: "Hash",
    status: "coming-soon",
    featured: true,
    relatedSlugs: ["api-cost-calculator", "context-window-filler", "text-chunker"],
  },
  {
    slug: "api-cost-calculator",
    name: "API Cost Calculator",
    category: "tokens",
    shortDescription:
      "Estimate the cost of any prompt or completion across major LLM providers.",
    metaTitle: "LLM API Cost Calculator — GPT, Claude, Gemini Pricing",
    metaDescription:
      "Calculate the exact cost of your LLM API calls. Compare GPT-4o, Claude Sonnet, Gemini, and more side by side. Free and updated monthly.",
    primaryKeyword: "ai api cost calculator",
    secondaryKeywords: ["openai pricing calculator", "claude pricing", "llm cost"],
    icon: "Calculator",
    status: "coming-soon",
    featured: true,
    relatedSlugs: ["token-counter", "monthly-ai-bill-estimator", "model-price-comparison"],
  },
  {
    slug: "monthly-ai-bill-estimator",
    name: "Monthly AI Bill Estimator",
    category: "tokens",
    shortDescription:
      "Project your monthly AI spend from usage patterns and model mix.",
    metaTitle: "Monthly AI Bill Estimator — Project LLM Costs",
    metaDescription:
      "Forecast your monthly AI API bill. Enter daily volume, model mix, and cache hit rates to plan budgets for OpenAI, Anthropic, and Google.",
    primaryKeyword: "monthly ai bill estimator",
    secondaryKeywords: ["openai monthly bill", "claude monthly cost"],
    icon: "Receipt",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["api-cost-calculator", "cache-hit-savings-calculator"],
  },
  {
    slug: "context-window-filler",
    name: "Context Window Filler",
    category: "tokens",
    shortDescription:
      "Visualize exactly how much of a model's context window your prompt occupies.",
    metaTitle: "Context Window Visualizer — See How Full Your Prompt Is",
    metaDescription:
      "Visualize how much of an LLM context window your prompt fills. Supports 8K, 32K, 128K, 200K, and 1M token windows. Free and instant.",
    primaryKeyword: "context window visualizer",
    secondaryKeywords: ["llm context window", "gpt context size"],
    icon: "Gauge",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["token-counter", "context-window-comparison"],
  },
  {
    slug: "token-to-word-ratio-analyzer",
    name: "Token-to-Word Ratio Analyzer",
    category: "tokens",
    shortDescription:
      "Discover how dense your text is in tokens vs. plain words — useful for tightening prompts.",
    metaTitle: "Token-to-Word Ratio Analyzer for LLM Prompts",
    metaDescription:
      "Analyze the token-to-word ratio of any text. See which passages are token-dense and optimize prompts before sending them to GPT or Claude.",
    primaryKeyword: "token to word ratio",
    secondaryKeywords: ["tokens per word", "prompt density"],
    icon: "Ratio",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["token-counter", "prompt-token-slimmer"],
  },
  {
    slug: "batch-job-cost-calculator",
    name: "Batch Job Cost Calculator",
    category: "tokens",
    shortDescription:
      "Estimate cost and runtime for OpenAI and Anthropic batch processing jobs.",
    metaTitle: "Batch API Cost Calculator — OpenAI & Anthropic",
    metaDescription:
      "Estimate cost and turnaround time for OpenAI Batch and Anthropic Message Batches. Compare 50% batch discounts against on-demand pricing.",
    primaryKeyword: "batch api cost calculator",
    secondaryKeywords: ["openai batch pricing", "anthropic batch discount"],
    icon: "Layers",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["api-cost-calculator", "monthly-ai-bill-estimator"],
  },
  {
    slug: "prompt-token-slimmer",
    name: "Prompt Token Slimmer",
    category: "tokens",
    shortDescription:
      "Trim filler words and tighten phrasing to cut token count without losing meaning.",
    metaTitle: "Prompt Token Slimmer — Shrink Prompts, Cut Costs",
    metaDescription:
      "Reduce LLM token usage by stripping filler words, redundant phrasing, and unnecessary punctuation. Lower costs without changing intent.",
    primaryKeyword: "prompt token slimmer",
    secondaryKeywords: ["reduce token count", "prompt compression"],
    icon: "Scissors",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["token-counter", "token-to-word-ratio-analyzer"],
  },
  {
    slug: "model-price-comparison",
    name: "Model Price Comparison Table",
    category: "tokens",
    shortDescription:
      "Side-by-side pricing for every major LLM, sortable by input, output, and cached rates.",
    metaTitle: "LLM Model Price Comparison — GPT, Claude, Gemini",
    metaDescription:
      "Compare per-million-token prices across GPT-4o, Claude Sonnet, Gemini 1.5, Llama, and Mistral. Sortable, filterable, updated monthly.",
    primaryKeyword: "llm price comparison",
    secondaryKeywords: ["openai vs claude pricing", "ai api pricing table"],
    icon: "Table",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["api-cost-calculator", "price-per-million-table"],
  },
  {
    slug: "cache-hit-savings-calculator",
    name: "Cache Hit Savings Calculator",
    category: "tokens",
    shortDescription:
      "Quantify how much prompt caching saves on Anthropic, OpenAI, and Gemini.",
    metaTitle: "Prompt Cache Savings Calculator — Anthropic & OpenAI",
    metaDescription:
      "Estimate dollars saved with prompt caching on Anthropic Claude and OpenAI. Model cache hit rates and see ROI before deploying.",
    primaryKeyword: "prompt cache savings calculator",
    secondaryKeywords: ["anthropic prompt caching", "openai prompt caching"],
    icon: "Database",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["api-cost-calculator", "monthly-ai-bill-estimator"],
  },
  {
    slug: "fine-tune-cost-estimator",
    name: "Fine-Tune Cost Estimator",
    category: "tokens",
    shortDescription:
      "Project the training and inference cost of a fine-tune across providers.",
    metaTitle: "Fine-Tune Cost Estimator — OpenAI & Gemini",
    metaDescription:
      "Estimate training cost, hosting cost, and per-token inference cost for an OpenAI or Gemini fine-tune. Plan budgets before you train.",
    primaryKeyword: "fine tune cost estimator",
    secondaryKeywords: ["openai fine tune pricing", "gemini fine tune cost"],
    icon: "Cpu",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["api-cost-calculator", "jsonl-builder"],
  },

  // ============================================================
  // B. Prompt Builders (10)
  // ============================================================
  {
    slug: "system-prompt-generator",
    name: "System Prompt Generator",
    category: "prompts",
    shortDescription:
      "Build battle-tested system prompts from role, tone, and constraint inputs.",
    metaTitle: "System Prompt Generator — Build Better LLM Prompts",
    metaDescription:
      "Generate production-ready system prompts for GPT and Claude. Pick a role, tone, and constraints — get a structured prompt ready to ship.",
    primaryKeyword: "system prompt generator",
    secondaryKeywords: ["gpt system prompt", "claude system prompt", "prompt template"],
    icon: "MessageSquareCode",
    status: "coming-soon",
    featured: true,
    relatedSlugs: ["xml-prompt-formatter", "few-shot-formatter", "ai-persona-generator"],
  },
  {
    slug: "few-shot-formatter",
    name: "Few-Shot Example Formatter",
    category: "prompts",
    shortDescription:
      "Convert raw input/output pairs into clean few-shot examples for any LLM.",
    metaTitle: "Few-Shot Example Formatter for LLM Prompts",
    metaDescription:
      "Format input/output pairs as clean few-shot examples. Choose XML, JSON, or delimiter styles tuned for GPT, Claude, or Gemini.",
    primaryKeyword: "few shot example formatter",
    secondaryKeywords: ["few shot prompt", "in-context learning examples"],
    icon: "ListTree",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["system-prompt-generator", "xml-prompt-formatter"],
  },
  {
    slug: "chain-of-thought-wrapper",
    name: "Chain-of-Thought Wrapper",
    category: "prompts",
    shortDescription:
      "Wrap any prompt with reasoning scaffolding to improve multi-step accuracy.",
    metaTitle: "Chain-of-Thought Prompt Wrapper — Boost Reasoning",
    metaDescription:
      "Add chain-of-thought scaffolding to any prompt. Choose step-by-step, plan-then-act, or scratchpad styles to improve LLM reasoning.",
    primaryKeyword: "chain of thought prompt",
    secondaryKeywords: ["cot prompting", "reasoning prompt template"],
    icon: "Brain",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["system-prompt-generator", "few-shot-formatter"],
  },
  {
    slug: "xml-prompt-formatter",
    name: "XML Prompt Formatter",
    category: "prompts",
    shortDescription:
      "Wrap context, instructions, and examples in Claude-style XML tags.",
    metaTitle: "Claude XML Prompt Formatter — Structure Your Prompts",
    metaDescription:
      "Format prompts with Claude-style XML tags for clearer instructions and better outputs. Add documents, examples, and constraints in one click.",
    primaryKeyword: "xml prompt formatter",
    secondaryKeywords: ["claude xml tags", "anthropic prompt format"],
    icon: "Code2",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["system-prompt-generator", "json-schema-builder"],
  },
  {
    slug: "json-schema-builder",
    name: "JSON Output Schema Builder",
    category: "prompts",
    shortDescription:
      "Generate JSON Schemas for structured outputs and function calling.",
    metaTitle: "JSON Schema Builder for LLM Structured Outputs",
    metaDescription:
      "Design JSON schemas for OpenAI structured outputs and Anthropic tool use. Drag-and-drop fields, validate, and copy the final schema.",
    primaryKeyword: "json schema builder",
    secondaryKeywords: ["openai structured outputs", "anthropic tool use schema"],
    icon: "Braces",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["xml-prompt-formatter", "ai-json-repairer"],
  },
  {
    slug: "ai-persona-generator",
    name: "AI Persona Generator",
    category: "prompts",
    shortDescription:
      "Create rich, internally consistent personas to drop into any system prompt.",
    metaTitle: "AI Persona Generator — Custom GPT & Claude Characters",
    metaDescription:
      "Generate detailed AI personas with backstory, voice, and constraints. Drop into any system prompt for consistent character behavior.",
    primaryKeyword: "ai persona generator",
    secondaryKeywords: ["chatgpt persona", "claude character prompt"],
    icon: "UserCog",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["system-prompt-generator", "chain-of-thought-wrapper"],
  },
  {
    slug: "prompt-variable-extractor",
    name: "Prompt Variable Extractor",
    category: "prompts",
    shortDescription:
      "Pull out variables and turn any draft prompt into a reusable template.",
    metaTitle: "Prompt Variable Extractor — Build Reusable Templates",
    metaDescription:
      "Auto-detect and extract variables from any prompt. Convert one-off prompts into reusable templates ready for production pipelines.",
    primaryKeyword: "prompt variable extractor",
    secondaryKeywords: ["prompt template variables", "prompt templating"],
    icon: "Variable",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["system-prompt-generator", "prompt-diff-checker"],
  },
  {
    slug: "prompt-diff-checker",
    name: "Prompt Diff Checker",
    category: "prompts",
    shortDescription:
      "Compare two prompt versions side by side with token-level highlighting.",
    metaTitle: "Prompt Diff Checker — Compare LLM Prompts Side-by-Side",
    metaDescription:
      "Diff two prompt versions to see exactly what changed. Token-level highlighting helps debug regressions in production prompts.",
    primaryKeyword: "prompt diff checker",
    secondaryKeywords: ["compare prompts", "prompt versioning"],
    icon: "GitCompare",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["system-prompt-generator", "prompt-variable-extractor"],
  },
  {
    slug: "negative-prompt-builder",
    name: "Negative Prompt Builder",
    category: "prompts",
    shortDescription:
      "Build curated negative prompts for Stable Diffusion, SDXL, and Flux.",
    metaTitle: "Negative Prompt Builder for Stable Diffusion & Flux",
    metaDescription:
      "Generate optimized negative prompts for Stable Diffusion, SDXL, and Flux. Curated lists for quality, anatomy, and style avoidance.",
    primaryKeyword: "negative prompt builder",
    secondaryKeywords: ["stable diffusion negative prompt", "sdxl negative prompt"],
    icon: "MinusSquare",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["midjourney-parameter-builder", "aspect-ratio-calculator"],
  },
  {
    slug: "midjourney-parameter-builder",
    name: "Midjourney Parameter Builder",
    category: "prompts",
    shortDescription:
      "Pick aspect ratio, stylize, chaos, and version flags from a clean UI.",
    metaTitle: "Midjourney Parameter Builder — Visual Prompt Assistant",
    metaDescription:
      "Build Midjourney prompts with the right --ar, --s, --c, and --v flags. Visual assistant for aspect ratio, stylize, chaos, and version.",
    primaryKeyword: "midjourney parameter builder",
    secondaryKeywords: ["midjourney prompt builder", "midjourney parameters"],
    icon: "SlidersHorizontal",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["negative-prompt-builder", "aspect-ratio-calculator"],
  },

  // ============================================================
  // C. Output Cleaners (10)
  // ============================================================
  {
    slug: "markdown-to-plain-text",
    name: "Markdown to Plain Text",
    category: "outputs",
    shortDescription:
      "Strip every markdown character and leave clean prose, ready to paste anywhere.",
    metaTitle: "Markdown to Plain Text Converter — Strip Formatting",
    metaDescription:
      "Convert markdown to clean plain text in one click. Removes headings, bold, links, code fences, and lists while preserving readable structure.",
    primaryKeyword: "markdown to plain text",
    secondaryKeywords: ["strip markdown", "markdown to text"],
    icon: "FileText",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["heading-flattener", "bullet-to-prose-converter"],
  },
  {
    slug: "ai-json-repairer",
    name: "AI JSON Repairer",
    category: "outputs",
    shortDescription:
      "Fix malformed JSON output from any LLM — quotes, trailing commas, escaping, all of it.",
    metaTitle: "AI JSON Repairer — Fix Broken LLM JSON Output",
    metaDescription:
      "Repair broken JSON from any LLM in one click. Fixes quotes, trailing commas, unescaped characters, truncated arrays, and more.",
    primaryKeyword: "ai json repair",
    secondaryKeywords: ["fix llm json", "json repair tool", "parse gpt json"],
    icon: "Wrench",
    status: "coming-soon",
    featured: true,
    relatedSlugs: ["json-schema-builder", "code-block-extractor"],
  },
  {
    slug: "code-block-extractor",
    name: "Code Block Extractor",
    category: "outputs",
    shortDescription:
      "Pull every fenced code block out of an LLM response with one click.",
    metaTitle: "Code Block Extractor — Pull Code from LLM Output",
    metaDescription:
      "Extract every fenced code block from any LLM response. Filter by language, copy individually, or download as a zip.",
    primaryKeyword: "code block extractor",
    secondaryKeywords: ["extract code from chatgpt", "markdown code extractor"],
    icon: "Code",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["ai-json-repairer", "markdown-to-plain-text"],
  },
  {
    slug: "citation-extractor",
    name: "Citation Extractor",
    category: "outputs",
    shortDescription:
      "Pull URLs, inline citations, and references out of LLM responses.",
    metaTitle: "Citation Extractor for LLM Output — Pull URLs & Refs",
    metaDescription:
      "Extract every URL, inline citation, and reference from LLM responses. Deduplicate, validate, and export to CSV or BibTeX.",
    primaryKeyword: "citation extractor",
    secondaryKeywords: ["extract urls from text", "reference extractor"],
    icon: "Link2",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["bibliography-formatter", "code-block-extractor"],
  },
  {
    slug: "emoji-stripper",
    name: "Emoji Stripper",
    category: "outputs",
    shortDescription:
      "Remove every emoji and pictograph from LLM output in one paste.",
    metaTitle: "Emoji Stripper — Remove Emojis from LLM Output",
    metaDescription:
      "Strip every emoji and pictograph from text in one click. Useful for normalizing LLM output before sending to email, SMS, or print.",
    primaryKeyword: "emoji stripper",
    secondaryKeywords: ["remove emojis from text", "emoji remover"],
    icon: "Eraser",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["smart-quote-cleaner", "ai-tell-phrase-remover"],
  },
  {
    slug: "hashtag-extractor",
    name: "Hashtag Extractor",
    category: "outputs",
    shortDescription:
      "Pull every hashtag out of LLM-generated social copy, deduplicated.",
    metaTitle: "Hashtag Extractor — Pull Tags from AI-Generated Copy",
    metaDescription:
      "Extract every hashtag from any block of text. Deduplicate, sort, and copy as space- or newline-separated lists.",
    primaryKeyword: "hashtag extractor",
    secondaryKeywords: ["extract hashtags", "hashtag finder"],
    icon: "Hash",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["citation-extractor", "tweet-thread-splitter"],
  },
  {
    slug: "smart-quote-cleaner",
    name: "Smart Quote & Em-Dash Cleaner",
    category: "outputs",
    shortDescription:
      "Normalize curly quotes and em-dashes to plain ASCII equivalents.",
    metaTitle: "Smart Quote & Em-Dash Cleaner — Normalize AI Output",
    metaDescription:
      "Replace curly quotes, em-dashes, and unicode punctuation with plain ASCII. Avoid the tell-tale signs of AI-generated copy.",
    primaryKeyword: "smart quote cleaner",
    secondaryKeywords: ["em dash remover", "curly quote replacer"],
    icon: "Quote",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["ai-tell-phrase-remover", "emoji-stripper"],
  },
  {
    slug: "ai-tell-phrase-remover",
    name: "AI Tell-Phrase Remover",
    category: "outputs",
    shortDescription:
      "Strip the most overused AI phrases (\"delve into\", \"it's important to note\") from any draft.",
    metaTitle: "AI Tell-Phrase Remover — Strip AI Cliches from Text",
    metaDescription:
      "Detect and remove the most overused AI phrases like 'delve into', 'in conclusion', and 'it's important to note'. Make AI writing sound human.",
    primaryKeyword: "ai tell phrase remover",
    secondaryKeywords: ["remove ai phrases", "humanize ai text"],
    icon: "WandSparkles",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["smart-quote-cleaner", "bullet-to-prose-converter"],
  },
  {
    slug: "bullet-to-prose-converter",
    name: "Bullet to Prose Converter",
    category: "outputs",
    shortDescription:
      "Convert bullet-heavy LLM responses into flowing paragraphs.",
    metaTitle: "Bullet to Prose Converter — Flow from Lists",
    metaDescription:
      "Convert bullet-point output into flowing prose paragraphs. Preserves meaning while removing the listy feel of typical LLM responses.",
    primaryKeyword: "bullet to prose converter",
    secondaryKeywords: ["list to paragraph", "bullets to text"],
    icon: "AlignLeft",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["ai-tell-phrase-remover", "heading-flattener"],
  },
  {
    slug: "heading-flattener",
    name: "Heading Flattener",
    category: "outputs",
    shortDescription:
      "Collapse over-structured AI responses to a single, clean heading level.",
    metaTitle: "Heading Flattener — Collapse AI Output Hierarchy",
    metaDescription:
      "Flatten heading levels in AI-generated markdown. Collapse 4-deep hierarchies to a clean structure ready for blog posts and docs.",
    primaryKeyword: "heading flattener",
    secondaryKeywords: ["markdown heading levels", "flatten headings"],
    icon: "Heading1",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["markdown-to-plain-text", "bullet-to-prose-converter"],
  },

  // ============================================================
  // D. RAG & Data Prep (8)
  // ============================================================
  {
    slug: "text-chunker",
    name: "Text Chunker",
    category: "rag",
    shortDescription:
      "Split long documents into token-aware chunks for embeddings and RAG.",
    metaTitle: "Text Chunker for RAG — Token-Aware Splitter",
    metaDescription:
      "Split documents into token-aware chunks for RAG and embeddings. Configurable overlap, multiple tokenizers, instant preview.",
    primaryKeyword: "text chunker for rag",
    secondaryKeywords: ["rag text splitter", "token chunker"],
    icon: "SquareSplitHorizontal",
    status: "coming-soon",
    featured: true,
    relatedSlugs: ["markdown-splitter", "jsonl-builder", "token-counter"],
  },
  {
    slug: "jsonl-builder",
    name: "JSONL Builder for Fine-Tuning",
    category: "rag",
    shortDescription:
      "Convert chat transcripts into clean JSONL files ready for OpenAI or Gemini fine-tunes.",
    metaTitle: "JSONL Builder for Fine-Tuning — OpenAI & Gemini",
    metaDescription:
      "Build fine-tuning datasets in the exact JSONL format OpenAI and Gemini expect. Validate, preview, and download in seconds.",
    primaryKeyword: "jsonl builder fine tuning",
    secondaryKeywords: ["openai fine tune jsonl", "gemini fine tune format"],
    icon: "FileJson",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["csv-to-chat-converter", "dataset-deduplicator", "fine-tune-cost-estimator"],
  },
  {
    slug: "csv-to-chat-converter",
    name: "CSV to Chat Format Converter",
    category: "rag",
    shortDescription:
      "Turn CSV rows into properly formatted chat messages for fine-tuning.",
    metaTitle: "CSV to Chat Format Converter for Fine-Tuning",
    metaDescription:
      "Convert CSV files to the chat message format used by OpenAI and Anthropic fine-tuning. Map columns to roles in a single click.",
    primaryKeyword: "csv to chat format",
    secondaryKeywords: ["csv to jsonl chat", "fine tune from csv"],
    icon: "Sheet",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["jsonl-builder", "dataset-deduplicator"],
  },
  {
    slug: "dataset-deduplicator",
    name: "Dataset Deduplicator",
    category: "rag",
    shortDescription:
      "Remove exact and near-duplicate examples from a fine-tuning dataset.",
    metaTitle: "Dataset Deduplicator — Clean Fine-Tuning Data",
    metaDescription:
      "Detect and remove exact and near-duplicate examples from fine-tuning datasets. Lowers training cost and improves model quality.",
    primaryKeyword: "dataset deduplicator",
    secondaryKeywords: ["deduplicate fine tune data", "dataset cleaner"],
    icon: "Copy",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["jsonl-builder", "csv-to-chat-converter"],
  },
  {
    slug: "markdown-splitter",
    name: "Markdown Splitter",
    category: "rag",
    shortDescription:
      "Split long markdown docs by heading hierarchy for clean RAG ingestion.",
    metaTitle: "Markdown Splitter — Heading-Aware RAG Chunking",
    metaDescription:
      "Split markdown documents by heading levels for RAG pipelines. Preserve structure, choose split depth, and export per-chunk metadata.",
    primaryKeyword: "markdown splitter",
    secondaryKeywords: ["markdown chunker", "rag markdown"],
    icon: "Rows3",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["text-chunker", "html-to-markdown"],
  },
  {
    slug: "pdf-text-extractor",
    name: "PDF Text Extractor",
    category: "rag",
    shortDescription:
      "Pull clean text out of PDFs in your browser — no upload, no server.",
    metaTitle: "PDF Text Extractor — In-Browser, No Upload",
    metaDescription:
      "Extract text from PDFs directly in your browser. No upload, no server, no data leaves your device. Powered by pdf.js.",
    primaryKeyword: "pdf text extractor",
    secondaryKeywords: ["extract text from pdf", "pdf to text online"],
    icon: "FileType2",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["text-chunker", "markdown-splitter"],
  },
  {
    slug: "html-to-markdown",
    name: "HTML to Markdown Converter",
    category: "rag",
    shortDescription:
      "Clean any HTML page into RAG-ready markdown with one click.",
    metaTitle: "HTML to Markdown Converter — Clean RAG Source Prep",
    metaDescription:
      "Convert HTML to clean markdown for RAG ingestion. Strips scripts, navs, and ads while preserving headings, lists, and code blocks.",
    primaryKeyword: "html to markdown",
    secondaryKeywords: ["html to md converter", "web page to markdown"],
    icon: "FileCode2",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["markdown-splitter", "markdown-to-plain-text"],
  },
  {
    slug: "bibliography-formatter",
    name: "Bibliography Formatter",
    category: "rag",
    shortDescription:
      "Format citations as APA, MLA, or BibTeX for AI research papers.",
    metaTitle: "Bibliography Formatter — APA, MLA, BibTeX",
    metaDescription:
      "Format AI-extracted citations into APA, MLA, Chicago, or BibTeX style. Paste raw references, get a clean bibliography in seconds.",
    primaryKeyword: "bibliography formatter",
    secondaryKeywords: ["apa formatter", "bibtex generator"],
    icon: "BookMarked",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["citation-extractor", "html-to-markdown"],
  },

  // ============================================================
  // E. Model Reference (6)
  // ============================================================
  {
    slug: "context-window-comparison",
    name: "Context Window Comparison",
    category: "reference",
    shortDescription:
      "Side-by-side context window sizes for every major model, sortable and filterable.",
    metaTitle: "LLM Context Window Comparison Chart",
    metaDescription:
      "Compare context window sizes across GPT, Claude, Gemini, Llama, Mistral, and more. Sortable, filterable, with effective-context notes.",
    primaryKeyword: "llm context window comparison",
    secondaryKeywords: ["gpt context window", "claude context length"],
    icon: "RectangleHorizontal",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["context-window-filler", "capability-matrix"],
  },
  {
    slug: "model-speed-comparison",
    name: "Model Speed (TPS) Comparison",
    category: "reference",
    shortDescription:
      "Tokens-per-second benchmarks for every major hosted LLM.",
    metaTitle: "LLM Speed Comparison — Tokens Per Second",
    metaDescription:
      "Compare tokens-per-second throughput for GPT-4o, Claude, Gemini, Llama 3, and more. See latency and TTFT across providers.",
    primaryKeyword: "llm tokens per second",
    secondaryKeywords: ["gpt speed comparison", "llm throughput"],
    icon: "Zap",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["context-window-comparison", "capability-matrix"],
  },
  {
    slug: "capability-matrix",
    name: "Model Capability Matrix",
    category: "reference",
    shortDescription:
      "Which models support vision, audio, tool use, and structured JSON — at a glance.",
    metaTitle: "LLM Capability Matrix — Vision, Audio, Tools, JSON",
    metaDescription:
      "See which LLMs support vision, audio, tool use, structured outputs, and streaming. Filter by capability across every major provider.",
    primaryKeyword: "llm capability matrix",
    secondaryKeywords: ["llm features comparison", "multimodal models"],
    icon: "Grid3X3",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["context-window-comparison", "model-speed-comparison"],
  },
  {
    slug: "price-per-million-table",
    name: "Price Per Million Tokens Table",
    category: "reference",
    shortDescription:
      "Per-million-token prices for every major model — sortable by input, output, and cache rate.",
    metaTitle: "Price Per Million Tokens — LLM Pricing Table",
    metaDescription:
      "Compare per-million-token prices across every LLM. Sort by input, output, batch, and cache hit rates. Updated monthly.",
    primaryKeyword: "price per million tokens",
    secondaryKeywords: ["llm cost per token", "ai pricing table"],
    icon: "DollarSign",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["model-price-comparison", "api-cost-calculator"],
  },
  {
    slug: "open-source-model-picker",
    name: "Open Source Model Picker",
    category: "reference",
    shortDescription:
      "Find the right open weights model for your VRAM budget and task.",
    metaTitle: "Open Source LLM Picker — Find the Right Model",
    metaDescription:
      "Pick the right open-weights LLM for your hardware. Filter Llama, Mistral, Qwen, DeepSeek, and Gemma by VRAM, task, and license.",
    primaryKeyword: "open source llm picker",
    secondaryKeywords: ["best open source llm", "llama vs mistral"],
    icon: "Boxes",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["capability-matrix", "context-window-comparison"],
  },
  {
    slug: "rate-limit-reference",
    name: "Rate Limit Reference",
    category: "reference",
    shortDescription:
      "TPM, RPM, and tier limits for OpenAI, Anthropic, Google, and friends.",
    metaTitle: "LLM Rate Limit Reference — OpenAI, Anthropic, Google",
    metaDescription:
      "Quick reference for tokens-per-minute and requests-per-minute limits at OpenAI, Anthropic, Google, and other major LLM APIs.",
    primaryKeyword: "llm rate limits",
    secondaryKeywords: ["openai rate limit", "anthropic rate limit"],
    icon: "Timer",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["model-speed-comparison", "api-cost-calculator"],
  },

  // ============================================================
  // F. AI Creator Tools (6)
  // ============================================================
  {
    slug: "aspect-ratio-calculator",
    name: "AI Image Aspect Ratio Calculator",
    category: "creator",
    shortDescription:
      "Compute pixel-perfect dimensions for SDXL, Midjourney, Flux, and DALL·E presets.",
    metaTitle: "AI Image Aspect Ratio Calculator — SDXL, MJ, Flux",
    metaDescription:
      "Calculate exact pixel dimensions for any aspect ratio across Stable Diffusion, Midjourney, Flux, and DALL·E. Preset library included.",
    primaryKeyword: "ai aspect ratio calculator",
    secondaryKeywords: ["sdxl aspect ratio", "midjourney aspect ratio"],
    icon: "Frame",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["seed-randomizer", "midjourney-parameter-builder"],
  },
  {
    slug: "seed-randomizer",
    name: "Seed Randomizer",
    category: "creator",
    shortDescription:
      "Generate reproducible seeds for image and video generators in one click.",
    metaTitle: "AI Seed Randomizer — Reproducible Image Generation",
    metaDescription:
      "Generate random seeds for AI image and video generators. Copy individual values or batches; built for reproducible runs.",
    primaryKeyword: "ai seed randomizer",
    secondaryKeywords: ["stable diffusion seed", "midjourney seed"],
    icon: "Dices",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["aspect-ratio-calculator", "midjourney-parameter-builder"],
  },
  {
    slug: "video-script-timer",
    name: "AI Video Script Timer",
    category: "creator",
    shortDescription:
      "Estimate spoken duration of a script based on words-per-minute targets.",
    metaTitle: "AI Video Script Timer — Estimate Spoken Duration",
    metaDescription:
      "Estimate spoken length of any script. Tune WPM for narration, conversational, or fast-cut formats. Per-paragraph timing built in.",
    primaryKeyword: "video script timer",
    secondaryKeywords: ["script duration calculator", "voice over timer"],
    icon: "Timer",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["srt-subtitle-builder", "tweet-thread-splitter"],
  },
  {
    slug: "srt-subtitle-builder",
    name: "SRT Subtitle Builder",
    category: "creator",
    shortDescription:
      "Convert plain transcripts into valid SRT subtitle files in seconds.",
    metaTitle: "SRT Subtitle Builder — Transcript to Captions",
    metaDescription:
      "Convert plain transcripts to standards-compliant SRT subtitle files. Tune line length and segment timing without re-editing video.",
    primaryKeyword: "srt subtitle builder",
    secondaryKeywords: ["create srt file", "transcript to srt"],
    icon: "Captions",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["video-script-timer", "ai-disclosure-generator"],
  },
  {
    slug: "tweet-thread-splitter",
    name: "Tweet & Thread Splitter",
    category: "creator",
    shortDescription:
      "Auto-split long AI-generated copy into properly numbered tweet threads.",
    metaTitle: "Tweet Thread Splitter — Long Form to X Threads",
    metaDescription:
      "Split long-form AI copy into properly numbered tweet threads. Respects 280-char limits, sentence boundaries, and hashtag placement.",
    primaryKeyword: "tweet thread splitter",
    secondaryKeywords: ["x thread splitter", "tweet generator"],
    icon: "Twitter",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["hashtag-extractor", "video-script-timer"],
  },
  {
    slug: "ai-disclosure-generator",
    name: "AI Disclosure Statement Generator",
    category: "creator",
    shortDescription:
      "Produce a clear, platform-compliant AI disclosure statement in seconds.",
    metaTitle: "AI Disclosure Statement Generator — Platform-Ready",
    metaDescription:
      "Generate clean AI disclosure statements for YouTube, TikTok, blogs, and academic work. Stay compliant with platform AI labeling rules.",
    primaryKeyword: "ai disclosure generator",
    secondaryKeywords: ["ai content disclosure", "ai labeling statement"],
    icon: "ShieldCheck",
    status: "coming-soon",
    featured: false,
    relatedSlugs: ["srt-subtitle-builder", "tweet-thread-splitter"],
  },
];

// ============================================================
// Helpers
// ============================================================

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: CategoryId): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((t) => t.featured);
}

export function getRelatedTools(slug: string, max = 4): Tool[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  const related = tool.relatedSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is Tool => Boolean(t));
  return related.slice(0, max);
}

export function getLiveTools(): Tool[] {
  return tools.filter((t) => t.status === "live");
}

export function searchTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return tools.filter((t) => {
    return (
      t.name.toLowerCase().includes(q) ||
      t.shortDescription.toLowerCase().includes(q) ||
      t.primaryKeyword.toLowerCase().includes(q) ||
      t.secondaryKeywords.some((k) => k.toLowerCase().includes(q))
    );
  });
}
