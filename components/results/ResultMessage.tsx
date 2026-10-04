import type { ReactNode } from "react";

type ResultMessageProps = {
  tone?: "info" | "success" | "warning";
  children: ReactNode;
};

const toneClasses = {
  info: "border-blue-200 bg-blue-50 text-blue-950",
  success: "border-emerald-200 bg-emerald-50 text-emerald-950",
  warning: "border-amber-200 bg-amber-50 text-amber-950",
} as const;

export function ResultMessage({ tone = "info", children }: ResultMessageProps) {
  return (
    <div className={`rounded-xl border p-4 leading-7 ${toneClasses[tone]}`} role="status">
      {children}
    </div>
  );
}
