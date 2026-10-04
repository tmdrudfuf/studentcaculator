import { describe, expect, it } from "vitest";

import { categories, getCategory, getTool, getToolsByCategory, tools } from "@/data/tools";

describe("tool registry", () => {
  it("contains the four product categories", () => {
    expect(categories.map((category) => category.slug)).toEqual([
      "grades",
      "planning",
      "study",
      "writing",
    ]);
  });

  it("contains all twelve tools with unique slugs and hrefs", () => {
    expect(tools).toHaveLength(12);
    expect(new Set(tools.map((tool) => tool.slug))).toHaveLength(12);
    expect(new Set(tools.map((tool) => tool.href))).toHaveLength(12);
    expect(tools.filter((tool) => tool.status === "available")).toHaveLength(8);
    expect(tools.filter((tool) => tool.status === "planned")).toHaveLength(4);
  });

  it("resolves tools and categories from the central registry", () => {
    expect(getCategory("grades").name).toBe("Grades");
    expect(getToolsByCategory("writing")).toHaveLength(2);
    expect(getTool("word-counter")?.category).toBe("writing");
  });
});
