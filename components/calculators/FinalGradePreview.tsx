"use client";

import Link from "next/link";
import { useState } from "react";

import { calculateFinalGrade } from "@/lib/calculators/final-grade";
import { formatPercentage } from "@/lib/format/numbers";
import { validatePercentage } from "@/lib/validation/numbers";

const fields = [
  { name: "currentGrade", label: "Your grade" },
  { name: "finalWeight", label: "Final weight" },
  { name: "desiredGrade", label: "Goal grade" },
] as const;

type FieldName = (typeof fields)[number]["name"];

// Live homepage demo of the final grade calculator. No analytics: it is a preview, not a tool view.
export function FinalGradePreview({ href }: { href: string }) {
  const [values, setValues] = useState<Record<FieldName, string>>({
    currentGrade: "82",
    finalWeight: "25",
    desiredGrade: "85",
  });

  const numbers = {
    currentGrade: Number(values.currentGrade),
    finalWeight: Number(values.finalWeight),
    desiredGrade: Number(values.desiredGrade),
  };
  const valid =
    fields.every(({ name }) => values[name].trim() !== "") &&
    !validatePercentage(numbers.currentGrade, "") &&
    !validatePercentage(numbers.finalWeight, "", { allowZero: false }) &&
    !validatePercentage(numbers.desiredGrade, "");
  const result = valid ? calculateFinalGrade(numbers) : null;

  let headline = "--";
  let detail = "Enter percentages between 0 and 100.";
  if (result?.status === "reachable" && result.requiredScore !== null) {
    headline = formatPercentage(result.requiredScore);
    detail = "needed on your final exam";
  } else if (result?.status === "already_secured") {
    headline = "Secured";
    detail = "You reach your goal even with a 0 on the final.";
  } else if (result?.status === "impossible") {
    headline = "Out of reach";
    detail = `The highest grade you can still reach is ${formatPercentage(result.maximumPossibleGrade)}.`;
  }

  return (
    <div className="relative mx-auto w-full max-w-lg lg:mx-0">
      <div aria-hidden="true" className="absolute -inset-4 rounded-[40px] bg-emerald-500/10 blur-[80px]" />
      <section
        aria-label="Final grade preview"
        className="relative overflow-hidden rounded-2xl bg-gray-950 text-white shadow-2xl ring-1 ring-gray-950/5"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
          <span aria-hidden="true" className="size-3 rounded-full bg-[#FF5F56]" />
          <span aria-hidden="true" className="size-3 rounded-full bg-[#FFBD2E]" />
          <span aria-hidden="true" className="size-3 rounded-full bg-[#27C93F]" />
          <span className="ml-auto font-mono text-xs text-emerald-400">final-grade</span>
        </div>
        <div className="p-5 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-3">
            {fields.map(({ name, label }) => (
              <div className="flex items-center justify-between gap-4 sm:block" key={name}>
                <label className="block font-mono text-xs text-white/70" htmlFor={`preview-${name}`}>
                  {label}
                </label>
                <div className="relative w-28 sm:mt-2 sm:w-auto">
                  <input
                    autoComplete="off"
                    className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pr-7 pl-3 font-mono text-white tabular-nums outline-hidden transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                    id={`preview-${name}`}
                    inputMode="decimal"
                    max={100}
                    min={0}
                    name={name}
                    onChange={(event) => setValues((current) => ({ ...current, [name]: event.target.value }))}
                    step="any"
                    type="number"
                    value={values[name]}
                  />
                  <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-mono text-sm text-white/60">
                    %
                  </span>
                </div>
              </div>
            ))}
          </div>
          <output
            className="mt-8 block border-t border-white/10 pt-6"
            htmlFor={fields.map(({ name }) => `preview-${name}`).join(" ")}
          >
            <span className="block text-5xl font-bold tracking-tight tabular-nums">{headline}</span>
            <span className="mt-2 block text-white/75">{detail}</span>
          </output>
          <Link
            className="mt-6 inline-flex font-mono text-sm text-emerald-400 underline-offset-4 hover:underline"
            href={href}
          >
            Open the full calculator →
          </Link>
        </div>
      </section>
    </div>
  );
}
