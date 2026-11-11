import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

const stats = [
  { value: "18", label: "Curated pairs" },
  { value: "06", label: "Independent labels" },
  { value: "01", label: "Standard: considered" },
];

export default function BrandStory() {
  return (
    <section className="shell py-16 sm:py-20 lg:py-24">
      <div className="reveal grid border border-border bg-surface lg:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden bg-[#EFEEE9] sm:min-h-[420px] lg:min-h-[560px]">
          <ImageWithFallback
            src="/images/brand-story.jpg"
            alt="Person sitting on a city ledge wearing street sneakers"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute bottom-4 left-4 bg-surface/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] backdrop-blur">
            District notes / Vol. 01
          </span>
        </div>

        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 xl:px-16">
          <p className="eyebrow text-muted">
            <span className="inline-block size-1.5 bg-foreground" aria-hidden="true" />
            Our story
          </p>
          <h2 className="headline mt-5 text-[clamp(2rem,4.5vw,3.25rem)] uppercase">
            More than just
            <br />a pair of shoes.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-[15px]">
            SoleDistrict brings together design, comfort, and individuality. We
            believe the right pair of sneakers can change how you move and
            express yourself.
          </p>

          <Link
            href="/about"
            className="group mt-7 inline-flex w-fit items-center gap-2 border-b border-foreground pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-accent"
          >
            Read our story
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-semibold tracking-[-0.03em]">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[9px] uppercase leading-tight tracking-[0.1em] text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
