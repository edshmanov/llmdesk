"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { tools, searchTools, type Tool } from "@/lib/tools";

export function SearchBar() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Tool[]>([]);
  const [focused, setFocused] = React.useState(false);
  const [highlight, setHighlight] = React.useState(0);
  const router = useRouter();
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Filter on change
  React.useEffect(() => {
    const next = query.trim() ? searchTools(query) : tools.slice(0, 5);
    setResults(next.slice(0, 8));
    setHighlight(0);
  }, [query]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      const t = results[highlight];
      if (t) router.push(`/${t.slug}`);
    } else if (e.key === "Escape") {
      setFocused(false);
    }
  };

  return (
    <div className="container max-w-2xl pb-8" ref={wrapperRef}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <Input
          type="search"
          placeholder="Search 50+ tools — token counter, json repair, prompt builder…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={onKeyDown}
          className="pl-9 h-11"
          aria-label="Search tools"
          aria-autocomplete="list"
          aria-expanded={focused}
        />

        {focused && results.length > 0 ? (
          <div
            role="listbox"
            className="absolute inset-x-0 top-full z-10 mt-2 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-[#171717]"
          >
            {results.map((t, i) => (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                onClick={() => setFocused(false)}
                role="option"
                aria-selected={i === highlight}
                className={`flex items-center justify-between gap-2 px-4 py-3 text-sm ${
                  i === highlight
                    ? "bg-zinc-100 dark:bg-zinc-800"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-zinc-500 line-clamp-1">
                    {t.shortDescription}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
