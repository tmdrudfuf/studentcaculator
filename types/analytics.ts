import type { ToolCategory } from "@/types/tools";

export type AnalyticsEventName =
  | "tool_viewed"
  | "calculation_started"
  | "calculation_completed"
  | "calculation_error"
  | "related_tool_clicked";

export type AnalyticsEventMetadata = {
  tool_name?: string;
  tool_category?: ToolCategory;
  result_state?: string;
  source_tool?: string;
  destination_tool?: string;
};

export type AnalyticsEvent = {
  name: AnalyticsEventName;
  metadata: AnalyticsEventMetadata;
};

export type AnalyticsProvider = (event: AnalyticsEvent) => void;
