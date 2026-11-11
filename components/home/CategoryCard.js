import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export default function CategoryCard({ category, index }) {
  return (
    <Link
      href={`/shop?category=${encodeURIComponent(category.name)}`}
      aria-label={`Explore ${category.name}`}
      className="group flex flex-col border border-border bg-surface transition-colors duration-300 hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EFEEE9] sm:aspect-[4/4]">
        <ImageWithFallback
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 bg-surface/90 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] backdrop-blur">
          0{index + 1}
        </span>
      </div>

      <div className="flex flex-1 items-center justify-between gap-4 border-t border-border px-5 py-5">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-[-0.03em]">
            {category.name}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            {category.description}
          </p>
        </div>
        <span className="flex shrink-0 flex-col items-center gap-1.5">
          <span className="grid size-10 place-items-center rounded-full border border-border transition-colors duration-300 group-hover:bg-foreground group-hover:text-white">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
            Explore
          </span>
        </span>
      </div>
    </Link>
  );
}
