"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PackageSearch, Search, SlidersHorizontal, X } from "lucide-react";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
import FilterDrawer from "@/components/products/FilterDrawer";
import SortSelect from "@/components/products/SortSelect";
import { categories, products } from "@/data/products";

const PAGE_SIZE = 9;

const emptyFilters = {
  categories: [],
  brands: [],
  sizes: [],
  colors: [],
  minPrice: "",
  maxPrice: "",
  inStock: false,
};

function sortProducts(list, sort) {
  const sorted = [...list];

  switch (sort) {
    case "newest":
      return sorted.sort(
        (a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id
      );
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "best-selling":
      return sorted.sort(
        (a, b) =>
          Number(b.bestSeller) - Number(a.bestSeller) ||
          b.reviewCount - a.reviewCount
      );
    default:
      return sorted.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          b.reviewCount - a.reviewCount
      );
  }
}

export default function ShopClient() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") ?? "";
  const urlQuery = searchParams.get("q") ?? "";
  const urlKey = `${urlCategory}::${urlQuery}`;
  const validUrlCategory = categories.some(
    (category) => category.name === urlCategory
  )
    ? urlCategory
    : "";

  const [filters, setFilters] = useState(() => ({
    ...emptyFilters,
    categories: validUrlCategory ? [validUrlCategory] : [],
  }));
  const [query, setQuery] = useState(urlQuery);
  const [sort, setSort] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastUrlKey, setLastUrlKey] = useState(urlKey);

  if (lastUrlKey !== urlKey) {
    setLastUrlKey(urlKey);
    setFilters((current) => ({
      ...current,
      categories: validUrlCategory ? [validUrlCategory] : [],
    }));
    setQuery(urlQuery);
    setVisibleCount(PAGE_SIZE);
    setDrawerOpen(false);
  }

  const filteredProducts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const minPrice =
      filters.minPrice === ""
        ? 0
        : Math.max(0, Number(filters.minPrice) || 0);
    const maxPrice =
      filters.maxPrice === ""
        ? Number.POSITIVE_INFINITY
        : Math.max(0, Number(filters.maxPrice) || Number.POSITIVE_INFINITY);

    const matches = products.filter((product) => {
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      ) {
        return false;
      }
      if (
        filters.brands.length > 0 &&
        !filters.brands.includes(product.brand)
      ) {
        return false;
      }
      if (
        filters.sizes.length > 0 &&
        !product.sizes.some((size) => filters.sizes.includes(String(size)))
      ) {
        return false;
      }
      if (
        filters.colors.length > 0 &&
        !product.colors.some((color) => filters.colors.includes(color.name))
      ) {
        return false;
      }
      if (filters.inStock && !product.available) {
        return false;
      }
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }
      if (needle) {
        const haystack = [
          product.name,
          product.brand,
          product.category,
          ...product.colors.map((color) => color.name),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      return true;
    });

    return sortProducts(matches, sort);
  }, [filters, query, sort]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.inStock ? 1 : 0) +
    (filters.minPrice !== "" ? 1 : 0) +
    (filters.maxPrice !== "" ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0 || query.trim().length > 0;

  function updateFilters(nextFilters) {
    setFilters(nextFilters);
    setVisibleCount(PAGE_SIZE);
  }

  function clearAll() {
    setFilters({ ...emptyFilters });
    setQuery("");
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div className="shell py-8 sm:py-10 lg:py-12">
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-lg">
          <label htmlFor="shop-search" className="sr-only">
            Search products by name, brand or category
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search the collection"
            autoComplete="off"
            className="field h-11 pr-10 pl-9"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setVisibleCount(PAGE_SIZE);
              }}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors hover:bg-black/[0.05] hover:text-foreground"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex items-center justify-between gap-3 sm:justify-start">
            <p
              aria-live="polite"
              className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted"
            >
              {filteredProducts.length} product
              {filteredProducts.length === 1 ? "" : "s"}
            </p>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="btn btn-outline btn-sm lg:hidden"
            >
              <SlidersHorizontal className="size-3.5" aria-hidden="true" />
              Filters
              {activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </button>
          </div>
          <SortSelect
            value={sort}
            onChange={(value) => {
              setSort(value);
              setVisibleCount(PAGE_SIZE);
            }}
            className="w-full sm:w-auto"
          />
        </div>
      </div>

      <div className="mt-7 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[270px_minmax(0,1fr)] xl:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain pr-2">
            <ProductFilters
              filters={filters}
              onChange={updateFilters}
              onClear={clearAll}
              hasActiveFilters={hasActiveFilters}
              resultCount={filteredProducts.length}
              idPrefix="sidebar"
            />
          </div>
        </aside>

        <div className="min-w-0">
          {filteredProducts.length > 0 ? (
            <>
              <ProductGrid
                products={visibleProducts}
                columns={3}
                priorityCount={3}
              />

              <div className="mt-12 flex flex-col items-center gap-3 border-t border-border pt-8">
                {visibleCount < filteredProducts.length ? (
                  <>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-muted">
                      Showing {visibleProducts.length} of{" "}
                      {filteredProducts.length} products
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleCount((count) => count + PAGE_SIZE)
                      }
                      className="btn btn-outline"
                    >
                      Load more
                    </button>
                  </>
                ) : (
                  <p className="text-[10px] uppercase tracking-[0.12em] text-muted">
                    You&apos;ve viewed all {filteredProducts.length} product
                    {filteredProducts.length === 1 ? "" : "s"}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center border border-border bg-surface px-6 py-16 text-center sm:py-20">
              <span className="grid size-14 place-items-center rounded-full bg-background">
                <PackageSearch
                  className="size-6 text-muted"
                  aria-hidden="true"
                />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em]">
                No pairs match those filters.
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                Try widening the price range or removing a filter. The whole
                collection is only a reset away.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="btn btn-primary mt-6"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {drawerOpen ? (
        <FilterDrawer
          onClose={() => setDrawerOpen(false)}
          resultCount={filteredProducts.length}
        >
          <ProductFilters
            filters={filters}
            onChange={updateFilters}
            onClear={clearAll}
            hasActiveFilters={hasActiveFilters}
            resultCount={filteredProducts.length}
            idPrefix="drawer"
          />
        </FilterDrawer>
      ) : null}
    </div>
  );
}
