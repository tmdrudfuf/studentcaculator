import type { StudyTimeInput, StudyTimeResult } from "@/types/calculator";

export function calculateStudyTime(input: StudyTimeInput): StudyTimeResult {
  if (input.totalMinutes <= 0 || input.daysAvailable <= 0) {
    throw new RangeError("Study time and available days must be greater than 0.");
  }

  return {
    daysAvailable: input.daysAvailable,
    totalMinutes: input.totalMinutes,
    minutesPerDay: input.totalMinutes / input.daysAvailable,
  };
}
