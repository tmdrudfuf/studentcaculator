import { describe, expect, it } from "vitest";

import { calculateSemesterCountdown } from "@/lib/calculators/semester-countdown";

describe("calculateSemesterCountdown", () => {
  it("returns upcoming, today, and past states", () => {
    expect(calculateSemesterCountdown("2028-12-15", "2028-12-01").status).toBe("upcoming");
    expect(calculateSemesterCountdown("2028-12-15", "2028-12-15").status).toBe("today");
    expect(calculateSemesterCountdown("2028-12-01", "2028-12-15").status).toBe("past");
  });
});
