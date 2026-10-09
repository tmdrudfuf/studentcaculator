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
      <div className="mt-8 space-y-10 text-lg leading-8 text-gray-600">
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">Why this site exists</h2>
          <div className="mt-4 space-y-4">
            <p>Student Survival Tools is an independently maintained collection of grade, planning, study, and writing utilities. It was created to give students a quick answer without hiding the formula or requiring an account.</p>
            <p>Each tool pairs the calculation with an explanation, worked example, common mistakes, and limits. The goal is to help visitors understand what a result means and recognize when an official school policy must take over.</p>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">How calculations are reviewed</h2>
          <div className="mt-4 space-y-4">
            <p>Calculator logic is kept separate from the interface and covered by automated tests. Worked examples are checked against the same formulas shown on each page. Dates are handled as local calendar dates to avoid common time-zone and daylight-saving errors.</p>
            <p>Academic institutions can use different grade scales, rounding rules, repeat policies, and degree requirements. The site identifies these limitations instead of presenting a general formula as an official institutional decision.</p>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">Privacy by design</h2>
          <div className="mt-4 space-y-4">
            <p>The site is static-first. Calculations run in the browser without an account, database, or application backend that receives grades, course names, dates, or writing. A small number of date tools can save a selected date in local browser storage.</p>
            <p>Advertising and aggregate traffic measurement are disclosed in the privacy policy. Calculator entries and writing are excluded from analytics metadata.</p>
          </div>
        </section>
        <section className="rounded-2xl bg-gray-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold tracking-tight text-gray-950">Editorial note</h2>
          <p className="mt-3">Content was last reviewed on October 9, 2026. Results are educational estimates. Always use your school&apos;s official syllabus, grade scale, academic calendar, and degree audit for decisions.</p>
        </section>
      </div>
    </main>
  );
}
