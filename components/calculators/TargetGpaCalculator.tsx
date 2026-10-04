"use client";

import { type FormEvent, useEffect, useState } from "react";

import { NumberField, SubmitButton } from "@/components/forms";
import { PrimaryResult, ResultMessage } from "@/components/results";
import { getRequiredTool } from "@/data/tools";
import { trackCalculationCompleted, trackCalculationError, trackCalculationStarted, trackToolViewed } from "@/lib/analytics";
import { calculateTargetGpa } from "@/lib/calculators/target-gpa";
import { formatGpa, formatNumber } from "@/lib/format/numbers";
import { validateCredits, validateGpa } from "@/lib/validation/numbers";
import type { TargetGpaResult } from "@/types/calculator";

import { CalculatorCard } from "./CalculatorCard";

const tool = getRequiredTool("target-gpa-calculator");
type FieldName = "currentGpa" | "completedCredits" | "targetGpa" | "upcomingCredits";

export function TargetGpaCalculator() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    currentGpa: "",
    completedCredits: "",
    targetGpa: "",
    upcomingCredits: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [result, setResult] = useState<TargetGpaResult | null>(null);

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
      targetGpa: values.targetGpa ? validateGpa(parsed.targetGpa, "Target GPA") ?? undefined : "Target GPA is required.",
      upcomingCredits: values.upcomingCredits ? validateCredits(parsed.upcomingCredits, "Upcoming credits") ?? undefined : "Upcoming credits are required.",
    };

    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      setResult(null);
      trackCalculationError(tool, "validation_error");
      return;
    }

    const nextResult = calculateTargetGpa(parsed);
    setErrors({});
    setResult(nextResult);
    trackCalculationCompleted(tool, nextResult.status);
  }

  return (
    <CalculatorCard description="See the GPA needed across your upcoming credits to reach a cumulative goal." title="Check your target GPA">
      <form className="grid gap-5 sm:grid-cols-2" noValidate onSubmit={handleSubmit}>
        <NumberField error={errors.currentGpa} id="target-current-gpa" label="Current cumulative GPA" max={4} min={0} onChange={(e) => update("currentGpa", e.target.value)} placeholder="3.0" step="any" value={values.currentGpa} />
        <NumberField error={errors.completedCredits} id="target-completed-credits" label="Completed credits" min={0} onChange={(e) => update("completedCredits", e.target.value)} placeholder="60" step="any" value={values.completedCredits} />
        <NumberField error={errors.targetGpa} id="target-gpa" label="Target cumulative GPA" max={4} min={0} onChange={(e) => update("targetGpa", e.target.value)} placeholder="3.2" step="any" value={values.targetGpa} />
        <NumberField error={errors.upcomingCredits} id="upcoming-credits" label="Upcoming credits" min={0} onChange={(e) => update("upcomingCredits", e.target.value)} placeholder="15" step="any" value={values.upcomingCredits} />
        <div className="sm:col-span-2"><SubmitButton className="w-full sm:w-auto">Check target GPA</SubmitButton></div>
      </form>

      {result ? (
        <div className="mt-8 space-y-4" data-testid="target-gpa-result">
          {result.status === "reachable" && result.requiredGpa !== null ? (
            <PrimaryResult eyebrow="GPA needed in upcoming credits" explanation="Using the standard US 4.0 scale" value={formatGpa(result.requiredGpa)} />
          ) : null}
          {result.status === "already_reached" ? (
            <ResultMessage tone="success">You have already reached this cumulative GPA target.</ResultMessage>
          ) : null}
          {result.status === "impossible" ? (
            <>
              <ResultMessage tone="warning">This target is not reachable within the upcoming credits entered.</ResultMessage>
              <PrimaryResult eyebrow="Maximum possible GPA" explanation="If you earn a 4.0 across all upcoming credits" value={formatGpa(result.maximumPossibleGpa)} />
              {result.estimatedCreditsNeededAtMaxGpa !== null ? (
                <ResultMessage>
                  You would need about {formatNumber(Math.ceil(result.estimatedCreditsNeededAtMaxGpa), 0)} total future credits at a 4.0 to reach the target.
                </ResultMessage>
              ) : null}
            </>
          ) : null}
          <p className="text-sm text-slate-500">Grade scales can vary by school.</p>
        </div>
      ) : null}
    </CalculatorCard>
  );
}
