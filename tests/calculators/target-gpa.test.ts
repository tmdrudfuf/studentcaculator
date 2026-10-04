import { describe, expect, it } from "vitest";

import { calculateTargetGpa } from "@/lib/calculators/target-gpa";

describe("calculateTargetGpa", () => {
  it("calculates a reachable target", () => {
    const result = calculateTargetGpa({ currentGpa: 3, completedCredits: 60, targetGpa: 3.1, upcomingCredits: 30 });
    expect(result.status).toBe("reachable");
    expect(result.requiredGpa).toBeCloseTo(3.3, 10);
  });

  it("reports an impossible target and maximum result", () => {
    const result = calculateTargetGpa({ currentGpa: 3, completedCredits: 60, targetGpa: 3.5, upcomingCredits: 15 });
    expect(result.status).toBe("impossible");
    expect(result.maximumPossibleGpa).toBeCloseTo(3.2, 10);
    expect(result.estimatedCreditsNeededAtMaxGpa).toBeCloseTo(60, 10);
  });

  it("reports a target already reached", () => {
    const result = calculateTargetGpa({ currentGpa: 3.5, completedCredits: 60, targetGpa: 3.4, upcomingCredits: 15 });
    expect(result.status).toBe("already_reached");
    expect(result.requiredGpa).toBeNull();
  });

  it("allows an exact 4.0 requirement", () => {
    const result = calculateTargetGpa({ currentGpa: 3, completedCredits: 60, targetGpa: 3.2, upcomingCredits: 15 });
    expect(result.status).toBe("reachable");
    expect(result.requiredGpa).toBeCloseTo(4, 10);
  });

  it("rejects zero upcoming credits", () => {
    expect(() => calculateTargetGpa({ currentGpa: 3, completedCredits: 60, targetGpa: 3.2, upcomingCredits: 0 })).toThrow(RangeError);
  });
});
