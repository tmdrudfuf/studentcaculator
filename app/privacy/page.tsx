import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Privacy",
  description: "How Student Survival Tools handles calculator inputs, local storage, analytics, cookies, and advertising.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8" id="main-content">
      <p className="font-mono text-sm text-gray-600">Privacy</p>
      <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-balance text-gray-950 sm:text-5xl">Your academic inputs stay in your browser.</h1>
      <div className="mt-8 space-y-7 leading-7 text-gray-600">
        <p>Last updated: October 5, 2026</p>
        <section><h2 className="text-xl font-bold text-gray-950">Calculator data</h2><p className="mt-2">Grades, scores, credits, course names, and writing are not sent to a server or stored in a database.</p></section>
        <section><h2 className="text-xl font-bold text-gray-950">Local storage</h2><p className="mt-2">Graduation and semester end dates may be saved in your browser so they are available on your next visit. You can remove them by clearing site data.</p></section>
        <section><h2 className="text-xl font-bold text-gray-950">Analytics</h2><p className="mt-2">The application supports anonymous behavior events such as a tool view or completed calculation. Academic values, dates, course names, and essay text are forbidden from analytics metadata. No production analytics provider is currently configured.</p></section>
        <section>
          <h2 className="text-xl font-bold text-gray-950">Advertising and cookies</h2>
          <p className="mt-2">
            We use Google AdSense to serve advertising. Google and its partners may use cookies, device identifiers, or similar technologies to deliver, measure, and personalize ads where permitted. Advertising partners may receive information such as your IP address, browser or device details, and interactions with ads. Calculator entries and writing are not intentionally shared with advertisers.
          </p>
          <p className="mt-3">
            Learn how Google uses data on partner sites in Google&apos;s{" "}
            <a className="font-semibold text-gray-950 underline underline-offset-4" href="https://policies.google.com/technologies/partner-sites">
              partner sites policy
            </a>
            . You can manage personalized advertising in{" "}
            <a className="font-semibold text-gray-950 underline underline-offset-4" href="https://adssettings.google.com/">
              Google Ads Settings
            </a>
            . Where required, a consent message will let you choose how advertising cookies are used before they are set.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-950">Third-party links</h2>
          <p className="mt-2">This site may link to third-party services. Their privacy practices are governed by their own policies.</p>
        </section>
      </div>
    </main>
  );
}
