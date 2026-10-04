import type { FinalGradeInput, FinalGradeResult } from "@/types/calculator";

const scenarioScores = [0, 25, 50, 75, 100] as const;

export function calculateFinalGrade(input: FinalGradeInput): FinalGradeResult {
  if (input.finalWeight <= 0 || input.finalWeight > 100) {
    throw new RangeError("Final exam weight must be greater than 0 and at most 100.");
  }

  const finalFraction = input.finalWeight / 100;
  const remainingFraction = 1 - finalFraction;
  const minimumPossibleGrade = input.currentGrade * remainingFraction;
  const maximumPossibleGrade = minimumPossibleGrade + 100 * finalFraction;
  const rawRequiredScore =
    (input.desiredGrade - input.currentGrade * remainingFraction) / finalFraction;

  const scenarios = scenarioScores.map((examScore) => ({
    examScore,
    courseGrade: input.currentGrade * remainingFraction + examScore * finalFraction,
  }));

  if (rawRequiredScore <= 0) {
    return {
      status: "already_secured",
      requiredScore: null,
      maximumPossibleGrade,
      minimumPossibleGrade,
      scenarios,
    };
  }

  if (rawRequiredScore > 100) {
    return {
      status: "impossible",
      requiredScore: null,
      maximumPossibleGrade,
      minimumPossibleGrade,
      scenarios,
    };
  }

  return {
    status: "reachable",
    requiredScore: rawRequiredScore,
    maximumPossibleGrade,
    minimumPossibleGrade,
    scenarios,
  };
}
