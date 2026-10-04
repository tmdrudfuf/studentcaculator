import { describe, expect, it } from "vitest";

import { calculateGraduationCountdown } from "@/lib/calculators/graduation-countdown";

describe("calculateGraduationCountdown", () => {
  it("reports an upcoming graduation", () => {
    expect(calculateGraduationCountdown("2028-05-15", "2028-05-01")).toMatchObject({ status: "upcoming", daysUntil: 14 });
  });

  it("reports graduation day", () => {
    expect(calculateGraduationCountdown("2028-05-15", "2028-05-15").status).toBe("today");
  });

  it("reports a past date", () => {
    expect(calculateGraduationCountdown("2028-05-01", "2028-05-15")).toMatchObject({ status: "past", daysUntil: -14 });
  });
});
