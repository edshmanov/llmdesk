import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for LLMDesk — how we handle data, cookies, and advertising on our free AI utility tools.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@llmdesk.com";

export default function PrivacyPage() {
  const lastUpdated = "May 21, 2026";

  return (
    <main className="container max-w-3xl py-12 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Privacy</span>
      </nav>

      <h1 className="text-h1 font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>

      <div className="prose-tool mt-8">
        <p>
          This Privacy Policy describes how LLMDesk (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;) collects, uses, and protects information when you visit{" "}
          <strong>llmdesk.com</strong> (the &ldquo;Site&rdquo;). LLMDesk is operated as a personal
          project. By using the Site, you agree to the terms described below.
        </p>

        <h2>1. The data we do not collect</h2>
        <p>
          LLMDesk tools run entirely in your browser. We do not have a backend that receives the
          text, prompts, files, or any other content you paste into our tools. Your tool inputs
          never leave your device, are not logged, and are not stored on our servers.
        </p>

        <h2>2. The data we do collect</h2>
        <p>
          We collect a limited amount of standard technical information for analytics and security:
        </p>
        <ul>
          <li>Aggregate page-view counts and referral sources (via Vercel Analytics).</li>
          <li>Device type, browser, and approximate region (country-level).</li>
          <li>Standard server logs (IP address, request timestamp, user agent).</li>
        </ul>
        <p>
          This data is used to understand which tools are popular, fix bugs, and protect the Site
          against abuse.
        </p>

        <h2>3. Cookies</h2>
        <p>
          We use a small number of cookies and similar storage mechanisms:
        </p>
        <ul>
          <li>
            <strong>Essential storage:</strong> your theme preference (light/dark) and your cookie
            consent choice are stored in your browser&rsquo;s <code>localStorage</code>.
          </li>
          <li>
            <strong>Advertising cookies:</strong> if advertising is enabled, our advertising
            partners (see below) may set cookies to serve and measure ads.
          </li>
          <li>
            <strong>Analytics:</strong> Vercel Analytics uses cookieless measurement and does not
            track you across sites.
          </li>
        </ul>
        <p>
          You can clear cookies and local storage at any time via your browser settings. A cookie
          banner is shown on your first visit so you can accept or decline non-essential cookies.
        </p>

        <h2>4. Advertising</h2>
        <p>
          LLMDesk may display advertising provided by Google AdSense and other third-party ad
          networks to keep the tools free for everyone.
        </p>
        <ul>
          <li>
            Third-party vendors, including Google, use cookies to serve ads based on your prior
            visits to this and other websites.
          </li>
          <li>
            Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to
            you based on your visit to this Site and/or other sites on the Internet.
          </li>
          <li>
            You may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            . You can also opt out of a third-party vendor&rsquo;s use of cookies for personalized
            advertising by visiting{" "}
            <a
              href="https://www.aboutads.info/"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.aboutads.info
            </a>
            .
          </li>
        </ul>

        <h2>5. Your rights under GDPR (EU/UK)</h2>
        <p>
          If you are located in the European Economic Area, the United Kingdom, or Switzerland, you
          have the right to:
        </p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of that data.</li>
          <li>Object to or restrict our processing of that data.</li>
          <li>Withdraw consent for advertising cookies at any time via the cookie banner.</li>
          <li>Lodge a complaint with your local data protection authority.</li>
        </ul>

        <h2>6. Your rights under CCPA (California)</h2>
        <p>
          If you are a California resident, you have the right to know what personal information we
          collect, to request deletion of that information, and to opt out of the &ldquo;sale&rdquo;
          or &ldquo;sharing&rdquo; of personal information. LLMDesk does not sell personal
          information. To exercise these rights, contact us at the address below.
        </p>

        <h2>7. Children</h2>
        <p>
          LLMDesk is not directed to children under 13, and we do not knowingly collect personal
          information from children. If you believe a child has provided us with personal
          information, please contact us so we can remove it.
        </p>

        <h2>8. Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Material changes will be reflected by
          updating the &ldquo;Last updated&rdquo; date above. Continued use of the Site after a
          change constitutes acceptance of the updated policy.
        </p>

        <h2>9. Contact</h2>
        <p>
          Questions about this policy or your data? Email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </main>
  );
}
