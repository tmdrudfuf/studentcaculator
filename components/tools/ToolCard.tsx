import Link from "next/link";

import type { ToolDefinition } from "@/types/tools";

type ToolCardProps = {
  tool: ToolDefinition;
};

export function ToolCard({ tool }: ToolCardProps) {
  const content = (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold tracking-tight text-slate-950">{tool.name}</h3>
        {tool.status === "planned" ? (
          <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-amber-800">
            Planned
          </span>
        ) : null}
      </div>
      <p className="mt-3 font-semibold text-blue-800">{tool.question}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
    </article>
  );

  if (tool.status === "available") {
    return (
      <Link
        className="block rounded-2xl transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
        href={tool.href}
      >
        {content}
      </Link>
    );
  }

  return content;
}
