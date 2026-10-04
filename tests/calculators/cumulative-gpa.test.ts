import { describe, expect, it } from "vitest";

import { calculateCumulativeGpa } from "@/lib/calculators/cumulative-gpa";

describe("calculateCumulativeGpa", () => {
  it("combines previous and semester quality points", () => {
    const result = calculateCumulativeGpa({ currentGpa: 3, completedCredits: 60, semesterGpa: 4, semesterCredits: 15 });
    expect(result.newGpa).toBeCloseTo(3.2, 10);
    expect(result.change).toBeCloseTo(0.2, 10);
    expect(result.totalCredits).toBe(75);
  });

  it("supports decimal values without intermediate rounding", () => {
    const result = calculateCumulativeGpa({ currentGpa: 3.42, completedCredits: 47.5, semesterGpa: 3.73, semesterCredits: 13.5 });
    expect(result.newGpa).toBeCloseTo(3.488606557, 8);
  });
});
