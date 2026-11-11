import Link from "next/link";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export default function PromoBanner() {
  return (
    <section className="bg-dark-surface text-dark-text">
      <div className="shell grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-20">
        <div className="reveal lg:py-6">
          <p className="eyebrow text-accent">
            <span className="inline-block size-1.5 bg-accent" aria-hidden="true" />
            The seasonal edit
          </p>
          <h2 className="headline mt-5 text-[clamp(2.5rem,6vw,4.5rem)] uppercase">
            Find your
            <br />
            perfect pair.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
            Your style starts from the ground up. Explore the latest
            collection.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/shop" className="btn btn-accent">
              Shop now
            </Link>
            <Link
              href="/new-arrivals"
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              See what&apos;s new
            </Link>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-5">
            <div className="pr-4">
              <p className="font-display text-2xl font-semibold">06</p>
              <p className="mt-1 text-[9px] uppercase leading-tight tracking-[0.12em] text-white/45">
                Independent labels
              </p>
            </div>
            <div className="px-4">
              <p className="font-display text-2xl font-semibold">18</p>
              <p className="mt-1 text-[9px] uppercase leading-tight tracking-[0.12em] text-white/45">
                Curated silhouettes
              </p>
            </div>
            <div className="pl-4">
              <p className="font-display text-2xl font-semibold">30</p>
              <p className="mt-1 text-[9px] uppercase leading-tight tracking-[0.12em] text-white/45">
                Day returns
              </p>
            </div>
          </div>
        </div>

        <div className="reveal relative">
          <div className="relative aspect-[4/3] overflow-hidden bg-white/5 sm:aspect-[16/10] lg:aspect-[5/4]">
            <ImageWithFallback
              src="/images/hero-levitate.jpg"
              alt="A grey sneaker suspended above a city bridge"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-foreground px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              Campaign / After hours
            </div>
          </div>
          <div
            className="absolute -right-2 -top-2 hidden size-20 border border-accent/40 lg:block"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
