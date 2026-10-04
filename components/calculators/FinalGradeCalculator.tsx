"use client";

import { type FormEvent, useEffect, useState } from "react";

import { PercentageField, SubmitButton } from "@/components/forms";
import { PrimaryResult, ResultMessage } from "@/components/results";
import { tools } from "@/data/tools";
import { calculateFinalGrade } from "@/lib/calculators/final-grade";
import { formatPercentage } from "@/lib/format/numbers";
import {
  trackCalculationCompleted,
  trackCalculationError,
  trackCalculationStarted,
  trackToolViewed,
} from "@/lib/analytics";
import { validatePercentage } from "@/lib/validation/numbers";
import type { FinalGradeResult } from "@/types/calculator";

import { CalculatorCard } from "./CalculatorCard";

const tool = tools[0];

type FieldName = "currentGrade" | "finalWeight" | "desiredGrade";
type FieldErrors = Partial<Record<FieldName, string>>;

export function FinalGradeCalculator() {
  const [currentGrade, setCurrentGrade] = useState("");
  const [finalWeight, setFinalWeight] = useState("");
  const [desiredGrade, setDesiredGrade] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<FinalGradeResult | null>(null);

  useEffect(() => trackToolViewed(tool), []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackCalculationStarted(tool);

    const values = {
      currentGrade: Number(currentGrade),
      finalWeight: Number(finalWeight),
      desiredGrade: Number(desiredGrade),
    };
    const nextErrors: FieldErrors = {};

    if (currentGrade.trim() === "") {
      nextErrors.currentGrade = "Current grade is required.";
    } else {
      nextErrors.currentGrade = validatePercentage(values.currentGrade, "Current grade") ?? undefined;
    }

    if (finalWeight.trim() === "") {
      nextErrors.finalWeight = "Final exam weight is required.";
    } else {
      nextErrors.finalWeight =
        validatePercentage(values.finalWeight, "Final exam weight", { allowZero: false }) ?? undefined;
    }

    if (desiredGrade.trim() === "") {
      nextErrors.desiredGrade = "Desired grade is required.";
    } else {
      nextErrors.desiredGrade = validatePercentage(values.desiredGrade, "Desired grade") ?? undefined;
    }

    const activeErrors = Object.fromEntries(
      Object.entries(nextErrors).filter((entry): entry is [FieldName, string] => Boolean(entry[1])),
    );

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      setResult(null);
      trackCalculationError(tool, "validation_error");
      return;
    }

    const nextResult = calculateFinalGrade(values);
    setErrors({});
    setResult(nextResult);
    trackCalculationCompleted(tool, nextResult.status);
  }

  return (
    <CalculatorCard
      description="Enter your current course grade, the final exam weight, and the grade you want."
      title="Calculate your required final score"
    >
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <PercentageField
          autoComplete="off"
          error={errors.currentGrade}
          id="current-grade"
          label="Current grade"
          onChange={(event) => setCurrentGrade(event.target.value)}
          placeholder="86"
          value={currentGrade}
        />
        <PercentageField
          autoComplete="off"
          error={errors.finalWeight}
          id="final-weight"
          label="Final exam weight"
          onChange={(event) => setFinalWeight(event.target.value)}
          placeholder="25"
          value={finalWeight}
        />
        <PercentageField
          autoComplete="off"
          error={errors.desiredGrade}
          id="desired-grade"
          label="Desired course grade"
          onChange={(event) => setDesiredGrade(event.target.value)}
          placeholder="90"
          value={desiredGrade}
        />
        <SubmitButton className="w-full sm:w-auto">Calculate final grade</SubmitButton>
      </form>

      {result ? (
        <div className="mt-8 space-y-5" data-testid="final-grade-result">
          {result.status === "reachable" && result.requiredScore !== null ? (
            <PrimaryResult
              eyebrow="You need"
              explanation="on your final exam to reach your desired course grade."
              value={formatPercentage(result.requiredScore)}
            />
          ) : null}
          {result.status === "already_secured" ? (
            <ResultMessage tone="success">
              Your desired grade is already secured even with a 0% on the final. Your minimum possible
              course grade is {formatPercentage(result.minimumPossibleGrade)}.
            </ResultMessage>
          ) : null}
          {result.status === "impossible" ? (
            <>
              <ResultMessage tone="warning">
                This target is not reachable with the final exam alone.
              </ResultMessage>
              <PrimaryResult
                eyebrow="Maximum possible grade"
                explanation="if you score 100% on the final exam."
                value={formatPercentage(result.maximumPossibleGrade)}
              />
            </>
          ) : null}

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="bg-slate-50 px-4 py-3 text-left font-bold text-slate-800">
                Final exam scenarios
              </caption>
              <thead className="border-y border-slate-200 bg-white text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold" scope="col">Exam score</th>
                  <th className="px-4 py-3 font-semibold" scope="col">Course grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {result.scenarios.map((scenario) => (
                  <tr key={scenario.examScore}>
                    <td className="px-4 py-3">{formatPercentage(scenario.examScore)}</td>
                    <td className="px-4 py-3 font-semibold">{formatPercentage(scenario.courseGrade)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </CalculatorCard>
  );
}
