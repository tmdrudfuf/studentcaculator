import type { GradeCategory, WeightedGradeResult } from "@/types/calculator";

export function calculateWeightedGrade(categories: readonly GradeCategory[]): WeightedGradeResult {
  const totalWeight = categories.reduce((sum, category) => sum + category.weight, 0);
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
