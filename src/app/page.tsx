import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { SearchBar } from "@/components/home/SearchBar";
import { TrendingTools } from "@/components/home/TrendingTools";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { AdSlot } from "@/components/layout/AdSlot";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "llmdesk — Free AI & LLM Utility Tools",
  description:
    "50+ free, client-side tools for developers and prompt engineers working with LLMs. Token counters, cost calculators, output cleaners, RAG prep, and more.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "llmdesk",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.png"),
    sameAs: [],
    description:
      "Free, client-side utilities for developers and prompt engineers working with LLMs.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />

      <Hero />
      <SearchBar />

      <div className="container my-6">
        <AdSlot variant="leaderboard" />
      </div>

      <TrendingTools />
      <CategoryGrid />
    </>
  );
}
