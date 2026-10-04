const percentageFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

export function formatNumber(value: number, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatPercentage(value: number): string {
  return `${percentageFormatter.format(value)}%`;
}

export function formatGpa(value: number): string {
  return formatNumber(value, 2);
}
