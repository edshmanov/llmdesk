import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { tools } from "@/lib/tools";
import { cn } from "@/lib/utils";

export function Hero() {
  const totalTools = tools.length;

  return (
    <section className="relative pt-16 md:pt-24 pb-12">
      <div className="container max-w-3xl text-center">
        {/* Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-[#171717] dark:text-zinc-300">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          {totalTools} free tools, no signup
        </div>

        {/* H1 — exactly one per page on homepage */}
        <h1 className="mt-6 text-display font-semibold tracking-tight">
          The AI engineer&apos;s
          <br className="hidden sm:block" />{" "}
          <span className="text-accent">utility belt.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Token counters, cost calculators, output cleaners, RAG prep — everything
          you need to ship with LLMs. Free, fast, and 100% client-side.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#tools"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
          >
            Browse all tools
          </Link>
          <Link
            href="#categories"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Explore by category
          </Link>
        </div>

        <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-zinc-500">
          <ShieldCheck className="h-3.5 w-3.5" />
          Your data never leaves your browser.
        </p>
      </div>
    </section>
  );
}
