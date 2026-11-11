"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import Modal from "@/components/ui/Modal";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { buildCartItem } from "@/lib/cart";
import { cn, formatPrice } from "@/lib/utils";

export default function QuickAddModal({ product, onClose, onAdded }) {
  const { addItem } = useCart();
  const { addToast } = useToast();
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(product.colors?.[0]?.name ?? "");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!product.available) {
      setError("This pair is currently sold out.");
      return;
    }
    if (product.sizes.length > 0 && size == null) {
      setError("Please select a size to continue.");
      return;
    }

    addItem(buildCartItem(product, { size, color, quantity: 1 }));
    setError("");
    onClose();
    onAdded?.(product);
    addToast({
      title: "Added to your bag",
      description: `${product.name} — ${size != null ? `US ${size}, ` : ""}${color}`,
      action: { label: "View bag", href: "/cart" },
    });
  }

  return (
    <Modal
      open
      onClose={onClose}
      title="Quick add"
      eyebrow={product.brand}
      className="sm:max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex gap-4">
          <div className="relative h-[104px] w-[84px] shrink-0 overflow-hidden bg-[#EFEEE9]">
            <ImageWithFallback
              src={product.images[0]}
              alt={`${product.name} sneaker`}
              fill
              sizes="84px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-medium leading-snug">{product.name}</h3>
            <p className="mt-0.5 text-xs text-muted">{product.category}</p>
            <p className="mt-2 text-sm font-semibold">{formatPrice(product.price)}</p>
          </div>
        </div>

        {product.colors?.length > 0 ? (
          <fieldset>
            <legend className="text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground">
              Color: <span className="font-normal text-muted">{color}</span>
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => setColor(option.name)}
                  aria-pressed={color === option.name}
                  className={cn(
                    "flex items-center gap-2 border px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                    color === option.name
                      ? "border-foreground bg-foreground text-white"
                      : "border-border bg-surface hover:border-foreground"
                  )}
                >
                  <span
                    className="size-3 rounded-full border border-black/15"
                    style={{ backgroundColor: option.hex }}
                    aria-hidden="true"
                  />
                  {option.name}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        <fieldset>
          <legend className="flex w-full items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground">
            <span>Select size</span>
            <span className="font-normal normal-case tracking-normal text-muted">
              US sizing
            </span>
          </legend>
          <div className="mt-2 grid grid-cols-5 gap-1.5">
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSize(option);
                  setError("");
                }}
                aria-pressed={size === option}
                className={cn(
                  "grid h-9 place-items-center border text-xs font-medium transition-colors",
                  size === option
                    ? "border-foreground bg-foreground text-white"
                    : "border-border bg-surface hover:border-foreground"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        {error ? (
          <p role="alert" className="text-xs font-medium text-error">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
          <button
            type="submit"
            disabled={!product.available}
            className="btn btn-primary w-full sm:w-auto"
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            {product.available ? "Add to bag" : "Sold out"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
