import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FinalGradeCalculator } from "@/components/calculators/FinalGradeCalculator";
import { FinalGradePreview } from "@/components/calculators/FinalGradePreview";
import { GradePercentageCalculator } from "@/components/calculators/GradePercentageCalculator";
import { WeightedGradeCalculator } from "@/components/calculators/WeightedGradeCalculator";

describe("FinalGradeCalculator", () => {
  it("shows the required final score", () => {
    render(<FinalGradeCalculator />);

    fireEvent.change(screen.getByLabelText("Current grade"), { target: { value: "80" } });
    fireEvent.change(screen.getByLabelText("Final exam weight"), { target: { value: "20" } });
    fireEvent.change(screen.getByLabelText("Desired course grade"), { target: { value: "84" } });
    fireEvent.click(screen.getByRole("button", { name: "Calculate final grade" }));

    const primaryResult = screen.getByText("You need").closest("output");
    expect(primaryResult).not.toBeNull();
    expect(within(primaryResult as HTMLOutputElement).getByText("100%")).toBeInTheDocument();
    expect(screen.getByRole("table", { name: "Final exam scenarios" })).toBeInTheDocument();
  });

  it("renders associated errors for missing values", () => {
    render(<FinalGradeCalculator />);

    fireEvent.click(screen.getByRole("button", { name: "Calculate final grade" }));

    expect(screen.getByLabelText("Current grade")).toBeInvalid();
    expect(screen.getAllByRole("alert")).toHaveLength(3);
  });

  it("focuses the first invalid field on submit", async () => {
    render(<FinalGradeCalculator />);

    fireEvent.click(screen.getByRole("button", { name: "Calculate final grade" }));

    await waitFor(() => expect(screen.getByLabelText("Current grade")).toHaveFocus());
  });
});

describe("GradePercentageCalculator", () => {
  it("calculates extra-credit percentages", () => {
    render(<GradePercentageCalculator />);

    fireEvent.change(screen.getByLabelText("Points earned"), { target: { value: "55" } });
    fireEvent.change(screen.getByLabelText("Total points possible"), { target: { value: "50" } });
    fireEvent.click(screen.getByRole("button", { name: "Calculate percentage" }));

    expect(within(screen.getByTestId("grade-percentage-result")).getByText("110%")).toBeInTheDocument();
  });

  it("rejects a zero total", () => {
    render(<GradePercentageCalculator />);

    fireEvent.change(screen.getByLabelText("Points earned"), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText("Total points possible"), { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: "Calculate percentage" }));

    expect(screen.getByText("Total points must be greater than 0.")).toBeInTheDocument();
  });
});

describe("WeightedGradeCalculator", () => {
  it("calculates a normalized grade from multiple categories", () => {
    render(<WeightedGradeCalculator />);

    const weights = screen.getAllByLabelText("Course weight");
    const grades = screen.getAllByLabelText("Category grade");
    fireEvent.change(weights[0], { target: { value: "25" } });
    fireEvent.change(grades[0], { target: { value: "80" } });
    fireEvent.change(weights[1], { target: { value: "25" } });
    fireEvent.change(grades[1], { target: { value: "100" } });
    fireEvent.click(screen.getByRole("button", { name: "Calculate weighted grade" }));

    const result = screen.getByTestId("weighted-grade-result");
    expect(within(result).getByText("90%")).toBeInTheDocument();
    expect(within(result).getByText(/45% toward your final/)).toBeInTheDocument();
  });

  it("adds and removes category rows", () => {
    render(<WeightedGradeCalculator />);

    fireEvent.click(screen.getByRole("button", { name: /Add category/ }));
    expect(screen.getAllByLabelText("Course weight")).toHaveLength(3);

    fireEvent.click(screen.getAllByRole("button", { name: "Remove" })[2]);
    expect(screen.getAllByLabelText("Course weight")).toHaveLength(2);
  });

  it("rejects combined weights above 100%", () => {
    render(<WeightedGradeCalculator />);

    const weights = screen.getAllByLabelText("Course weight");
    const grades = screen.getAllByLabelText("Category grade");
    fireEvent.change(weights[0], { target: { value: "60" } });
    fireEvent.change(grades[0], { target: { value: "90" } });
    fireEvent.change(weights[1], { target: { value: "50" } });
    fireEvent.change(grades[1], { target: { value: "80" } });
    fireEvent.click(screen.getByRole("button", { name: "Calculate weighted grade" }));

    expect(screen.getByText("Combined category weights cannot exceed 100%.")).toBeInTheDocument();
  });
});

describe("FinalGradePreview", () => {
  it("updates live and never throws on invalid input", () => {
    render(<FinalGradePreview href="/grades/final-grade-calculator" />);

    expect(screen.getByText("94%")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Final weight"), { target: { value: "0" } });
    expect(screen.getByText("Enter percentages between 0 and 100.")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Final weight"), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText("Goal grade"), { target: { value: "99" } });
    expect(screen.getByText("Out of reach")).toBeInTheDocument();
  });
});
