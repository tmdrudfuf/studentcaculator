export function validateFiniteNumber(value: number, label: string): string | null {
  if (!Number.isFinite(value)) {
    return `${label} is required.`;
  }

  return null;
}

export function validateNonNegativeNumber(value: number, label: string): string | null {
  const numberError = validateFiniteNumber(value, label);

  if (numberError) {
    return numberError;
  }

  if (value < 0) {
    return `${label} cannot be negative.`;
  }

  return null;
}

export function validatePositiveNumber(value: number, label: string): string | null {
  const numberError = validateFiniteNumber(value, label);

  if (numberError) {
    return numberError;
  }

  if (value <= 0) {
    return `${label} must be greater than 0.`;
  }

  return null;
}

export function validatePercentage(
  value: number,
  label: string,
  options: { allowZero?: boolean } = {},
): string | null {
  const numberError = validateFiniteNumber(value, label);

  if (numberError) {
    return numberError;
  }

  const minimum = options.allowZero === false ? 0 : -Number.EPSILON;

  if (value <= minimum || value > 100) {
    return options.allowZero === false
      ? `${label} must be greater than 0 and at most 100%.`
      : `${label} must be between 0% and 100%.`;
  }

  return null;
}

export function validateGpa(value: number, label: string): string | null {
  const numberError = validateFiniteNumber(value, label);

  if (numberError) {
    return numberError;
  }

  if (value < 0 || value > 4) {
    return `${label} must be between 0.0 and 4.0.`;
  }

  return null;
}

export function validateCredits(value: number, label: string): string | null {
  return validatePositiveNumber(value, label);
}
