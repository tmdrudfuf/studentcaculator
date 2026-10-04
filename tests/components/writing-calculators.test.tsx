import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ReadingTimeCalculator } from "@/components/calculators/ReadingTimeCalculator";
import { WordCounter } from "@/components/calculators/WordCounter";
import { setAnalyticsProvider } from "@/lib/analytics";

describe("WordCounter", () => {
  let restoreProvider: () => void = () => undefined;
  afterEach(() => restoreProvider());

  it("updates counts live without sending text to analytics", () => {
    const provider = vi.fn();
    restoreProvider = setAnalyticsProvider(provider);
    render(<WordCounter />);
    const privateText = "Private essay sentence.";
    fireEvent.change(screen.getByLabelText("Your text"), { target: { value: privateText } });
    const result = screen.getByTestId("word-count-result");
    expect(within(result).getByText("3")).toBeInTheDocument();
    expect(JSON.stringify(provider.mock.calls)).not.toContain(privateText);
    expect(window.localStorage.length).toBe(0);
  });
});

describe("ReadingTimeCalculator", () => {
  it("estimates reading time using a configured preset", () => {
    render(<ReadingTimeCalculator />);
    fireEvent.change(screen.getByLabelText("Word count"), { target: { value: "1000" } });
    fireEvent.change(screen.getByLabelText("Reading speed"), { target: { value: "average" } });
    fireEvent.click(screen.getByRole("button", { name: "Estimate reading time" }));
    const result = screen.getByTestId("reading-time-result");
    expect(within(result).getByText("5")).toBeInTheDocument();
    expect(within(result).getByText(/200 words per minute/)).toBeInTheDocument();
  });
});
