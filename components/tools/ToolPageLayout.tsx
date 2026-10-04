import Link from "next/link";
import type { ReactNode } from "react";

import { BreadcrumbStructuredData } from "@/components/seo/StructuredData";
import { getToolContent } from "@/data/tool-content";
import { getCategory } from "@/data/tools";
import type { ToolDefinition } from "@/types/tools";

import { RelatedTools } from "./RelatedTools";

type ToolPageLayoutProps = {
  tool: ToolDefinition;
  children: ReactNode;
  explanation: ReactNode;
};

export function ToolPageLayout({ tool, children, explanation }: ToolPageLayoutProps) {
  const category = getCategory(tool.category);
  const content = getToolContent(tool.slug);

  return (
    <main id="main-content">
      <BreadcrumbStructuredData tool={tool} />
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-sm font-bold text-blue-700">
            <Link className="hover:text-blue-900" href="/">
              Home
            </Link>
            <span aria-hidden="true" className="mx-2 text-slate-400">
              /
            </span>
            <Link className="hover:text-blue-900" href={category.href}>
              {category.name}
            </Link>
          </nav>
          <p className="mt-8 text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">
            {tool.question}
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {tool.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{tool.description}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        {children}
        <aside className="space-y-6 lg:sticky lg:top-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-extrabold text-slate-950">How it works</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-slate-600">{explanation}</div>
          </section>
          <RelatedTools tool={tool} />
        </aside>
      </div>
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">Example</h2>
              <p className="mt-3 leading-7 text-slate-600">{content.example}</p>
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">Formula</h2>
              <p className="mt-3 rounded-xl bg-slate-100 p-4 font-mono text-sm leading-6 text-slate-800">
                {content.formula}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-950">Frequently asked questions</h2>
            <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
              {content.faq.map((item) => (
                <details className="group py-4" key={item.question}>
                  <summary className="cursor-pointer list-none font-bold text-slate-900 marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {item.question}
                      <span aria-hidden="true" className="text-blue-700 group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 pr-8 leading-7 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
