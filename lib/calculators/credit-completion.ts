import type { CreditCompletionInput, CreditCompletionResult } from "@/types/calculator";

export function calculateCreditCompletion(input: CreditCompletionInput): CreditCompletionResult {
  if (input.completedCredits < 0 || input.requiredCredits <= 0) {
    throw new RangeError("Credit values are invalid.");
  }

  return {
    status: input.completedCredits >= input.requiredCredits ? "complete" : "in_progress",
    completedCredits: input.completedCredits,
    requiredCredits: input.requiredCredits,
    remainingCredits: Math.max(input.requiredCredits - input.completedCredits, 0),
    percentageComplete: (input.completedCredits / input.requiredCredits) * 100,
  };
}
