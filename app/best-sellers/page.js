import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import ProductGrid from "@/components/products/ProductGrid";
import { getBestSellers } from "@/data/products";

export const metadata = {
  title: "Best Sellers",
  description:
    "The most-wanted sneakers at SoleDistrict, ranked by our community's sample review activity.",
};

export default function BestSellersPage() {
  const bestSellers = getBestSellers();

  return (
    <>
      <PageIntro
        eyebrow="Most wanted"
        title="Best sellers."
        breadcrumbs={[{ label: "Best Sellers" }]}
        description="The pairs in constant rotation. Proven shapes, dependable comfort and the styles our community keeps coming back to."
      >
        <div className="border border-border bg-surface px-6 py-5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted">
            Community picks
          </p>
          <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.04em]">
            {String(bestSellers.length).padStart(2, "0")}{" "}
            <span className="text-sm font-medium tracking-normal text-muted">
              most wanted
            </span>
          </p>
        </div>
      </PageIntro>

      <section className="shell py-10 sm:py-12 lg:py-16">
        <div className="reveal">
          <ProductGrid
            products={bestSellers}
            columns={4}
            showRating
            priorityCount={4}
          />
        </div>
        <p className="mt-8 border-t border-border pt-5 text-[10px] uppercase tracking-[0.12em] text-muted">
          Ratings and reviews are illustrative sample data.
        </p>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 border border-border bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="eyebrow text-muted">Keep exploring</p>
            <p className="mt-2 font-display text-xl font-semibold tracking-[-0.03em]">
              There is more where these came from.
            </p>
          </div>
          <Link href="/shop" className="btn btn-primary shrink-0">
            Shop all sneakers
          </Link>
        </div>
      </section>
    </>
  );
}
