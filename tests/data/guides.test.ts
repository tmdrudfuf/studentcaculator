import { describe, expect, it } from "vitest";

import { getGuide, guides } from "@/data/guides";
import { getTool } from "@/data/tools";

describe("guide registry", () => {
  it("contains unique, substantial guides", () => {
    expect(guides).toHaveLength(10);
    expect(new Set(guides.map((guide) => guide.slug))).toHaveLength(guides.length);

    for (const guide of guides) {
      expect(guide.sections.length).toBeGreaterThanOrEqual(4);
      expect(guide.sections.flatMap((section) => section.paragraphs).join(" ").length).toBeGreaterThan(1500);
      expect(guide.relatedTools.every((slug) => getTool(slug))).toBe(true);
      expect(guide.sources.length).toBeGreaterThan(0);
      expect(guide.sources.every((source) => source.href.startsWith("https://"))).toBe(true);
      expect(guide.publishedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(guide.reviewedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("resolves a guide by slug", () => {
    expect(getGuide("calculate-college-gpa")?.category).toBe("Grades");
  });
});
