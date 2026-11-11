import { Star } from "lucide-react";
import RatingStars from "@/components/ui/RatingStars";
import { formatRating } from "@/lib/utils";

const sampleReviews = [
  {
    name: "Maya R.",
    title: "Instant rotation staple",
    body: "The shape is clean and the cushioning is softer than I expected. Wore them straight out of the box for a full day and had no complaints.",
    rating: 5,
  },
  {
    name: "Jordan K.",
    title: "True to size, great finish",
    body: "Materials feel considered and the color is exactly like the photos. Took my usual size and the fit is spot on.",
    rating: 5,
  },
  {
    name: "Alex T.",
    title: "Good everyday pair",
    body: "Comfortable for city walks and easy to style. Docked a star only because I wish the laces were a touch longer.",
    rating: 4,
  },
];

const distribution = [
  { stars: 5, percent: 72 },
  { stars: 4, percent: 19 },
  { stars: 3, percent: 6 },
  { stars: 2, percent: 2 },
  { stars: 1, percent: 1 },
];

export default function ProductReviews({ product }) {
  return (
    <section
      id="reviews"
      className="scroll-mt-28 border-t border-border bg-surface"
    >
      <div className="shell py-12 sm:py-16">
        <div className="reveal">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-muted">
                <span
                  className="inline-block size-1.5 bg-foreground"
                  aria-hidden="true"
                />
                Customer reviews
              </p>
              <h2 className="headline mt-4 text-[clamp(1.9rem,4vw,2.75rem)] uppercase">
                What people are saying.
              </h2>
            </div>
            <span className="w-fit border border-border px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
              Sample content
            </span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
            <div>
              <div className="flex items-end gap-3">
                <p className="font-display text-6xl font-semibold leading-none tracking-[-0.05em]">
                  {formatRating(product.rating)}
                </p>
                <div className="pb-1">
                  <RatingStars rating={product.rating} />
                  <p className="mt-1 text-[11px] text-muted">
                    {product.reviewCount} sample reviews
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-2" aria-label="Sample rating distribution">
                {distribution.map((row) => (
                  <li
                    key={row.stars}
                    className="flex items-center gap-2 text-[10px] text-muted"
                  >
                    <span className="flex w-8 items-center gap-0.5">
                      {row.stars}
                      <Star
                        className="size-2.5 fill-foreground text-foreground"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="h-1.5 flex-1 overflow-hidden bg-border">
                      <span
                        className="block h-full bg-foreground"
                        style={{ width: `${row.percent}%` }}
                      />
                    </span>
                    <span className="w-8 text-right tabular-nums">
                      {row.percent}%
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-[11px] leading-relaxed text-muted">
                Reviews, names, ratings and distribution are illustrative
                sample content for this demo. They are not verified customer
                feedback.
              </p>
            </div>

            <div className="divide-y divide-border border-y border-border">
              {sampleReviews.map((review) => (
                <article key={review.name} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-full bg-background text-xs font-semibold">
                        {review.name.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{review.name}</p>
                        <p className="text-[10px] uppercase tracking-[0.1em] text-muted">
                          Sample review
                        </p>
                      </div>
                    </div>
                    <RatingStars rating={review.rating} />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{review.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {review.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
