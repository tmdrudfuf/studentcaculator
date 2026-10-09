import { describe, expect, it } from "vitest";

import { getToolContent, toolContent } from "@/data/tool-content";
import { tools } from "@/data/tools";

describe("tool SEO content", () => {
  it("provides substantial explanatory content for every registered tool", () => {
    expect(Object.keys(toolContent)).toHaveLength(tools.length);
    for (const tool of tools) {
      const content = getToolContent(tool.slug);
      expect(content.example.length).toBeGreaterThan(20);
      expect(content.formula.length).toBeGreaterThan(10);
      expect(content.overview.length).toBeGreaterThanOrEqual(2);
      expect(content.steps.length).toBeGreaterThanOrEqual(4);
      expect(content.interpretation.length).toBeGreaterThanOrEqual(2);
      expect(content.limitations.length).toBeGreaterThanOrEqual(3);
      expect(content.commonMistakes.length).toBeGreaterThanOrEqual(3);
      expect(content.faq.length).toBeGreaterThanOrEqual(4);
    }
  });
});
