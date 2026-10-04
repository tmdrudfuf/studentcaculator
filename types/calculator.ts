export type FieldError<Field extends string = string> = {
  field: Field;
  message: string;
};

export type FinalGradeInput = {
  currentGrade: number;
  finalWeight: number;
  desiredGrade: number;
};

export type FinalGradeScenario = {
  examScore: number;
  courseGrade: number;
};

export type FinalGradeResult = {
  status: "reachable" | "already_secured" | "impossible";
  requiredScore: number | null;
  maximumPossibleGrade: number;
  minimumPossibleGrade: number;
  scenarios: FinalGradeScenario[];
};

export type GradePercentageInput = {
  earnedPoints: number;
  totalPoints: number;
};

export type GradePercentageResult = {
  percentage: number;
  earnedPoints: number;
  totalPoints: number;
};

export type GradeCategory = {
  id: string;
  name?: string;
  weight: number;
  grade: number;
};

export type WeightedGradeResult = {
  normalizedGrade: number;
  overallContribution: number;
  totalWeight: number;
};
