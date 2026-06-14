"use server";

import { authService } from "../services/authService";
import { ApiError } from "@/shared/lib/api";
import type { ActionState } from "./types";

export async function otpAction(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const email = (formData.get("email") as string) || "";
  const otp = (formData.get("otp") as string) || "";

  if (!email) {
    return { success: false, message: "Email is required.", payload: { email, otp } };
  }

  if (otp.length !== 6) {
    return {
      success: false,
      fieldErrors: { otp: "Code must be exactly 6 digits." },
      message: "Please enter a valid 6-digit code.",
      payload: { email, otp },
    };
  }

  try {
    const response = await authService.otpLogin({ email, otp });

    if (!response.success) {
      return {
        success: false,
        message: response.message || "Verification failed.",
        payload: { email },
      };
    }

    return {
      success: true,
      message: response.message || "Email verified successfully.",
      data: response.data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      const mapped: Record<string, string> = {};
      for (const [key, msgs] of Object.entries(error.fields)) {
        mapped[key] = Array.isArray(msgs) ? msgs[0] : String(msgs);
      }
      return {
        success: false,
        message: error.message,
        fieldErrors: Object.keys(mapped).length ? mapped : undefined,
        payload: { email },
      };
    }
    return {
      success: false,
      message: "Network error. Please try again.",
      payload: { email },
    };
  }
}
