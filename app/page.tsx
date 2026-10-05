import Link from "next/link";

import { FinalGradePreview } from "@/components/calculators/FinalGradePreview";
import { ToolCard } from "@/components/tools/ToolCard";
import { categories, getRequiredTool, getToolsByCategory, tools } from "@/data/tools";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Student Survival Tools",
  description: "Simple, private tools for grades, planning, studying, and writing.",
});

const featuredTools = [
  getRequiredTool("final-grade-calculator"),
  getRequiredTool("gpa-calculator"),
  getRequiredTool("study-time-calculator"),
  getRequiredTool("word-counter"),
];

const stats = [
  {
    value: tools.filter((tool) => tool.status === "available").length,
    label: "Focused tools",
    detail: "Calculators and writing utilities",
  },
  {
    value: categories.length,
    label: "Collections",
    detail: categories.map((category) => category.name).join(", "),
  },
  { value: 0, label: "Accounts required", detail: "Calculations happen in your browser" },
];

const primaryButton =
  "inline-flex h-12 items-center justify-center rounded-xl bg-gray-950 px-8 font-medium text-white transition hover:bg-gray-800 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-950";
const secondaryButton =
  "inline-flex h-12 items-center justify-center rounded-xl border border-gray-200 px-8 font-medium text-gray-950 transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-950";

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pt-12 pb-16 sm:px-8 lg:grid-cols-2 lg:pt-20 lg:pb-24">
          <div>
            <p className="font-mono text-sm text-gray-600">School is complicated. The tools should not be.</p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-balance text-gray-950 sm:text-5xl lg:text-6xl">
              Clear answers for the questions students ask every week.
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-gray-600">
              A lightweight collection of academic calculators and writing utilities, designed to be quick,
              understandable, and private.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link className={primaryButton} href="#categories">
                Explore categories
              </Link>
              <Link className={secondaryButton} href="#popular">
                See popular tools
              </Link>
            </div>
          </div>
          <FinalGradePreview href={getRequiredTool("final-grade-calculator").href} />
        </div>
      </section>

      <section aria-label="At a glance" className="border-y border-gray-200">
        <dl className="mx-auto grid max-w-6xl gap-y-10 px-5 py-14 text-center sm:grid-cols-3 sm:px-8">
          {stats.map((stat) => (
            <div className="flex flex-col items-center" key={stat.label}>
              <dt className="order-2 mt-3 font-semibold text-gray-950">{stat.label}</dt>
              <dd className="order-1 text-4xl font-bold tracking-tight text-gray-950 tabular-nums sm:text-5xl">
                {stat.value}
              </dd>
              <dd className="order-3 mt-1 text-sm text-gray-600">{stat.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24" id="categories">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-balance text-gray-950 lg:text-5xl">
            Start with a category
          </h2>
          <p className="mt-4 text-lg text-gray-600">Every tool lives in one of four focused collections.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {categories.map((category) => {
            const count = getToolsByCategory(category.slug).length;
            return (
              <Link
                className="group flex flex-col items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-950 sm:flex-row sm:gap-6 sm:p-8"
                href={category.href}
                key={category.slug}
              >
                <span
                  aria-hidden="true"
                  className="flex size-14 flex-none items-center justify-center rounded-full border border-gray-200 font-mono text-lg font-bold text-gray-950"
                >
                  {count}
                </span>
                <span className="block">
                  <span className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-950">
                    {category.name}
                    <span aria-hidden="true" className="transition-transform motion-safe:group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                  <span className="mt-2 block leading-7 text-gray-600">{category.description}</span>
                  <span className="mt-3 block font-mono text-sm text-gray-600">
                    {count} {count === 1 ? "tool" : "tools"}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-gray-50/70" id="popular">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-20 sm:px-8 lg:flex-row lg:py-24">
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-bold tracking-tight text-balance text-gray-950">Start with a quick answer</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Quick starting points, from final exam targets to word counts.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:w-2/3">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-gray-950 px-6 py-12 text-center text-white shadow-2xl sm:p-16 lg:p-24">
          <div aria-hidden="true" className="absolute top-0 right-0 -mt-48 -mr-48 size-96 bg-emerald-500/10 blur-[120px]" />
          <div aria-hidden="true" className="absolute bottom-0 left-0 -mb-48 -ml-48 size-96 bg-white/5 blur-[100px]" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl">
              Your academic inputs stay in your browser.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">
              Grades, scores, credits, course names, and writing are not sent to a server or stored in a database.
            </p>
            <Link
              className="mt-10 inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-medium text-gray-950 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href="/privacy"
            >
              Read privacy notes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
