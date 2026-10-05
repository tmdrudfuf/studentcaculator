import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/metadata";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const isCloudflarePreview =
    process.env.CF_PAGES === "1" && process.env.CF_PAGES_BRANCH !== "main";
  const isPreview = process.env.VERCEL_ENV === "preview" || isCloudflarePreview;

  return {
    rules: isPreview
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
