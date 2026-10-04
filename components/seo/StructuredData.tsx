import { siteConfig } from "@/lib/seo/metadata";
import type { ToolDefinition } from "@/types/tools";

export function WebsiteStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return <script type="application/ld+json">{JSON.stringify(data).replace(/</g, "\\u003c")}</script>;
}

export function BreadcrumbStructuredData({ tool }: { tool: ToolDefinition }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: tool.category,
        item: new URL(`/${tool.category}`, siteConfig.url).toString(),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: new URL(tool.href, siteConfig.url).toString(),
      },
    ],
  };

  return <script type="application/ld+json">{JSON.stringify(data).replace(/</g, "\\u003c")}</script>;
}
