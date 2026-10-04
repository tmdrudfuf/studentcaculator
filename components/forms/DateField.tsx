import type { ComponentPropsWithoutRef } from "react";

import { FormField } from "./FormField";

type DateFieldProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  label: string;
  hint?: string;
  error?: string;
};

export function DateField({ id, label, hint, error, className = "", ...inputProps }: DateFieldProps) {
  if (!id) {
    throw new Error("DateField requires an id for its accessible label.");
  }

  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <FormField error={error} hint={hint} id={id} label={label}>
      <input
        {...inputProps}
        aria-describedby={descriptionId}
        aria-invalid={error ? true : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 ${
          error ? "border-red-500" : "border-slate-300"
        } ${className}`}
        id={id}
        type="date"
      />
    </FormField>
  );
}
