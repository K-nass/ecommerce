import { apiFetch } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/types";
import type {
  CategoryFilters,
  CategoryProduct,
  CategoryProductsResponse,
} from "../types";

export async function getCategoryPageData(
  slug: string,
  locale: string,
): Promise<{ products: CategoryProduct[]; filters: CategoryFilters }> {
  const response = await apiFetch<ApiResponse<CategoryProductsResponse>>(
    `/general/products?category=${encodeURIComponent(slug)}`,
    {
      headers: {
        "lang": locale,
      },
    },
  );
  return {
    products: response.data.data,
    filters: response.data.filters,
  };
}
