import type { GradePercentageInput, GradePercentageResult } from "@/types/calculator";

export function calculateGradePercentage(input: GradePercentageInput): GradePercentageResult {
  if (input.totalPoints <= 0) {
    throw new RangeError("Total points must be greater than 0.");
  }

  return {
    percentage: (input.earnedPoints / input.totalPoints) * 100,
    earnedPoints: input.earnedPoints,
    totalPoints: input.totalPoints,
  };
}
