"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Trash2, Plus, Minus } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useCartActions } from "@/features/cart/hooks/useCartActions";
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
  priority?: boolean;
}

export default function ProductCard({
  image,
  title,
  price,
  originalPrice,
  currency = "K.D",
  discountPercent,
  productId,
  slug = "",
  sku = "",
  inStock = 10,
  stockQuantity = 10,
  deliveryType = "scheduled",
  priority: priorityProp,
}: ProductCardProps) {
  const { quantity, isPending, addItem, increment, decrement } = useCartActions(productId);
  const [animating, setAnimating] = useState(false);

  const handleAdd = useCallback(async () => {
    await addItem({
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
  }, [addItem, title, image, price, slug, sku, inStock, stockQuantity, deliveryType]);

  const handleIncrement = useCallback(async () => {
    await increment();
  }, [increment]);

  const handleDecrement = useCallback(async () => {
    await decrement();
  }, [decrement]);

  const priceStr = price.toString();
  const integerPart = priceStr.split(".")[0];
  const decimalPart = priceStr.includes(".")
    ? "." + priceStr.split(".")[1]
    : ".00";

  return (
    <div className="w-full">
      <div className="relative w-full aspect-square p-2 border-2 border-border-subtle rounded-2xl">
        {discountPercent && discountPercent > 0 ? (
          <div className="absolute top-0 left-0 bg-discount text-white font-bold text-xs px-2.5 py-1 z-10 rounded-br-[16px] rounded-tl-[14px]">
            {discountPercent}% OFF
          </div>
        ) : null}
        <Link href={`/products/${slug}`} className="block w-full h-full relative">
          <Image
            className="object-contain"
            src={image}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            alt={title}
            priority={priorityProp}
          />
        </Link>

        {quantity === 0 ? (
          <button
            type="button"
            onClick={handleAdd}
            disabled={isPending}
            className={cn(
              "absolute right-0 bottom-0 bg-primary rounded-full w-10 h-10 text-white font-medium text-2xl border border-white flex items-center justify-center transition-transform duration-200 hover:scale-105",
              animating && "scale-110",
              isPending && "opacity-70 cursor-not-allowed"
            )}
          >
            <Plus className="h-5 w-5" />
          </button>
        ) : (
          <div className={cn("absolute right-0 bottom-0 flex items-center gap-1 bg-primary rounded-full h-10 px-1 border border-white text-white transition-all duration-300", isPending && "opacity-70 pointer-events-none")}>
            <button
              type="button"
              onClick={handleDecrement}
              disabled={isPending}
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
              disabled={isPending}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <div>
        <Link href={`/products/${slug}`}>
            <p className="text-sm leading-4 font-medium line-clamp-2 text-left md:text-base hover:text-primary transition-colors cursor-pointer">
            {title}
          </p>
        </Link>
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
