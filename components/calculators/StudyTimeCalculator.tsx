"use client";

import { type FormEvent, useEffect, useState } from "react";

import { NumberField, SubmitButton } from "@/components/forms";
import { PrimaryResult, ResultMessage } from "@/components/results";
import { getRequiredTool } from "@/data/tools";
import { trackCalculationCompleted, trackCalculationError, trackCalculationStarted, trackToolViewed } from "@/lib/analytics";
import { calculateStudyTime } from "@/lib/calculators/study-time";
import { formatDuration, formatNumber } from "@/lib/format/numbers";
import { validatePositiveNumber } from "@/lib/validation/numbers";
import type { StudyTimeResult } from "@/types/calculator";

import { CalculatorCard } from "./CalculatorCard";

const tool = getRequiredTool("study-time-calculator");

export function StudyTimeCalculator() {
  const [totalHours, setTotalHours] = useState("");
  const [daysAvailable, setDaysAvailable] = useState("");
  const [errors, setErrors] = useState<{ hours?: string; days?: string }>({});
  const [result, setResult] = useState<StudyTimeResult | null>(null);

  useEffect(() => trackToolViewed(tool), []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackCalculationStarted(tool);
    const hours = Number(totalHours);
    const days = Number(daysAvailable);
    const nextErrors = {
      hours: totalHours ? validatePositiveNumber(hours, "Total study time") ?? undefined : "Total study time is required.",
      days: daysAvailable ? validatePositiveNumber(days, "Days available") ?? undefined : "Days available is required.",
    };

    if (nextErrors.hours || nextErrors.days) {
      setErrors(nextErrors);
      setResult(null);
      trackCalculationError(tool, "validation_error");
      return;
    }

    const nextResult = calculateStudyTime({ totalMinutes: hours * 60, daysAvailable: days });
    setErrors({});
    setResult(nextResult);
    trackCalculationCompleted(tool, "success");
  }

  return (
    <CalculatorCard description="Divide a total study goal into a manageable daily target." title="Plan your daily study time">
      <form className="grid gap-5 sm:grid-cols-2" noValidate onSubmit={handleSubmit}>
        <NumberField error={errors.hours} id="total-study-hours" label="Total study time" min={0} onChange={(e) => setTotalHours(e.target.value)} placeholder="15" step="any" suffix="hours" value={totalHours} />
        <NumberField error={errors.days} id="study-days" label="Days available" min={0} onChange={(e) => setDaysAvailable(e.target.value)} placeholder="10" step="any" suffix="days" value={daysAvailable} />
        <div className="sm:col-span-2"><SubmitButton className="w-full sm:w-auto">Create study plan</SubmitButton></div>
      </form>
      {result ? (
        <div className="mt-8 space-y-4" data-testid="study-time-result">
          <PrimaryResult eyebrow="Study each day" explanation={`For ${formatNumber(result.daysAvailable)} days`} value={formatDuration(result.minutesPerDay)} />
          <ResultMessage>Your total study goal is {formatDuration(result.totalMinutes)}.</ResultMessage>
        </div>
      ) : null}
    </CalculatorCard>
  );
}
