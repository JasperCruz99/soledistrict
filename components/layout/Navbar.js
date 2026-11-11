"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Modal from "@/components/ui/Modal";
import SearchOverlay from "./SearchOverlay";
import MobileMenu from "./MobileMenu";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "About", href: "/about" },
];

function isActivePath(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href === "/shop") {
    return pathname === "/shop" || pathname.startsWith("/product/");
  }
  return pathname === href;
}

function CountBadge({ count }) {
  if (!count) return null;
  return (
    <span
      aria-hidden="true"
      className="absolute -right-1.5 -top-1 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-accent px-1 text-[9px] font-bold leading-none text-foreground"
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { count: cartCount, hydrated: cartHydrated, openCart } = useCart();
  const { count: wishlistCount, hydrated: wishlistHydrated } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  const resolvedCartCount = cartHydrated ? cartCount : 0;
  const resolvedWishlistCount = wishlistHydrated ? wishlistCount : 0;

  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
    setAccountOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 6);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (
        event.key !== "/" ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }
      const active = document.activeElement;
      const tag = active?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        active?.isContentEditable
      ) {
        return;
      }
      event.preventDefault();
      setSearchOpen(true);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-background/90 backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-300",
          scrolled
            ? "border-border shadow-[0_8px_30px_rgba(23,23,23,0.04)]"
            : "border-transparent"
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[72px]">
          <Logo className="relative z-10 text-[23px] sm:text-[27px]" />

          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-9"
          >
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-accent transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              aria-haspopup="dialog"
              className="group relative grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-black/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <Search className="size-[18px]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              aria-label="Account (demo only)"
              aria-haspopup="dialog"
              className="hidden size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-black/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground md:grid"
            >
              <UserRound className="size-[18px]" aria-hidden="true" />
            </button>

            <Link
              href="/wishlist"
              aria-label={
                resolvedWishlistCount
                  ? `Wishlist, ${resolvedWishlistCount} item${resolvedWishlistCount === 1 ? "" : "s"}`
                  : "Wishlist"
              }
              className="relative hidden size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-black/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground sm:grid"
            >
              <Heart className="size-[18px]" aria-hidden="true" />
              <CountBadge count={resolvedWishlistCount} />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={
                resolvedCartCount
                  ? `Shopping bag, ${resolvedCartCount} item${resolvedCartCount === 1 ? "" : "s"}`
                  : "Shopping bag"
              }
              aria-haspopup="dialog"
              className="relative grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-black/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <ShoppingBag className="size-[18px]" aria-hidden="true" />
              <CountBadge count={resolvedCartCount} />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="group ml-0.5 grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-black/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground lg:hidden"
            >
              <span className="relative block h-3.5 w-[22px]">
                <span className="absolute left-0 top-0 h-[1.5px] w-full bg-foreground transition-transform duration-300" />
                <span className="absolute left-0 top-1/2 h-[1.5px] w-[16px] -translate-y-1/2 bg-foreground transition-all duration-300 group-hover:w-full" />
                <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-foreground transition-transform duration-300" />
              </span>
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <MobileMenu
          onClose={() => setMenuOpen(false)}
          onSearch={() => {
            setMenuOpen(false);
            setSearchOpen(true);
          }}
          onAccount={() => {
            setMenuOpen(false);
            setAccountOpen(true);
          }}
          onCart={() => {
            setMenuOpen(false);
            openCart();
          }}
          cartCount={resolvedCartCount}
          wishlistCount={resolvedWishlistCount}
        />
      ) : null}

      {searchOpen ? (
        <SearchOverlay onClose={() => setSearchOpen(false)} />
      ) : null}

      <Modal
        open={accountOpen}
        onClose={() => setAccountOpen(false)}
        title="Account"
        eyebrow="Guest session"
        ariaLabel="Account demo"
      >
        <div className="space-y-5">
          <p className="text-sm leading-relaxed text-muted">
            Sign-in is not part of this frontend demo. You can keep browsing as
            a guest — your bag and wishlist are saved locally in this browser.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setAccountOpen(false)}
              className="btn btn-primary flex-1"
            >
              Continue shopping
            </button>
            <Link
              href="/wishlist"
              onClick={() => setAccountOpen(false)}
              className="btn btn-outline flex-1"
            >
              View wishlist
            </Link>
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            Demo interface only
          </p>
        </div>
      </Modal>
    </>
  );
}
