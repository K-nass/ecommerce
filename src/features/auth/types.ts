export interface LoginPayload {
  email?: string;
  phone?: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email?: string;
  phone?: string;
  password: string;
  password_confirmation?: string;
  profile_image?: File | null;
}

export interface ForgetPasswordPayload {
  email: string;
}

export interface VerifyPasswordPayload {
  email: string;
  token: string;
}

export interface ResetPasswordPayload {
  email: string;
  token: string;
  password: string;
  password_confirmation?: string;
}

export interface ChangePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation?: string;
}

export interface SocialLoginPayload {
  provider: string;
  access_token: string;
}

export interface AuthLoginData {
  token: string;
  permissions: string[];
  email_verified: boolean;
  role: string[];
}

