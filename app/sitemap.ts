import type { MetadataRoute } from "next";

import { categories, tools } from "@/data/tools";
import { guides } from "@/data/guides";
import { siteConfig } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...categories.map((category) => category.href),
    ...tools.map((tool) => tool.href),
    "/guides",
    ...guides.map((guide) => `/guides/${guide.slug}`),
    "/about",
    "/privacy",
    "/terms",
  ];

  return paths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.8 : 0.7,
  }));
}
