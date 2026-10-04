import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description: "Contact information and feedback status for Student Survival Tools.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8" id="main-content">
      <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">Contact</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Feedback channel coming soon.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">A public support address has not been configured yet. Until it is available, no personal information is collected through this site.</p>
    </main>
  );
}
