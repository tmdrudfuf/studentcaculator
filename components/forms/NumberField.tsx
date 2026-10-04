import type { ComponentPropsWithoutRef } from "react";

import { FormField } from "./FormField";

type NumberFieldProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  label: string;
  hint?: string;
  error?: string;
  suffix?: string;
};

export function NumberField({
  id,
  label,
  hint,
  error,
  suffix,
  className = "",
  ...inputProps
}: NumberFieldProps) {
  if (!id) {
    throw new Error("NumberField requires an id for its accessible label.");
  }

  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <FormField error={error} hint={hint} id={id} label={label}>
      <div className="relative">
        <input
          {...inputProps}
          aria-describedby={descriptionId}
          aria-invalid={error ? true : undefined}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 ${
            error ? "border-red-500" : "border-slate-300"
          } ${suffix ? "pr-14" : ""} ${className}`}
          id={id}
          type="number"
        />
        {suffix ? (
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-4 flex items-center font-semibold text-slate-500">
            {suffix}
          </span>
        ) : null}
      </div>
    </FormField>
  );
}
