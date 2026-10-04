import { afterEach, describe, expect, it, vi } from "vitest";

import { tools } from "@/data/tools";
import {
  setAnalyticsProvider,
  trackCalculationCompleted,
  trackRelatedToolClick,
  trackToolViewed,
} from "@/lib/analytics";

describe("analytics abstraction", () => {
  let restoreProvider: () => void = () => undefined;

  afterEach(() => restoreProvider());

  it("sends only event metadata through the configured provider", () => {
    const provider = vi.fn();
    restoreProvider = setAnalyticsProvider(provider);
    const tool = tools[0];

    trackToolViewed(tool);
    trackCalculationCompleted(tool, "reachable");
    trackRelatedToolClick(tool.slug, tools[1].slug);

    expect(provider).toHaveBeenNthCalledWith(1, {
      name: "tool_viewed",
      metadata: { tool_name: tool.slug, tool_category: "grades" },
    });
    expect(provider).toHaveBeenNthCalledWith(2, {
      name: "calculation_completed",
      metadata: {
        tool_name: tool.slug,
        tool_category: "grades",
        result_state: "reachable",
      },
    });
    expect(provider).toHaveBeenNthCalledWith(3, {
      name: "related_tool_clicked",
      metadata: {
        source_tool: tool.slug,
        destination_tool: tools[1].slug,
      },
    });
  });
});
