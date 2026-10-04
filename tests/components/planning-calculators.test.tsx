import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { CreditCompletionCalculator } from "@/components/calculators/CreditCompletionCalculator";
import { GraduationCountdown } from "@/components/calculators/GraduationCountdown";
import { DATE_STORAGE_KEYS } from "@/lib/storage/date-settings";

describe("CreditCompletionCalculator", () => {
  it("shows progress and remaining credits", () => {
    render(<CreditCompletionCalculator />);
    fireEvent.change(screen.getByLabelText("Completed credits"), { target: { value: "72" } });
    fireEvent.change(screen.getByLabelText("Credits required"), { target: { value: "120" } });
    fireEvent.click(screen.getByRole("button", { name: "Check credit progress" }));
    const result = screen.getByTestId("credit-completion-result");
    expect(within(result).getByText("60%")).toBeInTheDocument();
    expect(within(result).getByText(/48 credits remaining/)).toBeInTheDocument();
  });
});

describe("GraduationCountdown", () => {
  beforeEach(() => window.localStorage.clear());

  it("persists the selected calendar date", () => {
    render(<GraduationCountdown />);
    fireEvent.change(screen.getByLabelText("Graduation date"), { target: { value: "2099-05-15" } });
    fireEvent.click(screen.getByRole("button", { name: "Start countdown" }));
    expect(window.localStorage.getItem(DATE_STORAGE_KEYS.graduationDate)).toBe("2099-05-15");
    expect(screen.getByTestId("graduation-countdown-result")).toBeInTheDocument();
  });

  it("loads a previously saved date", async () => {
    window.localStorage.setItem(DATE_STORAGE_KEYS.graduationDate, "2030-06-01");
    render(<GraduationCountdown />);
    await waitFor(() => expect(screen.getByLabelText("Graduation date")).toHaveValue("2030-06-01"));
  });
});
