import { DEFAULT_GRADE_SCALE } from "@/data/grade-scales";
import type { CourseGrade, SemesterGpaResult } from "@/types/calculator";

export function calculateSemesterGpa(courses: readonly CourseGrade[]): SemesterGpaResult {
  if (courses.length === 0 || courses.some((course) => course.credits <= 0)) {
    throw new RangeError("Every course must have credits greater than 0.");
  }

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const qualityPoints = courses.reduce(
    (sum, course) => sum + DEFAULT_GRADE_SCALE[course.grade] * course.credits,
    0,
  );

  return {
    gpa: qualityPoints / totalCredits,
    totalCredits,
    qualityPoints,
  };
}
