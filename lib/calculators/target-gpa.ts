import type { TargetGpaInput, TargetGpaResult } from "@/types/calculator";

export function calculateTargetGpa(input: TargetGpaInput): TargetGpaResult {
  const maxGpa = input.maxGpa ?? 4;

  if (input.completedCredits < 0 || input.upcomingCredits <= 0 || maxGpa <= 0) {
    throw new RangeError("Credit values and maximum GPA must be valid.");
  }

  const totalCredits = input.completedCredits + input.upcomingCredits;
  const maximumPossibleGpa =
    (input.currentGpa * input.completedCredits + maxGpa * input.upcomingCredits) / totalCredits;

  if (input.currentGpa >= input.targetGpa) {
    return {
      status: "already_reached",
      requiredGpa: null,
      maximumPossibleGpa,
      estimatedCreditsNeededAtMaxGpa: 0,
    };
  }

  const requiredGpa =
    (input.targetGpa * totalCredits - input.currentGpa * input.completedCredits) /
    input.upcomingCredits;

  if (requiredGpa > maxGpa) {
    const denominator = maxGpa - input.targetGpa;
    const estimatedCreditsNeededAtMaxGpa =
      denominator > 0
        ? ((input.targetGpa - input.currentGpa) * input.completedCredits) / denominator
        : null;

    return {
      status: "impossible",
      requiredGpa: null,
      maximumPossibleGpa,
      estimatedCreditsNeededAtMaxGpa,
    };
  }

  return {
    status: "reachable",
    requiredGpa,
    maximumPossibleGpa,
    estimatedCreditsNeededAtMaxGpa: null,
  };
}
