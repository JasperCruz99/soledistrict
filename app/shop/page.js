import { Suspense } from "react";
import PageIntro from "@/components/ui/PageIntro";
import ShopClient from "@/components/products/ShopClient";
import ProductGridSkeleton from "@/components/products/ProductGridSkeleton";
import { brands, products } from "@/data/products";

export const metadata = {
  title: "Shop All Sneakers",
  description:
    "Browse every sneaker in the SoleDistrict collection — lifestyle, running and streetwear pairs from independent labels.",
};

function ShopFallback() {
  return (
    <div className="shell py-8 sm:py-10 lg:py-12">
      <div className="h-11 w-full max-w-lg animate-pulse bg-[#EAE9E4]" />
      <div className="mt-7 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[270px_minmax(0,1fr)] xl:gap-14">
        <div className="hidden lg:block">
          <div className="h-[520px] w-full animate-pulse bg-[#EAE9E4]" />
        </div>
        <ProductGridSkeleton count={9} />
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      <PageIntro
        eyebrow="The full collection"
        title="Shop all sneakers."
        breadcrumbs={[{ label: "Shop" }]}
        description="Every pair in the district, in one place. Filter by category, brand, size and price to find the silhouette that fits the way you move."
      >
        <dl className="grid max-w-sm grid-cols-3 divide-x divide-border border border-border bg-surface">
          <div className="px-4 py-4">
            <dt className="text-[9px] uppercase leading-tight tracking-[0.1em] text-muted">
              Styles
            </dt>
            <dd className="mt-1 font-display text-2xl font-semibold tracking-[-0.03em]">
              {products.length}
            </dd>
          </div>
          <div className="px-4 py-4">
            <dt className="text-[9px] uppercase leading-tight tracking-[0.1em] text-muted">
              Labels
            </dt>
            <dd className="mt-1 font-display text-2xl font-semibold tracking-[-0.03em]">
              {String(brands.length).padStart(2, "0")}
            </dd>
          </div>
          <div className="px-4 py-4">
            <dt className="text-[9px] uppercase leading-tight tracking-[0.1em] text-muted">
              Returns
            </dt>
            <dd className="mt-1 font-display text-2xl font-semibold tracking-[-0.03em]">
              30d
            </dd>
          </div>
        </dl>
      </PageIntro>

      <Suspense fallback={<ShopFallback />}>
        <ShopClient />
      </Suspense>
    </>
  );
}
