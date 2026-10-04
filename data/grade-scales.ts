import type { GradeLetter } from "@/types/calculator";

export const DEFAULT_GRADE_SCALE = {
  A: 4,
  "A-": 3.7,
  "B+": 3.3,
  B: 3,
  "B-": 2.7,
  "C+": 2.3,
  C: 2,
  "C-": 1.7,
  "D+": 1.3,
  D: 1,
  "D-": 0.7,
  F: 0,
} as const satisfies Record<GradeLetter, number>;

export const gradeLetters = Object.keys(DEFAULT_GRADE_SCALE) as GradeLetter[];
