import { apiFetch } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/types";

import type { HomeContentPage } from "../types";

export const homePageService = {
  getHomePage: async (): Promise<HomeContentPage> => {
    const response = await apiFetch<ApiResponse<HomeContentPage>>(
      "/general/content-pages/home",
      { next: { revalidate: 60 } },
    );
    return response.data;
  },

  fetchSectionData: async <T>(endpoint: string): Promise<T> => {
    const response = await apiFetch<ApiResponse<T>>(endpoint);
    return response.data;
  },
};
