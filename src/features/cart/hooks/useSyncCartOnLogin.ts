"use client";
import { useEffect, useRef } from "react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useGuestCartStore } from "../store/useGuestCartStore";
import { cartService } from "../services/cartService";

export function useSyncCartOnLogin() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const prevAuth = useRef(isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && !prevAuth.current) {
      const guestItems = useGuestCartStore.getState().items;
      if (guestItems.length > 0) {
        const payload = useGuestCartStore.getState().getSyncPayload();
        cartService.addBulkToCart(payload).then(() => {
          useGuestCartStore.getState().clearCart();
        }).catch(() => {
        });
      }
    }
    prevAuth.current = isAuthenticated;
  }, [isAuthenticated]);
}