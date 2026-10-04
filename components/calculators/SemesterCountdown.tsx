"use client";

import { type FormEvent, useEffect, useState } from "react";

import { DateField, SubmitButton } from "@/components/forms";
import { PrimaryResult, ResultMessage } from "@/components/results";
import { getRequiredTool } from "@/data/tools";
import { trackCalculationCompleted, trackCalculationError, trackCalculationStarted, trackToolViewed } from "@/lib/analytics";
import { calculateSemesterCountdown } from "@/lib/calculators/semester-countdown";
import { formatLocalCalendarDate, parseCalendarDate, weekdaysBetween } from "@/lib/dates/calendar";
import { formatNumber } from "@/lib/format/numbers";
import { loadDateSetting, saveDateSetting } from "@/lib/storage/date-settings";
import type { GraduationCountdownResult } from "@/types/calculator";

import { CalculatorCard } from "./CalculatorCard";

const tool = getRequiredTool("semester-countdown");

export function SemesterCountdown() {
  const [semesterEndDate, setSemesterEndDate] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [result, setResult] = useState<GraduationCountdownResult | null>(null);
  const [weekdays, setWeekdays] = useState<number | null>(null);

  useEffect(() => {
    trackToolViewed(tool);
    const savedDate = loadDateSetting("semesterEndDate");
    if (!savedDate) return;
    const timer = window.setTimeout(() => setSemesterEndDate(savedDate), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackCalculationStarted(tool);

    if (!parseCalendarDate(semesterEndDate)) {
      setError("Choose a valid semester end date.");
      setResult(null);
      trackCalculationError(tool, "validation_error");
      return;
    }

    const today = formatLocalCalendarDate(new Date());
    const nextResult = calculateSemesterCountdown(semesterEndDate, today);
    saveDateSetting("semesterEndDate", semesterEndDate);
    setError(undefined);
    setResult(nextResult);
    setWeekdays(nextResult.status === "upcoming" ? weekdaysBetween(today, semesterEndDate) : null);
    trackCalculationCompleted(tool, nextResult.status);
  }

  return (
    <CalculatorCard description="Track the calendar and weekdays remaining until your semester ends." title="Count down the semester">
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <DateField error={error} id="semester-end-date" label="Semester end date" onChange={(e) => setSemesterEndDate(e.target.value)} value={semesterEndDate} />
        <SubmitButton className="w-full sm:w-auto">Start semester countdown</SubmitButton>
      </form>
      {result ? (
        <div className="mt-8 space-y-4" data-testid="semester-countdown-result">
          {result.status === "upcoming" ? (
            <PrimaryResult eyebrow="Time left this semester" explanation={`${formatNumber(weekdays ?? 0, 0)} weekdays remain`} unit="days" value={formatNumber(result.daysUntil, 0)} />
          ) : null}
          {result.status === "today" ? <ResultMessage tone="success">The semester ends today.</ResultMessage> : null}
          {result.status === "past" ? <ResultMessage tone="warning">That semester end date has passed.</ResultMessage> : null}
          <p className="text-sm text-slate-500">Your date is stored only in this browser.</p>
        </div>
      ) : null}
    </CalculatorCard>
  );
}
