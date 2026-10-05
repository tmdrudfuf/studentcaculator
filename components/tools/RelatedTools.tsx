import { getTool } from "@/data/tools";
import type { ToolDefinition } from "@/types/tools";

import { TrackedToolLink } from "./TrackedToolLink";

type RelatedToolsProps = {
  tool: ToolDefinition;
};

export function RelatedTools({ tool }: RelatedToolsProps) {
  const relatedTools = tool.relatedTools.map(getTool).filter((item): item is ToolDefinition => Boolean(item));

  return (
    <section className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6">
      <h2 className="font-bold tracking-tight text-gray-950">Related tools</h2>
      <ul className="mt-4 space-y-3">
        {relatedTools.map((relatedTool) => (
          <li key={relatedTool.slug}>
            {relatedTool.status === "available" ? (
              <TrackedToolLink
                className="font-medium text-gray-950 underline-offset-4 hover:underline"
                destinationTool={relatedTool.slug}
                href={relatedTool.href}
                sourceTool={tool.slug}
              >
                {relatedTool.name} →
              </TrackedToolLink>
            ) : (
              <span className="flex items-center justify-between gap-3 text-sm text-gray-500">
                {relatedTool.name}
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-bold uppercase">Planned</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
