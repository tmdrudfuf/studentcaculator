"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

import { NumberField, SubmitButton } from "@/components/forms";
import { PrimaryResult, ResultMessage } from "@/components/results";
import { tools } from "@/data/tools";
import { trackCalculationCompleted, trackCalculationError, trackCalculationStarted, trackToolViewed } from "@/lib/analytics";
import { calculateWeightedGrade } from "@/lib/calculators/weighted-grade";
import { formatPercentage } from "@/lib/format/numbers";
import { validatePercentage } from "@/lib/validation/numbers";
import type { WeightedGradeResult } from "@/types/calculator";

import { CalculatorCard } from "./CalculatorCard";

const tool = tools[2];

type CategoryInput = {
  id: string;
  name: string;
  weight: string;
  grade: string;
};

type CategoryErrors = Record<string, { weight?: string; grade?: string }>;

const initialCategories: CategoryInput[] = [
  { id: "category-1", name: "", weight: "", grade: "" },
  { id: "category-2", name: "", weight: "", grade: "" },
];

export function WeightedGradeCalculator() {
  const [categories, setCategories] = useState(initialCategories);
  const [errors, setErrors] = useState<CategoryErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [result, setResult] = useState<WeightedGradeResult | null>(null);
  const nextId = useRef(3);

  useEffect(() => trackToolViewed(tool), []);

  function updateCategory(id: string, field: keyof Omit<CategoryInput, "id">, value: string) {
    setCategories((current) =>
      current.map((category) => (category.id === id ? { ...category, [field]: value } : category)),
    );
  }

  function addCategory() {
    setCategories((current) => [
      ...current,
      { id: `category-${nextId.current++}`, name: "", weight: "", grade: "" },
    ]);
  }

  function removeCategory(id: string) {
    setCategories((current) => current.filter((category) => category.id !== id));
    setErrors((current) => {
      const nextErrors = { ...current };
      delete nextErrors[id];
      return nextErrors;
    });
    setResult(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackCalculationStarted(tool);

    const nextErrors: CategoryErrors = {};
    const parsedCategories = categories.map((category) => {
      const weight = Number(category.weight);
      const grade = Number(category.grade);
      const categoryErrors = {
        weight:
          category.weight.trim() === ""
            ? "Weight is required."
            : validatePercentage(weight, "Weight", { allowZero: false }) ?? undefined,
        grade:
          category.grade.trim() === ""
            ? "Grade is required."
            : validatePercentage(grade, "Grade") ?? undefined,
      };

      if (categoryErrors.weight || categoryErrors.grade) {
        nextErrors[category.id] = categoryErrors;
      }

      return { id: category.id, name: category.name, weight, grade };
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFormError(null);
      setResult(null);
      trackCalculationError(tool, "validation_error");
      return;
    }

    const totalWeight = parsedCategories.reduce((sum, category) => sum + category.weight, 0);

    if (totalWeight > 100) {
      setErrors({});
      setFormError("Combined category weights cannot exceed 100%.");
      setResult(null);
      trackCalculationError(tool, "weight_over_100");
      return;
    }

    const nextResult = calculateWeightedGrade(parsedCategories);
    setErrors({});
    setFormError(null);
    setResult(nextResult);
    trackCalculationCompleted(tool, totalWeight === 100 ? "complete_weight" : "partial_weight");
  }

  return (
    <CalculatorCard
      description="Add the grade and course weight for each category you know. Partial course weights are supported."
      title="Calculate your weighted grade"
    >
      <form noValidate onSubmit={handleSubmit}>
        <div className="space-y-5">
          {categories.map((category, index) => (
            <fieldset className="rounded-2xl border border-gray-200 p-4 sm:p-5" key={category.id}>
              <legend className="px-1 font-bold text-gray-900">Category {index + 1}</legend>
              <div className="flex justify-end">
                {categories.length > 1 ? (
                  <button
                    className="rounded-md text-sm font-bold text-red-700 hover:text-red-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                    onClick={() => removeCategory(category.id)}
                    type="button"
                  >
                    Remove
                  </button>
                ) : null}
              </div>
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-950" htmlFor={`${category.id}-name`}>
                    Category name <span className="font-normal text-gray-500">(optional)</span>
                  </label>
                  <input
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-950 outline-hidden transition focus:border-gray-950 focus:ring-4 focus:ring-gray-950/10"
                    id={`${category.id}-name`}
                    onChange={(event) => updateCategory(category.id, "name", event.target.value)}
                    placeholder="Homework"
                    type="text"
                    value={category.name}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <NumberField
                    error={errors[category.id]?.weight}
                    id={`${category.id}-weight`}
                    inputMode="decimal"
                    label="Course weight"
                    max={100}
                    min={0}
                    onChange={(event) => updateCategory(category.id, "weight", event.target.value)}
                    placeholder="30"
                    step="any"
                    suffix="%"
                    value={category.weight}
                  />
                  <NumberField
                    error={errors[category.id]?.grade}
                    id={`${category.id}-grade`}
                    inputMode="decimal"
                    label="Category grade"
                    max={100}
                    min={0}
                    onChange={(event) => updateCategory(category.id, "grade", event.target.value)}
                    placeholder="92"
                    step="any"
                    suffix="%"
                    value={category.grade}
                  />
                </div>
              </div>
            </fieldset>
          ))}
        </div>

        <button
          className="mt-5 inline-flex h-10 items-center rounded-xl border border-gray-200 px-4 text-sm font-medium text-gray-950 transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-950"
          onClick={addCategory}
          type="button"
        >
          + Add category
        </button>

        {formError ? (
          <div className="mt-5">
            <ResultMessage tone="warning">{formError}</ResultMessage>
          </div>
        ) : null}

        <div className="mt-6">
          <SubmitButton className="w-full sm:w-auto">Calculate weighted grade</SubmitButton>
        </div>
      </form>

      <div aria-live="polite">
        {result ? (
          <div className="mt-8 space-y-4" data-testid="weighted-grade-result">
            <PrimaryResult
              eyebrow="Your normalized current grade"
              explanation={`Based on ${formatPercentage(result.totalWeight)} of your course.`}
              value={formatPercentage(result.normalizedGrade)}
            />
            <ResultMessage>
              Entered categories contribute {formatPercentage(result.overallContribution)} toward your final
              course grade.
            </ResultMessage>
          </div>
        ) : null}
      </div>
    </CalculatorCard>
  );
}
