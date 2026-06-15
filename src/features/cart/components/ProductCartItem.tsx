"use client";
import Image from "next/image";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import type { GuestCartItem } from "../types";
import { getDisplayPrice, getOriginalPrice } from "@/shared/utils/price";
import type { PriceInfo } from "@/shared/utils/price";

interface ProductCartItemProps {
  item: GuestCartItem;
  isPending?: boolean;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

function toPriceInfo(item: GuestCartItem): PriceInfo {
  return {
    has_flash_sale: false,
    price_after_flash_sale: null,
    has_discount: false,
    price_after_discount: null,
    current_price: item.current_price,
    price: item.price,
  };
}

export function ProductCartItem({
  item,
  isPending = false,
  onUpdateQuantity,
  onRemove,
}: ProductCartItemProps) {
  const priceInfo = toPriceInfo(item);
  const displayPrice = getDisplayPrice(priceInfo);
  const originalPrice = getOriginalPrice(priceInfo);
  const hasDiscount = displayPrice < originalPrice;
  const lineTotal = item.total_price ?? (displayPrice * item.quantity);

  const priceStr = displayPrice.toFixed(2);
  const intPart = priceStr.split(".")[0];
  const decPart = "." + priceStr.split(".")[1];

  const origPriceStr = originalPrice.toFixed(2);
  const origInt = origPriceStr.split(".")[0];
  const origDec = "." + origPriceStr.split(".")[1];

  const discountPercent = hasDiscount
    ? Math.round((1 - displayPrice / originalPrice) * 100)
    : 0;

  return (
    <div className="flex gap-3 border border-border p-3 rounded-lg">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-white">
        <Image src={item.image} alt={item.name} width={96} height={96} className="object-cover" />
      </div>

      <div className="flex flex-1 min-w-0 gap-2">
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <Link href={`/products/${item.slug}`} className="truncate text-sm font-semibold text-text-primary hover:text-primary transition-colors">
              {item.name}
            </Link>
            {item.attributes != null && item.attributes.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {item.attributes.map((attr, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                    {attr.attribute}: {attr.value}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            {hasDiscount && (
              <div className="flex items-center gap-1">
                <span className="text-xs leading-4 font-medium text-gray-500 line-through">
                  {origInt}
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] leading-3 font-medium text-gray-500 line-through">{origDec}</span>
                  <span className="text-[8px] leading-3 font-medium text-gray-500 line-through">EGP</span>
                </div>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span className="text-base leading-5 font-bold">{intPart}</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-3">{decPart}</span>
                <span className="text-[10px] font-medium leading-3">EGP</span>
              </div>
            </div>
            {hasDiscount && (
              <span className="text-[10px] font-bold text-discount bg-red-50 px-1 py-0.5 rounded">
                -{discountPercent}%
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end justify-center gap-2 shrink-0">
          {isPending ? (
            <div className="flex h-7 w-[calc(4*28px+2px)] items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            </div>
          ) : (
            <div className="flex items-center gap-1 rounded-lg border border-border">
              <button
                onClick={() => onRemove(item.product_id)}
                disabled={isPending}
                className="flex h-7 w-7 items-center justify-center text-text-secondary hover:text-red-500 transition-colors disabled:opacity-30"
                aria-label="Remove item"
              >
                <Trash2 className="h-3 w-3" />
              </button>
              <div className="h-4 w-px bg-border" />
              <button
                onClick={() => onUpdateQuantity(item.product_id, item.quantity - 1)}
                disabled={isPending || item.quantity <= 1}
                className="flex h-7 w-7 items-center justify-center text-text-secondary hover:text-primary disabled:opacity-30 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="flex h-7 w-9 items-center justify-center text-sm font-medium tabular-nums">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.product_id, item.quantity + 1)}
                disabled={isPending}
                className="flex h-7 w-7 items-center justify-center text-text-secondary hover:text-primary disabled:opacity-30 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          )}
          <span className="text-xs font-semibold tabular-nums text-text-secondary">
            {lineTotal.toFixed(2)} EGP
          </span>
        </div>
      </div>
    </div>
  );
}