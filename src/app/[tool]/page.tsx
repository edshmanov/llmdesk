import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Construction } from "lucide-react";

import { tools, getToolBySlug } from "@/lib/tools";
import { absoluteUrl } from "@/lib/utils";
import { ToolLayout } from "@/components/tool/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { getToolContent } from "@/data/tool-content";

// ── Live tool imports ──────────────────────────────────────────────────────────
import dynamic from "next/dynamic";
const TokenCounter = dynamic(() => import("@/tools/token-counter"), { ssr: false });
const ApiCostCalculator = dynamic(() => import("@/tools/api-cost-calculator"), { ssr: false });
// ──────────────────────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return tools.map((tool) => ({ tool: tool.slug }));
}

export const dynamicParams = false;

type Params = { tool: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const url = absoluteUrl(`/${tool.slug}`);

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: [tool.primaryKeyword, ...tool.secondaryKeywords],
    alternates: { canonical: `/${tool.slug}` },
    openGraph: {
      type: "website",
      url,
      title: tool.metaTitle,
      description: tool.metaDescription,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: tool.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

function getToolComponent(slug: string) {
  switch (slug) {
    case "token-counter":
      return <TokenCounter />;
    case "api-cost-calculator":
      return <ApiCostCalculator />;
    default:
      return null;
  }
}

export default async function ToolPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tool: slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const content = getToolContent(tool.slug);
  const liveComponent = getToolComponent(slug);

  const toolComponent = liveComponent ?? (
    <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
      <CardContent className="flex flex-col items-center justify-center gap-3 p-10 text-center">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500">
          <Construction className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">{tool.name} is coming soon</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
            We&apos;re building this one next. Bookmark the page or browse{" "}
            <Link href="/" className="text-accent underline">
              50+ other tools
            </Link>{" "}
            in the meantime.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <ToolLayout
      tool={tool}
      toolComponent={toolComponent}
      howItWorks={content.howItWorks}
      useCases={content.useCases}
      faq={content.faq}
    />
  );
}
