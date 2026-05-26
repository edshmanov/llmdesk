import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Tool } from "@/lib/tools";
import { Card, CardContent } from "@/components/ui/card";

export interface RelatedToolsProps {
  tools: Tool[];
  title?: string;
}

export function RelatedTools({ tools, title = "Related tools" }: RelatedToolsProps) {
  if (!tools.length) return null;

  return (
    <section className="mt-12" aria-labelledby="related-tools-heading">
      <h2
        id="related-tools-heading"
        className="text-h2 font-semibold tracking-tight mb-6"
      >
        {title}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
          >
            <Card className="h-full hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:-translate-y-0.5">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {tool.name}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-accent transition-colors" />
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {tool.shortDescription}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
