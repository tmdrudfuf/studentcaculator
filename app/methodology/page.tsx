import Link from "next/link";

import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Editorial and Calculator Methodology",
  description:
    "How Student Survival Tools selects formulas, tests calculations, reviews sources, handles corrections, and keeps advertising separate from editorial decisions.",
  path: "/methodology",
});

const inlineLink =
  "font-semibold text-gray-950 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-950";

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8" id="main-content">
      <p className="font-mono text-sm text-gray-600">Methodology</p>
      <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-balance text-gray-950 sm:text-5xl">
        How our calculations and guides are reviewed.
      </h1>
      <p className="mt-6 text-xl leading-8 text-gray-600">
        Student Survival Tools publishes transparent educational estimates. This page explains where formulas come from, how they are tested, and where a general calculator must give way to official school policy.
      </p>

      <div className="mt-12 space-y-12 text-lg leading-8 text-gray-600">
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">Formula selection</h2>
          <div className="mt-4 space-y-4">
            <p>
              We use the simplest formula that answers the stated question and show that formula on the tool page. Grade and GPA tools use weighted averages and quality points; date tools use local calendar dates; writing tools describe their counting assumptions. Calculator logic is kept separate from presentation code so it can be tested directly.
            </p>
            <p>
              A formula is included only when its inputs and limits can be explained in plain language. If institutions commonly use different rules, the page identifies those differences and directs the reader to a syllabus, registrar, degree audit, academic calendar, or adviser for the official answer.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">Testing and edge cases</h2>
          <div className="mt-4 space-y-4">
            <p>
              Calculation modules are covered by automated tests for normal examples, boundaries, invalid inputs, and situations such as an unreachable target or a date in the past. Worked examples are checked against the same formula described on the page. The full site also passes linting, strict TypeScript checks, unit tests, browser tests, and a production build before publication.
            </p>
            <p>
              Automated tests reduce arithmetic and regression errors, but they cannot encode every institutional policy. Results are therefore labeled as estimates, and tool pages list the assumptions and limitations that can change an official result.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">Editorial and source standards</h2>
          <div className="mt-4 space-y-4">
            <p>
              Guides are written to help a reader reproduce a calculation, interpret the result, and identify the policy details that need confirmation. We prefer primary research, official university registrar or learning-support guidance, government material, and first-party product documentation. Sources are listed on each guide instead of hidden in an unsourced summary.
            </p>
            <p>
              Each guide carries a fixed reviewed date. A review checks the explanation, links, worked examples, related tools, and any claims tied to a source. A newer review date is published only when that review has actually occurred.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">Corrections and transparency</h2>
          <div className="mt-4 space-y-4">
            <p>
              If you find an incorrect formula, unclear assumption, broken source, or accessibility problem, send the page address and a short explanation through our{" "}
              <Link className={inlineLink} href="/contact">contact and feedback page</Link>. We review reproducible issues against the calculation code and cited material, then update the page and its reviewed date when a correction is published.
            </p>
            <p>
              Student Survival Tools is independently maintained and is not affiliated with a school, university, learning-management system, or government agency. External sources are references, not endorsements, and the linked organizations do not review or approve this site.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">Privacy, analytics, and advertising</h2>
          <div className="mt-4 space-y-4">
            <p>
              Calculator entries and pasted writing remain in the browser; the site has no account system or application database that receives them. Aggregate traffic measurement and advertising are described in the{" "}
              <Link className={inlineLink} href="/privacy">privacy policy</Link>.
            </p>
            <p>
              Advertising does not determine formulas, conclusions, sources, or which limitations are disclosed. An advertiser does not receive a favorable claim in exchange for placement, and sponsored editorial content is not currently published.
            </p>
          </div>
        </section>

        <section className="rounded-2xl bg-gray-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold tracking-tight text-gray-950">Last reviewed</h2>
          <p className="mt-3">
            This methodology was published and reviewed on October 14, 2026. Learn more about the project on the{" "}
            <Link className={inlineLink} href="/about">About page</Link> or browse the <Link className={inlineLink} href="/guides">student guides</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
