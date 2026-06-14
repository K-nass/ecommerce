"use client";

import { useSyncCartOnLogin } from "../hooks/useSyncCartOnLogin";

export function CartSyncProvider({ children }: { children: React.ReactNode }) {
  useSyncCartOnLogin();
  return <>{children}</>;
}