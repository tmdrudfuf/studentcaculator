import { GuideCard } from "@/components/guides/GuideCard";
import { guides } from "@/data/guides";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Student Guides",
  description: "Practical explanations for grades, GPA, weighted courses, and realistic study planning.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <main id="main-content">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
          <p className="font-mono text-sm text-gray-600">Student guides</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-balance text-gray-950 sm:text-5xl lg:text-6xl">
            Understand the calculation, not just the answer.
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-gray-600">
            Plain-language guides explain the assumptions behind common academic calculations and show how to check the result against school policies.
          </p>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
        <h2 className="text-2xl font-bold tracking-tight text-gray-950">All guides</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {guides.map((guide) => <GuideCard guide={guide} key={guide.slug} />)}
        </div>
      </section>
    </main>
  );
}
