"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGE = "/images/placeholder.svg";

export default function ImageWithFallback({
  src,
  alt,
  className,
  fill = false,
  sizes,
  priority = false,
  width,
  height,
}) {
  const [failedSrc, setFailedSrc] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const source = failedSrc === src ? FALLBACK_IMAGE : src || FALLBACK_IMAGE;

  return (
    <Image
      key={source}
      src={source}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      width={fill ? undefined : width || 800}
      height={fill ? undefined : height || 1000}
      onLoad={() => setLoaded(true)}
      onError={() => {
        setFailedSrc(src);
        setLoaded(true);
      }}
      className={cn(
        "transition-opacity duration-500",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );
}
