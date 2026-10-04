import type { MetadataRoute } from "next";

import { categories, tools } from "@/data/tools";
import { siteConfig } from "@/lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...categories.map((category) => category.href),
    ...tools.map((tool) => tool.href),
    "/about",
    "/privacy",
    "/contact",
  ];

  return paths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.8 : 0.7,
  }));
}
