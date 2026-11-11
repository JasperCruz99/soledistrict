"use client";

import { createStoredStore } from "./usePersistentStore";

const KEY = "soledistrict:recently-viewed";

function sanitize(value) {
  if (!Array.isArray(value)) return [];
  const unique = [];
  for (const id of value) {
    if (typeof id === "number" && !unique.includes(id)) {
      unique.push(id);
    }
    if (unique.length >= 8) break;
  }
  return unique;
}

export const recentlyViewedStore = createStoredStore(KEY, [], sanitize);

export function recordRecentlyViewed(productId) {
  recentlyViewedStore.set((current) =>
    [productId, ...current.filter((id) => id !== productId)].slice(0, 8)
  );
}
