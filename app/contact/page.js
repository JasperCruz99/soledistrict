import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  Package,
  Ruler,
} from "lucide-react";
import PageIntro from "@/components/ui/PageIntro";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact & Support",
  description:
    "Contact the SoleDistrict demo support desk, see sample response times, and find quick answers about orders, returns, sizing, and the storefront.",
};

const quickLinks = [
  {
    title: "Shipping & returns",
    href: "/about#shipping-returns",
    description: "Delivery estimates and the sample 30-day return terms.",
    icon: Package,
  },
  {
    title: "Size guide",
    href: "/about#size-guide",
    description: "Conversions and a simple way to measure your foot at home.",
    icon: Ruler,
  },
  {
    title: "FAQ",
    href: "/about#faq",
    description: "Answers about products, payments, sizing, and the demo.",
    icon: Clock3,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Customer care"
        title="Talk to the district."
        breadcrumbs={[{ label: "Contact" }]}
        description="Questions about a pair, an order, a return, or the demo itself? Start here. The support details are sample content; the form shows how a real conversation would begin."
      >
        <div className="w-full max-w-sm border border-border bg-surface p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center bg-background">
              <Mail className="size-4 text-muted" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">
                Demo support inbox
              </p>
              <a
                href="mailto:hello@soledistrict.com"
                className="mt-1 block text-sm font-medium underline-offset-4 hover:underline"
              >
                hello@soledistrict.com
              </a>
            </div>
          </div>
          <p className="mt-4 border-t border-border pt-4 text-[10px] leading-relaxed text-muted">
            The address is fictional and not monitored. See the page for how
            real support content would be structured.
          </p>
        </div>
      </PageIntro>

      <section className="shell py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(300px,0.88fr)] lg:gap-14">
          <ContactForm />

          <aside className="space-y-4">
            <section className="border border-border bg-surface p-6">
              <h2 className="font-display text-xl font-semibold tracking-[-0.025em]">
                Support details
              </h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex gap-3 border-b border-border pb-4">
                  <Mail
                    className="mt-0.5 size-4 shrink-0 text-muted"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                      Email
                    </dt>
                    <dd className="mt-1">
                      <a
                        href="mailto:hello@soledistrict.com"
                        className="font-medium underline-offset-4 hover:underline"
                      >
                        hello@soledistrict.com
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3 border-b border-border pb-4">
                  <Clock3
                    className="mt-0.5 size-4 shrink-0 text-muted"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                      Support hours
                    </dt>
                    <dd className="mt-1 leading-relaxed">
                      Monday–Friday, 9:00–17:00
                      <span className="block text-xs text-muted">
                        Sample hours, not a live schedule.
                      </span>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Package
                    className="mt-0.5 size-4 shrink-0 text-muted"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                      Returns
                    </dt>
                    <dd className="mt-1 leading-relaxed">
                      <Link
                        href="/about#shipping-returns"
                        className="font-medium underline-offset-4 hover:underline"
                      >
                        Read the sample return terms
                      </Link>
                      <span className="block text-xs text-muted">
                        30 days, original condition, sample policy only.
                      </span>
                    </dd>
                  </div>
                </div>
              </dl>
            </section>

            <section className="border border-border bg-surface p-6">
              <h2 className="font-display text-xl font-semibold tracking-[-0.025em]">
                Quick answers
              </h2>
              <div className="mt-4 divide-y divide-border border-y border-border">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-start justify-between gap-4 py-4"
                    >
                      <span className="flex gap-3">
                        <Icon
                          className="mt-0.5 size-4 shrink-0 text-muted"
                          aria-hidden="true"
                        />
                        <span>
                          <span className="block text-sm font-medium">
                            {link.title}
                          </span>
                          <span className="mt-0.5 block text-[11px] leading-relaxed text-muted">
                            {link.description}
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight
                        className="mt-0.5 size-4 shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                        aria-hidden="true"
                      />
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/policies"
                className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] underline-offset-4 hover:underline"
              >
                Read all store policies
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </section>

            <p className="border border-border bg-background p-4 text-[10px] leading-relaxed text-muted">
              SoleDistrict is a fictional frontend demo. No real products,
              orders, payments, shipments, returns, or support tickets exist.
              The form only simulates a successful submission.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
