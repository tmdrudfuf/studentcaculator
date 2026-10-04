import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Privacy",
  description: "How Student Survival Tools handles calculator inputs, writing, local storage, and analytics.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8" id="main-content">
      <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700">Privacy</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Your academic inputs stay in your browser.</h1>
      <div className="mt-8 space-y-7 leading-7 text-slate-600">
        <section><h2 className="text-xl font-extrabold text-slate-950">Calculator data</h2><p className="mt-2">Grades, scores, credits, course names, and writing are not sent to a server or stored in a database.</p></section>
        <section><h2 className="text-xl font-extrabold text-slate-950">Local storage</h2><p className="mt-2">Graduation and semester end dates may be saved in your browser so they are available on your next visit. You can remove them by clearing site data.</p></section>
        <section><h2 className="text-xl font-extrabold text-slate-950">Analytics</h2><p className="mt-2">The application supports anonymous behavior events such as a tool view or completed calculation. Academic values, dates, course names, and essay text are forbidden from analytics metadata. No production analytics provider is currently configured.</p></section>
      </div>
    </main>
  );
}
