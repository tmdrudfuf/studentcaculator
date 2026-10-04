import type { ComponentPropsWithoutRef } from "react";

export function SubmitButton({ className = "", children, ...props }: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`rounded-xl bg-blue-700 px-5 py-3 font-bold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 ${className}`}
      type="submit"
      {...props}
    >
      {children}
    </button>
  );
}
