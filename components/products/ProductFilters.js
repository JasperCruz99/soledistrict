"use client";

import { cn } from "@/lib/utils";
import {
  allColors,
  allSizes,
  brands,
  categories,
  products,
} from "@/data/products";

function toggleValue(list, value) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

function FilterGroup({ legend, children }) {
  return (
    <fieldset className="border-t border-border pt-5">
      <legend className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground">
        {legend}
      </legend>
      <div className="mt-3">{children}</div>
    </fieldset>
  );
}

function countByCategory(category) {
  return products.filter((product) => product.category === category).length;
}

function countByBrand(brand) {
  return products.filter((product) => product.brand === brand).length;
}

export default function ProductFilters({
  filters,
  onChange,
  onClear,
  hasActiveFilters,
  resultCount,
  idPrefix = "filter",
}) {
  function update(partial) {
    onChange({ ...filters, ...partial });
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 pb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
          Refine
        </p>
        <button
          type="button"
          onClick={onClear}
          disabled={!hasActiveFilters}
          className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline disabled:cursor-not-allowed disabled:opacity-35"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-5">
        <fieldset>
          <legend className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground">
            Category
          </legend>
          <div className="mt-2 space-y-0.5">
            {categories.map((category) => (
              <label
                key={category.slug}
                className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                <input
                  type="checkbox"
                  name={`${idPrefix}-category`}
                  value={category.name}
                  checked={filters.categories.includes(category.name)}
                  onChange={() =>
                    update({
                      categories: toggleValue(
                        filters.categories,
                        category.name
                      ),
                    })
                  }
                  className="size-4 shrink-0 accent-foreground"
                />
                <span className="flex-1">{category.name}</span>
                <span className="text-[11px] tabular-nums text-muted/70" aria-hidden="true">
                  {countByCategory(category.name)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <FilterGroup legend="Brand">
          <div className="space-y-0.5">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                <input
                  type="checkbox"
                  name={`${idPrefix}-brand`}
                  value={brand}
                  checked={filters.brands.includes(brand)}
                  onChange={() =>
                    update({ brands: toggleValue(filters.brands, brand) })
                  }
                  className="size-4 shrink-0 accent-foreground"
                />
                <span className="flex-1">{brand}</span>
                <span className="text-[11px] tabular-nums text-muted/70" aria-hidden="true">
                  {countByBrand(brand)}
                </span>
              </label>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup legend="Price range">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label
                htmlFor={`${idPrefix}-price-min`}
                className="text-[10px] text-muted"
              >
                Min ($)
              </label>
              <input
                id={`${idPrefix}-price-min`}
                type="number"
                inputMode="numeric"
                min="0"
                max="500"
                step="5"
                placeholder="0"
                value={filters.minPrice}
                onChange={(event) =>
                  update({ minPrice: event.target.value })
                }
                className="field mt-1 h-9 px-2.5 py-0 text-xs"
              />
            </div>
            <span className="mt-4 text-muted" aria-hidden="true">
              –
            </span>
            <div className="flex-1">
              <label
                htmlFor={`${idPrefix}-price-max`}
                className="text-[10px] text-muted"
              >
                Max ($)
              </label>
              <input
                id={`${idPrefix}-price-max`}
                type="number"
                inputMode="numeric"
                min="0"
                max="500"
                step="5"
                placeholder="Any"
                value={filters.maxPrice}
                onChange={(event) =>
                  update({ maxPrice: event.target.value })
                }
                className="field mt-1 h-9 px-2.5 py-0 text-xs"
              />
            </div>
          </div>
        </FilterGroup>

        <FilterGroup legend="Size (US)">
          <div className="grid grid-cols-5 gap-1.5">
            {allSizes.map((size) => {
              const selected = filters.sizes.includes(String(size));
              return (
                <button
                  key={size}
                  type="button"
                  aria-pressed={selected}
                  onClick={() =>
                    update({ sizes: toggleValue(filters.sizes, String(size)) })
                  }
                  className={cn(
                    "grid h-8 place-items-center border text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1",
                    selected
                      ? "border-foreground bg-foreground text-white"
                      : "border-border bg-surface hover:border-foreground"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </FilterGroup>

        <FilterGroup legend="Color">
          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
            {allColors.map((color) => (
              <label
                key={color.name}
                className="flex cursor-pointer items-center gap-2 rounded-sm py-1.5 text-xs text-muted transition-colors hover:text-foreground has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-foreground"
              >
                <input
                  type="checkbox"
                  name={`${idPrefix}-color`}
                  value={color.name}
                  checked={filters.colors.includes(color.name)}
                  onChange={() =>
                    update({ colors: toggleValue(filters.colors, color.name) })
                  }
                  className="sr-only"
                />
                <span
                  className={cn(
                    "grid size-4 shrink-0 place-items-center rounded-full border",
                    filters.colors.includes(color.name)
                      ? "border-foreground ring-1 ring-foreground ring-offset-1"
                      : "border-black/20"
                  )}
                  style={{ backgroundColor: color.hex }}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "truncate",
                    filters.colors.includes(color.name) && "text-foreground"
                  )}
                >
                  {color.name}
                </span>
              </label>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup legend="Availability">
          <label className="flex cursor-pointer items-start gap-2.5 py-1 text-sm text-muted transition-colors hover:text-foreground">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(event) => update({ inStock: event.target.checked })}
              className="mt-0.5 size-4 shrink-0 accent-foreground"
            />
            <span>
              In stock only
              <span className="mt-0.5 block text-[11px] text-muted/80">
                Hide sold-out pairs
              </span>
            </span>
          </label>
        </FilterGroup>
      </div>

      <p className="mt-5 border-t border-border pt-4 text-[10px] uppercase tracking-[0.12em] text-muted">
        {resultCount} product{resultCount === 1 ? "" : "s"} match
      </p>
    </div>
  );
}

