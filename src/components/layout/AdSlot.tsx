"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type AdVariant = "leaderboard" | "in-feed" | "sidebar";

export interface AdSlotProps {
  variant: AdVariant;
  /** AdSense slot ID. Required when AdSense is enabled. */
  slot?: string;
  className?: string;
}

const VARIANT_STYLES: Record<AdVariant, string> = {
  leaderboard: "min-h-[90px] md:min-h-[90px]",
  "in-feed": "min-h-[280px]",
  sidebar: "min-h-[600px] w-[300px]",
};

/**
 * Drop-in slot for Google AdSense.
 *
 * - Pre-approval: renders a visible dashed placeholder so layout is final from day 1.
 * - Post-approval: flip NEXT_PUBLIC_ADSENSE_ENABLED=true and real ad units render.
 */
export function AdSlot({ variant, slot, className }: AdSlotProps) {
  const isEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  // Trigger ad on mount once enabled
  React.useEffect(() => {
    if (!isEnabled) return;
    try {
      // adsbygoogle is injected by the global script in layout.tsx
      // @ts-expect-error -- adsbygoogle is added to window by Google's script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Swallow — non-fatal in development
    }
  }, [isEnabled]);

  if (!isEnabled || !client || !slot) {
    return (
      <div
        role="complementary"
        aria-label="Advertisement space"
        className={cn(
          "ad-placeholder flex items-center justify-center",
          "rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700",
          "p-6 text-center text-zinc-500",
          VARIANT_STYLES[variant],
          className
        )}
      >
        <div>
          <div className="text-sm font-medium">Ad Space — {variant}</div>
          <div className="mt-1 text-xs">
            Placeholder. Real ad renders when AdSense is live.
          </div>
        </div>
      </div>
    );
  }

  return (
    <ins
      className={cn("adsbygoogle block", className)}
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
