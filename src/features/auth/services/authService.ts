import { apiFetch } from "@/shared/lib/api";
import type {
  AuthLoginData,
  ChangePasswordPayload,
  ForgetPasswordPayload,
  LoginPayload,
  OtpLoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  SocialLoginPayload,
  VerifyPasswordPayload,
} from "@/features/auth/types";
import type { ApiResponse } from "@/shared/types";

type MessageData = {
  message?: string;
};

function toRegisterBody(payload: RegisterPayload) {
  if (payload.avatar instanceof File) {
    const formData = new FormData();
    formData.append("first_name", payload.first_name);
    formData.append("last_name", payload.last_name);
    formData.append("email", payload.email);
    formData.append("phone", payload.phone);
    formData.append("password", payload.password);
    formData.append("password_confirmation", payload.password_confirmation);
    formData.append("policy", payload.policy ? "1" : "0");
    formData.append("avatar", payload.avatar);
    return formData;
  }

  return JSON.stringify({
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    phone: payload.phone,
    password: payload.password,
    password_confirmation: payload.password_confirmation,
    policy: payload.policy ? "1" : "0",
  });
}

export const authService = {
  login: async (payload: LoginPayload): Promise<ApiResponse<AuthLoginData>> => {
    return apiFetch<ApiResponse<AuthLoginData>>("/token", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  register: async (
    payload: RegisterPayload,
  ): Promise<ApiResponse<AuthLoginData | MessageData>> => {
    return apiFetch<ApiResponse<AuthLoginData | MessageData>>("/register", {
      method: "POST",
      body: toRegisterBody(payload),
    });
  },

  otpLogin: async (
    payload: OtpLoginPayload,
  ): Promise<ApiResponse<AuthLoginData>> => {
    return apiFetch<ApiResponse<AuthLoginData>>("/otp-login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  requestForgetPassword: async (
    payload: ForgetPasswordPayload,
  ): Promise<ApiResponse<MessageData>> => {
    return apiFetch<ApiResponse<MessageData>>("/forget-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  forgetPassword: async (
    payload: VerifyPasswordPayload,
  ): Promise<ApiResponse<MessageData>> => {
    return apiFetch<ApiResponse<MessageData>>("/verify-forget-password-token", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  verifyForgetPasswordToken: async (
    payload: VerifyPasswordPayload,
  ): Promise<ApiResponse<MessageData>> => {
    return authService.forgetPassword(payload);
  },

  verifyPassword: async (
    payload: VerifyPasswordPayload,
  ): Promise<ApiResponse<MessageData>> => {
    return apiFetch<ApiResponse<MessageData>>("/verify-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  resetPassword: async (
    payload: ResetPasswordPayload,
  ): Promise<ApiResponse<MessageData>> => {
    return apiFetch<ApiResponse<MessageData>>("/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  changePassword: async (
    payload: ChangePasswordPayload,
  ): Promise<ApiResponse<MessageData>> => {
    return apiFetch<ApiResponse<MessageData>>("/change-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  socialLogin: async (
    payload: SocialLoginPayload,
  ): Promise<ApiResponse<AuthLoginData | MessageData>> => {
    return apiFetch<ApiResponse<AuthLoginData | MessageData>>("/social-login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  logout: async (): Promise<ApiResponse<MessageData>> => {
    return apiFetch<ApiResponse<MessageData>>("/logout", {
      method: "POST",
    });
  },
};
