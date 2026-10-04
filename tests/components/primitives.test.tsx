import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NumberField, PercentageField } from "@/components/forms";
import { PrimaryResult, ResultMessage } from "@/components/results";

describe("shared form primitives", () => {
  it("associates a number input with its label, hint, and error state", () => {
    const { rerender } = render(
      <NumberField hint="Use a positive number." id="credits" label="Credits" />,
    );

    expect(screen.getByLabelText("Credits")).toHaveAccessibleDescription("Use a positive number.");

    rerender(<NumberField error="Credits are required." id="credits" label="Credits" />);

    expect(screen.getByLabelText("Credits")).toBeInvalid();
    expect(screen.getByRole("alert")).toHaveTextContent("Credits are required.");
  });

  it("provides sensible percentage defaults", () => {
    render(<PercentageField id="score" label="Score" />);

    expect(screen.getByLabelText("Score")).toHaveAttribute("min", "0");
    expect(screen.getByLabelText("Score")).toHaveAttribute("max", "100");
  });
});

describe("shared result primitives", () => {
  it("renders a polite primary result", () => {
    render(<PrimaryResult eyebrow="You need" explanation="On your final" unit="%" value="93.2" />);

    expect(screen.getByText("93.2").closest("output")).toHaveAttribute("aria-live", "polite");
    expect(screen.getByText("On your final")).toBeInTheDocument();
  });

  it("renders a status message", () => {
    render(<ResultMessage tone="success">Goal reached.</ResultMessage>);

    expect(screen.getByRole("status")).toHaveTextContent("Goal reached.");
  });
});
