export interface LoginPayload {
  email?: string;
  phone_number?: string;
  password: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
  avatar?: File | null;
  policy: boolean;
}

export type FieldErrors = Record<string, string>;

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
  permissions?: string[];
  email_verified?: boolean;
  role?: string[];
}

export interface OtpLoginPayload {
  email: string;
  otp: string;
}
