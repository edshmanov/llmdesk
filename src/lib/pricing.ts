/**
 * Per-million-token pricing for major LLM providers.
 *
 * Values are USD per 1M tokens. Update monthly — provider pricing pages are linked
 * in source comments next to each block.
 *
 * `cache_read` is the discounted rate for cache hits; `null` means caching unsupported.
 * `batch` is the discounted rate for batch processing; `null` means batch unsupported.
 */

export type Modality = "text" | "vision" | "audio";

export interface ModelPricing {
  id: string;            // canonical id, e.g. 'gpt-4o'
  name: string;          // display name
  provider: Provider;
  input: number;         // USD per 1M input tokens
  output: number;        // USD per 1M output tokens
  cache_read?: number | null;
  cache_write?: number | null;
  batch?: { input: number; output: number } | null;
  context_window: number;
  max_output: number;
  modalities: Modality[];
  notes?: string;
}

export type Provider = "openai" | "anthropic" | "google" | "mistral" | "meta" | "cohere" | "xai";

// IMPORTANT: this is a stub. Real values get filled in when implementing the
// API Cost Calculator (tool #2). Treat the entries below as schema examples,
// not as up-to-date prices.
export const pricing: ModelPricing[] = [
  // OpenAI — https://openai.com/api/pricing/
  // Anthropic — https://www.anthropic.com/pricing
  // Google — https://ai.google.dev/pricing
  // (entries deliberately omitted — fill in when implementing pricing tools)
];

export const PROVIDER_LABELS: Record<Provider, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  google: "Google",
  mistral: "Mistral",
  meta: "Meta",
  cohere: "Cohere",
  xai: "xAI",
};
