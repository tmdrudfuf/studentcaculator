import { describe, expect, it } from "vitest";

import { tools } from "@/data/tools";
import { createMetadata, createToolMetadata, siteConfig } from "@/lib/seo/metadata";

describe("metadata helpers", () => {
  it("creates canonical and Open Graph metadata", () => {
    const metadata = createMetadata({
      title: "Grades Tools",
      description: "Grade helpers",
      path: "/grades",
    });

    expect(metadata.alternates?.canonical?.toString()).toBe(`${siteConfig.url}/grades`);
    expect(metadata.openGraph).toMatchObject({
      title: "Grades Tools",
      description: "Grade helpers",
      url: new URL("/grades", siteConfig.url),
    });
  });

  it("creates metadata from a tool registry entry", () => {
    const tool = tools[0];
    const metadata = createToolMetadata(tool);

    expect(metadata.title).toEqual(tool.seoTitle ? { absolute: tool.seoTitle } : tool.name);
    expect(metadata.description).toBe(tool.seoDescription ?? tool.description);
  });
});
