import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://llmdesk.com";
const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "llmdesk — Free AI & LLM Utility Tools",
    template: "%s | llmdesk",
  },
  description:
    "A free, client-side toolkit of 50+ utilities for developers, prompt engineers, and AI creators. Token counters, cost calculators, output cleaners, and more — all in your browser.",
  applicationName: "llmdesk",
  keywords: [
    "llm tools",
    "ai utilities",
    "token counter",
    "prompt engineering",
    "ai cost calculator",
    "json repair",
    "openai gpt",
    "claude",
    "gemini",
  ],
  authors: [{ name: "Eldar Shmanov" }],
  creator: "Eldar Shmanov",
  publisher: "llmdesk",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "llmdesk",
    title: "llmdesk — Free AI & LLM Utility Tools",
    description:
      "50+ free, client-side tools for developers and prompt engineers working with LLMs.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "llmdesk — Free AI & LLM Utility Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "llmdesk — Free AI & LLM Utility Tools",
    description:
      "50+ free, client-side tools for developers and prompt engineers working with LLMs.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {ADSENSE_ENABLED && ADSENSE_CLIENT ? (
          <Script
            id="adsense-script"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          />
        ) : null}
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
