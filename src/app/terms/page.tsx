import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for LLMDesk — the rules and limitations that apply to your use of our free AI utility tools.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@llmdesk.com";

export default function TermsPage() {
  const lastUpdated = "May 21, 2026";

  return (
    <main className="container max-w-3xl py-12 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Terms</span>
      </nav>

      <h1 className="text-h1 font-bold tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>

      <div className="prose-tool mt-8">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of{" "}
          <strong>llmdesk.com</strong> (the &ldquo;Site&rdquo;) and any tools, content, or services
          offered through it. By using the Site, you agree to these Terms. If you do not agree,
          please do not use the Site.
        </p>

        <h2>1. The service</h2>
        <p>
          LLMDesk provides a collection of free, browser-based utility tools for people working
          with large language models (LLMs). All tools run client-side in your browser. We do not
          process or store the content you paste into our tools.
        </p>

        <h2>2. Permitted use</h2>
        <p>You may use the Site for any lawful purpose, including commercial work. You agree not to:</p>
        <ul>
          <li>Use the Site for any illegal activity or to violate any applicable law.</li>
          <li>Attempt to disrupt, overload, or compromise the Site or its infrastructure.</li>
          <li>Scrape, mirror, or republish substantial portions of the Site without permission.</li>
          <li>Use the Site to harass, defame, or harm any person or group.</li>
        </ul>

        <h2>3. No warranty</h2>
        <p>
          The Site and its tools are provided <strong>&ldquo;as is&rdquo;</strong> and{" "}
          <strong>&ldquo;as available&rdquo;</strong>, without warranties of any kind, either
          express or implied. We do not warrant that the Site will be uninterrupted, error-free, or
          that calculations (such as token counts, cost estimates, or reference data) will be
          accurate for every model or use case. <strong>Always verify critical outputs.</strong>
        </p>

        <h2>4. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, LLMDesk and its operator shall not be liable for
          any indirect, incidental, special, consequential, or punitive damages, or any loss of
          profits or revenue, arising out of your use of, or inability to use, the Site. Our total
          aggregate liability shall not exceed one hundred U.S. dollars (USD $100).
        </p>

        <h2>5. Pricing data and reference information</h2>
        <p>
          The Site displays pricing, context windows, rate limits, and other reference information
          for third-party AI models. This information may change at any time without notice. Always
          check the official documentation of the model provider before making business decisions
          based on the figures shown here.
        </p>

        <h2>6. Intellectual property</h2>
        <p>
          The Site&rsquo;s code, design, copy, and original content are owned by the operator and
          licensed to you only for the personal and commercial use described in these Terms.
          Trademarks and product names mentioned on the Site (e.g., OpenAI, Anthropic, Google,
          Mistral) belong to their respective owners.
        </p>

        <h2>7. Third-party services</h2>
        <p>
          The Site uses third-party services, including Vercel (hosting and analytics) and Google
          AdSense (advertising). Your use of those services is also governed by their respective
          terms.
        </p>

        <h2>8. Changes</h2>
        <p>
          We may update these Terms from time to time. Material changes will be reflected by
          updating the &ldquo;Last updated&rdquo; date above. Continued use of the Site after a
          change constitutes acceptance of the updated Terms.
        </p>

        <h2>9. Governing law</h2>
        <p>
          These Terms are governed by the laws of the State of Indiana, United States, without
          regard to its conflict-of-laws principles.
        </p>

        <h2>10. Contact</h2>
        <p>
          Questions about these Terms? Email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </main>
  );
}
