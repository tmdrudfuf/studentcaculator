import type { ComponentPropsWithoutRef } from "react";

export function SubmitButton({ className = "", children, ...props }: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center rounded-xl bg-gray-950 px-6 py-3 sm:px-8 font-medium text-white transition hover:bg-gray-800 hover:shadow-lg active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-950 disabled:cursor-not-allowed disabled:bg-gray-400 ${className}`}
      type="submit"
      {...props}
    >
      {children}
    </button>
  );
}
