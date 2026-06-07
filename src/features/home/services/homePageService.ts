import { apiFetch } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/types";

import type {
  HeroBanner,
  HomeCategory,
  HomeContentPage,
  HomePageSection,
  Promotion,
  ApiProduct,
  ApiFlashSale,
  ApiBrandWithProducts,
  ApiCoupon,
} from "../types";

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

  getPromotions: async (endpoint: string): Promise<Promotion[]> => {
    const response = await apiFetch<ApiResponse<Promotion[]>>(endpoint);

    return response.data;
  },

  getCategories: async (endpoint: string): Promise<HomeCategory[]> => {
    const response = await apiFetch<ApiResponse<HomeCategory[]>>(endpoint);

    return response.data;
  },

  // Temporarily disabled
  // getProducts: async (endpoint: string): Promise<ApiProduct[] | null> => {
  //   const response = await apiFetch<ApiResponse<ApiProduct[]>>(endpoint);
  //
  //   return response.data || [];
  // },

  getFlashSales: async (endpoint: string): Promise<ApiFlashSale[]> => {
    const response = await apiFetch<ApiResponse<ApiFlashSale[]>>(endpoint);

    return response.data;
  },

  getBrandsWithProducts: async (endpoint: string): Promise<ApiBrandWithProducts[]> => {
    const response = await apiFetch<ApiResponse<ApiBrandWithProducts[]>>(endpoint);

    return response.data;
  },

  getCoupons: async (endpoint: string): Promise<ApiCoupon[]> => {
    const response = await apiFetch<ApiResponse<ApiCoupon[]>>(endpoint);

    return response.data;
  },

  // Currently not used in the home page
  // getParentCategoryProducts: async (endpoint: string): Promise<ApiProduct[]> => {
  //   const response = await apiFetch<ApiResponse<ApiProduct[]>>(endpoint);

  //   return response.data;
  // },

  // getNewArrivalsProducts: async (endpoint: string): Promise<ApiProduct[]> => {
  //   const response = await apiFetch<ApiResponse<ApiProduct[]>>(endpoint);

  //   return response.data;
  // },

  // getAllDiscountProduct:async (endpoint: string): Promise<ApiProduct[]> => {
  //   const response = await apiFetch<ApiResponse<ApiProduct[]>>(endpoint);

  //   return response.data;
  // },
};
