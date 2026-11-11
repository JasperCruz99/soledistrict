"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import WishlistButton from "@/components/ui/WishlistButton";
import ColorSwatches from "@/components/ui/ColorSwatches";
import RatingStars from "@/components/ui/RatingStars";
import QuickAddModal from "./QuickAddModal";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({
  product,
  priority = false,
  showRating = false,
  className = "",
}) {
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [primaryImage, secondaryImage] = product.images;

  return (
    <>
      <article className={`group/card flex flex-col ${className}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-[#EFEEE9]">
          <Link
            href={`/product/${product.slug}`}
            aria-label={`View ${product.name} by ${product.brand}`}
            className="absolute inset-0 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground"
          >
            <ImageWithFallback
              src={primaryImage}
              alt={`${product.name} by ${product.brand}`}
              fill
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.025]"
            />
            {secondaryImage ? (
              <ImageWithFallback
                src={secondaryImage}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
              />
            ) : null}
          </Link>

          <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
            {product.isNew ? (
              <span className="bg-accent px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-foreground">
                New
              </span>
            ) : null}
            {!product.available ? (
              <span className="bg-foreground px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
                Sold out
              </span>
            ) : null}
          </div>

          <WishlistButton
            product={product}
            className="absolute right-3 top-3 z-20"
          />
        </div>

        <div className="flex flex-1 flex-col pt-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
            {product.brand}
          </p>
          <div className="mt-0.5 flex items-start justify-between gap-2">
            <h3 className="text-[15px] font-medium leading-snug">
              <Link
                href={`/product/${product.slug}`}
                className="transition-colors hover:text-muted"
              >
                {product.name}
              </Link>
            </h3>
            <span className="shrink-0 text-sm font-semibold">
              {formatPrice(product.price)}
            </span>
          </div>

          {showRating ? (
            <RatingStars
              rating={product.rating}
              reviewCount={product.reviewCount}
              className="mt-1.5"
            />
          ) : null}

          <ColorSwatches
            colors={product.colors}
            limit={3}
            className="mt-2.5"
            label={`${product.name} available colors`}
          />

          <button
            type="button"
            onClick={() => setQuickAddOpen(true)}
            disabled={!product.available}
            className="mt-3 flex min-h-9 w-full items-center justify-center gap-1.5 border border-border bg-surface px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-surface disabled:hover:text-foreground sm:opacity-0 sm:group-hover/card:opacity-100 sm:group-focus-within/card:opacity-100"
            aria-label={
              product.available
                ? `Quick add ${product.name} to bag`
                : `${product.name} is sold out`
            }
          >
            {product.available ? (
              <>
                Quick add
                <Plus className="size-3" aria-hidden="true" />
              </>
            ) : (
              "Sold out"
            )}
          </button>
        </div>
      </article>

      {product.available && quickAddOpen ? (
        <QuickAddModal
          product={product}
          onClose={() => setQuickAddOpen(false)}
        />
      ) : null}
    </>
  );
}
