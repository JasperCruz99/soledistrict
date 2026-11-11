"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { createStoredStore, useHydrated } from "@/lib/usePersistentStore";

const EMPTY_IDS = [];
const WISHLIST_STORAGE_KEY = "soledistrict:wishlist";

function sanitizeIds(value) {
  if (!Array.isArray(value)) return EMPTY_IDS;
  return value.filter((id) => typeof id === "number");
}

const wishlistStore = createStoredStore(
  WISHLIST_STORAGE_KEY,
  EMPTY_IDS,
  sanitizeIds
);

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const ids = useSyncExternalStore(
    wishlistStore.subscribe,
    wishlistStore.getSnapshot,
    wishlistStore.getServerSnapshot
  );
  const hydrated = useHydrated();

  const toggle = useCallback((productId) => {
    wishlistStore.set((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  }, []);

  const remove = useCallback((productId) => {
    wishlistStore.set((current) =>
      current.filter((id) => id !== productId)
    );
  }, []);

  const clearWishlist = useCallback(() => wishlistStore.set(EMPTY_IDS), []);
  const has = useCallback((productId) => ids.includes(productId), [ids]);

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      hydrated,
      toggle,
      remove,
      has,
      clearWishlist,
    }),
    [ids, hydrated, toggle, remove, has, clearWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
