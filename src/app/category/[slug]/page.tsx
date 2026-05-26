import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";

import { categories, getCategoryBySlug } from "@/lib/categories";
import { getToolsByCategory } from "@/lib/tools";
import { absoluteUrl } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  const title = `${category.name} — Free LLM Tools`;
  const url = absoluteUrl(`/category/${category.slug}`);

  return {
    title,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      type: "website",
      url,
      title,
      description: category.description,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: category.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: category.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(category.id);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: absoluteUrl(`/category/${category.slug}`),
      },
    ],
  };

  return (
    <article className="container max-w-5xl py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-zinc-500 flex items-center gap-1.5">
        <Link href="/" className="hover:text-accent">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-zinc-700 dark:text-zinc-300">{category.name}</span>
      </nav>

      <h1 className="text-h1 font-semibold tracking-tight">{category.name}</h1>
      <p className="mt-3 max-w-2xl text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {category.description}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoryTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
          >
            <Card className="h-full hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:-translate-y-0.5">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-base font-semibold">{tool.name}</h2>
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
    </article>
  );
}
