import { apiFetch } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/types";

import type { HeroBanner, HomeContentPage, HomePageSection } from "../types";

export const homePageService = {
  getHomePage: async (): Promise<HomeContentPage> => {
    const response = await apiFetch<ApiResponse<HomeContentPage>>(
      "/general/content-pages/home",
    );

    return response.data;
  },

  getHomePageSections: async (): Promise<HomePageSection[]> => {
    const homePage = await homePageService.getHomePage();

    return homePage.sections;
  },

  getHeroBanners: async (endpoint: string): Promise<HeroBanner[]> => {
    const response = await apiFetch<ApiResponse<HeroBanner[]>>(endpoint);

    return response.data;
  },
};
