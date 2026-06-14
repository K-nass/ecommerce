"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useSyncCartOnLogin } from "../hooks/useSyncCartOnLogin";
import { useServerCartStore } from "../store/useServerCartStore";

export function CartSyncProvider({ children }: { children: ReactNode }) {
  const { isSyncing } = useSyncCartOnLogin();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const fetchCartCount = useServerCartStore((s) => s.fetchCartCount);

  useEffect(() => {
    if (isAuthenticated && !isSyncing) {
      fetchCartCount();
    }
  }, [isAuthenticated, isSyncing, fetchCartCount]);

  return <>{children}</>;
}