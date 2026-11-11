"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function CartContent() {
  const { items, totals, hydrated, clearCart } = useCart();
  const { addToast } = useToast();

  if (!hydrated) {
    return (
      <div className="shell py-12">
        <div className="h-6 w-40 animate-pulse bg-[#EAE9E4]" />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            {[0, 1].map((index) => (
              <div key={index} className="flex gap-4">
                <div className="h-[140px] w-[110px] animate-pulse bg-[#EAE9E4]" />
                <div className="flex-1 space-y-3 py-2">
                  <div className="h-2.5 w-20 animate-pulse bg-[#EAE9E4]" />
                  <div className="h-4 w-2/3 animate-pulse bg-[#EAE9E4]" />
                  <div className="h-3 w-1/3 animate-pulse bg-[#EAE9E4]" />
                </div>
              </div>
            ))}
          </div>
          <div className="h-[340px] animate-pulse bg-[#EAE9E4]" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="shell py-12 sm:py-16">
        <div className="flex flex-col items-center border border-border bg-surface px-6 py-16 text-center sm:py-24">
          <span className="grid size-16 place-items-center rounded-full bg-background">
            <ShoppingBag className="size-7 text-muted" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em]">
            Your bag is empty.
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Nothing here yet. Explore the collection and find your next
            everyday pair.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link href="/shop" className="btn btn-primary">
              Shop all sneakers
            </Link>
            <Link href="/wishlist" className="btn btn-outline">
              View wishlist
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function handleClear() {
    clearCart();
    addToast({
      title: "Bag cleared",
      description: "All items were removed from your bag.",
      variant: "info",
    });
  }

  return (
    <div className="shell py-10 sm:py-12">
      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
          {totals.itemCount} item{totals.itemCount === 1 ? "" : "s"} in your bag
        </p>
        <button
          type="button"
          onClick={handleClear}
          className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted underline-offset-4 transition-colors hover:text-error hover:underline"
        >
          Clear bag
        </button>
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12 xl:gap-16">
        <div>
          {items.map((item) => (
            <CartItem key={item.key} item={item} />
          ))}
          <Link
            href="/shop"
            className="mt-6 inline-block text-[10px] font-semibold uppercase tracking-[0.12em] text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            ← Continue shopping
          </Link>
        </div>

        <OrderSummary className="lg:sticky lg:top-24 lg:self-start" />
      </div>
    </div>
  );
}
