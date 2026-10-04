import { describe, expect, it } from "vitest";

import { calculateSemesterGpa } from "@/lib/calculators/semester-gpa";

describe("calculateSemesterGpa", () => {
  it("calculates one course", () => {
    const result = calculateSemesterGpa([{ id: "1", credits: 3, grade: "A" }]);
    expect(result).toEqual({ gpa: 4, totalCredits: 3, qualityPoints: 12 });
  });

  it("weights multiple courses by credits", () => {
    const result = calculateSemesterGpa([
      { id: "1", credits: 4, grade: "A" },
      { id: "2", credits: 3, grade: "B+" },
      { id: "3", credits: 1, grade: "F" },
    ]);
    expect(result.gpa).toBeCloseTo(3.2375, 10);
    expect(result.totalCredits).toBe(8);
  });

  it("supports decimal credits", () => {
    const result = calculateSemesterGpa([
      { id: "1", credits: 1.5, grade: "A-" },
      { id: "2", credits: 2.5, grade: "B" },
    ]);
    expect(result.gpa).toBeCloseTo(3.2625, 10);
  });

  it("rejects zero-credit courses", () => {
    expect(() => calculateSemesterGpa([{ id: "1", credits: 0, grade: "A" }])).toThrow(RangeError);
  });
});
