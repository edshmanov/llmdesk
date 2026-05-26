import Link from "next/link";
import { Terminal } from "lucide-react";

import { categories } from "@/lib/categories";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#0a0a0a] mt-16">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand block */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span
                aria-hidden="true"
                className="grid h-7 w-7 place-items-center rounded-md bg-accent text-white"
              >
                <Terminal className="h-4 w-4" />
              </span>
              llmdesk
            </Link>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Free, client-side utilities for developers and prompt engineers
              working with LLMs.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Categories</h3>
            <ul className="mt-3 space-y-2">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-sm text-zinc-600 hover:text-accent dark:text-zinc-400"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Site</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-zinc-600 hover:text-accent dark:text-zinc-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-zinc-600 hover:text-accent dark:text-zinc-400">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  className="text-sm text-zinc-600 hover:text-accent dark:text-zinc-400"
                >
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-zinc-600 hover:text-accent dark:text-zinc-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-zinc-600 hover:text-accent dark:text-zinc-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-zinc-200 pt-6 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">
            © {YEAR} llmdesk. All rights reserved.
          </p>
          <p className="text-xs text-zinc-500">
            Built with Next.js. Hosted on Vercel.
          </p>
        </div>
      </div>
    </footer>
  );
}
