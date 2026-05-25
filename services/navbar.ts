import { apiFetch } from "@/lib/api";
import type { NavbarMenu } from "@/types/navbar";

interface ApiResponse<T> {
  status: number;
  message: string;
  success: boolean;
  data: T;
}

export const navBarService = {
  getAll: async (lang: string): Promise<NavbarMenu[]> => {
    const response = await apiFetch<ApiResponse<NavbarMenu[]>>(
      `/general/navbar?lang=${lang}`,
    );
    return response.data;
  },
};