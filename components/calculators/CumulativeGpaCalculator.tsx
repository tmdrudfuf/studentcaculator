"use client";

import { type FormEvent, useEffect, useState } from "react";

import { NumberField, SubmitButton } from "@/components/forms";
import { PrimaryResult, ResultMessage } from "@/components/results";
import { getRequiredTool } from "@/data/tools";
import { trackCalculationCompleted, trackCalculationError, trackCalculationStarted, trackToolViewed } from "@/lib/analytics";
import { calculateCumulativeGpa } from "@/lib/calculators/cumulative-gpa";
import { formatGpa, formatNumber } from "@/lib/format/numbers";
import { validateCredits, validateGpa } from "@/lib/validation/numbers";
import type { CumulativeGpaResult } from "@/types/calculator";

import { CalculatorCard } from "./CalculatorCard";

const tool = getRequiredTool("cumulative-gpa-calculator");
type FieldName = "currentGpa" | "completedCredits" | "semesterGpa" | "semesterCredits";

export function CumulativeGpaCalculator() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    currentGpa: "",
    completedCredits: "",
    semesterGpa: "",
    semesterCredits: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [result, setResult] = useState<CumulativeGpaResult | null>(null);

  useEffect(() => trackToolViewed(tool), []);

  function update(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackCalculationStarted(tool);
    const parsed = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)])) as Record<FieldName, number>;
    const nextErrors: Partial<Record<FieldName, string>> = {
      currentGpa: values.currentGpa ? validateGpa(parsed.currentGpa, "Current GPA") ?? undefined : "Current GPA is required.",
      completedCredits: values.completedCredits ? validateCredits(parsed.completedCredits, "Completed credits") ?? undefined : "Completed credits are required.",
      semesterGpa: values.semesterGpa ? validateGpa(parsed.semesterGpa, "Semester GPA") ?? undefined : "Semester GPA is required.",
      semesterCredits: values.semesterCredits ? validateCredits(parsed.semesterCredits, "Semester credits") ?? undefined : "Semester credits are required.",
    };

    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      setResult(null);
      trackCalculationError(tool, "validation_error");
      return;
    }

    const nextResult = calculateCumulativeGpa(parsed);
    setErrors({});
    setResult(nextResult);
    trackCalculationCompleted(tool, nextResult.change >= 0 ? "increased" : "decreased");
  }

  return (
    <CalculatorCard description="Combine your existing academic record with a semester GPA estimate." title="Calculate your new cumulative GPA">
      <form className="grid gap-5 sm:grid-cols-2" noValidate onSubmit={handleSubmit}>
        <NumberField error={errors.currentGpa} id="current-gpa" label="Current cumulative GPA" max={4} min={0} onChange={(e) => update("currentGpa", e.target.value)} placeholder="3.25" step="any" value={values.currentGpa} />
        <NumberField error={errors.completedCredits} id="completed-credits" label="Completed credits" min={0} onChange={(e) => update("completedCredits", e.target.value)} placeholder="60" step="any" value={values.completedCredits} />
        <NumberField error={errors.semesterGpa} id="semester-gpa" label="This semester's GPA" max={4} min={0} onChange={(e) => update("semesterGpa", e.target.value)} placeholder="3.7" step="any" value={values.semesterGpa} />
        <NumberField error={errors.semesterCredits} id="semester-credits" label="This semester's credits" min={0} onChange={(e) => update("semesterCredits", e.target.value)} placeholder="15" step="any" value={values.semesterCredits} />
        <div className="sm:col-span-2"><SubmitButton className="w-full sm:w-auto">Calculate cumulative GPA</SubmitButton></div>
      </form>
      {result ? (
        <div className="mt-8 space-y-4" data-testid="cumulative-gpa-result">
          <PrimaryResult eyebrow="Your new cumulative GPA" explanation={`After ${formatNumber(result.totalCredits)} total credits`} value={formatGpa(result.newGpa)} />
          <ResultMessage tone={result.change >= 0 ? "success" : "warning"}>
            Change from your previous GPA: {result.change >= 0 ? "+" : ""}{formatGpa(result.change)}
          </ResultMessage>
        </div>
      ) : null}
    </CalculatorCard>
  );
}
