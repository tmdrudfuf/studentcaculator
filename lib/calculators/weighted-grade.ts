import type { GradeCategory, WeightedGradeResult } from "@/types/calculator";

export function calculateWeightedGrade(categories: readonly GradeCategory[]): WeightedGradeResult {
  const totalWeight = categories.reduce((sum, category) => sum + category.weight, 0);

  if (totalWeight <= 0 || totalWeight > 100) {
    throw new RangeError("Combined category weights must be greater than 0 and at most 100.");
  }

  const overallContribution = categories.reduce(
    (sum, category) => sum + (category.weight / 100) * category.grade,
    0,
  );

  return {
    normalizedGrade: overallContribution / (totalWeight / 100),
    overallContribution,
    totalWeight,
  };
}
