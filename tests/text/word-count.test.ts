import { describe, expect, it } from "vitest";

import { countWords } from "@/lib/text/word-count";

describe("countWords", () => {
  it("counts words, characters, sentences, and paragraphs", () => {
    const text = "Hello world. This is a test!\n\nNext paragraph?";
    expect(countWords(text)).toEqual({
      wordCount: 8,
      characterCountWithSpaces: text.length,
      characterCountWithoutSpaces: text.replace(/\s/g, "").length,
      sentenceCount: 3,
      paragraphCount: 2,
    });
  });

  it("returns zero counts for empty whitespace", () => {
    expect(countWords("  \n ")).toMatchObject({ wordCount: 0, sentenceCount: 0, paragraphCount: 0 });
  });

  it("handles repeated whitespace efficiently", () => {
    expect(countWords("one   two\tthree").wordCount).toBe(3);
  });
});
