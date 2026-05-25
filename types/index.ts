// Core TypeScript schema interfaces - project-wide models

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  inventory: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface BannerItem {
  id: string;
  imageSrc: string;
  alt: string;
  href?: string;
  priority?: boolean;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  success: boolean;
  data: T;
}

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
