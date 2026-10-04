import type { ReadingTimeResult } from "@/types/calculator";

export function calculateReadingTime(wordCount: number, wordsPerMinute: number): ReadingTimeResult {
  if (wordCount < 0 || wordsPerMinute <= 0) {
    throw new RangeError("Word count and reading speed are invalid.");
  }

  return {
    wordCount,
    wordsPerMinute,
    minutes: wordCount / wordsPerMinute,
  };
}
