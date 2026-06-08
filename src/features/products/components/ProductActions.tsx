"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/shared/utils/cn";
import type { ProductDetail, ProductVariant } from "../types";
import { getStockStatus, getDisplayPrice } from "../utils";

interface ProductActionsProps {
  product: ProductDetail;
  selectedVariant: ProductVariant | null;
}

export function ProductActions({ product, selectedVariant }: ProductActionsProps) {
  const t = useTranslations("product");
  const variant = selectedVariant;
  const stock = variant
    ? { inStock: variant.quantity > 0, remaining: variant.quantity }
    : getStockStatus(product);

  const maxQuantity = Math.min(stock.remaining, 99);
  const [quantity, setQuantity] = useState(1);

  function handleAddToCart() {
    toast.success(t("addedToCart", { name: product.name, count: quantity }));
  }

  const price = variant ? variant.current_price : getDisplayPrice(product);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-text-primary">{t("quantity")}</span>
        <div className="flex items-center rounded-lg border border-border">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className={cn(
              "flex size-10 items-center justify-center text-text-primary transition hover:bg-surface",
              quantity <= 1 && "cursor-not-allowed opacity-40",
            )}
          >
            <Minus className="size-4" />
          </button>
          <span className="flex min-w-[3rem] items-center justify-center text-sm font-semibold text-text-primary">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
            disabled={quantity >= maxQuantity}
            className={cn(
              "flex size-10 items-center justify-center text-text-primary transition hover:bg-surface",
              quantity >= maxQuantity && "cursor-not-allowed opacity-40",
            )}
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <span className="text-lg font-bold text-text-primary">
          {(price * quantity).toFixed(2)} {t("currency")}
        </span>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!stock.inStock}
        className={cn(
          "flex w-full items-center justify-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold transition",
          stock.inStock
            ? "bg-primary text-white hover:bg-primary-dark"
            : "cursor-not-allowed bg-gray-300 text-gray-500",
        )}
      >
        <ShoppingCart className="size-5" />
        {stock.inStock ? t("addToCart") : t("outOfStock")}
      </button>

      <div className="space-y-1 text-xs text-text-secondary">
        <p>
          {t("sku")}: {product.sku}
        </p>
        <p className={stock.inStock ? "text-green-600" : "text-red-500"}>
          {stock.inStock
            ? t("inStock", { count: stock.remaining })
            : t("outOfStock")}
        </p>
      </div>
    </div>
  );
}
