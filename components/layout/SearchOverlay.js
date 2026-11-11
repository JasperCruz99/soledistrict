"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  X,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import {
  categories,
  getNewArrivals,
  products,
} from "@/data/products";
import { formatPrice, makeSearchHref } from "@/lib/utils";
import {
  useBodyScrollLock,
  useEscapeKey,
  useFocusTrap,
} from "@/lib/hooks";

const trending = getNewArrivals().slice(0, 4);

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  useBodyScrollLock(true);
  useEscapeKey(true, onClose);
  useFocusTrap(true, panelRef, inputRef);

  const trimmedQuery = query.trim();

  const results = useMemo(() => {
    const needle = trimmedQuery.toLowerCase();
    if (!needle) return [];
    return products
      .filter((product) => {
        const haystack = [
          product.name,
          product.brand,
          product.category,
          ...product.colors.map((color) => color.name),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(needle);
      })
      .slice(0, 6);
  }, [trimmedQuery]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!trimmedQuery) return;
    router.push(makeSearchHref(trimmedQuery));
    onClose();
  }

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      className="fixed inset-0 z-[90] flex flex-col bg-background motion-safe:animate-fade-in"
    >
      <div className="shell flex h-16 shrink-0 items-center justify-between border-b border-border sm:h-[72px]">
        <Logo className="text-[23px] sm:text-[27px]" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="grid size-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-5 pb-16 pt-8 sm:px-8 sm:pt-12">
          <p className="eyebrow text-muted">
            <span className="inline-block size-1.5 bg-foreground" aria-hidden="true" />
            Search the district
          </p>

          <form onSubmit={handleSubmit} role="search" className="mt-4">
            <label htmlFor="site-search" className="sr-only">
              Search products by name, brand or category
            </label>
            <div className="flex items-center gap-3 border-b-2 border-foreground pb-1">
              <Search className="size-5 shrink-0 text-muted sm:size-6" aria-hidden="true" />
              <input
                ref={inputRef}
                id="site-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try “Meridian”, “running” or “black”"
                autoComplete="off"
                className="w-full appearance-none bg-transparent py-3 text-lg font-medium text-foreground outline-none placeholder:text-muted/60 sm:py-4 sm:text-2xl"
              />
              <button
                type="submit"
                disabled={!trimmedQuery}
                className="btn btn-primary btn-sm hidden shrink-0 sm:inline-flex"
              >
                Search
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.12em] text-muted">
              <span>
                {trimmedQuery
                  ? `${results.length} result${results.length === 1 ? "" : "s"} on this page`
                  : "Search name, brand or category"}
              </span>
              <span className="hidden sm:inline">Press Enter for all results</span>
            </div>
          </form>

          <div aria-live="polite">
            {trimmedQuery ? (
              results.length > 0 ? (
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg font-semibold tracking-[-0.02em]">
                      Matching products
                    </h2>
                    <button
                      type="button"
                      onClick={() => {
                        router.push(makeSearchHref(trimmedQuery));
                        onClose();
                      }}
                      className="group inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-foreground"
                    >
                      See all
                      <ArrowRight
                        className="size-3.5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <ul className="mt-3 divide-y divide-border border-y border-border">
                    {results.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={onClose}
                          className="group flex items-center gap-4 py-3"
                        >
                          <span className="relative block h-[68px] w-[58px] shrink-0 overflow-hidden bg-[#EFEEE9]">
                            <ImageWithFallback
                              src={product.images[0]}
                              alt={`${product.name} sneaker`}
                              fill
                              sizes="58px"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                              {product.brand}
                            </span>
                            <span className="mt-0.5 block truncate text-sm font-medium">
                              {product.name}
                            </span>
                            <span className="mt-0.5 block text-[11px] text-muted">
                              {product.category}
                            </span>
                          </span>
                          <span className="text-sm font-semibold">
                            {formatPrice(product.price)}
                          </span>
                          <ArrowUpRight
                            className="size-4 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mt-10 border border-border bg-surface px-6 py-10 text-center">
                  <p className="font-display text-xl font-semibold tracking-[-0.02em]">
                    No matches for “{trimmedQuery}”
                  </p>
                  <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                    Try a different product name, brand, category or color — or
                    browse the full collection.
                  </p>
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="btn btn-outline btn-sm mt-5"
                  >
                    Clear search
                  </button>
                </div>
              )
            ) : (
              <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
                <div>
                  <h2 className="font-display text-lg font-semibold tracking-[-0.02em]">
                    Browse categories
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/shop?category=${encodeURIComponent(category.name)}`}
                        onClick={onClose}
                        className="border border-border bg-surface px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors hover:border-foreground hover:bg-foreground hover:text-white"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                  <p className="mt-5 text-xs leading-relaxed text-muted">
                    Tip: press <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 text-[10px]">/</kbd>{" "}
                    from anywhere on the site to search.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-lg font-semibold tracking-[-0.02em]">
                    Trending now
                  </h2>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                    {trending.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="group"
                      >
                        <span className="relative block aspect-[4/5] overflow-hidden bg-[#EFEEE9]">
                          <ImageWithFallback
                            src={product.images[0]}
                            alt={`${product.name} sneaker`}
                            fill
                            sizes="(max-width: 640px) 40vw, 160px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute left-2 top-2 bg-accent px-1.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em]">
                            New
                          </span>
                        </span>
                        <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">
                          {product.brand}
                        </span>
                        <span className="mt-0.5 block text-xs font-medium">
                          {product.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted">
                          {formatPrice(product.price)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
