import { Info } from "lucide-react";
import PageIntro from "@/components/ui/PageIntro";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata = {
  title: "Demo Checkout",
  description:
    "A frontend-only SoleDistrict checkout demonstration. No payment is processed and no real order is submitted.",
};

export default function CheckoutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Frontend demonstration"
        title="Checkout."
        breadcrumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]}
        description="Try the complete checkout flow with sample details. This is a demonstration — no payment is processed, no card details are collected, and no real order is submitted."
      >
        <div className="max-w-sm border border-border bg-surface p-4">
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em]">
            <Info className="size-3.5" aria-hidden="true" />
            Demo mode only
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-muted">
            Use any sample information. Nothing entered here is stored, emailed,
            or shared with a real fulfillment or payment service.
          </p>
        </div>
      </PageIntro>
      <CheckoutClient />
    </>
  );
}
