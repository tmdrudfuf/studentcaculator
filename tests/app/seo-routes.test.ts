import { describe, expect, it, vi } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { getRequiredTool } from "@/data/tools";
import { createToolMetadata } from "@/lib/seo/metadata";

describe("SEO routes", () => {
  it("includes every public route in the sitemap", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(33);
    expect(entries.some((entry) => entry.url.endsWith("/grades/final-grade-calculator"))).toBe(true);
    expect(entries.some((entry) => entry.url.endsWith("/privacy"))).toBe(true);
    expect(entries.some((entry) => entry.url.endsWith("/guides/calculate-college-gpa"))).toBe(true);
    expect(entries.some((entry) => entry.url.endsWith("/guides/estimate-reading-time"))).toBe(true);
    expect(entries.some((entry) => entry.url.endsWith("/methodology"))).toBe(true);
    expect(entries.some((entry) => entry.url.endsWith("/terms"))).toBe(true);
    expect(entries.some((entry) => entry.url.endsWith("/contact"))).toBe(true);
  });

  it("allows production crawling", () => {
    expect(robots().rules).toEqual({ userAgent: "*", allow: "/" });
  });

  it("blocks preview crawling", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    expect(robots().rules).toEqual({ userAgent: "*", disallow: "/" });
    vi.unstubAllEnvs();
  });

  it("blocks Cloudflare preview deployments from crawling", () => {
    vi.stubEnv("CF_PAGES", "1");
    vi.stubEnv("CF_PAGES_BRANCH", "feature/preview");
    expect(robots().rules).toEqual({ userAgent: "*", disallow: "/" });
    vi.unstubAllEnvs();
  });

  it("uses search-intent metadata for the final grade calculator", () => {
    const metadata = createToolMetadata(getRequiredTool("final-grade-calculator"));

    expect(metadata.title).toEqual({
      absolute: "Final Grade Calculator — What Grade Do I Need on My Final?",
    });
    expect(metadata.description).toContain("what grade you need on your final exam");
    expect(metadata.alternates?.canonical?.toString()).toBe(
      "https://getschoolkit.com/grades/final-grade-calculator",
    );
  });
});
