import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About llmdesk — who builds it, why, and the principles behind a fully client-side toolkit for LLM developers.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="container max-w-3xl py-12">
      <h1 className="text-h1 font-semibold tracking-tight">About llmdesk</h1>

      <div className="prose-tool mt-8">
        <p>
          llmdesk is a focused collection of free, client-side utilities for
          developers, prompt engineers, AI writers, and creators working with
          large language models. Every tool runs entirely in your browser — your
          prompts, code, and documents never leave your device.
        </p>

        <h2>Why this exists</h2>
        <p>
          Working with LLMs creates a long tail of small, repetitive tasks:
          counting tokens, estimating cost, repairing broken JSON output,
          chunking text for retrieval, stripping AI tells from drafts. None of
          these tasks need a server, an account, or a subscription. llmdesk
          packages the best of them as fast, single-purpose pages.
        </p>

        <h2>Our principles</h2>
        <ul>
          <li>
            <strong>Client-side only.</strong> No backend, no API keys, no data
            logging.
          </li>
          <li>
            <strong>Free, forever.</strong> Supported by tasteful, opt-in
            advertising — never user data.
          </li>
          <li>
            <strong>Fast and accessible.</strong> Sub-second loads, full
            keyboard support, mobile-first design.
          </li>
          <li>
            <strong>Open in spirit.</strong> The pricing data, tokenizer
            mappings, and rate limits we reference are public, attributed, and
            updated regularly.
          </li>
        </ul>

        <h2>Who runs it</h2>
        <p>
          llmdesk is built and maintained by{" "}
          <strong>Eldar Shmanov</strong>. Get in touch through the{" "}
          <a href="/contact">contact page</a> — feature requests and
          bug reports are read and replied to.
        </p>
      </div>
    </article>
  );
}
