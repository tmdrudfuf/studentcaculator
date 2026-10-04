import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { SemesterCountdown } from "@/components/calculators/SemesterCountdown";
import { StudyTimeCalculator } from "@/components/calculators/StudyTimeCalculator";
import { DATE_STORAGE_KEYS } from "@/lib/storage/date-settings";

describe("StudyTimeCalculator", () => {
  it("creates a daily study plan", () => {
    render(<StudyTimeCalculator />);
    fireEvent.change(screen.getByLabelText("Total study time"), { target: { value: "15" } });
    fireEvent.change(screen.getByLabelText("Days available"), { target: { value: "10" } });
    fireEvent.click(screen.getByRole("button", { name: "Create study plan" }));
    const result = screen.getByTestId("study-time-result");
    expect(within(result).getByText("1 hr 30 min")).toBeInTheDocument();
  });
});

describe("SemesterCountdown", () => {
  beforeEach(() => window.localStorage.clear());

  it("saves the semester end date", () => {
    render(<SemesterCountdown />);
    fireEvent.change(screen.getByLabelText("Semester end date"), { target: { value: "2099-12-15" } });
    fireEvent.click(screen.getByRole("button", { name: "Start semester countdown" }));
    expect(window.localStorage.getItem(DATE_STORAGE_KEYS.semesterEndDate)).toBe("2099-12-15");
  });

  it("loads a saved semester end date", async () => {
    window.localStorage.setItem(DATE_STORAGE_KEYS.semesterEndDate, "2031-12-15");
    render(<SemesterCountdown />);
    await waitFor(() => expect(screen.getByLabelText("Semester end date")).toHaveValue("2031-12-15"));
  });
});
