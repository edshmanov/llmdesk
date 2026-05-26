import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { categories } from "@/lib/categories";
import { getToolsByCategory } from "@/lib/tools";
import { Card, CardContent } from "@/components/ui/card";

export function CategoryGrid() {
  return (
    <section id="categories" className="container py-12 md:py-16">
      <div className="mb-8">
        <h2 className="text-h2 font-semibold tracking-tight">Browse by category</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-prose">
          Six focused categories, fifty tools — every one built for the LLM workflow.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const Icon = ((Icons as unknown) as Record<string, LucideIcon>)[c.icon];
          const count = getToolsByCategory(c.id).length;
          return (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
            >
              <Card className="h-full hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:-translate-y-0.5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-md bg-zinc-100 dark:bg-zinc-800 text-accent">
                      {Icon ? <Icon className="h-5 w-5" /> : null}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">{c.name}</h3>
                      <p className="text-xs text-zinc-500">{count} tools</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {c.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
