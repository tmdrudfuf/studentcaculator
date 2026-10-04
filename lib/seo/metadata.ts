import type { Metadata } from "next";

import type { ToolDefinition } from "@/types/tools";

const fallbackSiteUrl = "https://studentsurvival.tools";

export const siteConfig = {
  name: "Student Survival Tools",
  description: "Simple, private tools for grades, planning, studying, and writing.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl,
} as const;

type MetadataOptions = {
  title: string;
  description: string;
  path?: string;
};

export function createMetadata({ title, description, path = "/" }: MetadataOptions): Metadata {
  const canonical = new URL(path, siteConfig.url);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
    },
  };
}

export function createToolMetadata(tool: ToolDefinition): Metadata {
  return createMetadata({
    title: tool.name,
    description: tool.description,
    path: tool.href,
  });
}
