import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import ProductGrid from "@/components/products/ProductGrid";
import { getNewArrivals } from "@/data/products";

export const metadata = {
  title: "New Arrivals",
  description:
    "The latest sneaker drops at SoleDistrict — fresh lifestyle, running and streetwear silhouettes.",
};

export default function NewArrivalsPage() {
  const arrivals = getNewArrivals();

  return (
    <>
      <PageIntro
        eyebrow="Just landed"
        title="New arrivals."
        breadcrumbs={[{ label: "New Arrivals" }]}
        description="Fresh silhouettes, limited runs and the pairs we could not wait to get on the shelves. Once they are gone, they are gone."
      >
        <div className="border border-border bg-surface px-6 py-5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted">
            This drop
          </p>
          <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.04em]">
            {String(arrivals.length).padStart(2, "0")}{" "}
            <span className="text-sm font-medium tracking-normal text-muted">
              new styles
            </span>
          </p>
        </div>
      </PageIntro>

      <section className="shell py-10 sm:py-12 lg:py-16">
        <div className="reveal">
          <ProductGrid
            products={arrivals}
            columns={3}
            priorityCount={3}
          />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="max-w-md text-sm leading-relaxed text-muted">
            New to the district? Start with the full collection and filter your
            way to the right pair.
          </p>
          <Link href="/shop" className="btn btn-outline shrink-0">
            Shop all sneakers
          </Link>
        </div>
      </section>
    </>
  );
}
