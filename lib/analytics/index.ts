import type {
  AnalyticsEvent,
  AnalyticsEventMetadata,
  AnalyticsProvider,
} from "@/types/analytics";
import type { ToolDefinition } from "@/types/tools";

let provider: AnalyticsProvider = () => undefined;

export function setAnalyticsProvider(nextProvider: AnalyticsProvider): () => void {
  const previousProvider = provider;
  provider = nextProvider;

  return () => {
    provider = previousProvider;
  };
}

export function trackEvent(
  name: AnalyticsEvent["name"],
  metadata: AnalyticsEventMetadata = {},
): void {
  provider({ name, metadata });
}

export function trackToolViewed(tool: ToolDefinition): void {
  trackEvent("tool_viewed", {
    tool_name: tool.slug,
    tool_category: tool.category,
  });
}

export function trackCalculationStarted(tool: ToolDefinition): void {
  trackEvent("calculation_started", {
    tool_name: tool.slug,
    tool_category: tool.category,
  });
}

export function trackCalculationCompleted(tool: ToolDefinition, resultState: string): void {
  trackEvent("calculation_completed", {
    tool_name: tool.slug,
    tool_category: tool.category,
    result_state: resultState,
  });
}

export function trackCalculationError(tool: ToolDefinition, resultState: string): void {
  trackEvent("calculation_error", {
    tool_name: tool.slug,
    tool_category: tool.category,
    result_state: resultState,
  });
}

export function trackRelatedToolClick(sourceTool: string, destinationTool: string): void {
  trackEvent("related_tool_clicked", {
    source_tool: sourceTool,
    destination_tool: destinationTool,
  });
}
