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

export const authService = {
  login: async (payload: LoginPayload, lang?: string): Promise<AuthLoginData> => {
    return apiFetch<AuthLoginData>("/token", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
  },

  sendOtpCode: async (
    payload: SendOtpCodePayload,
    lang?: string,
  ): Promise<Record<string, unknown>> => {
    return apiFetch<Record<string, unknown>>("/send-otp-code", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
  },

  register: async (
    payload: RegisterPayload,
    lang?: string,
  ): Promise<AuthLoginData | Record<string, unknown>> => {
    return apiFetch<AuthLoginData | Record<string, unknown>>("/register", {
      method: "POST",
      body: toRegisterBody(payload),
      lang,
    });
  },

  otpLogin: async (
    payload: OtpLoginPayload,
    lang?: string,
  ): Promise<AuthLoginData> => {
    return apiFetch<AuthLoginData>("/otp-login", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
  },

  requestForgetPassword: async (
    payload: ForgetPasswordPayload,
    lang?: string,
  ): Promise<Record<string, unknown>> => {
    return apiFetch<Record<string, unknown>>("/forget-password", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
  },

  forgetPassword: async (
    payload: VerifyPasswordPayload,
    lang?: string,
  ): Promise<Record<string, unknown>> => {
    return apiFetch<Record<string, unknown>>("/verify-forget-password-token", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
  },

  verifyForgetPasswordToken: async (
    payload: VerifyPasswordPayload,
    lang?: string,
  ): Promise<Record<string, unknown>> => {
    return authService.forgetPassword(payload, lang);
  },

  verifyPassword: async (
    payload: VerifyPasswordPayload,
    lang?: string,
  ): Promise<Record<string, unknown>> => {
    return apiFetch<Record<string, unknown>>("/verify-password", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
  },

  resetPassword: async (
    payload: ResetPasswordPayload,
    lang?: string,
  ): Promise<Record<string, unknown>> => {
    return apiFetch<Record<string, unknown>>("/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
  },

  changePassword: async (
    payload: ChangePasswordPayload,
    lang?: string,
  ): Promise<Record<string, unknown>> => {
    return apiFetch<Record<string, unknown>>("/change-password", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
  },

  socialLogin: async (
    payload: SocialLoginPayload,
    lang?: string,
  ): Promise<AuthLoginData | Record<string, unknown>> => {
    return apiFetch<AuthLoginData | Record<string, unknown>>("/social-login", {
      method: "POST",
      body: JSON.stringify(payload),
      lang,
    });
  },

  logout: async (lang?: string): Promise<Record<string, unknown>> => {
    return apiFetch<Record<string, unknown>>("/logout", {
      method: "POST",
      lang,
    });
  },
};