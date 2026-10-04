import type { ComponentPropsWithoutRef } from "react";

import { FormField } from "./FormField";

type TextAreaFieldProps = ComponentPropsWithoutRef<"textarea"> & {
  label: string;
  hint?: string;
  error?: string;
};

export function TextAreaField({ id, label, hint, error, className = "", ...props }: TextAreaFieldProps) {
  if (!id) throw new Error("TextAreaField requires an id for its accessible label.");
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <FormField error={error} hint={hint} id={id} label={label}>
      <textarea
        {...props}
        aria-describedby={descriptionId}
        aria-invalid={error ? true : undefined}
        className={`min-h-64 w-full resize-y rounded-xl border bg-white px-4 py-3 leading-7 text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 ${
          error ? "border-red-500" : "border-slate-300"
        } ${className}`}
        id={id}
      />
    </FormField>
  );
}
