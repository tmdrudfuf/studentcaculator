import Link from "next/link";

import { GuideStructuredData } from "@/components/seo/StructuredData";
import { getRequiredTool } from "@/data/tools";
import type { GuideDefinition } from "@/types/content";

export function GuidePageLayout({ guide }: { guide: GuideDefinition }) {
  const relatedTools = guide.relatedTools.map(getRequiredTool);

  return (
    <main id="main-content">
      <GuideStructuredData guide={guide} />
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 lg:py-20">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-gray-600">
            <Link className="hover:text-gray-950" href="/">Home</Link>
            <span aria-hidden="true" className="mx-2 text-gray-400">/</span>
            <Link className="hover:text-gray-950" href="/guides">Guides</Link>
          </nav>
          <p className="mt-8 font-mono text-sm font-semibold uppercase tracking-widest text-gray-500">
            {guide.category} · {guide.readingMinutes} min read
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-balance text-gray-950 sm:text-5xl lg:text-6xl">
            {guide.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-gray-600">{guide.description}</p>
          <p className="mt-5 text-sm text-gray-500">Reviewed October 9, 2026</p>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="space-y-14">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-3xl font-bold tracking-tight text-gray-950">{section.heading}</h2>
              <div className="mt-5 space-y-5 text-lg leading-8 text-gray-700">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.bullets ? (
                <ul className="mt-6 space-y-3 rounded-2xl bg-gray-50 p-6 text-gray-700 sm:p-8">
                  {section.bullets.map((item) => (
                    <li className="flex gap-3 leading-7" key={item}>
                      <span aria-hidden="true" className="mt-2 size-2 flex-none rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <aside className="mt-16 rounded-2xl bg-gray-950 p-6 text-white sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight">Use the related tools</h2>
          <p className="mt-2 leading-7 text-white/70">Apply the ideas in this guide with calculations that run privately in your browser.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {relatedTools.map((tool) => (
              <li key={tool.slug}>
                <Link className="block rounded-xl border border-white/15 px-4 py-3 font-semibold transition hover:bg-white/10" href={tool.href}>
                  {tool.name} →
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </article>
    </main>
  );
}
