import Link from "next/link";

import { categories } from "@/data/tools";

export function Header() {
  return (
    <header className="z-50 border-b sm:sticky sm:top-0 border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 px-5 sm:px-8">
        <Link
          className="flex h-16 items-center rounded-sm font-mono text-lg font-bold tracking-tight text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-950"
          href="/"
        >
          Student Survival Tools
        </Link>
        <nav aria-label="Primary navigation" className="order-last w-full sm:order-none sm:w-auto">
          <ul className="-mx-3 flex flex-wrap items-center pb-3 sm:pb-0">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  className="block rounded-lg px-3 py-2 font-medium tracking-tight text-gray-600 transition-colors hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-gray-950"
                  href={category.href}
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                className="block rounded-lg px-3 py-2 font-medium tracking-tight text-gray-600 transition-colors hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-gray-950"
                href="/guides"
              >
                Guides
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
