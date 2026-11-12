import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";

const shopLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Lifestyle Sneakers", href: "/shop?category=Lifestyle%20Sneakers" },
  { label: "Running Shoes", href: "/shop?category=Running%20Shoes" },
];

const supportLinks = [
  { label: "Shipping & Returns", href: "/about#shipping-returns" },
  { label: "Size Guide", href: "/about#size-guide" },
  { label: "FAQ", href: "/about#faq" },
  { label: "Contact", href: "/contact" },
];

const aboutLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Our Values", href: "/about#values" },
  { label: "The Newsletter", href: "/#newsletter" },
  { label: "Store Policies", href: "/policies" },
];

const legalLinks = [
  { label: "Privacy", href: "/policies/privacy" },
  { label: "Terms", href: "/policies/terms" },
  { label: "Accessibility", href: "/policies/accessibility" },
];

const socials = [
  {
    label: "SoleDistrict on Instagram (opens in a new tab)",
    href: "https://www.instagram.com",
    icon: InstagramIcon,
  },
  {
    label: "SoleDistrict on Facebook (opens in a new tab)",
    href: "https://www.facebook.com",
    icon: FacebookIcon,
  },
  {
    label: "SoleDistrict on YouTube (opens in a new tab)",
    href: "https://www.youtube.com",
    icon: YoutubeIcon,
  },
];

function FooterLinkList({ title, links }) {
  return (
    <nav aria-label={title}>
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="bg-dark-surface text-dark-text">
      <div className="shell pb-8 pt-16 sm:pt-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" className="text-[30px] sm:text-[34px]" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              A curated sneaker destination for people who move with intent.
              Independent labels, considered design, everyday pairs.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-accent hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>

            <div className="mt-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Newsletter
              </p>
              <Link
                href="/#newsletter"
                className="group mt-2 inline-flex items-center gap-2 text-sm font-medium text-white underline-offset-4 hover:underline"
              >
                First access to drops and offers
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          <FooterLinkList title="Shop" links={shopLinks} />
          <FooterLinkList title="Support" links={supportLinks} />
          <FooterLinkList title="About" links={aboutLinks} />
        </div>

        <div className="flex flex-col gap-5 border-b border-white/10 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              We accept
            </span>
            <ul
              className="flex list-none flex-wrap items-center gap-1.5"
              aria-label="Illustrative payment methods"
            >
              {["VISA", "MC", "AMEX", "PAYPAL"].map((method) => (
                <li
                  key={method}
                  className="border border-white/15 px-2.5 py-1.5 text-[9px] font-bold tracking-[0.08em] text-white/55"
                >
                  {method}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
            Frontend demo store — no real orders or payments
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>© 2026 SoleDistrict. All rights reserved.</p>
            <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <p>Independent by design. Built for the next step.</p>
        </div>
      </div>
    </footer>
  );
}
