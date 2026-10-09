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
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 pt-12 pb-8 sm:px-8 lg:pt-20">
          <Link className="text-sm font-medium text-gray-600 hover:text-gray-950" href="/">
            ← All categories
          </Link>
          <h1 className="mt-8 text-5xl font-bold leading-[1.1] tracking-tight text-balance text-gray-950 lg:text-6xl">
            {definition.name}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-gray-600">{definition.description}</p>
        </div>
      </section>
      <section aria-labelledby="tools-heading" className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:pb-24">
        <h2 id="tools-heading" className="text-2xl font-bold tracking-tight text-gray-950">
          Tools in this category
        </h2>
        <p className="mt-2 text-gray-600">Choose a tool below for a quick, private calculation in your browser.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
      <section className="border-t border-gray-200 bg-gray-50/70">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:py-20">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-950">Before you calculate</h2>
            <div className="mt-5 space-y-4 text-lg leading-8 text-gray-600">
              {definition.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <aside className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-gray-950">Quick accuracy checklist</h2>
            <ul className="mt-5 space-y-4 text-gray-600">
              {definition.checklist.map((item) => (
                <li className="flex gap-3 leading-7" key={item}>
                  <span aria-hidden="true" className="mt-2 size-2 flex-none rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
