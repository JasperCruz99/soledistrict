"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

export default function WishlistButton({
  product,
  variant = "icon",
  className,
}) {
  const { has, toggle, hydrated } = useWishlist();
  const { addToast } = useToast();
  const active = hydrated && has(product.id);

  function handleClick() {
    toggle(product.id);
    addToast({
      title: active ? "Removed from wishlist" : "Saved to wishlist",
      description: active
        ? `${product.name} is no longer saved.`
        : `${product.name} was added to your wishlist.`,
      variant: "info",
      action: active ? undefined : { label: "View wishlist", href: "/wishlist" },
    });
  }

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={active}
        className={cn(
          "btn border border-border bg-surface text-foreground hover:border-foreground",
          className
        )}
      >
        <Heart
          className={cn("size-4", active && "fill-foreground")}
          aria-hidden="true"
        />
        {active ? "Saved" : "Wishlist"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={
        active
          ? `Remove ${product.name} from wishlist`
          : `Add ${product.name} to wishlist`
      }
      className={cn(
        "grid size-9 place-items-center rounded-full border border-border bg-surface/95 text-foreground backdrop-blur transition-all duration-200 hover:scale-105 hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
        active && "border-foreground",
        className
      )}
    >
      <Heart
        className={cn(
          "size-4 transition-transform duration-200",
          active && "scale-110 fill-foreground"
        )}
        aria-hidden="true"
      />
    </button>
  );
}
