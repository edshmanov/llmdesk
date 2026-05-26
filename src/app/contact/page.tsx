import type { Metadata } from "next";
import { Mail } from "lucide-react";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@llmdesk.com";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the llmdesk team. Feature requests, bug reports, partnership inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <article className="container max-w-3xl py-12">
      <h1 className="text-h1 font-semibold tracking-tight">Contact</h1>

      <div className="prose-tool mt-8">
        <p>
          The fastest way to reach us is email. Feature requests, bug reports,
          tokenizer corrections, partnership inquiries — anything you need.
        </p>

        <p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 text-base"
          >
            <Mail className="h-4 w-4" />
            {CONTACT_EMAIL}
          </a>
        </p>

        <h2>What we respond to</h2>
        <ul>
          <li>Bug reports — please include browser and steps to reproduce.</li>
          <li>Feature requests — describe the workflow you&apos;re trying to support.</li>
          <li>Corrections — model prices, context windows, and rate limits change; we want to hear when ours are stale.</li>
          <li>Partnerships — directories, integrations, and content syndication.</li>
        </ul>

        <p>
          We aim to reply within two business days. For urgent issues affecting
          a tool&apos;s correctness, please include the word{" "}
          <strong>URGENT</strong> in the subject line.
        </p>
      </div>
    </article>
  );
}
