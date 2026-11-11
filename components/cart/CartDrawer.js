"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Check, ShoppingBag, X } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import {
  useBodyScrollLock,
  useEscapeKey,
  useFocusTrap,
} from "@/lib/hooks";

export default function CartDrawer() {
  const {
    items,
    totals,
    discount,
    drawerOpen,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart();
  const { addToast } = useToast();
  const pathname = usePathname();
  const panelRef = useRef(null);

  useBodyScrollLock(drawerOpen);
  useEscapeKey(drawerOpen, closeCart);
  useFocusTrap(drawerOpen, panelRef);

  useEffect(() => {
    closeCart();
  }, [pathname, closeCart]);

  if (!drawerOpen) return null;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totals.subtotal);
  const progress = Math.min(
    100,
    Math.round((totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  function handleRemove(item) {
    removeItem(item.key);
    addToast({
      title: "Removed from bag",
      description: `${item.name} — ${item.size ? `US ${item.size}, ` : ""}${item.color}`,
      variant: "info",
    });
  }

  return (
    <div className="fixed inset-0 z-[95]">
      <div
        className="absolute inset-0 bg-foreground/45 backdrop-blur-[2px] motion-safe:animate-fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-surface shadow-[-20px_0_80px_rgba(0,0,0,0.18)] motion-safe:animate-slide-in-right"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="eyebrow text-muted">Your selection</p>
            <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em]">
              Shopping bag
              <span className="ml-2 text-sm font-medium text-muted">
                ({totals.itemCount})
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close shopping bag"
            className="grid size-9 place-items-center rounded-full border border-border transition-colors hover:bg-foreground hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        {items.length > 0 ? (
          <>
            <div className="border-b border-border px-5 py-3.5">
              <p className="flex items-center gap-1.5 text-[11px] text-muted">
                {remaining === 0 ? (
                  <>
                    <Check className="size-3.5 text-success" aria-hidden="true" />
                    <span className="font-medium text-foreground">
                      Free shipping unlocked.
                    </span>
                  </>
                ) : (
                  <>
                    You&apos;re{" "}
                    <span className="font-semibold text-foreground">
                      {formatPrice(remaining)}
                    </span>{" "}
                    away from free shipping.
                  </>
                )}
              </p>
              <div className="mt-2 h-1 w-full overflow-hidden bg-border">
                <div
                  className="h-full bg-foreground transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Progress toward free shipping"
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3 py-4">
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative h-[92px] w-[74px] shrink-0 overflow-hidden bg-[#EFEEE9]"
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={`${item.name} sneaker`}
                      fill
                      sizes="74px"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                          {item.brand}
                        </p>
                        <Link
                          href={`/product/${item.slug}`}
                          className="mt-0.5 block truncate text-sm font-medium hover:underline"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <p className="shrink-0 text-sm font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <p className="mt-1 text-[11px] text-muted">
                      {item.size ? `US ${item.size}` : "One size"} / {item.color}
                    </p>

                    <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(quantity) => updateQuantity(item.key, quantity)}
                        compact
                        label={`Quantity for ${item.name}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemove(item)}
                        className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted underline-offset-4 transition-colors hover:text-error hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border bg-surface px-5 py-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-semibold">{formatPrice(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Shipping estimate</span>
                  <span className="font-semibold">
                    {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
                  </span>
                </div>
                {discount ? (
                  <div className="flex justify-between text-success">
                    <span>Demo discount ({discount.code})</span>
                    <span className="font-semibold">
                      −{formatPrice(totals.discountAmount)}
                    </span>
                  </div>
                ) : null}
                <div className="flex justify-between border-t border-border pt-2 text-base">
                  <span className="font-medium">Estimated total</span>
                  <span className="font-semibold">{formatPrice(totals.total)}</span>
                </div>
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-muted">
                Shipping and discounts are sample estimates for this demo, not
                real quotes.
              </p>
              <div className="mt-3 grid gap-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn btn-primary w-full"
                >
                  Checkout
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="btn btn-outline w-full"
                >
                  View bag
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-background">
              <ShoppingBag className="size-7 text-muted" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em]">
              Your bag is empty
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              Find your next pair in the collection. New drops land every week.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="btn btn-primary mt-6"
            >
              Shop all sneakers
            </Link>
            <button
              type="button"
              onClick={closeCart}
              className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted underline-offset-4 hover:text-foreground hover:underline"
            >
              Continue browsing
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
