"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Modal from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

export default function ProductGallery({ product }) {
  const images = product.images;
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zooming, setZooming] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  function handleMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#EFEEE9] lg:aspect-[5/6]">
        <div
          className="absolute inset-0 cursor-zoom-in"
          onMouseEnter={() => setZooming(true)}
          onMouseLeave={() => setZooming(false)}
          onMouseMove={handleMove}
        >
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{
              transform: zooming ? "scale(1.7)" : "scale(1)",
              transformOrigin: origin,
            }}
          >
            <ImageWithFallback
              key={images[activeIndex]}
              src={images[activeIndex]}
              alt={`${product.name} by ${product.brand} — view ${activeIndex + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
          {product.isNew ? (
            <span className="bg-accent px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-foreground">
              New
            </span>
          ) : null}
          {!product.available ? (
            <span className="bg-foreground px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
              Sold out
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          aria-label="Open larger product image"
          className="absolute right-3 top-3 z-10 grid size-10 place-items-center border border-border bg-surface/95 text-foreground backdrop-blur transition-colors hover:bg-foreground hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
        >
          <Maximize2 className="size-4" aria-hidden="true" />
        </button>

        <span className="absolute bottom-3 left-3 z-10 bg-foreground px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
          0{activeIndex + 1} / 0{images.length}
        </span>
      </div>

      <div className="mt-3 flex gap-2.5">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => {
              setActiveIndex(index);
              setZooming(false);
            }}
            aria-label={`View image ${index + 1} of ${images.length}`}
            aria-pressed={activeIndex === index}
            className={cn(
              "relative aspect-[4/5] w-[74px] overflow-hidden border-2 bg-[#EFEEE9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 sm:w-[88px]",
              activeIndex === index
                ? "border-foreground"
                : "border-transparent hover:border-border"
            )}
          >
            <ImageWithFallback
              src={image}
              alt=""
              fill
              sizes="88px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <p className="mt-3 text-[10px] uppercase tracking-[0.12em] text-muted">
        Hover the image to zoom, or open the full view.
      </p>

      <Modal
        open={zoomOpen}
        onClose={() => setZoomOpen(false)}
        title={product.name}
        eyebrow="Image zoom"
        className="sm:max-w-3xl"
      >
        <div className="relative aspect-[4/5] bg-[#EFEEE9]">
          <ImageWithFallback
            src={images[activeIndex]}
            alt={`${product.name} enlarged product image`}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-contain"
          />
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.12em] text-muted">
            View {activeIndex + 1} of {images.length}
          </p>
          <div className="flex gap-2">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={activeIndex === index}
                className={cn(
                  "size-2.5 rounded-full border border-foreground/30 transition-colors",
                  activeIndex === index ? "bg-foreground" : "bg-transparent"
                )}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
