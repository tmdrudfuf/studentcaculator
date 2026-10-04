import Link from "next/link";

import { getCategory, getToolsByCategory } from "@/data/tools";
import type { ToolCategory } from "@/types/tools";

import { ToolCard } from "./ToolCard";

type CategoryPageProps = {
  category: ToolCategory;
};

export function CategoryPage({ category }: CategoryPageProps) {
  const definition = getCategory(category);
  const categoryTools = getToolsByCategory(category);

  return (
    <main id="main-content">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Link className="text-sm font-bold text-blue-700 hover:text-blue-900" href="/">
            ← All categories
          </Link>
          <p className="mt-8 text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
            Student tools
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {definition.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {definition.description}
          </p>
        </div>
      </section>
      <section aria-labelledby="tools-heading" className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="mb-8 max-w-2xl">
          <h2 id="tools-heading" className="text-2xl font-extrabold tracking-tight text-slate-950">
            Tools in this category
          </h2>
          <p className="mt-2 text-slate-600">
            Choose a tool below for a quick, private calculation in your browser.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </main>
  );
}
