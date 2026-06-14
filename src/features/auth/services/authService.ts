import { apiFetch } from "@/shared/lib/api";
import type {
  AuthLoginData,
  ChangePasswordPayload,
  ForgetPasswordPayload,
  LoginPayload,
  OtpLoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  SendOtpCodePayload,
  SocialLoginPayload,
  VerifyPasswordPayload,
} from "@/features/auth/types";
import type { ApiResponse } from "@/shared/types";

function toRegisterBody(payload: RegisterPayload) {
  if (payload.avatar instanceof File) {
    const formData = new FormData();
    formData.append("first_name", payload.first_name);
    formData.append("last_name", payload.last_name);
    formData.append("email", payload.email);
    formData.append("phone_number", payload.phone_number);
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
    phone_number: payload.phone_number,
    password: payload.password,
    password_confirmation: payload.password_confirmation,
    policy: payload.policy ? "1" : "0",
  });
}

type AuthResponse = ApiResponse<AuthLoginData>;
type MessageResponse = ApiResponse<Record<string, unknown>>;

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    return apiFetch<AuthResponse>("/token", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  sendOtpCode: async (
    payload: SendOtpCodePayload,
  ): Promise<MessageResponse> => {
    return apiFetch<MessageResponse>("/send-otp-code", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  register: async (
    payload: RegisterPayload,
  ): Promise<ApiResponse<AuthLoginData | Record<string, unknown>>> => {
    return apiFetch<ApiResponse<AuthLoginData | Record<string, unknown>>>("/register", {
      method: "POST",
      body: toRegisterBody(payload),
    });
  },

  otpLogin: async (
    payload: OtpLoginPayload,
  ): Promise<AuthResponse> => {
    return apiFetch<AuthResponse>("/otp-login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  requestForgetPassword: async (
    payload: ForgetPasswordPayload,
  ): Promise<MessageResponse> => {
    return apiFetch<MessageResponse>("/forget-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  forgetPassword: async (
    payload: VerifyPasswordPayload,
  ): Promise<MessageResponse> => {
    return apiFetch<MessageResponse>("/verify-forget-password-token", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  verifyForgetPasswordToken: async (
    payload: VerifyPasswordPayload,
  ): Promise<MessageResponse> => {
    return authService.forgetPassword(payload);
  },

  verifyPassword: async (
    payload: VerifyPasswordPayload,
  ): Promise<MessageResponse> => {
    return apiFetch<MessageResponse>("/verify-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  resetPassword: async (
    payload: ResetPasswordPayload,
  ): Promise<MessageResponse> => {
    return apiFetch<MessageResponse>("/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  changePassword: async (
    payload: ChangePasswordPayload,
  ): Promise<MessageResponse> => {
    return apiFetch<MessageResponse>("/change-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  socialLogin: async (
    payload: SocialLoginPayload,
  ): Promise<ApiResponse<AuthLoginData | Record<string, unknown>>> => {
    return apiFetch<ApiResponse<AuthLoginData | Record<string, unknown>>>("/social-login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  logout: async (): Promise<MessageResponse> => {
    return apiFetch<MessageResponse>("/logout", {
      method: "POST",
    });
  },
};