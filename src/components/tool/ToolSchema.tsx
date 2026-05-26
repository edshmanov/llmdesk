import type { Tool } from "@/lib/tools";
import { getCategoryById } from "@/lib/categories";
import { absoluteUrl } from "@/lib/utils";

export interface ToolSchemaProps {
  tool: Tool;
}

/**
 * Renders SoftwareApplication + BreadcrumbList JSON-LD for a tool page.
 * FAQPage schema is emitted separately by ToolFAQ.
 */
export function ToolSchema({ tool }: ToolSchemaProps) {
  const category = getCategoryById(tool.category);
  const url = absoluteUrl(`/${tool.slug}`);

  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.metaDescription,
    url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any (browser-based)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "llmdesk",
      url: absoluteUrl("/"),
    },
    isAccessibleForFree: true,
    browserRequirements: "Requires JavaScript.",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      ...(category
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: category.name,
              item: absoluteUrl(`/category/${category.slug}`),
            },
            { "@type": "ListItem", position: 3, name: tool.name, item: url },
          ]
        : [{ "@type": "ListItem", position: 2, name: tool.name, item: url }]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
