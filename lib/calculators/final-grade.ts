import type { FinalGradeInput, FinalGradeResult } from "@/types/calculator";

const scenarioScores = [0, 25, 50, 75, 100] as const;

export function calculateFinalGrade(input: FinalGradeInput): FinalGradeResult {
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
