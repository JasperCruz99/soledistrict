import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductGallery from "@/components/products/ProductGallery";
import ProductPurchasePanel from "@/components/products/ProductPurchasePanel";
import ProductReviews from "@/components/products/ProductReviews";
import ProductGrid from "@/components/products/ProductGrid";
import RecentlyViewed from "@/components/products/RecentlyViewed";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/data/products";

export const instant = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} — ${product.brand}`,
    description: product.description,
    openGraph: {
      title: `${product.name} — ${product.brand} | SoleDistrict`,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 4);

  return (
    <>
      <div className="shell pt-5 sm:pt-7">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            {
              label: product.category,
              href: `/shop?category=${encodeURIComponent(product.category)}`,
            },
            { label: product.name },
          ]}
        />
      </div>

      <section className="shell pb-14 pt-6 sm:pt-8 lg:pb-20">
        <div className="grid gap-9 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12 xl:gap-16">
          <ProductGallery product={product} />
          <ProductPurchasePanel product={product} />
        </div>
      </section>

      <ProductReviews product={product} />

      <section className="shell border-t border-border py-12 sm:py-16">
        <SectionHeading
          eyebrow="Pairs well with"
          title="Complete the rotation."
          link={{ href: "/shop", label: "Shop all sneakers" }}
          className="reveal"
        />
        <div className="reveal mt-8">
          <ProductGrid products={related} columns={4} />
        </div>
      </section>

      <RecentlyViewed currentProductId={product.id} />
    </>
  );
}
