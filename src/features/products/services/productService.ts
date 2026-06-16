import { apiFetch } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/types";
import type { ProductDetail } from "../types";

export const productService = {
  getProduct: async (id: number, lang?: string): Promise<ProductDetail> => {
    const response = await apiFetch<ApiResponse<ProductDetail>>(
      `/general/products/${id}`,
      { lang },
    );
    return response.data;
  },

  getProductBySlug: async (slug: string, lang?: string): Promise<ProductDetail> => {
    const response = await apiFetch<ApiResponse<ProductDetail>>(
      `/general/products/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 }, lang },
    );
    return response.data;
  },
};
