import type { ToolDefinition } from "@/types/tools";

type ToolCardProps = {
  tool: ToolDefinition;
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold tracking-tight text-slate-950">{tool.name}</h3>
        <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-amber-800">
          Planned
        </span>
      </div>
      <p className="mt-3 font-semibold text-blue-800">{tool.question}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
    </article>
  );
}
