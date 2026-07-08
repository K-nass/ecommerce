import { apiFetch } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/types";
import type { CheckoutRequest, CheckoutResponse, FastCheckoutRequest, FastCheckoutResponse } from "../types";

export const checkoutService = {
  processFastCheckout: async (
    payload: FastCheckoutRequest,
    lang?: string,
  ): Promise<FastCheckoutResponse> => {
    const response = await apiFetch<ApiResponse<FastCheckoutResponse>>("/general/checkout/fast", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
    return response.data;
  },
  processCheckout: async (
    payload: CheckoutRequest,
    lang?: string,
  ): Promise<CheckoutResponse> => {
    const response = await apiFetch<ApiResponse<CheckoutResponse>>("/general/checkout", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
    return response.data;
  },
};
