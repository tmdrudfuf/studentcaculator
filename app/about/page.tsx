import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "About",
  description: "Why Student Survival Tools exists and how its private, static-first calculators work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8" id="main-content">
      <p className="font-mono text-sm text-gray-600">About</p>
      <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-balance text-gray-950 sm:text-5xl">Simple tools for common student questions.</h1>
      <div className="mt-8 space-y-5 text-lg leading-8 text-gray-600">
        <p>Student Survival Tools turns grade, planning, study, and writing questions into quick calculations with clear explanations.</p>
        <p>The site is static-first. Calculations run in your browser without accounts, a database, or a backend that receives academic values.</p>
        <p>Results are estimates. Always use your school&apos;s official policies, grade scale, and degree audit for academic decisions.</p>
      </div>
    </main>
  );
}
