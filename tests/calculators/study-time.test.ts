import { describe, expect, it } from "vitest";

import { calculateStudyTime } from "@/lib/calculators/study-time";

describe("calculateStudyTime", () => {
  it("calculates raw minutes per day", () => {
    expect(calculateStudyTime({ totalMinutes: 900, daysAvailable: 10 })).toEqual({
      daysAvailable: 10,
      totalMinutes: 900,
      minutesPerDay: 90,
    });
  });

  it("keeps fractional minutes without intermediate rounding", () => {
    expect(calculateStudyTime({ totalMinutes: 100, daysAvailable: 3 }).minutesPerDay).toBeCloseTo(33.333333, 5);
  });

  it("rejects non-positive inputs", () => {
    expect(() => calculateStudyTime({ totalMinutes: 60, daysAvailable: 0 })).toThrow(RangeError);
  });
});
