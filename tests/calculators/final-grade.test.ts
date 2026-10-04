import { describe, expect, it } from "vitest";

import { calculateFinalGrade } from "@/lib/calculators/final-grade";

describe("calculateFinalGrade", () => {
  it("calculates a reachable required score", () => {
    const result = calculateFinalGrade({ currentGrade: 86, finalWeight: 25, desiredGrade: 88 });

    expect(result.status).toBe("reachable");
    expect(result.requiredScore).toBeCloseTo(94, 10);
  });

  it("treats exactly 100 required as reachable", () => {
    const result = calculateFinalGrade({ currentGrade: 80, finalWeight: 20, desiredGrade: 84 });

    expect(result.status).toBe("reachable");
    expect(result.requiredScore).toBeCloseTo(100, 10);
  });

  it("reports an impossible target above 100 required", () => {
    const result = calculateFinalGrade({ currentGrade: 80, finalWeight: 20, desiredGrade: 85 });

    expect(result.status).toBe("impossible");
    expect(result.requiredScore).toBeNull();
    expect(result.maximumPossibleGrade).toBeCloseTo(84, 10);
  });

  it("reports a target already secured with a zero on the final", () => {
    const result = calculateFinalGrade({ currentGrade: 80, finalWeight: 20, desiredGrade: 64 });

    expect(result.status).toBe("already_secured");
    expect(result.minimumPossibleGrade).toBeCloseTo(64, 10);
  });

  it("preserves decimal precision", () => {
    const result = calculateFinalGrade({ currentGrade: 87.35, finalWeight: 32.5, desiredGrade: 89.1 });

    expect(result.requiredScore).toBeCloseTo(92.7346153846, 8);
  });

  it("supports a final worth the full course grade", () => {
    const result = calculateFinalGrade({ currentGrade: 72, finalWeight: 100, desiredGrade: 93 });

    expect(result.requiredScore).toBeCloseTo(93, 10);
    expect(result.minimumPossibleGrade).toBe(0);
    expect(result.maximumPossibleGrade).toBe(100);
  });
});
