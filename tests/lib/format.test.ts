import { describe, expect, it } from "vitest";

import { formatDuration, formatGpa, formatPercentage } from "@/lib/format/numbers";

describe("number formatting", () => {
  it("formats percentages and GPAs at display time", () => {
    expect(formatPercentage(93.2564)).toBe("93.26%");
    expect(formatGpa(3.7)).toBe("3.7");
  });

  it("formats durations", () => {
    expect(formatDuration(90)).toBe("1 hr 30 min");
    expect(formatDuration(45)).toBe("45 min");
    expect(formatDuration(120)).toBe("2 hr");
  });
});
