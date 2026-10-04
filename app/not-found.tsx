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
      <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">404</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">Couldn&apos;t find that tool.</h1>
      <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
        The address may have changed, or the tool may not exist. Try one of these popular options.
      </p>
      <ul className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        {popularTools.map((tool) => (
          <li key={tool.slug}>
            <Link className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-3 font-bold text-blue-700 hover:border-blue-400" href={tool.href}>
              {tool.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link className="mt-8 inline-block font-bold text-slate-700 hover:text-blue-700" href="/">← Return home</Link>
    </main>
  );
}
