import Link from "next/link";

import { categories } from "@/data/tools";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-[1fr_auto] sm:px-8">
        <div>
          <p className="font-bold text-white">Student Survival Tools</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
            Straightforward academic tools that keep your work in your browser.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link className="hover:text-white" href={category.href}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
