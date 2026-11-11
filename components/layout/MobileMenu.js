"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Heart,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import {
  useBodyScrollLock,
  useEscapeKey,
  useFocusTrap,
} from "@/lib/hooks";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "About", href: "/about" },
];

export default function MobileMenu({
  onClose,
  onSearch,
  onAccount,
  onCart,
  cartCount,
  wishlistCount,
}) {
  const panelRef = useRef(null);

  useBodyScrollLock(true);
  useEscapeKey(true, onClose);
  useFocusTrap(true, panelRef);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[85] flex flex-col bg-background"
    >
      <div className="shell flex h-16 items-center justify-between border-b border-border sm:h-[72px]">
        <Logo className="text-[23px] sm:text-[27px]" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="shell flex-1 overflow-y-auto pb-10">
        <button
          type="button"
          onClick={onSearch}
          className="mt-5 flex w-full items-center gap-3 border border-border bg-surface px-4 py-3.5 text-left text-sm text-muted transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <Search className="size-4" aria-hidden="true" />
          Search the district
          <span className="ml-auto rounded border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted">
            /
          </span>
        </button>

        <nav aria-label="Mobile primary" className="mt-7">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              style={{ animationDelay: `${60 + index * 55}ms` }}
              className="group flex items-center justify-between border-b border-border py-4 motion-safe:animate-menu-link"
            >
              <span className="flex items-baseline gap-4">
                <span className="text-[10px] font-medium tracking-[0.12em] text-muted">
                  0{index + 1}
                </span>
                <span className="font-display text-[clamp(1.75rem,7vw,2.5rem)] font-semibold uppercase leading-none tracking-[-0.03em] transition-transform duration-200 group-hover:translate-x-1">
                  {link.label}
                </span>
              </span>
              <ArrowUpRight
                className="size-5 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center justify-between border border-border bg-surface px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:border-foreground"
          >
            <span className="flex items-center gap-2">
              <Heart className="size-4" aria-hidden="true" />
              Wishlist
            </span>
            <span className="text-muted">{wishlistCount}</span>
          </Link>
          <button
            type="button"
            onClick={onCart}
            className="flex items-center justify-between border border-border bg-surface px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:border-foreground"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="size-4" aria-hidden="true" />
              Bag
            </span>
            <span className="text-muted">{cartCount}</span>
          </button>
          <button
            type="button"
            onClick={onAccount}
            className="col-span-2 flex items-center justify-center gap-2 border border-border bg-surface px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:border-foreground"
          >
            <UserRound className="size-4" aria-hidden="true" />
            Account (demo)
          </button>
        </div>

        <div className="mt-9 flex items-center justify-between border-t border-border pt-5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
          <span>Free shipping over $100</span>
          <span>Est. 2026</span>
        </div>
      </div>
    </div>
  );
}
