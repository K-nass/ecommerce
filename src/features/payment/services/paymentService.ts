import { apiFetch } from "@/shared/lib/api";
import type { CheckoutRequest, CheckoutResponse, FastCheckoutRequest, FastCheckoutResponse } from "../types";

export const checkoutService = {
  processFastCheckout: async (
    payload: FastCheckoutRequest,
    lang?: string,
  ): Promise<FastCheckoutResponse> => {
    return apiFetch<FastCheckoutResponse>("/general/checkout/fast", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
  },
  processCheckout: async (
    payload: CheckoutRequest,
    lang?: string,
  ): Promise<CheckoutResponse> => {
    return apiFetch<CheckoutResponse>("/general/checkout", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
  },
};
