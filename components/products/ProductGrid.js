import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

const columnStyles = {
  2: "grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

export default function ProductGrid({
  products = [],
  columns = 4,
  showRating = false,
  priorityCount = 0,
  className,
}) {
  return (
    <div
      className={cn(
        "grid gap-x-3 gap-y-9 sm:gap-x-5 sm:gap-y-12",
        columnStyles[columns] ?? columnStyles[4],
        className
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          showRating={showRating}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
