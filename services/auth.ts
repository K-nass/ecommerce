import { apiFetch } from "@/lib/api";
import type {
  ApiResponse,
  AuthLoginData,
  ChangePasswordPayload,
  ForgetPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  SocialLoginPayload,
  VerifyPasswordPayload,
} from "@/types";

type MessageData = {
  message?: string;
};

function toRegisterBody(payload: RegisterPayload) {
  if (payload.profile_image instanceof File) {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("password", payload.password);

    if (payload.password_confirmation) {
      formData.append("password_confirmation", payload.password_confirmation);
    }
    if (payload.email) {
      formData.append("email", payload.email);
    }
    if (payload.phone) {
      formData.append("phone", payload.phone);
    }

    formData.append("profile_image", payload.profile_image);
    return formData;
  }

  const jsonPayload: Record<string, string> = {
    name: payload.name,
    password: payload.password,
  };
  if (payload.password_confirmation) {
    jsonPayload.password_confirmation = payload.password_confirmation;
  }
  if (payload.email) {
    jsonPayload.email = payload.email;
  }
  if (payload.phone) {
    jsonPayload.phone = payload.phone;
  }

  return JSON.stringify(jsonPayload);
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
