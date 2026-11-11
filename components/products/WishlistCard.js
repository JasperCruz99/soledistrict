"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartOff, ShoppingBag } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import ColorSwatches from "@/components/ui/ColorSwatches";
import RatingStars from "@/components/ui/RatingStars";
import QuickAddModal from "./QuickAddModal";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/lib/utils";

export default function WishlistCard({ product }) {
  const { remove } = useWishlist();
  const { addToast } = useToast();
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  function handleRemove() {
    remove(product.id);
    addToast({
      title: "Removed from wishlist",
      description: `${product.name} is no longer saved.`,
      variant: "info",
    });
  }

  return (
    <>
      <article className="relative flex border border-border bg-surface">
        <Link
          href={`/product/${product.slug}`}
          className="relative w-[132px] shrink-0 overflow-hidden bg-[#EFEEE9] sm:w-[170px]"
        >
          <ImageWithFallback
            src={product.images[0]}
            alt={`${product.name} by ${product.brand}`}
            fill
            sizes="(max-width: 640px) 132px, 170px"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          {product.isNew ? (
            <span className="absolute left-2 top-2 bg-accent px-1.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em]">
              New
            </span>
          ) : null}
        </Link>

        <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
                {product.brand}
              </p>
              <h2 className="mt-1 truncate text-sm font-medium sm:text-base">
                <Link
                  href={`/product/${product.slug}`}
                  className="hover:underline"
                >
                  {product.name}
                </Link>
              </h2>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              aria-label={`Remove ${product.name} from wishlist`}
              className="grid size-7 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-background hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <HeartOff className="size-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
            <RatingStars
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          </div>

          <ColorSwatches colors={product.colors} className="mt-2" limit={3} />

          <button
            type="button"
            onClick={() => setQuickAddOpen(true)}
            disabled={!product.available}
            className="btn btn-primary btn-sm mt-auto w-full"
          >
            <ShoppingBag className="size-3.5" aria-hidden="true" />
            {product.available ? "Move to bag" : "Sold out"}
          </button>
        </div>
      </article>

      {product.available && quickAddOpen ? (
        <QuickAddModal
          product={product}
          onClose={() => setQuickAddOpen(false)}
          onAdded={() => remove(product.id)}
        />
      ) : null}
    </>
  );
}
