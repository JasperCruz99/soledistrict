"use client";

import Link from "next/link";
import { X } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/lib/utils";

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();
  const { addToast } = useToast();

  function handleRemove() {
    removeItem(item.key);
    addToast({
      title: "Removed from bag",
      description: `${item.name} — ${item.size ? `US ${item.size}, ` : ""}${item.color}`,
      variant: "info",
    });
  }

  return (
    <article className="flex gap-4 border-b border-border py-6 first:pt-0">
      <Link
        href={`/product/${item.slug}`}
        className="relative h-[132px] w-[102px] shrink-0 overflow-hidden bg-[#EFEEE9] sm:h-[152px] sm:w-[118px]"
      >
        <ImageWithFallback
          src={item.image}
          alt={`${item.name} sneaker`}
          fill
          sizes="(max-width: 640px) 102px, 118px"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              {item.brand}
            </p>
            <h2 className="mt-1 truncate text-sm font-medium sm:text-base">
              <Link href={`/product/${item.slug}`} className="hover:underline">
                {item.name}
              </Link>
            </h2>
            <p className="mt-1.5 text-[11px] text-muted">
              {item.size ? `US ${item.size}` : "One size"} / {item.color}
            </p>
            <p className="mt-1 text-[11px] text-muted">
              {formatPrice(item.price)} each
            </p>
          </div>
          <p className="shrink-0 text-sm font-semibold">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <QuantityStepper
            value={item.quantity}
            onChange={(quantity) => updateQuantity(item.key, quantity)}
            compact
            label={`Quantity for ${item.name}`}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted underline-offset-4 transition-colors hover:text-error hover:underline"
          >
            <X className="size-3" aria-hidden="true" />
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
