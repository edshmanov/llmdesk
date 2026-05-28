import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Construction } from "lucide-react";

import { tools, getToolBySlug } from "@/lib/tools";
import { absoluteUrl } from "@/lib/utils";
import { ToolLayout } from "@/components/tool/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { getToolContent } from "@/data/tool-content";
import { ToolClientWrapper as ToolWrapper } from "./ToolClientWrapper";

export function generateStaticParams() {
  return tools.map((tool) => ({ tool: tool.slug }));
}

export const dynamicParams = false;

type Params = { tool: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  const url = absoluteUrl(`/${tool.slug}`);
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: [tool.primaryKeyword, ...tool.secondaryKeywords],
    alternates: { canonical: `/${tool.slug}` },
    openGraph: { type: "website", url, title: tool.metaTitle, description: tool.metaDescription, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: tool.name }] },
    twitter: { card: "summary_large_image", title: tool.metaTitle, description: tool.metaDescription, images: ["/og-image.png"] },
  };
}

const LIVE_TOOLS = new Set(['token-counter', 'api-cost-calculator', 'ai-json-repairer', 'system-prompt-generator', 'text-chunker']);

export default async function ToolPage({ params }: { params: Promise<Params> }) {
  const { tool: slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool
