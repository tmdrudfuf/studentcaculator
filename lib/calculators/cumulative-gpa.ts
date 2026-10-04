import type { CumulativeGpaInput, CumulativeGpaResult } from "@/types/calculator";

export function calculateCumulativeGpa(input: CumulativeGpaInput): CumulativeGpaResult {
  if (input.completedCredits < 0 || input.semesterCredits <= 0) {
    throw new RangeError("Credit values are invalid.");
  }

  const previousQualityPoints = input.currentGpa * input.completedCredits;
  const semesterQualityPoints = input.semesterGpa * input.semesterCredits;
  const totalCredits = input.completedCredits + input.semesterCredits;
  const newGpa = (previousQualityPoints + semesterQualityPoints) / totalCredits;

  return {
    newGpa,
    previousGpa: input.currentGpa,
    change: newGpa - input.currentGpa,
    totalCredits,
  };
}
