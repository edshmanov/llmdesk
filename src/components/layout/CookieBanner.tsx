"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "llmdesk:cookie-consent:v1";

type Consent = "accepted" | "declined";

export function CookieBanner() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage may be unavailable (Safari private mode) — show banner anyway
      setVisible(true);
    }
  }, []);

  const persist = React.useCallback((value: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
    >
      <div className="container max-w-3xl rounded-lg border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-[#171717]">
        <div className="flex items-start gap-3">
          <div className="flex-1 text-sm text-zinc-700 dark:text-zinc-300">
            We use cookies and Google AdSense to keep llmdesk free. By using
            this site you agree to our{" "}
            <Link href="/privacy" className="text-accent underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </div>
          <button
            type="button"
            aria-label="Dismiss"
            className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            onClick={() => persist("declined")}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" variant="primary" onClick={() => persist("accepted")}>
            Accept
          </Button>
          <Button size="sm" variant="outline" onClick={() => persist("declined")}>
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
