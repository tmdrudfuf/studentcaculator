import type { GradePercentageInput, GradePercentageResult } from "@/types/calculator";

export function calculateGradePercentage(input: GradePercentageInput): GradePercentageResult {
  return {
    percentage: (input.earnedPoints / input.totalPoints) * 100,
    earnedPoints: input.earnedPoints,
    totalPoints: input.totalPoints,
  };
}
