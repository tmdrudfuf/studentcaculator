"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { TextAreaField } from "@/components/forms";
import { getRequiredTool } from "@/data/tools";
import { trackCalculationCompleted, trackCalculationStarted, trackToolViewed } from "@/lib/analytics";
import { countWords } from "@/lib/text/word-count";

import { CalculatorCard } from "./CalculatorCard";

const tool = getRequiredTool("word-counter");

export function WordCounter() {
  const [text, setText] = useState("");
  const hasTrackedUse = useRef(false);
  const result = useMemo(() => countWords(text), [text]);

  useEffect(() => trackToolViewed(tool), []);

  function handleTextChange(value: string) {
    setText(value);
    if (value !== "" && !hasTrackedUse.current) {
      hasTrackedUse.current = true;
      trackCalculationStarted(tool);
      trackCalculationCompleted(tool, "live_counting");
    }
  }

  const metrics = [
    ["Words", result.wordCount],
    ["Characters", result.characterCountWithSpaces],
    ["Characters without spaces", result.characterCountWithoutSpaces],
    ["Sentences", result.sentenceCount],
    ["Paragraphs", result.paragraphCount],
  ] as const;

  return (
    <CalculatorCard description="Paste or type your draft for instant counts. Your text never leaves this page." title="Count your writing">
      <TextAreaField
        autoComplete="off"
        hint="Your writing is not saved or sent to analytics."
        id="writing-text"
        label="Your text"
        onChange={(event) => handleTextChange(event.target.value)}
        placeholder="Start typing or paste your draft here…"
        spellCheck="true"
        value={text}
      />
      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3" data-testid="word-count-result">
        {metrics.map(([label, value]) => (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4" key={label}>
            <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">{label}</dt>
            <dd className="mt-2 text-2xl font-bold text-gray-950">{value}</dd>
          </div>
        ))}
      </dl>
    </CalculatorCard>
  );
}
