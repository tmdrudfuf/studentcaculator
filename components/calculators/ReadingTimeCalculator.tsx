"use client";

import { type FormEvent, useEffect, useState } from "react";

import { NumberField, SubmitButton } from "@/components/forms";
import { PrimaryResult, ResultMessage } from "@/components/results";
import { readingSpeeds, type ReadingSpeedId } from "@/data/reading-speeds";
import { getRequiredTool } from "@/data/tools";
import { trackCalculationCompleted, trackCalculationError, trackCalculationStarted, trackToolViewed } from "@/lib/analytics";
import { calculateReadingTime } from "@/lib/calculators/reading-time";
import { formatNumber } from "@/lib/format/numbers";
import { validateNonNegativeNumber } from "@/lib/validation/numbers";
import type { ReadingTimeResult } from "@/types/calculator";

import { CalculatorCard } from "./CalculatorCard";

const tool = getRequiredTool("reading-time-calculator");

export function ReadingTimeCalculator() {
  const [wordCount, setWordCount] = useState("");
  const [speedId, setSpeedId] = useState<ReadingSpeedId>("average");
  const [error, setError] = useState<string | undefined>();
  const [result, setResult] = useState<ReadingTimeResult | null>(null);

  useEffect(() => trackToolViewed(tool), []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackCalculationStarted(tool);
    const words = Number(wordCount);
    const validationError = wordCount ? validateNonNegativeNumber(words, "Word count") : "Word count is required.";

    if (validationError) {
      setError(validationError);
      setResult(null);
      trackCalculationError(tool, "validation_error");
      return;
    }

    const speed = readingSpeeds.find((item) => item.id === speedId) ?? readingSpeeds[1];
    const nextResult = calculateReadingTime(words, speed.wordsPerMinute);
    setError(undefined);
    setResult(nextResult);
    trackCalculationCompleted(tool, speed.id);
  }

  const displayedMinutes = result
    ? result.wordCount === 0
      ? 0
      : Math.max(1, Math.ceil(result.minutes))
    : 0;

  return (
    <CalculatorCard description="Enter a word count and choose a reading pace." title="Estimate reading time">
      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <NumberField error={error} id="reading-word-count" label="Word count" min={0} onChange={(e) => setWordCount(e.target.value)} placeholder="1200" step="1" value={wordCount} />
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-950" htmlFor="reading-speed">Reading speed</label>
          <select className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-hidden focus:border-gray-950 focus:ring-4 focus:ring-gray-950/10" id="reading-speed" onChange={(e) => setSpeedId(e.target.value as ReadingSpeedId)} value={speedId}>
            {readingSpeeds.map((speed) => <option key={speed.id} value={speed.id}>{speed.label} — {speed.wordsPerMinute} words/min</option>)}
          </select>
        </div>
        <SubmitButton className="w-full sm:w-auto">Estimate reading time</SubmitButton>
      </form>
      <div aria-live="polite">
        {result ? (
          <div className="mt-8 space-y-4" data-testid="reading-time-result">
            <PrimaryResult eyebrow="Estimated reading time" explanation={`At ${formatNumber(result.wordsPerMinute, 0)} words per minute`} unit="min" value={displayedMinutes} />
            <ResultMessage>This is an estimate; technical or unfamiliar material may take longer.</ResultMessage>
          </div>
        ) : null}
      </div>
    </CalculatorCard>
  );
}
