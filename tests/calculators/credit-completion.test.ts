import { describe, expect, it } from "vitest";

import { calculateCreditCompletion } from "@/lib/calculators/credit-completion";

describe("calculateCreditCompletion", () => {
  it("calculates progress and remaining credits", () => {
    expect(calculateCreditCompletion({ completedCredits: 72, requiredCredits: 120 })).toEqual({
      status: "in_progress",
      completedCredits: 72,
      requiredCredits: 120,
      remainingCredits: 48,
      percentageComplete: 60,
    });
  });

  it("allows completed credits above the requirement", () => {
    const result = calculateCreditCompletion({ completedCredits: 126, requiredCredits: 120 });
    expect(result.status).toBe("complete");
    expect(result.remainingCredits).toBe(0);
    expect(result.percentageComplete).toBe(105);
  });

  it("rejects a non-positive requirement", () => {
    expect(() => calculateCreditCompletion({ completedCredits: 10, requiredCredits: 0 })).toThrow(RangeError);
  });
});
