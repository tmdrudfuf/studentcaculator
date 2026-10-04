import { describe, expect, it } from "vitest";

import { calculateWeightedGrade } from "@/lib/calculators/weighted-grade";

describe("calculateWeightedGrade", () => {
  it("calculates categories totaling exactly 100%", () => {
    const result = calculateWeightedGrade([
      { id: "homework", weight: 40, grade: 90 },
      { id: "exams", weight: 60, grade: 80 },
    ]);

    expect(result.normalizedGrade).toBe(84);
    expect(result.overallContribution).toBe(84);
    expect(result.totalWeight).toBe(100);
  });

  it("normalizes partial course weights", () => {
    const result = calculateWeightedGrade([
      { id: "homework", weight: 25, grade: 80 },
      { id: "quiz", weight: 25, grade: 100 },
    ]);

    expect(result.normalizedGrade).toBe(90);
    expect(result.overallContribution).toBe(45);
    expect(result.totalWeight).toBe(50);
  });

  it("preserves decimal precision", () => {
    const result = calculateWeightedGrade([
      { id: "labs", weight: 33.3, grade: 91.75 },
      { id: "project", weight: 26.7, grade: 87.25 },
    ]);

    expect(result.normalizedGrade).toBeCloseTo(89.7475, 8);
    expect(result.overallContribution).toBeCloseTo(53.8485, 8);
  });
});
