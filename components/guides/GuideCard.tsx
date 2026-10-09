import Link from "next/link";

import type { GuideDefinition } from "@/types/content";

export function GuideCard({ guide }: { guide: GuideDefinition }) {
  return (
    <Link
      className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-950"
      href={`/guides/${guide.slug}`}
    >
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-gray-500">
        {guide.category} · {guide.readingMinutes} min read
      </p>
      <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight text-gray-950">{guide.title}</h3>
      <p className="mt-3 flex-1 leading-7 text-gray-600">{guide.description}</p>
      <span className="mt-5 font-semibold text-gray-950">
        Read guide <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
