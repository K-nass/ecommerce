"use client";
import { useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { calcSubtotal, isFreeShipping, canCheckout } from "../utils";

interface CartSummaryProps {
  items: Array<{ price: number; quantity: number }>;
  minimumOrderAmount?: number;
  freeShippingThreshold?: number;
}

export function CartSummary({
  items,
  minimumOrderAmount = 100,
  freeShippingThreshold = 300,
}: CartSummaryProps) {
  const t = useTranslations("cartPage");
  const subtotal = calcSubtotal(items);
  const freeShippingEligible = isFreeShipping(subtotal, freeShippingThreshold);
  const checkoutEnabled = canCheckout(subtotal, minimumOrderAmount);

  return (
    <div className="sticky top-24 space-y-5 rounded-2xl border border-border-subtle bg-white p-6">
      <h3 className="text-lg font-bold">{t("subtotal")}</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">{t("subtotal")}</span>
          <span className="font-medium tabular-nums">
            {subtotal.toFixed(2)} EGP
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">{t("shipping")}</span>
          <span className="font-medium tabular-nums">
            {freeShippingEligible
              ? t("freeShipping")
              : `${minimumOrderAmount.toFixed(2)} EGP`}
          </span>
        </div>

        {!freeShippingEligible && (
          <p className="text-xs text-gray-400">
            {t("freeShippingOver", { amount: freeShippingThreshold })}
          </p>
        )}

        <div className="border-t border-border-subtle pt-3">
          <div className="flex justify-between text-base">
            <span className="font-bold">{t("total")}</span>
            <span className="font-bold tabular-nums">
              {subtotal.toFixed(2)} EGP
            </span>
          </div>
        </div>
      </div>

      <button
        disabled={!checkoutEnabled}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ShoppingBag className="h-4 w-4" />
        {t("checkout")}
      </button>

      {!checkoutEnabled && (
        <p className="text-center text-xs text-gray-400">
          {t("minimumOrder", { amount: minimumOrderAmount })}
        </p>
      )}
    </div>
  );
}