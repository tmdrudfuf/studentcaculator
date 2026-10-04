import type { ComponentPropsWithoutRef } from "react";

import { NumberField } from "./NumberField";

type PercentageFieldProps = Omit<ComponentPropsWithoutRef<typeof NumberField>, "suffix">;

export function PercentageField(props: PercentageFieldProps) {
  return <NumberField inputMode="decimal" max={100} min={0} step="any" suffix="%" {...props} />;
}
