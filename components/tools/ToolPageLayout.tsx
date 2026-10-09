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
      <header className="bg-white">
        <div className="mx-auto max-w-6xl px-5 pt-12 pb-4 sm:px-8 lg:pt-16">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-gray-600">
            <Link className="hover:text-gray-950" href="/">
              Home
            </Link>
            <span aria-hidden="true" className="mx-2 text-gray-400">
              /
            </span>
            <Link className="hover:text-gray-950" href={category.href}>
              {category.name}
            </Link>
          </nav>
          <p className="mt-8 text-lg font-medium text-gray-600">{tool.question}</p>
          <h1 className="mt-2 text-4xl font-bold leading-[1.1] tracking-tight text-balance text-gray-950 sm:text-5xl lg:text-6xl">
            {tool.name}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-gray-600">{tool.description}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        {children}
        <aside className="space-y-6 lg:sticky lg:top-24">
          <section className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="font-bold tracking-tight text-gray-950">How it works</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-600">{explanation}</div>
          </section>
          <RelatedTools tool={tool} />
        </aside>
      </div>

      <section className="border-y border-gray-200 bg-gray-50/70">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-20">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-950">What this calculation tells you</h2>
            <div className="mt-5 space-y-4 text-lg leading-8 text-gray-600">
              {content.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-950">Use it accurately</h2>
            <ol className="mt-5 space-y-4">
              {content.steps.map((step, index) => (
                <li className="flex gap-4 leading-7 text-gray-600" key={step}>
                  <span className="flex size-8 flex-none items-center justify-center rounded-full bg-gray-950 font-mono text-sm font-bold text-white">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">Example</h2>
            <p className="mt-3 leading-7 text-gray-600">{content.example}</p>
          </div>
          <div className="overflow-hidden rounded-2xl bg-gray-950 shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <span aria-hidden="true" className="size-3 rounded-full bg-[#FF5F56]" />
              <span aria-hidden="true" className="size-3 rounded-full bg-[#FFBD2E]" />
              <span aria-hidden="true" className="size-3 rounded-full bg-[#27C93F]" />
              <h2 className="ml-auto font-mono text-xs text-emerald-400">Formula</h2>
            </div>
            <p className="p-6 font-mono text-sm leading-7 break-words text-white/85 sm:p-8">{content.formula}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:pb-20">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-6 sm:p-8 lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">How to interpret the result</h2>
            <div className="mt-4 space-y-4 leading-7 text-gray-600">
              {content.interpretation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-gray-950">Common mistakes</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700">
              {content.commonMistakes.map((item) => <li className="flex gap-3" key={item}><span aria-hidden="true">•</span><span>{item}</span></li>)}
            </ul>
          </div>
        </div>
        <div className="mt-6 rounded-2xl bg-gray-950 p-6 text-white sm:p-8">
          <h2 className="text-xl font-bold tracking-tight">Limits to keep in mind</h2>
          <ul className="mt-4 grid gap-4 text-sm leading-6 text-white/75 md:grid-cols-3">
            {content.limitations.map((item) => <li className="flex gap-3" key={item}><span aria-hidden="true" className="text-emerald-400">✓</span><span>{item}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">Frequently asked questions</h2>
          <div className="mt-12 grid items-start gap-x-16 md:grid-cols-2">
            {content.faq.map((item) => (
              <details className="group border-b border-gray-200 py-5" key={item.question}>
                <summary className="cursor-pointer list-none font-semibold text-gray-950 marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.question}
                    <span aria-hidden="true" className="text-xl text-gray-500 transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 pr-8 leading-7 text-gray-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
