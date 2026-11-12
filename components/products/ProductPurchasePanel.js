"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  RefreshCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import WishlistButton from "@/components/ui/WishlistButton";
import RatingStars from "@/components/ui/RatingStars";
import QuantityStepper from "@/components/ui/QuantityStepper";
import SizeGuideModal from "./SizeGuideModal";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { buildCartItem } from "@/lib/cart";
import { cn, formatPrice } from "@/lib/utils";

export default function ProductPurchasePanel({ product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { addToast } = useToast();
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name ?? ""
  );
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  function addCurrentToBag() {
    if (!product.available) return false;
    if (product.sizes.length > 0 && selectedSize == null) {
      setError("Please select a size before adding this pair to your bag.");
      return false;
    }

    setError("");
    addItem(
      buildCartItem(product, {
        size: selectedSize,
        color: selectedColor,
        quantity,
      })
    );
    return true;
  }

  function handleAddToBag() {
    if (!addCurrentToBag()) return;
    addToast({
      title: "Added to your bag",
      description: `${product.name} — US ${selectedSize}, ${selectedColor} · Qty ${quantity}`,
      action: { label: "View bag", href: "/cart" },
    });
  }

  function handleBuyNow() {
    if (!addCurrentToBag()) return;
    addToast({
      title: "Bag updated",
      description: "Taking you to the demo checkout.",
      variant: "info",
    });
    router.push("/checkout");
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            {product.brand}
          </p>
          <h1 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] font-semibold uppercase leading-[0.98] tracking-[-0.035em]">
            {product.name}
          </h1>
        </div>
        <WishlistButton product={product} className="mt-1 shrink-0" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <p className="text-xl font-semibold">{formatPrice(product.price)}</p>
        <RatingStars
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
        <a
          href="#reviews"
          className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          Read reviews
        </a>
      </div>

      <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
        {product.description}
      </p>

      <div className="mt-6 border-t border-border pt-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">
            Color:{" "}
            <span className="font-normal text-muted">{selectedColor}</span>
          </p>
          <span
            className={cn(
              "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em]",
              product.available ? "text-success" : "text-error"
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                product.available ? "bg-success" : "bg-error"
              )}
              aria-hidden="true"
            />
            {product.available ? "In stock" : "Sold out"}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.colors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => setSelectedColor(color.name)}
              aria-pressed={selectedColor === color.name}
              className={cn(
                "flex items-center gap-2 border px-3 py-2 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
                selectedColor === color.name
                  ? "border-foreground bg-foreground text-white"
                  : "border-border bg-surface hover:border-foreground"
              )}
            >
              <span
                className="size-3.5 rounded-full border border-black/15"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              />
              {color.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">
            Select size{" "}
            <span className="font-normal text-muted">(US)</span>
          </p>
          <button
            type="button"
            onClick={() => setSizeGuideOpen(true)}
            className="border-b border-foreground text-[10px] font-semibold uppercase tracking-[0.1em] underline-offset-4 hover:text-muted"
          >
            Size guide
          </button>
        </div>
        <div className="mt-2.5 grid grid-cols-5 gap-1.5">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => {
                setSelectedSize(size);
                setError("");
              }}
              disabled={!product.available}
              aria-pressed={selectedSize === size}
              className={cn(
                "grid h-10 place-items-center border text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40",
                selectedSize === size
                  ? "border-foreground bg-foreground text-white"
                  : "border-border bg-surface hover:border-foreground"
              )}
            >
              {size}
            </button>
          ))}
        </div>
        <div aria-live="polite">
          {error ? (
            <p role="alert" className="mt-2 text-xs font-medium text-error">
              {error}
            </p>
          ) : null}
        </div>
        <p className="mt-2.5 text-[11px] text-muted">{product.fitNote}</p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">
          Quantity
        </span>
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          disabled={!product.available}
          label={`Quantity for ${product.name}`}
        />
      </div>

      <div className="mt-4 grid gap-2">
        <button
          type="button"
          onClick={handleAddToBag}
          disabled={!product.available}
          className="btn btn-primary w-full"
        >
          <ShoppingBag className="size-4" aria-hidden="true" />
          {product.available
            ? `Add to bag — ${formatPrice(product.price * quantity)}`
            : "Sold out"}
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!product.available}
          className="btn btn-outline w-full"
        >
          {product.available ? "Buy now" : "Currently unavailable"}
        </button>
      </div>

      {!product.available ? (
        <p className="mt-3 text-xs leading-relaxed text-muted">
          This pair is sold out. Add it to your wishlist to keep it close — new
          stock is not guaranteed in this demo.
        </p>
      ) : null}

      <div className="mt-5 grid grid-cols-3 gap-2 border-y border-border py-3.5">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <Truck className="size-4 text-muted" aria-hidden="true" />
          <span className="text-[9px] uppercase leading-tight tracking-[0.08em] text-muted">
            Free shipping over $100
          </span>
        </div>
        <div className="flex flex-col items-center gap-1.5 border-x border-border text-center">
          <RefreshCcw className="size-4 text-muted" aria-hidden="true" />
          <span className="text-[9px] uppercase leading-tight tracking-[0.08em] text-muted">
            30-day returns
          </span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <ShieldCheck className="size-4 text-muted" aria-hidden="true" />
          <span className="text-[9px] uppercase leading-tight tracking-[0.08em] text-muted">
            Considered quality
          </span>
        </div>
      </div>

      <div className="mt-1">
        <details
          open
          className="group border-b border-border py-4 [&[open]_summary_svg]:rotate-180"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.14em] [&::-webkit-details-marker]:hidden">
            Product information
            <ChevronDown
              className="size-4 text-muted transition-transform duration-300"
              aria-hidden="true"
            />
          </summary>
          <ul className="mt-3 space-y-1.5 pl-4 text-sm leading-relaxed text-muted marker:text-border">
            {product.features.map((feature) => (
              <li key={feature} className="list-disc">
                {feature}
              </li>
            ))}
          </ul>
        </details>

        <details className="group border-b border-border py-4 [&[open]_summary_svg]:rotate-180">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.14em] [&::-webkit-details-marker]:hidden">
            Shipping & returns
            <ChevronDown
              className="size-4 text-muted transition-transform duration-300"
              aria-hidden="true"
            />
          </summary>
          <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
            <p>
              Complimentary standard shipping on orders over $100. Orders under
              $100 ship at a flat $8 estimate.
            </p>
            <p>
              Returns accepted within 30 days in original, unworn condition.
              This is a demo storefront: shipping and return terms are
              illustrative, not a real commercial offer.
            </p>
          </div>
        </details>

        <details className="group border-b border-border py-4 [&[open]_summary_svg]:rotate-180">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.14em] [&::-webkit-details-marker]:hidden">
            Care &amp; materials
            <ChevronDown
              className="size-4 text-muted transition-transform duration-300"
              aria-hidden="true"
            />
          </summary>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
            <p>
              Materials vary by silhouette. Treat the upper according to its
              finish: use a soft brush for mesh and canvas, and a damp cloth for
              leather or synthetic panels.
            </p>
            <ul className="space-y-1.5 pl-4 marker:text-border">
              <li className="list-disc">
                Brush off loose dirt before applying any cleaner.
              </li>
              <li className="list-disc">
                Air-dry at room temperature; keep pairs away from direct heat.
              </li>
              <li className="list-disc">
                Do not machine wash or tumble dry. Store in a cool, dry place.
              </li>
              <li className="list-disc">
                Test any care product on a small, hidden area first.
              </li>
            </ul>
          </div>
        </details>
      </div>

      <SizeGuideModal
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        sizes={product.sizes}
      />
    </div>
  );
}
