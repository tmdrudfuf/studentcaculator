"use client";

import { type FormEvent, useEffect, useState } from "react";

import { NumberField, SubmitButton } from "@/components/forms";
import { PrimaryResult } from "@/components/results";
import { tools } from "@/data/tools";
import { trackCalculationCompleted, trackCalculationError, trackCalculationStarted, trackToolViewed } from "@/lib/analytics";
import { calculateGradePercentage } from "@/lib/calculators/grade-percentage";
import { formatNumber, formatPercentage } from "@/lib/format/numbers";
import { validateNonNegativeNumber, validatePositiveNumber } from "@/lib/validation/numbers";
import type { GradePercentageResult } from "@/types/calculator";

import { CalculatorCard } from "./CalculatorCard";

const tool = tools[1];

export function GradePercentageCalculator() {
  const [earnedPoints, setEarnedPoints] = useState("");
  const [totalPoints, setTotalPoints] = useState("");
  const [errors, setErrors] = useState<{ earnedPoints?: string; totalPoints?: string }>({});
  const [result, setResult] = useState<GradePercentageResult | null>(null);

  useEffect(() => trackToolViewed(tool), []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackCalculationStarted(tool);

    const earned = Number(earnedPoints);
    const total = Number(totalPoints);
    const nextErrors = {
      earnedPoints:
        earnedPoints.trim() === ""
          ? "Points earned is required."
          : validateNonNegativeNumber(earned, "Points earned") ?? undefined,
      totalPoints:
        totalPoints.trim() === ""
          ? "Total points is required."
          : validatePositiveNumber(total, "Total points") ?? undefined,
    };

    if (nextErrors.earnedPoints || nextErrors.totalPoints) {
      setErrors(nextErrors);
      setResult(null);
      trackCalculationError(tool, "validation_error");
      return;
    }

    const nextResult = calculateGradePercentage({ earnedPoints: earned, totalPoints: total });
    setErrors({});
    setResult(nextResult);
    trackCalculationCompleted(tool, "success");
  }

  return (
    <CalculatorCard
      description="Enter the points you earned and the total points possible. Extra credit above the total is supported."
      title="Calculate a grade percentage"
    >
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <NumberField
          error={errors.earnedPoints}
          id="earned-points"
          inputMode="decimal"
          label="Points earned"
          min={0}
          onChange={(event) => setEarnedPoints(event.target.value)}
          placeholder="45"
          step="any"
          value={earnedPoints}
        />
        <NumberField
          error={errors.totalPoints}
          id="total-points"
          inputMode="decimal"
          label="Total points possible"
          min={0}
          onChange={(event) => setTotalPoints(event.target.value)}
          placeholder="50"
          step="any"
          value={totalPoints}
        />
        <SubmitButton className="w-full sm:w-auto">Calculate percentage</SubmitButton>
      </form>

      {result ? (
        <div className="mt-8" data-testid="grade-percentage-result">
          <PrimaryResult
            eyebrow="Your grade"
            explanation={`${formatNumber(result.earnedPoints)} out of ${formatNumber(result.totalPoints)} points`}
            value={formatPercentage(result.percentage)}
          />
        </div>
      ) : null}
    </CalculatorCard>
  );
}
