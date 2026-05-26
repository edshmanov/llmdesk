import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

import { getFeaturedTools } from "@/lib/tools";
import { Card, CardContent } from "@/components/ui/card";

export function TrendingTools() {
  const featured = getFeaturedTools();
  if (!featured.length) return null;

  return (
    <section id="tools" className="container py-12 md:py-16">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-accent">
            <TrendingUp className="h-3.5 w-3.5" />
            Most popular
          </div>
          <h2 className="text-h2 font-semibold tracking-tight mt-1">
            Anchor tools
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-prose">
            The five most-used utilities — covering counting, cost, structure, and
            data prep.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
          >
            <Card className="h-full hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:-translate-y-0.5">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold">{tool.name}</h3>
                  <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-accent transition-colors" />
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {tool.shortDescription}
                </p>
                {tool.status === "coming-soon" ? (
                  <span className="mt-3 inline-block text-[10px] font-semibold uppercase tracking-wider text-zinc-500 border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 rounded-full">
                    Coming soon
                  </span>
                ) : null}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
