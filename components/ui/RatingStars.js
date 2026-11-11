import { Star } from "lucide-react";
import { cn, formatRating } from "@/lib/utils";

export default function RatingStars({
  rating,
  reviewCount,
  className,
  size = "sm",
}) {
  const iconSize = size === "sm" ? "size-3.5" : "size-4";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs text-muted",
        className
      )}
    >
      <Star
        className={cn(iconSize, "fill-foreground text-foreground")}
        aria-hidden="true"
      />
      <span className="font-semibold text-foreground">
        {formatRating(rating)}
      </span>
      {typeof reviewCount === "number" ? (
        <span>({reviewCount})</span>
      ) : null}
      <span className="sr-only">
        out of 5. Ratings and reviews are illustrative sample data.
      </span>
    </span>
  );
}
