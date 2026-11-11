import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { getProductBySlug } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const featured = getProductBySlug("signal-max");

export default function HeroSection() {
  return (
    <section className="border-b border-border">
      <div className="shell grid gap-8 py-8 sm:gap-10 sm:py-10 lg:grid-cols-[1.02fr_1fr] lg:items-stretch lg:gap-14 lg:py-14">
        <div className="flex flex-col justify-center py-3 lg:py-8">
          <p
            className="eyebrow text-muted motion-safe:animate-fade-up"
            style={{ animationDelay: "40ms" }}
          >
            <Sparkles className="size-3.5 text-foreground" aria-hidden="true" />
            SS26 — The new season
          </p>

          <h1
            className="headline mt-5 text-[clamp(2.7rem,8.2vw,5rem)] uppercase motion-safe:animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            <span className="block">Step into</span>
            <span className="block">your next</span>
            <span className="mt-1 block">
              <span className="relative inline-block">
                <span
                  className="absolute inset-x-0 bottom-[0.06em] z-0 h-[0.26em] bg-accent"
                  aria-hidden="true"
                />
                <span className="relative z-10">era.</span>
              </span>
            </span>
          </h1>

          <p
            className="mt-6 max-w-md text-[15px] leading-relaxed text-muted motion-safe:animate-fade-up sm:text-base"
            style={{ animationDelay: "200ms" }}
          >
            Discover sneakers that define your style. Find your next everyday
            essential.
          </p>

          <div
            className="mt-8 flex flex-col gap-3 motion-safe:animate-fade-up sm:flex-row"
            style={{ animationDelay: "280ms" }}
          >
            <Link href="/shop" className="btn btn-primary">
              Shop collection
            </Link>
            <Link href="/new-arrivals" className="btn btn-outline">
              Explore new arrivals
            </Link>
          </div>

          <div
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted motion-safe:animate-fade-up"
            style={{ animationDelay: "340ms" }}
          >
            <span>18 curated silhouettes</span>
            <span className="size-1 rounded-full bg-border" aria-hidden="true" />
            <span>Free shipping over $100</span>
            <span className="hidden size-1 rounded-full bg-border sm:block" aria-hidden="true" />
            <span>30-day returns</span>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E3D8] motion-safe:animate-fade-in sm:aspect-[6/5] lg:aspect-auto lg:h-full lg:min-h-[580px]">
            <ImageWithFallback
              src="/images/hero-street.jpg"
              alt="Person wearing orange and cream sneakers on a city street"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />

            <div className="absolute left-4 top-4 z-10 flex items-center gap-2 bg-accent px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-foreground">
              <span className="size-1.5 rounded-full bg-foreground" aria-hidden="true" />
              Drop 01 / 26
            </div>

            {featured ? (
              <Link
                href={`/product/${featured.slug}`}
                className="group absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between gap-4 border border-white/40 bg-surface/95 px-4 py-3.5 backdrop-blur transition-colors hover:bg-surface sm:right-auto sm:w-[320px]"
              >
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Shop the look
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {featured.name}{" "}
                    <span className="font-normal text-muted">
                      — {formatPrice(featured.price)}
                    </span>
                  </p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border transition-colors group-hover:bg-foreground group-hover:text-white">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            ) : null}
          </div>

          <div
            className="absolute -top-3 right-4 hidden border border-border bg-surface px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted lg:block"
            aria-hidden="true"
          >
            Independent sneaker retail
          </div>
        </div>
      </div>
    </section>
  );
}
