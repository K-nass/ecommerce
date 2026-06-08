"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ShoppingBag, Loader2 } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useGuestCartStore } from "../store/useGuestCartStore";
import { useSyncCartOnLogin } from "../hooks/useSyncCartOnLogin";
import { cartService } from "../services/cartService";
import { ProductCartItem } from "./ProductCartItem";
import { CartSummary } from "./CartSummary";
import { calcSubtotal, calcTotalQuantity } from "../utils";
import ProductSlider from "@/features/home/productSlider/ProductSlider";
import type { CartItem, GuestCartItem } from "../types";

type CartSource = "guest" | "server" | "loading";

export function CartPageContent() {
  const t = useTranslations("cartPage");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const guestItems = useGuestCartStore((s) => s.items);
  const guestRemoveItem = useGuestCartStore((s) => s.removeItem);
  const guestUpdateQuantity = useGuestCartStore((s) => s.updateQuantity);
  useSyncCartOnLogin();

  const [source, setSource] = useState<CartSource>("loading");
  const [serverItems, setServerItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [recommendedProducts] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      cartService
        .getCart()
        .then((cart) => {
          setServerItems(cart.items);
          setSource("server");
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : "Failed to load cart");
          setSource("server");
        });
    } else {
      setSource("guest");
    }
  }, [isAuthenticated]);

  const displayItems: GuestCartItem[] =
    source === "server"
      ? serverItems.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
          name: i.product.name,
          image: i.product.image.thumbnail,
          price: i.product.price,
          current_price: i.product.current_price,
          slug: i.product.slug,
          sku: i.product.sku,
          in_stock: i.product.in_stock,
          stock_quantity: i.product.quantity,
        }))
      : guestItems;

  const subtotal = calcSubtotal(
    displayItems.map((i) => ({ price: i.current_price, quantity: i.quantity })),
  );
  const totalQuantity = calcTotalQuantity(displayItems);

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (source === "server") {
      const item = serverItems.find((i) => i.product_id === productId);
      if (!item) return;
      if (quantity <= 0) {
        cartService.removeItem(item.id).then(() => {
          setServerItems((prev) => prev.filter((i) => i.product_id !== productId));
        });
      } else {
        cartService.updateItem({ item_id: item.id, quantity }).then(() => {
          setServerItems((prev) =>
            prev.map((i) =>
              i.product_id === productId ? { ...i, quantity } : i,
            ),
          );
        });
      }
    } else {
      if (quantity <= 0) {
        guestRemoveItem(productId);
      } else {
        guestUpdateQuantity(productId, quantity);
      }
    }
  };

  const handleRemove = (productId: number) => {
    handleUpdateQuantity(productId, 0);
  };

  if (source === "loading") {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-gray-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-xl bg-primary px-6 py-2 text-sm font-medium text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  if (displayItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <ShoppingBag className="mb-4 h-16 w-16 text-gray-200" />
        <h2 className="text-xl font-bold">{t("emptyTitle")}</h2>
        <p className="mt-1 text-sm text-gray-500">{t("emptyDescription")}</p>
        <Link
          href="/"
          className="mt-6 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          {t("startShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{t("title")}</h2>
          <span className="text-sm text-gray-500">
            {t("cartItems", { count: totalQuantity })}
          </span>
        </div>

        <div className="space-y-4">
          {displayItems.map((item) => (
            <ProductCartItem
              key={item.product_id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <div className="flex justify-between border-t border-border-subtle pt-4 text-sm">
          <span className="text-gray-500">{t("subtotal")}</span>
          <span className="font-bold tabular-nums">
            {subtotal.toFixed(2)} EGP
          </span>
        </div>

        {recommendedProducts.length > 0 && (
          <div className="pt-6">
            <ProductSlider
              title={t("youMightAlsoLike")}
              items={recommendedProducts}
            />
          </div>
        )}
      </div>

      <div>
        <CartSummary items={displayItems} />
      </div>
    </div>
  );
}