import { apiFetch } from "@/shared/lib/api";
import type { PaginatedData } from "@/shared/types";
import type {
  CartApiCart,
  CartItem,
  AddBulkPayload,
} from "../types";

export const cartService = {
  getCart: async (lang?: string): Promise<CartApiCart | null> => {
    const response = await apiFetch<PaginatedData<CartApiCart>>("/cart", { lang });
    return response.data[0] ?? null;
  },

  addItem: async (
    payload: {
      product_id: number;
      quantity: number;
      product_variant_id?: number | null;
      shipping_method?: "scheduled" | "fast";
    },
    lang?: string,
  ): Promise<CartItem> => {
    return apiFetch<CartItem>("/cart", {
      method: "POST",
      body: JSON.stringify({ item: payload }),
      lang,
    });
  },

  updateItem: async (
    payload: {
      item: {
        product_id: number;
        quantity: number;
        product_variant_id?: number | null;
      };
    },
    lang?: string,
  ): Promise<CartApiCart> => {
    return apiFetch<CartApiCart>("/cart/update-item", {
      method: "PUT",
      body: JSON.stringify(payload),
      lang,
    });
  },

  removeItem: async (itemId: number, lang?: string): Promise<void> => {
    await apiFetch<{ message: string }>("/cart/delete-items", {
      method: "DELETE",
      body: JSON.stringify({ item_id: itemId }),
      lang,
    });
  },

  addBulkToCart: async (payload: AddBulkPayload, lang?: string): Promise<void> => {
    await apiFetch<{ message: string }>("/cart/bulk-items", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
  },
};
