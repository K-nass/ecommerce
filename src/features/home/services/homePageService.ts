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

  getHeroBanners: async (): Promise<HeroBanner[]> => {
    const response = await apiFetch<ApiResponse<HeroBanner[]>>("/general/banners");

    return response.data;
  },

  getPromotions: async (): Promise<Promotion[]> => {
    const response = await apiFetch<ApiResponse<Promotion[]>>("/general/promotions");

    return response.data;
  },

  getCategories: async (): Promise<HomeCategory[]> => {
    const response = await apiFetch<ApiResponse<HomeCategory[]>>("/general/categories");

    return response.data;
  },

  // Temporarily disabled
  // getProducts: async (endpoint: string): Promise<ApiProduct[] | null> => {
  //   const response = await apiFetch<ApiResponse<ApiProduct[]>>(endpoint);
  //
  //   return response.data || [];
  // },

  getProductsBySectionType: async (type: string): Promise<ApiProduct[]> => {
    const response = await apiFetch<ApiResponse<ApiProduct[]>>(
      `/general/products/section?type=${type}`
    );

    return response.data;
  },

  getFlashSales: async (): Promise<ApiFlashSale[]> => {
    const response = await apiFetch<ApiResponse<ApiFlashSale[]>>("/general/flash-sales");

    return response.data;
  },

  getBrandsWithProducts: async (): Promise<ApiBrandWithProducts[]> => {
    const response = await apiFetch<ApiResponse<ApiBrandWithProducts[]>>("/general/brands");

    return response.data;
  },

  getCoupons: async (): Promise<ApiCoupon[]> => {
    const response = await apiFetch<ApiResponse<ApiCoupon[]>>("/general/coupons");

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
