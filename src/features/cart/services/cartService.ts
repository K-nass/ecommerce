import { apiFetch } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/types";
import type {
  CartListResponse,
  CartApiCart,
  CartItem,
  AddBulkPayload,
} from "../types";

export const cartService = {
  getCart: async (lang?: string): Promise<CartApiCart | null> => {
    const response = await apiFetch<CartListResponse>("/cart", { lang });
    return response.data?.[0] ?? null;
  },

  addItem: async (
    payload: {
      product_id: number;
      quantity: number;
      product_variant_id?: number | null;
    },
    lang?: string,
  ): Promise<CartItem> => {
    const response = await apiFetch<ApiResponse<CartItem>>("/cart", {
      method: "POST",
      body: JSON.stringify({ item: payload }),
      lang,
    });
    return response.data;
  },

  updateItem: async (
    payload: {
      item_id: number;
      quantity: number;
    },
    lang?: string,
  ): Promise<CartItem> => {
    const response = await apiFetch<ApiResponse<CartItem>>("/cart/update", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
    return response.data;
  },

  removeItem: async (itemId: number, lang?: string): Promise<void> => {
    await apiFetch<ApiResponse<{ message: string }>>("/cart/delete-items", {
      method: "DELETE",
      body: JSON.stringify({ item_id: itemId }),
      lang,
    });
  },

  addBulkToCart: async (payload: AddBulkPayload, lang?: string): Promise<void> => {
    await apiFetch<ApiResponse<{ message: string }>>("/cart/bulk-items", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
  },
};
