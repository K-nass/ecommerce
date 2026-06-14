"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useGuestCartStore } from "@/features/cart/store/useGuestCartStore";
import type { DeliveryType } from "@/features/cart/types";

interface ProductCardProps {
  deliveryType?: DeliveryType;
  image: string;
  title: string;
  price: number;
  originalPrice: number;
  currency?: string;
  discountPercent?: number;
  productId: number;
  slug?: string;
  sku?: string;
  inStock?: number;
  stockQuantity?: number;
}

export default function ProductCard({
  image,
  title,
  price,
  originalPrice,
  currency = "EGP",
  discountPercent,
  productId,
  slug = "",
  sku = "",
  inStock = 10,
  stockQuantity = 10,
  deliveryType = "scheduled",
}: ProductCardProps) {
  const addItem = useGuestCartStore((s) => s.addItem);
  const removeItem = useGuestCartStore((s) => s.removeItem);
  const updateQuantity = useGuestCartStore((s) => s.updateQuantity);
  const cartItem = useGuestCartStore((s) =>
    s.items.find((i) => i.product_id === productId),
  );

  const [animating, setAnimating] = useState(false);

  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = useCallback(() => {
    addItem({
      product_id: productId,
      quantity: 1,
      name: title,
      image,
      price,
      current_price: price,
      slug,
      sku,
      in_stock: inStock,
      stock_quantity: stockQuantity,
      deliveryType,
    });
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
  }, [addItem, productId, title, image, price, slug, sku, inStock, stockQuantity, deliveryType]);

  const handleIncrement = useCallback(() => {
    updateQuantity(productId, quantity + 1);
  }, [updateQuantity, productId, quantity]);

  const handleDecrement = useCallback(() => {
    if (quantity <= 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, quantity - 1);
    }
  }, [quantity, removeItem, updateQuantity, productId]);

  const priceStr = price.toString();
  const integerPart = priceStr.split(".")[0];
  const decimalPart = priceStr.includes(".")
    ? "." + priceStr.split(".")[1]
    : ".00";

  return (
    <div className="max-w-42.5">
      <div className="relative  w-fit p-2 border-2 border-border-subtle rounded-2xl">
        {discountPercent && discountPercent > 0 ? (
          <div className="absolute top-0 left-0 bg-discount text-white font-bold text-xs px-2.5 py-1 z-10 rounded-br-[16px] rounded-tl-[14px]">
            {discountPercent}% OFF
          </div>
        ) : null}
        <Image
          className="object-contain"
          src={image}
          width={150}
          height={150}
          alt={title}
        />

        {quantity === 0 ? (
          <button
            type="button"
            onClick={handleAdd}
            className={cn(
              "absolute right-0 bottom-0 bg-primary rounded-full w-10 h-10 text-white font-medium text-2xl border border-white flex items-center justify-center transition-transform duration-200 hover:scale-105",
              animating && "scale-110",
            )}
          >
            <Plus className="h-5 w-5" />
          </button>
        ) : (
          <div className="absolute right-0 bottom-0 flex items-center gap-1 bg-primary rounded-full h-10 px-1 border border-white text-white transition-all duration-300">
            <button
              type="button"
              onClick={handleDecrement}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              aria-label="Decrease quantity"
            >
              {quantity === 1 ? (
                <Trash2 className="h-4 w-4" />
              ) : (
                <Minus className="h-4 w-4" />
              )}
            </button>
            <span className="min-w-[1.5rem] text-center text-sm font-bold tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm leading-4 font-medium line-clamp-2 text-left md:text-md">
          {title}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex mt-1">
          <span className="text-lg leading-5 font-bold md:text-xl">
            {integerPart}
          </span>
          <div className="flex flex-col">
            <div className="text-sm font-bold leading-2.5">{decimalPart}</div>
            <div className="text-[10px] font-medium leading-2.5">
              {currency}
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm leading-4 font-medium text-gray-500 text-left self-center line-through">
            {currency} {originalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}



