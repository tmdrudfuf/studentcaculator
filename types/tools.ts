export const TOOL_CATEGORIES = ["grades", "planning", "study", "writing"] as const;

export type ToolCategory = (typeof TOOL_CATEGORIES)[number];

export type ToolDefinition = {
  slug: string;
  name: string;
  question: string;
  description: string;
  category: ToolCategory;
  href: `/${ToolCategory}/${string}`;
  relatedTools: string[];
  status: "planned";
};

export type CategoryDefinition = {
  slug: ToolCategory;
  name: string;
  description: string;
  href: `/${ToolCategory}`;
};
