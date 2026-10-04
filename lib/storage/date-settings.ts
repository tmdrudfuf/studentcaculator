import { parseCalendarDate } from "@/lib/dates/calendar";

export const DATE_STORAGE_KEYS = {
  graduationDate: "sst:graduation-date",
  semesterEndDate: "sst:semester-end-date",
} as const;

export type DateSetting = keyof typeof DATE_STORAGE_KEYS;

export function loadDateSetting(setting: DateSetting): string | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(DATE_STORAGE_KEYS[setting]);
  return value && parseCalendarDate(value) ? value : null;
}

export function saveDateSetting(setting: DateSetting, value: string): void {
  if (typeof window === "undefined" || !parseCalendarDate(value)) return;
  window.localStorage.setItem(DATE_STORAGE_KEYS[setting], value);
}
