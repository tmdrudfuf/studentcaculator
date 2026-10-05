import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ id, label, hint, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-950" htmlFor={id}>
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p className="text-sm text-gray-500" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm font-semibold text-red-700" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
