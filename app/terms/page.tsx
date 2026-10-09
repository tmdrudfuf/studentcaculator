import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Terms and Disclaimer",
  description: "Terms of use and educational disclaimer for Student Survival Tools.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8" id="main-content">
      <p className="font-mono text-sm text-gray-600">Terms and disclaimer</p>
      <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-balance text-gray-950 sm:text-5xl">Use the tools as estimates, then verify the result.</h1>
      <div className="mt-8 space-y-8 leading-7 text-gray-600">
        <p>Last updated: October 9, 2026</p>
        <section><h2 className="text-xl font-bold text-gray-950">Educational use</h2><p className="mt-2">Student Survival Tools provides general educational calculations and planning information. It does not provide official academic advising, grading decisions, enrollment guidance, or professional services.</p></section>
        <section><h2 className="text-xl font-bold text-gray-950">Accuracy and school policies</h2><p className="mt-2">Reasonable care is used when writing and testing the calculators, but schools and instructors use different formulas, scales, rounding methods, calendars, and degree rules. Verify every important result with the applicable syllabus, gradebook, registrar, adviser, or degree audit.</p></section>
        <section><h2 className="text-xl font-bold text-gray-950">Your responsibility</h2><p className="mt-2">You are responsible for the values you enter and for decisions made using an estimate. Do not rely on the site as the only source for registration, graduation, financial-aid, or academic-standing decisions.</p></section>
        <section><h2 className="text-xl font-bold text-gray-950">Availability</h2><p className="mt-2">The site may change, add, or remove tools as formulas and requirements are reviewed. Continuous access and error-free operation are not guaranteed.</p></section>
        <section><h2 className="text-xl font-bold text-gray-950">Third-party services</h2><p className="mt-2">Hosting, analytics, advertising, and external links may involve third-party services governed by their own terms and privacy policies. Additional privacy details are available on this site&apos;s Privacy page.</p></section>
      </div>
    </main>
  );
}
