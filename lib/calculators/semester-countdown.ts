import { daysBetween, parseCalendarDate } from "@/lib/dates/calendar";
import type { GraduationCountdownResult } from "@/types/calculator";

export function calculateSemesterCountdown(
  targetDate: string,
  today: string,
): GraduationCountdownResult {
  if (!parseCalendarDate(targetDate) || !parseCalendarDate(today)) {
    throw new RangeError("Countdown dates must be valid calendar dates.");
  }

  const daysUntil = daysBetween(today, targetDate);
  return {
    status: daysUntil > 0 ? "upcoming" : daysUntil < 0 ? "past" : "today",
    daysUntil,
    targetDate,
  };
}
