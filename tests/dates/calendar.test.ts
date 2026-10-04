import { describe, expect, it } from "vitest";

import { daysBetween, isPastDate, parseCalendarDate, weekdaysBetween, weeksBetween } from "@/lib/dates/calendar";

describe("calendar date utilities", () => {
  it("handles the same day", () => {
    expect(daysBetween("2028-05-01", "2028-05-01")).toBe(0);
  });

  it("handles future and past dates", () => {
    expect(daysBetween("2028-05-01", "2028-05-11")).toBe(10);
    expect(daysBetween("2028-05-11", "2028-05-01")).toBe(-10);
    expect(isPastDate("2028-05-01", "2028-05-11")).toBe(true);
  });

  it("handles leap years and month boundaries", () => {
    expect(daysBetween("2028-02-28", "2028-03-01")).toBe(2);
    expect(daysBetween("2027-02-28", "2027-03-01")).toBe(1);
  });

  it("calculates weeks and weekdays", () => {
    expect(weeksBetween("2028-05-01", "2028-05-15")).toBe(2);
    expect(weekdaysBetween("2028-05-01", "2028-05-08")).toBe(5);
  });

  it("rejects impossible dates", () => {
    expect(parseCalendarDate("2028-02-30")).toBeNull();
    expect(() => daysBetween("not-a-date", "2028-01-01")).toThrow(RangeError);
  });
});
