import Link from "next/link";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export const metadata = {
  title: "Page Not Found",
  description:
    "The page you were looking for is not part of the SoleDistrict demo store.",
};

export default function NotFound() {
  return (
    <section className="shell py-16 sm:py-20 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:gap-16">
        <div>
          <p className="eyebrow text-muted">
            <span
              className="inline-block size-1.5 bg-foreground"
              aria-hidden="true"
            />
            404 / Off the route
          </p>
          <h1 className="headline mt-5 text-[clamp(3.25rem,9vw,6.5rem)] uppercase">
            Wrong
            <br />
            turn.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-[15px]">
            The page you were looking for is not part of this district. It may
            have moved, sold out, or never existed in the first place. The
            collection is still right where you left it.
          </p>

          <div className="mt-7 flex flex-col gap-2 sm:flex-row">
            <Link href="/shop" className="btn btn-primary">
              Shop all sneakers
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/" className="btn btn-outline">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back home
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6 text-[10px] font-semibold uppercase tracking-[0.12em]">
            <span className="flex items-center gap-2 text-muted">
              <Search className="size-3.5" aria-hidden="true" />
              Try one of these
            </span>
            <Link href="/new-arrivals" className="underline-offset-4 hover:underline">
              New arrivals
            </Link>
            <Link href="/best-sellers" className="underline-offset-4 hover:underline">
              Best sellers
            </Link>
            <Link href="/wishlist" className="underline-offset-4 hover:underline">
              Wishlist
            </Link>
          </div>
        </div>

        <div className="border border-border bg-surface p-3">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#EFEEE9]">
            <ImageWithFallback
              src="/images/hero-levitate.jpg"
              alt="Sneaker floating against a warm studio background"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
              priority
            />
            <span className="absolute left-4 top-4 bg-accent px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground">
              District map / No. 404
            </span>
          </div>
          <p className="px-1 pb-1 pt-3 text-[10px] uppercase tracking-[0.12em] text-muted">
            Some pairs are easier to find than others.
          </p>
        </div>
      </div>
    </section>
  );
}
