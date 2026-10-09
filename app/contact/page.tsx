import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Contact and Feedback",
  description: "Report a calculator issue or suggest an improvement for Student Survival Tools.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8" id="main-content">
      <p className="font-mono text-sm text-gray-600">Contact and feedback</p>
      <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-balance text-gray-950 sm:text-5xl">Help make the tools clearer and more accurate.</h1>
      <div className="mt-8 space-y-8 leading-7 text-gray-600">
        <section>
          <h2 className="text-xl font-bold text-gray-950">Report a problem</h2>
          <p className="mt-2">Use the public GitHub issue tracker to report an incorrect result, confusing explanation, broken page, or accessibility problem. Include the tool name, the behavior you expected, and steps that reproduce the issue.</p>
          <a
            className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-gray-950 px-6 font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-950"
            href="https://github.com/tmdrudfuf/studentcaculator/issues/new"
          >
            Open the issue tracker
          </a>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-950">Protect your information</h2>
          <p className="mt-2">GitHub issues are public. Do not include your full name, student ID, school account, private grades, essay text, or other personal information. A small example using fictional values is usually enough to demonstrate a calculator problem.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-950">What this channel cannot do</h2>
          <p className="mt-2">The issue tracker is for website feedback, not individual academic advising. Questions about official grades, degree requirements, enrollment, or financial aid should go to the appropriate instructor or school office.</p>
        </section>
      </div>
    </main>
  );
}
