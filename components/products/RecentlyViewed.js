"use client";

import { useEffect, useSyncExternalStore } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductGrid from "@/components/products/ProductGrid";
import { getProductById } from "@/data/products";
import {
  recentlyViewedStore,
  recordRecentlyViewed,
} from "@/lib/recentlyViewedStore";

export default function RecentlyViewed({ currentProductId }) {
  const ids = useSyncExternalStore(
    recentlyViewedStore.subscribe,
    recentlyViewedStore.getSnapshot,
    recentlyViewedStore.getServerSnapshot
  );

  useEffect(() => {
    recordRecentlyViewed(currentProductId);
  }, [currentProductId]);

  const productIds = ids
    .filter((id) => id !== currentProductId)
    .slice(0, 4);
  const products = productIds
    .map((id) => getProductById(id))
    .filter(Boolean);

  if (products.length === 0) return null;

  return (
    <section className="shell border-t border-border py-12 sm:py-16">
      <SectionHeading
        eyebrow="Your history"
        title="Recently viewed."
        link={{ href: "/shop", label: "Shop all sneakers" }}
        className="reveal"
      />
      <div className="reveal mt-8">
        <ProductGrid products={products} columns={4} />
      </div>
    </section>
  );
}
