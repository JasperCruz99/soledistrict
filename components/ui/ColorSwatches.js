import { cn } from "@/lib/utils";

export default function ColorSwatches({
  colors = [],
  className,
  size = "sm",
  limit,
  label = "Available colors",
}) {
  const visible = typeof limit === "number" ? colors.slice(0, limit) : colors;
  const dotSize = size === "sm" ? "size-3.5" : "size-4";

  return (
    <ul className={cn("flex items-center gap-1.5", className)} aria-label={label}>
      {visible.map((color) => (
        <li key={color.name}>
          <span
            className={cn(
              dotSize,
              "block rounded-full border border-black/15"
            )}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          >
            <span className="sr-only">{color.name}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
