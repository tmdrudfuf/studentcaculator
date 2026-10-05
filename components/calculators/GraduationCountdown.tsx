"use client";

import { type FormEvent, useEffect, useState } from "react";

import { DateField, SubmitButton } from "@/components/forms";
import { PrimaryResult, ResultMessage } from "@/components/results";
import { getRequiredTool } from "@/data/tools";
import { trackCalculationCompleted, trackCalculationError, trackCalculationStarted, trackToolViewed } from "@/lib/analytics";
import { calculateGraduationCountdown } from "@/lib/calculators/graduation-countdown";
import { formatLocalCalendarDate, parseCalendarDate } from "@/lib/dates/calendar";
import { formatNumber } from "@/lib/format/numbers";
import { loadDateSetting, saveDateSetting } from "@/lib/storage/date-settings";
import type { GraduationCountdownResult } from "@/types/calculator";

import { CalculatorCard } from "./CalculatorCard";

const tool = getRequiredTool("graduation-countdown");

export function GraduationCountdown() {
  const [graduationDate, setGraduationDate] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [result, setResult] = useState<GraduationCountdownResult | null>(null);

  useEffect(() => {
    trackToolViewed(tool);
    const savedDate = loadDateSetting("graduationDate");
    if (!savedDate) return;

    const hydrationTimer = window.setTimeout(() => setGraduationDate(savedDate), 0);
    return () => window.clearTimeout(hydrationTimer);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackCalculationStarted(tool);

    if (!parseCalendarDate(graduationDate)) {
      setError("Choose a valid graduation date.");
      setResult(null);
      trackCalculationError(tool, "validation_error");
      return;
    }

    const today = formatLocalCalendarDate(new Date());
    const nextResult = calculateGraduationCountdown(graduationDate, today);
    saveDateSetting("graduationDate", graduationDate);
    setError(undefined);
    setResult(nextResult);
    trackCalculationCompleted(tool, nextResult.status);
  }

  return (
    <CalculatorCard description="Choose your graduation date. It stays saved only in this browser." title="Count down to graduation">
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <DateField error={error} id="graduation-date" label="Graduation date" onChange={(e) => setGraduationDate(e.target.value)} value={graduationDate} />
        <SubmitButton className="w-full sm:w-auto">Start countdown</SubmitButton>
      </form>
      <div aria-live="polite">
        {result ? (
          <div className="mt-8 space-y-4" data-testid="graduation-countdown-result">
            {result.status === "upcoming" ? (
              <PrimaryResult eyebrow="Time until graduation" explanation={`About ${formatNumber(result.daysUntil / 7, 1)} weeks`} unit="days" value={formatNumber(result.daysUntil, 0)} />
            ) : null}
            {result.status === "today" ? (
              <ResultMessage tone="success">Graduation day is here. Congratulations!</ResultMessage>
            ) : null}
            {result.status === "past" ? (
              <ResultMessage tone="warning">That graduation date was {formatNumber(Math.abs(result.daysUntil), 0)} days ago.</ResultMessage>
            ) : null}
            <p className="text-sm text-gray-500">Your date is stored locally and is never sent with analytics.</p>
          </div>
        ) : null}
      </div>
    </CalculatorCard>
  );
}
