import SectionHeading from "@/components/ui/SectionHeading";
import CategoryCard from "./CategoryCard";
import { categories } from "@/data/products";

export default function FeaturedCategories() {
  return (
    <section className="shell py-16 sm:py-20 lg:py-24">
      <div className="reveal">
        <SectionHeading
          eyebrow="Shop by category"
          title="Find your lane."
          link={{ href: "/shop", label: "Shop all sneakers" }}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.slug}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
