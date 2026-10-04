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

export type GradeLetter =
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "D"
  | "D-"
  | "F";

export type CourseGrade = {
  id: string;
  name?: string;
  credits: number;
  grade: GradeLetter;
};

export type SemesterGpaResult = {
  gpa: number;
  totalCredits: number;
  qualityPoints: number;
};

export type CumulativeGpaInput = {
  currentGpa: number;
  completedCredits: number;
  semesterGpa: number;
  semesterCredits: number;
};

export type CumulativeGpaResult = {
  newGpa: number;
  previousGpa: number;
  change: number;
  totalCredits: number;
};

export type TargetGpaInput = {
  currentGpa: number;
  completedCredits: number;
  targetGpa: number;
  upcomingCredits: number;
  maxGpa?: number;
};

export type TargetGpaResult = {
  status: "reachable" | "impossible" | "already_reached";
  requiredGpa: number | null;
  maximumPossibleGpa: number;
  estimatedCreditsNeededAtMaxGpa: number | null;
};

export type CreditCompletionInput = {
  completedCredits: number;
  requiredCredits: number;
};

export type CreditCompletionResult = {
  status: "in_progress" | "complete";
  completedCredits: number;
  requiredCredits: number;
  remainingCredits: number;
  percentageComplete: number;
};

export type GraduationCountdownResult = {
  status: "upcoming" | "today" | "past";
  daysUntil: number;
  targetDate: string;
};
