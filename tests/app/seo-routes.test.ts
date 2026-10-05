import { describe, expect, it, vi } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("SEO routes", () => {
  it("includes every public route in the sitemap", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(20);
    expect(entries.some((entry) => entry.url.endsWith("/grades/final-grade-calculator"))).toBe(true);
    expect(entries.some((entry) => entry.url.endsWith("/privacy"))).toBe(true);
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
});
