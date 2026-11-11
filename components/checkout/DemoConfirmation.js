import Link from "next/link";
import { ArrowRight, Check, Home, Info } from "lucide-react";
import CheckoutOrderSummary from "./CheckoutOrderSummary";

export default function DemoConfirmation({ confirmation }) {
  const { reference, items, totals, discount, details, paymentLabel } =
    confirmation;

  return (
    <div className="shell py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="border border-border bg-surface">
          <div className="border-b border-border px-6 py-10 text-center sm:px-10 sm:py-12">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent">
              <Check className="size-8" aria-hidden="true" />
            </span>
            <p className="eyebrow mt-6 text-muted">Frontend demonstration</p>
            <h2 className="headline mt-3 text-[clamp(2rem,5vw,3.25rem)] uppercase">
              Demo order complete.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
              This confirmation is simulated. No order was submitted, no card
              details were collected, and no payment was processed.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em]">
              Demo reference
              <span className="font-mono text-foreground">{reference}</span>
            </p>
          </div>

          <div className="grid gap-8 px-6 py-8 sm:px-10 sm:py-10 md:grid-cols-2">
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                Shipping details
              </h3>
              <address className="mt-3 text-sm not-italic leading-relaxed">
                <span className="block font-medium">{details.fullName}</span>
                <span className="mt-1 block text-muted">{details.address}</span>
                <span className="block text-muted">
                  {details.city}, {details.state} {details.postalCode}
                </span>
                <span className="block text-muted">{details.country}</span>
              </address>
              <p className="mt-3 text-xs text-muted">{details.email}</p>
              <p className="text-xs text-muted">{details.phone}</p>
            </div>

            <div className="md:border-l md:border-border md:pl-8">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                Payment method
              </h3>
              <p className="mt-3 text-sm font-medium">{paymentLabel}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Demo selection only. Nothing was authorized or charged.
              </p>

              <div className="mt-6 flex gap-2.5 border border-border bg-background px-3 py-3 text-[11px] leading-relaxed text-muted">
                <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                <p>
                  This demo stores the confirmation on screen only. It is not
                  saved, emailed, or shared with any real fulfillment service.
                </p>
              </div>
            </div>
          </div>
        </div>

        <CheckoutOrderSummary
          items={items}
          totals={totals}
          discount={discount}
          title="Your demo selection"
          className="mt-6"
        />

        <div className="mt-8 flex flex-col justify-center gap-2 sm:flex-row">
          <Link href="/shop" className="btn btn-primary">
            Continue shopping
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link href="/" className="btn btn-outline">
            <Home className="size-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
