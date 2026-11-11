export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(value) {
  const numeric = Number(value) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(numeric) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(numeric);
}

export function formatRating(value) {
  return Number(value).toFixed(1);
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());
}

export function toTitleCase(value) {
  return String(value)
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function makeSearchHref(query) {
  const trimmed = String(query ?? "").trim();
  return trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : "/shop";
}
