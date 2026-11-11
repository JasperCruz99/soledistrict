import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import PromoBanner from "@/components/home/PromoBanner";
import BrandStory from "@/components/home/BrandStory";
import Newsletter from "@/components/home/Newsletter";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductGrid from "@/components/products/ProductGrid";
import { getBestSellers, getNewArrivals } from "@/data/products";

export default function HomePage() {
  const newArrivals = getNewArrivals().slice(0, 4);
  const bestSellers = getBestSellers().slice(0, 4);

  return (
    <>
      <HeroSection />
      <FeaturedCategories />

      <section className="shell pb-16 sm:pb-20 lg:pb-24">
        <SectionHeading
          eyebrow="Just landed"
          title="Fresh off the line."
          description="The newest pairs in the district — limited runs, considered details and everyday comfort."
          link={{ href: "/new-arrivals", label: "View all new arrivals" }}
          className="reveal"
        />
        <div className="reveal mt-8">
          <ProductGrid products={newArrivals} priorityCount={2} />
        </div>
      </section>

      <PromoBanner />

      <section className="border-b border-border bg-surface">
        <div className="shell py-16 sm:py-20 lg:py-24">
          <SectionHeading
            eyebrow="Most wanted"
            title="The ones everyone's wearing."
            description="Tried, tested and in constant rotation. These are the pairs our community keeps coming back to."
            link={{ href: "/best-sellers", label: "View all best sellers" }}
            className="reveal"
          />
          <div className="reveal mt-8">
            <ProductGrid products={bestSellers} showRating priorityCount={2} />
          </div>
          <p className="mt-7 text-[10px] uppercase tracking-[0.12em] text-muted">
            Ratings and reviews shown are illustrative sample data.
          </p>
        </div>
      </section>

      <BrandStory />
      <Newsletter />
    </>
  );
}
