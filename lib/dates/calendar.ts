const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
const millisecondsPerDay = 86_400_000;

type CalendarDateParts = { year: number; month: number; day: number };

export function parseCalendarDate(value: string): CalendarDateParts | null {
  const match = datePattern.exec(value);

  if (!match) {
    return null;
  }

  const parts = { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));

  if (
    date.getUTCFullYear() !== parts.year ||
    date.getUTCMonth() !== parts.month - 1 ||
    date.getUTCDate() !== parts.day
  ) {
    return null;
  }

  return parts;
}

function toUtcDay(value: string): number {
  const parts = parseCalendarDate(value);

  if (!parts) {
    throw new RangeError("Date must be a valid calendar date in YYYY-MM-DD format.");
  }

  return Date.UTC(parts.year, parts.month - 1, parts.day);
}

export function daysBetween(startDate: string, endDate: string): number {
  return Math.round((toUtcDay(endDate) - toUtcDay(startDate)) / millisecondsPerDay);
}

export function weeksBetween(startDate: string, endDate: string): number {
  return daysBetween(startDate, endDate) / 7;
}

export function weekdaysBetween(startDate: string, endDate: string): number {
  const direction = daysBetween(startDate, endDate) >= 0 ? 1 : -1;
  let count = 0;
  let cursor = toUtcDay(startDate);
  const end = toUtcDay(endDate);

  while (cursor !== end) {
    cursor += direction * millisecondsPerDay;
    const weekday = new Date(cursor).getUTCDay();
    if (weekday !== 0 && weekday !== 6) count += direction;
  }

  return count;
}

export function isPastDate(date: string, today: string): boolean {
  return daysBetween(today, date) < 0;
}

export function formatLocalCalendarDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
