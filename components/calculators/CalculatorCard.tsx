"use client";

import type { FormEvent, ReactNode } from "react";

type CalculatorCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

// Runs after the calculator's own onSubmit has re-rendered its errors.
function focusFirstError(event: FormEvent) {
  const form = event.target as HTMLFormElement;
  setTimeout(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
}

export function CalculatorCard({ title, description, children }: CalculatorCardProps) {
  return (
    <section
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
      aria-labelledby="calculator-heading"
      onSubmit={focusFirstError}
    >
      <h2 className="text-2xl font-bold tracking-tight text-gray-950" id="calculator-heading">
        {title}
      </h2>
      <p className="mt-2 leading-7 text-gray-600">{description}</p>
      <div className="mt-7">{children}</div>
    </section>
  );
}
