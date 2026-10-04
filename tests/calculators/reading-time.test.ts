import { describe, expect, it } from "vitest";

import { calculateReadingTime } from "@/lib/calculators/reading-time";

describe("calculateReadingTime", () => {
  it("calculates reading minutes from words and pace", () => {
    expect(calculateReadingTime(1000, 200)).toEqual({ wordCount: 1000, wordsPerMinute: 200, minutes: 5 });
  });

  it("preserves fractional minutes", () => {
    expect(calculateReadingTime(150, 200).minutes).toBe(0.75);
  });

  it("rejects invalid speed", () => {
    expect(() => calculateReadingTime(100, 0)).toThrow(RangeError);
  });
});
