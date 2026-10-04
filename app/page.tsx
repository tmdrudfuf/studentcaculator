import Link from "next/link";

import { ToolCard } from "@/components/tools/ToolCard";
import { categories, tools } from "@/data/tools";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Student Survival Tools",
  description: "Simple, private tools for grades, planning, studying, and writing.",
});

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
              School is complicated. The tools should not be.
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black tracking-[-0.045em] text-slate-950 sm:text-6xl">
              Clear answers for the questions students ask every week.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A lightweight collection of academic calculators and writing utilities—designed to
              be quick, understandable, and private.
            </p>
            <Link
              className="mt-8 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-bold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
              href="#categories"
            >
              Explore categories
            </Link>
          </div>
          <aside className="rounded-3xl border border-blue-200 bg-blue-50 p-7 shadow-sm" aria-label="Foundation status">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-blue-800">
              Foundation ready
            </p>
            <p className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950">
              Tools are being built in focused milestones.
            </p>
            <p className="mt-3 leading-7 text-slate-700">
              The site structure is here. Calculator functionality will arrive next and is not part
              of this foundation release.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8" id="categories">
        <div className="max-w-2xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">Browse</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Start with a category</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Every planned tool lives in one of four focused collections.
          </p>
        </div>
        <div className="mt-9 grid gap-5 sm:grid-cols-2">
          {categories.map((category) => (
            <Link
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
              href={category.href}
              key={category.slug}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-extrabold tracking-tight text-slate-950">{category.name}</h3>
                <span className="text-xl text-blue-700 transition group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </div>
              <p className="mt-3 leading-7 text-slate-600">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-100/70">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">On the roadmap</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">A preview of what is next</h2>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {tools.slice(0, 3).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
