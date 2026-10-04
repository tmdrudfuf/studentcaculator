import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CumulativeGpaCalculator } from "@/components/calculators/CumulativeGpaCalculator";
import { SemesterGpaCalculator } from "@/components/calculators/SemesterGpaCalculator";
import { TargetGpaCalculator } from "@/components/calculators/TargetGpaCalculator";

describe("SemesterGpaCalculator", () => {
  it("calculates multiple courses", () => {
    render(<SemesterGpaCalculator />);
    const credits = screen.getAllByLabelText("Credits");
    const grades = screen.getAllByLabelText("Grade");
    fireEvent.change(credits[0], { target: { value: "3" } });
    fireEvent.change(grades[0], { target: { value: "A" } });
    fireEvent.change(credits[1], { target: { value: "3" } });
    fireEvent.change(grades[1], { target: { value: "B" } });
    fireEvent.click(screen.getByRole("button", { name: "Calculate semester GPA" }));
    expect(within(screen.getByTestId("semester-gpa-result")).getByText("3.5")).toBeInTheDocument();
  });
});

describe("CumulativeGpaCalculator", () => {
  it("calculates a new cumulative GPA", () => {
    render(<CumulativeGpaCalculator />);
    fireEvent.change(screen.getByLabelText("Current cumulative GPA"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Completed credits"), { target: { value: "60" } });
    fireEvent.change(screen.getByLabelText("This semester's GPA"), { target: { value: "4" } });
    fireEvent.change(screen.getByLabelText("This semester's credits"), { target: { value: "15" } });
    fireEvent.click(screen.getByRole("button", { name: "Calculate cumulative GPA" }));
    expect(within(screen.getByTestId("cumulative-gpa-result")).getByText("3.2")).toBeInTheDocument();
  });
});

describe("TargetGpaCalculator", () => {
  it("shows an impossible target and maximum GPA", () => {
    render(<TargetGpaCalculator />);
    fireEvent.change(screen.getByLabelText("Current cumulative GPA"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Completed credits"), { target: { value: "60" } });
    fireEvent.change(screen.getByLabelText("Target cumulative GPA"), { target: { value: "3.5" } });
    fireEvent.change(screen.getByLabelText("Upcoming credits"), { target: { value: "15" } });
    fireEvent.click(screen.getByRole("button", { name: "Check target GPA" }));
    const result = screen.getByTestId("target-gpa-result");
    expect(within(result).getByText(/not reachable/)).toBeInTheDocument();
    expect(within(result).getByText("3.2")).toBeInTheDocument();
  });
});
