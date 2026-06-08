"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import type { ProductDetail } from "../types";
import {
  getDisplayPrice,
  getOriginalPrice,
  getDiscountPercent,
  getAverageRating,
} from "../utils";

interface ProductInfoProps {
  product: ProductDetail;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const t = useTranslations("product");
  const displayPrice = getDisplayPrice(product);
  const originalPrice = getOriginalPrice(product);
  const discountPercent = getDiscountPercent(product);
  const avgRating = getAverageRating(product.reviews);
  const hasDiscount = displayPrice < originalPrice;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-text-primary md:text-3xl">
        {product.name}
      </h1>

      {product.reviews.length > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "size-4",
                  star <= avgRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200",
                )}
              />
            ))}
          </div>
          <span className="text-sm text-text-secondary">
              {avgRating} ({product.reviews.length} {t("reviews")})
            </span>
        </div>
      )}

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-text-primary">
          {displayPrice.toFixed(2)} {t("currency")}
        </span>
        {hasDiscount && (
          <>
            <span className="text-lg text-text-secondary line-through">
              {originalPrice.toFixed(2)} {t("currency")}
            </span>
            {discountPercent && (
              <span className="rounded-md bg-discount px-2 py-0.5 text-xs font-bold text-white">
                -{discountPercent}%
              </span>
            )}
          </>
        )}
      </div>

      <p className="text-sm leading-relaxed text-text-secondary line-clamp-3">
        {product.description}
      </p>
    </div>
  );
}
