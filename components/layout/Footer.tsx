import Link from "next/link";

import { categories } from "@/data/tools";

const siteLinks = [
  { name: "About", href: "/about" },
  { name: "Privacy", href: "/privacy" },
  { name: "Contact", href: "/contact" },
];

const linkClass = "text-sm text-gray-600 transition-colors hover:text-gray-950";
const headingClass = "mb-4 text-xs font-bold uppercase tracking-widest text-gray-950";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <Link className="font-mono text-lg font-bold tracking-tight text-gray-950" href="/">
              Student Survival Tools
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-gray-600">
              Straightforward academic tools that keep your work in your browser.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-10">
            <div>
              <h2 className={headingClass}>Tools</h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link className={linkClass} href={category.href}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={headingClass}>Site</h2>
              <ul className="space-y-2">
                {siteLinks.map((link) => (
                  <li key={link.href}>
                    <Link className={linkClass} href={link.href}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <p className="mt-12 border-t border-gray-100 pt-8 text-xs font-medium text-gray-500">
          Results are estimates. Check your school&apos;s official policies for academic decisions.
        </p>
      </div>
    </footer>
  );
}
