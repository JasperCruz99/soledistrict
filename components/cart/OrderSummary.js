"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Tag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function OrderSummary({
  showDiscountForm = true,
  showCheckoutButton = true,
  className = "",
}) {
  const {
    items,
    totals,
    discount,
    applyDiscount,
    removeDiscount,
  } = useCart();
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState(null);

  function handleApply(event) {
    event.preventDefault();
    const result = applyDiscount(code);
    if (result.success) {
      setCode("");
      setFeedback({ type: "success", message: result.message });
    } else {
      setFeedback({ type: "error", message: result.message });
    }
  }

  return (
    <div className={`border border-border bg-surface p-5 sm:p-6 ${className}`}>
      <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">
        Order summary
      </h2>

      <div className="mt-4 space-y-2.5 border-y border-border py-4 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted">
            Subtotal ({totals.itemCount} item{totals.itemCount === 1 ? "" : "s"})
          </span>
          <span className="font-semibold">{formatPrice(totals.subtotal)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted">Shipping estimate</span>
          <span className="font-semibold">
            {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
          </span>
        </div>
        {discount ? (
          <div className="flex items-center justify-between gap-4 text-success">
            <span className="flex items-center gap-1.5">
              Demo discount ({discount.code})
              <button
                type="button"
                onClick={() => {
                  removeDiscount();
                  setFeedback(null);
                }}
                aria-label="Remove discount code"
                className="text-muted transition-colors hover:text-error"
              >
                <X className="size-3" aria-hidden="true" />
              </button>
            </span>
            <span className="font-semibold">
              −{formatPrice(totals.discountAmount)}
            </span>
          </div>
        ) : null}
        <div className="flex justify-between border-t border-border pt-3 text-base">
          <span className="font-medium">Estimated total</span>
          <span className="font-semibold">{formatPrice(totals.total)}</span>
        </div>
      </div>

      {showDiscountForm ? (
        <div className="mt-4">
          {discount ? (
            <div className="flex items-center gap-2 border border-success/25 bg-success/[0.06] px-3 py-2.5 text-xs text-success">
              <Check className="size-3.5 shrink-0" aria-hidden="true" />
              <span>
                Sample code <strong>{discount.code}</strong> applied —{" "}
                {discount.percent}% off.
              </span>
            </div>
          ) : (
            <form onSubmit={handleApply} noValidate>
              <label
                htmlFor="discount-code"
                className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
              >
                <Tag className="size-3.5" aria-hidden="true" />
                Discount code
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="discount-code"
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value);
                    if (feedback) setFeedback(null);
                  }}
                  placeholder="Enter code"
                  autoComplete="off"
                  aria-describedby="discount-hint discount-feedback"
                  className="field h-10 min-w-0 flex-1 py-0 text-xs"
                />
                <button type="submit" className="btn btn-outline btn-sm">
                  Apply
                </button>
              </div>
              <p id="discount-hint" className="mt-1.5 text-[10px] text-muted">
                Try the sample code{" "}
                <button
                  type="button"
                  onClick={() => setCode("SOLE10")}
                  className="font-semibold text-foreground underline-offset-2 hover:underline"
                >
                  SOLE10
                </button>{" "}
                for 10% off.
              </p>
              <div id="discount-feedback" aria-live="polite">
                {feedback ? (
                  <p
                    className={`mt-1.5 text-[11px] font-medium ${
                      feedback.type === "error" ? "text-error" : "text-success"
                    }`}
                  >
                    {feedback.message}
                  </p>
                ) : null}
              </div>
            </form>
          )}
        </div>
      ) : null}

      {showCheckoutButton ? (
        <div className="mt-4 space-y-2">
          <Link
            href="/checkout"
            aria-disabled={items.length === 0}
            onClick={(event) => {
              if (items.length === 0) event.preventDefault();
            }}
            className={`btn btn-primary w-full ${
              items.length === 0 ? "pointer-events-none opacity-45" : ""
            }`}
          >
            Proceed to checkout
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link href="/shop" className="btn btn-outline w-full">
            Continue shopping
          </Link>
        </div>
      ) : null}

      <p className="mt-4 text-[10px] leading-relaxed text-muted">
        Shipping and discounts shown are sample estimates for this demo, not
        real quotes. No payment will be processed.
      </p>
    </div>
  );
}
