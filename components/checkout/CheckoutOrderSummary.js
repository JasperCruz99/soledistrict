import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { formatPrice } from "@/lib/utils";

export default function CheckoutOrderSummary({
  items,
  totals,
  discount,
  title = "Order summary",
  className = "",
}) {
  return (
    <div className={`border border-border bg-surface p-5 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">
          {title}
        </h2>
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
          {totals.itemCount} item{totals.itemCount === 1 ? "" : "s"}
        </span>
      </div>

      <ul className="divide-y divide-border">
        {items.map((item, index) => (
          <li
            key={item.key ?? `${item.productId}-${item.size}-${item.color}-${index}`}
            className="flex gap-3 py-4"
          >
            <div className="relative h-[72px] w-[58px] shrink-0 overflow-hidden bg-[#EFEEE9]">
              <ImageWithFallback
                src={item.image}
                alt={`${item.name} sneaker`}
                fill
                sizes="58px"
                className="object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
                  {item.brand}
                </p>
                <p className="mt-0.5 truncate text-sm font-medium">{item.name}</p>
                <p className="mt-1 text-[11px] text-muted">
                  {item.size ? `US ${item.size}` : "One size"} / {item.color}
                </p>
                <p className="mt-0.5 text-[11px] text-muted">
                  Qty {item.quantity}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="space-y-2.5 border-t border-border pt-4 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted">Subtotal</span>
          <span className="font-semibold">{formatPrice(totals.subtotal)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted">Shipping estimate</span>
          <span className="font-semibold">
            {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
          </span>
        </div>
        {discount ? (
          <div className="flex justify-between gap-4 text-success">
            <span>Sample discount ({discount.code})</span>
            <span className="font-semibold">
              −{formatPrice(totals.discountAmount)}
            </span>
          </div>
        ) : null}
        <div className="flex justify-between gap-4 border-t border-border pt-3 text-base">
          <span className="font-medium">Estimated total</span>
          <span className="font-semibold">{formatPrice(totals.total)}</span>
        </div>
      </div>

      <p className="mt-4 text-[10px] leading-relaxed text-muted">
        Shipping and discounts are sample estimates for this frontend demo, not
        real quotes. No payment will be processed.
      </p>
    </div>
  );
}
