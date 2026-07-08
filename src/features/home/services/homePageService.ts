import { apiFetch } from "@/shared/lib/api";

import type { HomeContentPage } from "../types";

export const homePageService = {
  getHomePage: async (lang?: string): Promise<HomeContentPage> => {
    return apiFetch<HomeContentPage>(
      "/general/content-pages/home",
      { next: { revalidate: 60 }, lang },
    );
  },

  fetchSectionData: async <T>(endpoint: string, lang?: string): Promise<T> => {
    return apiFetch<T>(endpoint, { next: { revalidate: 60 }, lang });
  },
};
