import Link from "next/link";

import { getRequiredTool } from "@/data/tools";

const popularTools = [
  getRequiredTool("final-grade-calculator"),
  getRequiredTool("gpa-calculator"),
  getRequiredTool("target-gpa-calculator"),
];

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8" id="main-content">
      <p className="font-mono text-sm text-gray-600">404</p>
      <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-balance text-gray-950 sm:text-5xl">Couldn&apos;t find that tool.</h1>
      <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
        The address may have changed, or the tool may not exist. Try one of these popular options.
      </p>
      <ul className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        {popularTools.map((tool) => (
          <li key={tool.slug}>
            <Link className="inline-flex h-12 items-center rounded-xl border border-gray-200 bg-white px-6 font-medium text-gray-950 transition hover:bg-gray-50" href={tool.href}>
              {tool.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link className="mt-8 inline-block font-medium text-gray-600 hover:text-gray-950" href="/">← Return home</Link>
    </main>
  );
}
