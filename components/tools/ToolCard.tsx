import Link from "next/link";

import type { ToolDefinition } from "@/types/tools";

type ToolCardProps = {
  tool: ToolDefinition;
};

export function ToolCard({ tool }: ToolCardProps) {
  const content = (
    <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-bold tracking-tight text-gray-950">{tool.name}</h3>
        {tool.status === "planned" ? (
          <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-amber-800">
            Planned
          </span>
        ) : null}
      </div>
      <p className="mt-3 font-medium text-gray-950">{tool.question}</p>
      <p className="mt-2 flex-grow leading-7 text-gray-600">{tool.description}</p>
      {tool.status === "available" ? (
        <span aria-hidden="true" className="mt-6 border-t border-gray-100 pt-4 text-sm font-semibold text-gray-950">
          Open tool <span className="inline-block transition-transform motion-safe:group-hover:translate-x-1">→</span>
        </span>
      ) : null}
    </article>
  );

  if (tool.status === "available") {
    return (
      <Link
        aria-label={tool.name}
        className="group block h-full rounded-2xl transition motion-safe:hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-950"
        href={tool.href}
      >
        {content}
      </Link>
    );
  }

  return content;
}
