import { describe, expect, it } from "vitest";

import { calculateGradePercentage } from "@/lib/calculators/grade-percentage";

describe("calculateGradePercentage", () => {
  it("calculates a normal percentage", () => {
    expect(calculateGradePercentage({ earnedPoints: 45, totalPoints: 50 }).percentage).toBe(90);
  });

  it("supports decimal point values", () => {
    expect(
      calculateGradePercentage({ earnedPoints: 17.5, totalPoints: 22 }).percentage,
    ).toBeCloseTo(79.5454545, 6);
  });

  it("allows earned points above the total for extra credit", () => {
    expect(calculateGradePercentage({ earnedPoints: 55, totalPoints: 50 }).percentage).toBeCloseTo(110, 10);
  });

  it("rejects a non-positive total", () => {
    expect(() => calculateGradePercentage({ earnedPoints: 10, totalPoints: 0 })).toThrow(RangeError);
  });
});
