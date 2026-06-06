"use client";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { GuestCartItem } from "../types";
import { getDisplayPrice, getOriginalPrice } from "@/shared/utils/price";
import type { PriceInfo } from "@/shared/utils/price";

interface ProductCartItemProps {
  item: GuestCartItem;
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

export function ProductCartItem({ item, onUpdateQuantity, onRemove }: ProductCartItemProps) {
  const priceInfo = toPriceInfo(item);
  const displayPrice = getDisplayPrice(priceInfo);
  const originalPrice = getOriginalPrice(priceInfo);
  const hasDiscount = displayPrice < originalPrice;
  const lineTotal = displayPrice * item.quantity;

  return (
    <div className="flex gap-4 border-b border-border-subtle pb-4">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-white">
        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="112px" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-2">
          <div className="min-w-0">
            <h4 className="truncate text-sm font-medium">{item.name}</h4>
          </div>
          <button
            onClick={() => onRemove(item.product_id)}
            className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">{originalPrice.toFixed(2)} EGP</span>
          )}
          <span className="text-sm font-bold">{displayPrice.toFixed(2)} EGP</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-lg border border-border-subtle">
            <button
              onClick={() => onUpdateQuantity(item.product_id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="flex h-8 w-8 items-center justify-center text-gray-600 hover:text-primary disabled:opacity-30 transition-colors"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="flex h-8 w-10 items-center justify-center text-sm font-medium tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.product_id, item.quantity + 1)}
              disabled={item.quantity >= item.stock_quantity}
              className="flex h-8 w-8 items-center justify-center text-gray-600 hover:text-primary disabled:opacity-30 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <span className="text-sm font-bold tabular-nums">{lineTotal.toFixed(2)} EGP</span>
        </div>
      </div>
    </div>
  );
}