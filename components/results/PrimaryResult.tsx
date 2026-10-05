import type { ReactNode } from "react";

type PrimaryResultProps = {
  eyebrow: string;
  value: ReactNode;
  unit?: string;
  explanation?: string;
};

export function PrimaryResult({ eyebrow, value, unit, explanation }: PrimaryResultProps) {
  return (
    <output className="block rounded-2xl bg-gray-950 p-6 text-white shadow-xl sm:p-8" aria-live="polite">
      <span className="block font-mono text-sm text-emerald-400">{eyebrow}</span>
      <span className="mt-3 block break-words text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
        {value}
        {unit ? <span className="ml-2 text-xl font-semibold text-white/70">{unit}</span> : null}
      </span>
      {explanation ? <span className="mt-3 block leading-7 text-white/75">{explanation}</span> : null}
    </output>
  );
}
