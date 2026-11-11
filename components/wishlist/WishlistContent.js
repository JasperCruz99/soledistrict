"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import WishlistCard from "@/components/products/WishlistCard";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { getProductById } from "@/data/products";

export default function WishlistContent() {
  const { ids, hydrated, clearWishlist } = useWishlist();
  const { addToast } = useToast();
  const products = ids.map((id) => getProductById(id)).filter(Boolean);

  if (!hydrated) {
    return (
      <div className="shell py-10 sm:py-12">
        <div className="h-5 w-36 animate-pulse bg-[#EAE9E4]" />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {[0, 1].map((index) => (
            <div
              key={index}
              className="flex h-[220px] animate-pulse border border-border bg-surface"
            >
              <div className="h-full w-[150px] bg-[#EAE9E4]" />
              <div className="flex-1 space-y-3 p-5">
                <div className="h-2.5 w-20 bg-[#EAE9E4]" />
                <div className="h-4 w-2/3 bg-[#EAE9E4]" />
                <div className="h-3 w-1/3 bg-[#EAE9E4]" />
                <div className="mt-10 h-8 w-full bg-[#EAE9E4]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="shell py-12 sm:py-16">
        <div className="flex flex-col items-center border border-border bg-surface px-6 py-16 text-center sm:py-24">
          <span className="grid size-16 place-items-center rounded-full bg-background">
            <Heart className="size-7 text-muted" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em]">
            Your wishlist is empty.
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Tap the heart on any pair to save it here. Your wishlist stays with
            you on this device.
          </p>
          <Link href="/shop" className="btn btn-primary mt-6">
            Discover the collection
          </Link>
        </div>
      </div>
    );
  }

  function handleClear() {
    clearWishlist();
    addToast({
      title: "Wishlist cleared",
      description: "All saved pairs were removed.",
      variant: "info",
    });
  }

  return (
    <div className="shell py-10 sm:py-12">
      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
          {products.length} saved pair{products.length === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          onClick={handleClear}
          className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted underline-offset-4 transition-colors hover:text-error hover:underline"
        >
          Clear wishlist
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {products.map((product) => (
          <WishlistCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
        <p className="text-xs text-muted">
          Saved on this device. Add a size to move a pair into your bag.
        </p>
        <Link
          href="/shop"
          className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground underline-offset-4 hover:underline"
        >
          Continue shopping →
        </Link>
      </div>
    </div>
  );
}
