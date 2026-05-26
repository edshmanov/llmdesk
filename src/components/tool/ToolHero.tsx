import type { Tool } from "@/lib/tools";
import { getCategoryById } from "@/lib/categories";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface ToolHeroProps {
  tool: Tool;
}

export function ToolHero({ tool }: ToolHeroProps) {
  const category = getCategoryById(tool.category);

  return (
    <section className="py-8 md:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-zinc-500 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-accent">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        {category ? (
          <>
            <Link href={`/category/${category.slug}`} className="hover:text-accent">
              {category.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
          </>
        ) : null}
        <span className="text-zinc-700 dark:text-zinc-300">{tool.name}</span>
      </nav>

      {/* H1 — exactly one per page, contains primaryKeyword */}
      <h1 className="text-h1 md:text-display font-semibold tracking-tight capitalize">
        {tool.primaryKeyword}
      </h1>

      <p className="mt-4 max-w-2xl text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {tool.shortDescription}
      </p>
    </section>
  );
}
