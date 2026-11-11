"use client";

import { ChevronDown } from "lucide-react";

const options = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "best-selling", label: "Best Selling" },
];

export default function SortSelect({ value, onChange, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <label htmlFor="sort-products" className="sr-only">
        Sort products
      </label>
      <select
        id="sort-products"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full appearance-none border border-border bg-surface pl-3 pr-9 text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 sm:min-w-[190px]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
    </div>
  );
}
