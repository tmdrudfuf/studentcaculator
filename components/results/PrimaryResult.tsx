import type { ReactNode } from "react";

type PrimaryResultProps = {
  eyebrow: string;
  value: ReactNode;
  unit?: string;
  explanation?: string;
};

export function PrimaryResult({ eyebrow, value, unit, explanation }: PrimaryResultProps) {
  return (
    <output className="block rounded-2xl border border-blue-200 bg-blue-50 p-6" aria-live="polite">
      <span className="block text-sm font-extrabold uppercase tracking-[0.16em] text-blue-800">
        {eyebrow}
      </span>
      <span className="mt-2 block text-4xl font-black tracking-tight text-slate-950">
        {value}
        {unit ? <span className="ml-2 text-xl font-bold text-slate-600">{unit}</span> : null}
      </span>
      {explanation ? <span className="mt-3 block leading-7 text-slate-700">{explanation}</span> : null}
    </output>
  );
}
