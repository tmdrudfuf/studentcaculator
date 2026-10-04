import Link from "next/link";

import { getTool } from "@/data/tools";
import type { ToolDefinition } from "@/types/tools";

type RelatedToolsProps = {
  tool: ToolDefinition;
};

export function RelatedTools({ tool }: RelatedToolsProps) {
  const relatedTools = tool.relatedTools.map(getTool).filter((item): item is ToolDefinition => Boolean(item));

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="font-extrabold text-slate-950">Related tools</h2>
      <ul className="mt-4 space-y-3">
        {relatedTools.map((relatedTool) => (
          <li key={relatedTool.slug}>
            {relatedTool.status === "available" ? (
              <Link className="font-semibold text-blue-700 hover:text-blue-900" href={relatedTool.href}>
                {relatedTool.name} →
              </Link>
            ) : (
              <span className="flex items-center justify-between gap-3 text-sm text-slate-500">
                {relatedTool.name}
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold uppercase">Planned</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
