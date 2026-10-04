"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

import { NumberField, SubmitButton } from "@/components/forms";
import { PrimaryResult, ResultMessage } from "@/components/results";
import { gradeLetters } from "@/data/grade-scales";
import { getRequiredTool } from "@/data/tools";
import { trackCalculationCompleted, trackCalculationError, trackCalculationStarted, trackToolViewed } from "@/lib/analytics";
import { calculateSemesterGpa } from "@/lib/calculators/semester-gpa";
import { formatGpa, formatNumber } from "@/lib/format/numbers";
import { validateCredits } from "@/lib/validation/numbers";
import type { GradeLetter, SemesterGpaResult } from "@/types/calculator";

import { CalculatorCard } from "./CalculatorCard";

const tool = getRequiredTool("gpa-calculator");

type CourseInput = { id: string; name: string; credits: string; grade: GradeLetter | "" };
type CourseErrors = Record<string, { credits?: string; grade?: string }>;

const initialCourses: CourseInput[] = [
  { id: "course-1", name: "", credits: "", grade: "" },
  { id: "course-2", name: "", credits: "", grade: "" },
];

export function SemesterGpaCalculator() {
  const [courses, setCourses] = useState(initialCourses);
  const [errors, setErrors] = useState<CourseErrors>({});
  const [result, setResult] = useState<SemesterGpaResult | null>(null);
  const nextId = useRef(3);

  useEffect(() => trackToolViewed(tool), []);

  function updateCourse(id: string, patch: Partial<CourseInput>) {
    setCourses((current) => current.map((course) => (course.id === id ? { ...course, ...patch } : course)));
  }

  function addCourse() {
    setCourses((current) => [
      ...current,
      { id: `course-${nextId.current++}`, name: "", credits: "", grade: "" },
    ]);
  }

  function removeCourse(id: string) {
    setCourses((current) => current.filter((course) => course.id !== id));
    setResult(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackCalculationStarted(tool);
    const nextErrors: CourseErrors = {};

    const parsedCourses = courses.map((course) => {
      const credits = Number(course.credits);
      const courseErrors = {
        credits:
          course.credits.trim() === ""
            ? "Credits are required."
            : validateCredits(credits, "Credits") ?? undefined,
        grade: course.grade === "" ? "Grade is required." : undefined,
      };

      if (courseErrors.credits || courseErrors.grade) {
        nextErrors[course.id] = courseErrors;
      }

      return { id: course.id, name: course.name, credits, grade: course.grade as GradeLetter };
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setResult(null);
      trackCalculationError(tool, "validation_error");
      return;
    }

    const nextResult = calculateSemesterGpa(parsedCourses);
    setErrors({});
    setResult(nextResult);
    trackCalculationCompleted(tool, "success");
  }

  return (
    <CalculatorCard
      description="Add each course, its credits, and your letter grade using the standard US 4.0 scale."
      title="Calculate your semester GPA"
    >
      <form noValidate onSubmit={handleSubmit}>
        <div className="space-y-5">
          {courses.map((course, index) => (
            <fieldset className="rounded-2xl border border-slate-200 p-4 sm:p-5" key={course.id}>
              <legend className="px-1 font-extrabold text-slate-900">Course {index + 1}</legend>
              <div className="flex justify-end">
                {courses.length > 1 ? (
                  <button
                    className="text-sm font-bold text-red-700 hover:text-red-900"
                    onClick={() => removeCourse(course.id)}
                    type="button"
                  >
                    Remove
                  </button>
                ) : null}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_8rem_8rem]">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800" htmlFor={`${course.id}-name`}>
                    Course name <span className="font-normal text-slate-500">(optional)</span>
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    id={`${course.id}-name`}
                    onChange={(event) => updateCourse(course.id, { name: event.target.value })}
                    placeholder="Biology"
                    value={course.name}
                  />
                </div>
                <NumberField
                  error={errors[course.id]?.credits}
                  id={`${course.id}-credits`}
                  inputMode="decimal"
                  label="Credits"
                  min={0}
                  onChange={(event) => updateCourse(course.id, { credits: event.target.value })}
                  placeholder="3"
                  step="any"
                  value={course.credits}
                />
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800" htmlFor={`${course.id}-grade`}>
                    Grade
                  </label>
                  <select
                    aria-describedby={errors[course.id]?.grade ? `${course.id}-grade-error` : undefined}
                    aria-invalid={errors[course.id]?.grade ? true : undefined}
                    className={`w-full rounded-xl border bg-white px-3 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 ${
                      errors[course.id]?.grade ? "border-red-500" : "border-slate-300"
                    }`}
                    id={`${course.id}-grade`}
                    onChange={(event) => updateCourse(course.id, { grade: event.target.value as GradeLetter | "" })}
                    value={course.grade}
                  >
                    <option value="">Select</option>
                    {gradeLetters.map((grade) => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                  {errors[course.id]?.grade ? (
                    <p className="text-sm font-semibold text-red-700" id={`${course.id}-grade-error`} role="alert">
                      {errors[course.id]?.grade}
                    </p>
                  ) : null}
                </div>
              </div>
            </fieldset>
          ))}
        </div>
        <button className="mt-5 font-bold text-blue-700 hover:text-blue-900" onClick={addCourse} type="button">
          + Add course
        </button>
        <div className="mt-6">
          <SubmitButton className="w-full sm:w-auto">Calculate semester GPA</SubmitButton>
        </div>
      </form>

      {result ? (
        <div className="mt-8 space-y-4" data-testid="semester-gpa-result">
          <PrimaryResult
            eyebrow="Your semester GPA"
            explanation={`Across ${formatNumber(result.totalCredits)} credits`}
            value={formatGpa(result.gpa)}
          />
          <ResultMessage>
            Total quality points: {formatNumber(result.qualityPoints)}. Grade scales can vary by school.
          </ResultMessage>
        </div>
      ) : null}
    </CalculatorCard>
  );
}
