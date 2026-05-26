# LLMDesk

> The AI engineer's utility belt.

A free, browser-based library of utility tools for working with large language models — token counters, cost calculators, prompt builders, output cleaners, RAG helpers, and reference tables. All tools run client-side: no backend, no API keys, no logs of what you paste.

**Live:** [llmdesk.com](https://llmdesk.com) · **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Vercel

---

## 1. Quick start

```bash
git clone https://github.com/edshmanov/llmdesk.git
cd llmdesk
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable                       | Required | Description                                         |
| ------------------------------ | -------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | yes      | Canonical URL, e.g. `https://llmdesk.com`           |
| `NEXT_PUBLIC_ADSENSE_ENABLED`  | yes      | `true` to inject AdSense, `false` to hide all ads   |
| `NEXT_PUBLIC_ADSENSE_CLIENT`   | when ads on | Your `ca-pub-XXXXXXXXXXXXXXXX` client ID         |
| `NEXT_PUBLIC_CONTACT_EMAIL`    | yes      | Contact email used on `/contact` and legal pages    |

---

## 2. Project structure

```
src/
  app/
    layout.tsx              # Root layout: fonts, theme, header, footer, AdSense script
    page.tsx                # Homepage: hero, search, trending, categories
    [tool]/page.tsx         # Dynamic tool page — renders any slug from src/lib/tools.ts
    category/[slug]/page.tsx
    about/  contact/  privacy/  terms/
    sitemap.ts  robots.ts  manifest.ts  icon.svg
    globals.css
  components/
    layout/                 # Header, Footer, ThemeToggle, AdSlot, CookieBanner
    home/                   # Hero, SearchBar, TrendingTools, CategoryGrid
    tool/                   # ToolLayout, ToolHero, ToolHowItWorks, ToolUseCases,
                            # ToolFAQ, RelatedTools, ToolSchema (JSON-LD)
    ui/                     # button, input, textarea, card primitives
    providers/              # ThemeProvider (next-themes wrapper)
  lib/
    tools.ts                # Registry of all 50 tools with full SEO metadata
    categories.ts           # Six categories
    pricing.ts              # Model pricing schema (filled in when wiring cost tools)
    utils.ts                # cn(), formatUSD(), absoluteUrl(), etc.
  data/
    tool-content/index.tsx  # Per-tool SEO copy (How it works, Use cases, FAQ)
public/
  ads.txt                   # placeholder — replace after AdSense approval
  og-image.png  icon.png  icon-512.png  apple-touch-icon.png  favicon.ico
```

---

## 3. How a tool page works

Every tool slug listed in `src/lib/tools.ts` automatically gets a fully-rendered, SEO-optimized page at `/[tool-slug]`. The page anatomy is enforced by `<ToolLayout>` and is always:

1. `<ToolSchema>` — `SoftwareApplication` + `BreadcrumbList` JSON-LD
2. `<ToolHero>` — H1 (the primary keyword), breadcrumb, short description
3. `<AdSlot variant="leaderboard" />`
4. **The interactive tool component** — wired in `app/[tool]/page.tsx`
5. `<ToolHowItWorks>` — ~150-word explainer
6. `<ToolUseCases>` — 3–5 concrete use cases
7. `<ToolFAQ>` — five Q&A pairs with `FAQPage` JSON-LD
8. `<AdSlot variant="in-feed" />`
9. `<RelatedTools>` — 3–5 same-category links

If a tool has no entry in `src/data/tool-content/index.tsx`, the page falls back to a generic-but-on-topic copy block so the route still ranks while the interactive component is being built.

### Adding a new tool

1. Add an entry to `src/lib/tools.ts` (slug, name, category, SEO metadata, related slugs).
2. Create `src/tools/<slug>/index.tsx` exporting a default React component (the interactive part).
3. Import and wire it into the switch in `src/app/[tool]/page.tsx`.
4. (Optional but recommended) Add per-tool copy in `src/data/tool-content/index.tsx` so How-it-works / Use-cases / FAQ are tool-specific instead of falling back to generic copy.
5. Set the tool's `status` to `"live"` in the registry.

**Anchor tools to ship first** (in order):

1. `token-counter` — uses `gpt-tokenizer`
2. `api-cost-calculator` — reads from `src/lib/pricing.ts`
3. `ai-json-repairer` — uses `jsonrepair`
4. `system-prompt-generator` — no deps
5. `text-chunker` — uses `gpt-tokenizer`

---

## 4. Design system

- **Background** `#0a0a0a` · **Surface** `#171717` · **Border** `#262626` · **Accent** `#3b82f6`
- **Fonts:** Geist Sans (UI), Geist Mono (code/tool I/O), Inter fallback
- **Dark mode** is the default; light theme is also supported via `next-themes`
- Tailwind tokens live in `tailwind.config.ts`; reusable layout classes in `src/app/globals.css`
- No gradients on tool UIs. Keep the chrome quiet so the tool is the focus.

---

## 5. Deployment

### Vercel + Namecheap (current setup)

1. Push to `main` on GitHub — Vercel auto-deploys.
2. In Vercel → Settings → Environment Variables, set the four `NEXT_PUBLIC_*` vars from `.env.example`.
3. In Vercel → Domains, add `llmdesk.com` and `www.llmdesk.com`.
4. In Namecheap → Advanced DNS, set:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` record `www` → `cname.vercel-dns.com`
5. Vercel issues the SSL certificate automatically.

### Turning AdSense on

After Google AdSense approves the site:

1. Replace the contents of `public/ads.txt` with the line from your AdSense dashboard.
2. In Vercel env vars, flip `NEXT_PUBLIC_ADSENSE_ENABLED` to `true` and paste your client ID into `NEXT_PUBLIC_ADSENSE_CLIENT`.
3. Redeploy. The `<Script>` tag in `layout.tsx` will load and every `<AdSlot>` will start serving ads.

Until approval, every `<AdSlot>` renders an invisible reserved space — no layout shift when ads turn on.

---

## 6. SEO checklist (already wired)

- Per-page `<title>` and `<meta description>` from the registry
- Open Graph + Twitter cards on every route
- Canonical URLs via `metadata.alternates.canonical`
- `sitemap.xml` and `robots.txt` auto-generated from the registry
- PWA `manifest.webmanifest`
- `SoftwareApplication`, `BreadcrumbList`, and `FAQPage` JSON-LD on each tool page
- `Organization` JSON-LD on the homepage
- Security headers in `next.config.ts`

---

## 7. Scripts

```bash
npm run dev        # local dev server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (Next.js defaults)
npm run type-check # tsc --noEmit
```

---

## 8. License

Source code is private. Trademarks (OpenAI, Anthropic, Google, Mistral, etc.) belong to their respective owners and are referenced for descriptive purposes only.
