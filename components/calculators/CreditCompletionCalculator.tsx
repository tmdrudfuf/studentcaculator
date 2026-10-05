"use client";

import { type FormEvent, useEffect, useState } from "react";

import { NumberField, SubmitButton } from "@/components/forms";
import { PrimaryResult, ResultMessage } from "@/components/results";
import { getRequiredTool } from "@/data/tools";
import { trackCalculationCompleted, trackCalculationError, trackCalculationStarted, trackToolViewed } from "@/lib/analytics";
import { calculateCreditCompletion } from "@/lib/calculators/credit-completion";
import { formatNumber, formatPercentage } from "@/lib/format/numbers";
import { validateCredits, validateNonNegativeNumber } from "@/lib/validation/numbers";
import type { CreditCompletionResult } from "@/types/calculator";

import { CalculatorCard } from "./CalculatorCard";

const tool = getRequiredTool("credit-completion-calculator");

export function CreditCompletionCalculator() {
  const [completedCredits, setCompletedCredits] = useState("");
  const [requiredCredits, setRequiredCredits] = useState("");
  const [errors, setErrors] = useState<{ completed?: string; required?: string }>({});
  const [result, setResult] = useState<CreditCompletionResult | null>(null);

  useEffect(() => trackToolViewed(tool), []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackCalculationStarted(tool);
    const completed = Number(completedCredits);
    const required = Number(requiredCredits);
    const nextErrors = {
      completed: completedCredits ? validateNonNegativeNumber(completed, "Completed credits") ?? undefined : "Completed credits are required.",
      required: requiredCredits ? validateCredits(required, "Required credits") ?? undefined : "Required credits are required.",
    };

    if (nextErrors.completed || nextErrors.required) {
      setErrors(nextErrors);
      setResult(null);
      trackCalculationError(tool, "validation_error");
      return;
    }

    const nextResult = calculateCreditCompletion({ completedCredits: completed, requiredCredits: required });
    setErrors({});
    setResult(nextResult);
    trackCalculationCompleted(tool, nextResult.status);
  }

  return (
    <CalculatorCard description="Compare the credits you have completed with your program requirement." title="Check your credit progress">
      <form className="grid gap-5 sm:grid-cols-2" noValidate onSubmit={handleSubmit}>
        <NumberField error={errors.completed} id="credits-completed" label="Completed credits" min={0} onChange={(e) => setCompletedCredits(e.target.value)} placeholder="72" step="any" value={completedCredits} />
        <NumberField error={errors.required} id="credits-required" label="Credits required" min={0} onChange={(e) => setRequiredCredits(e.target.value)} placeholder="120" step="any" value={requiredCredits} />
        <div className="sm:col-span-2"><SubmitButton className="w-full sm:w-auto">Check credit progress</SubmitButton></div>
      </form>
      <div aria-live="polite">
        {result ? (
          <div className="mt-8 space-y-4" data-testid="credit-completion-result">
            <PrimaryResult eyebrow="Program completed" explanation={`${formatNumber(result.completedCredits)} of ${formatNumber(result.requiredCredits)} credits`} value={formatPercentage(result.percentageComplete)} />
            {result.status === "complete" ? (
              <ResultMessage tone="success">You have met the credit total entered.</ResultMessage>
            ) : (
              <ResultMessage>You have {formatNumber(result.remainingCredits)} credits remaining.</ResultMessage>
            )}
          </div>
        ) : null}
      </div>
    </CalculatorCard>
  );
}
