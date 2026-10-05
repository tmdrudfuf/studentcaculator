import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Privacy",
  description: "How Student Survival Tools handles calculator inputs, writing, local storage, and analytics.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8" id="main-content">
      <p className="font-mono text-sm text-gray-600">Privacy</p>
      <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-balance text-gray-950 sm:text-5xl">Your academic inputs stay in your browser.</h1>
      <div className="mt-8 space-y-7 leading-7 text-gray-600">
        <section><h2 className="text-xl font-bold text-gray-950">Calculator data</h2><p className="mt-2">Grades, scores, credits, course names, and writing are not sent to a server or stored in a database.</p></section>
        <section><h2 className="text-xl font-bold text-gray-950">Local storage</h2><p className="mt-2">Graduation and semester end dates may be saved in your browser so they are available on your next visit. You can remove them by clearing site data.</p></section>
        <section><h2 className="text-xl font-bold text-gray-950">Analytics</h2><p className="mt-2">The application supports anonymous behavior events such as a tool view or completed calculation. Academic values, dates, course names, and essay text are forbidden from analytics metadata. No production analytics provider is currently configured.</p></section>
      </div>
    </main>
  );
}
