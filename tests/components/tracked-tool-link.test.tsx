import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TrackedToolLink } from "@/components/tools/TrackedToolLink";
import { setAnalyticsProvider } from "@/lib/analytics";

describe("TrackedToolLink", () => {
  let restoreProvider: () => void = () => undefined;
  afterEach(() => restoreProvider());

  it("tracks only source and destination tool identifiers", () => {
    const provider = vi.fn();
    restoreProvider = setAnalyticsProvider(provider);
    render(
      <TrackedToolLink destinationTool="gpa-calculator" href="#gpa-calculator" sourceTool="final-grade-calculator">
        GPA Calculator
      </TrackedToolLink>,
    );
    fireEvent.click(screen.getByRole("link", { name: "GPA Calculator" }));
    expect(provider).toHaveBeenCalledWith({
      name: "related_tool_clicked",
      metadata: {
        source_tool: "final-grade-calculator",
        destination_tool: "gpa-calculator",
      },
    });
  });
});
