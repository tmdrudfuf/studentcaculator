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
          className={`w-full rounded-xl border bg-white px-4 py-3 text-gray-950 outline-hidden transition placeholder:text-gray-500 focus:border-gray-950 focus:ring-4 focus:ring-gray-950/10 disabled:cursor-not-allowed disabled:bg-gray-100 ${
            error ? "border-red-500" : "border-gray-300"
          } ${suffix ? "pr-14" : ""} ${className}`}
          id={id}
          type="number"
        />
        {suffix ? (
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-4 flex items-center font-semibold text-gray-500">
            {suffix}
          </span>
        ) : null}
      </div>
    </FormField>
  );
}
