"use client";

import { ShoppingBag, Truck, Zap, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";

interface CartSummaryProps {
  scheduledSubtotal: number;
  scheduledQuantity: number;
  fastSubtotal: number;
  fastQuantity: number;
  checkoutEnabled: boolean;
  minimumOrderAmount: number;
}

export function CartSummary({
  scheduledSubtotal,
  scheduledQuantity,
  fastSubtotal,
  fastQuantity,
  checkoutEnabled,
  minimumOrderAmount,
}: CartSummaryProps) {
  const t = useTranslations("cartPage");
  const total = scheduledSubtotal + fastSubtotal;
  const totalItems = scheduledQuantity + fastQuantity;

  const lines = [
    { Icon: Truck, label: t("scheduledTitle"), qty: scheduledQuantity, sub: scheduledSubtotal },
    { Icon: Zap, label: t("fastTitle"), qty: fastQuantity, sub: fastSubtotal },
  ];

  return (
    <div className="rounded-2xl border-2 border-border bg-white p-5 space-y-5">
      <div className="flex items-center gap-2">
        <div className="h-1 w-6 rounded-full bg-primary" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">Order Summary</h3>
      </div>

      <div className="space-y-3">
        {lines.map((l) =>
          l.qty > 0 ? (
            <div key={l.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <l.Icon className="h-3.5 w-3.5 text-text-secondary shrink-0" />
                <span className="text-sm text-text-secondary">
                  {l.label} <span className="text-xs text-text-secondary">({l.qty} {t("cartItems", { count: l.qty })})</span>
                </span>
              </div>
              <span className="text-sm font-semibold tabular-nums text-text-primary">{l.sub.toFixed(2)} K.D</span>
            </div>
          ) : null,
        )}
      </div>

      <div className="border-t border-border pt-3 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">Total</span>
          <span className="text-lg font-bold tabular-nums text-text-primary">{total.toFixed(2)} K.D</span>
        </div>
        <p className="text-[11px] text-text-secondary text-right">
          ({totalItems} {t("cartItems", { count: totalItems })})
        </p>
      </div>

      <button
        disabled={!checkoutEnabled}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ShoppingBag className="h-4 w-4" />
        {t("checkout")}
        <ChevronRight className="h-4 w-4" />
      </button>

      {!checkoutEnabled && (
        <p className="text-center text-[11px] text-text-secondary">
          {t("minimumOrder", { amount: minimumOrderAmount })}
        </p>
      )}
    </div>
  );
}