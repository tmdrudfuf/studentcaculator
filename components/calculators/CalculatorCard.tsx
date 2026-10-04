import type { ReactNode } from "react";

type CalculatorCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function CalculatorCard({ title, description, children }: CalculatorCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8" aria-labelledby="calculator-heading">
      <h2 className="text-2xl font-black tracking-tight text-slate-950" id="calculator-heading">
        {title}
      </h2>
      <p className="mt-2 leading-7 text-slate-600">{description}</p>
      <div className="mt-7">{children}</div>
    </section>
  );
}
