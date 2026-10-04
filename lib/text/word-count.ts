import type { WordCountResult } from "@/types/calculator";

export function countWords(text: string): WordCountResult {
  const trimmed = text.trim();
  const words = trimmed === "" ? [] : trimmed.split(/\s+/u);
  const sentences = trimmed.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/gu) ?? [];
  const paragraphs = trimmed === "" ? [] : trimmed.split(/\n\s*\n/u).filter((item) => item.trim() !== "");

  return {
    wordCount: words.length,
    characterCountWithSpaces: text.length,
    characterCountWithoutSpaces: text.replace(/\s/gu, "").length,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
  };
}
