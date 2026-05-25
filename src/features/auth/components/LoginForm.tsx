"use client";

import { FormEvent } from "react";
import { Mail } from "lucide-react";
import { AuthTabs } from "./AuthTabs";
import { PhoneInputWithCountry } from "./PhoneInputWithCountry";
import { PasswordInput } from "./PasswordInput";

type ContactMethod = "email" | "phone";

interface LoginFormProps {
  isLogin: boolean;
  email: string;
  phone: string;
  password: string;
  method: ContactMethod;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onMethodChange: (method: ContactMethod) => void;
  onToggleMode: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function LoginForm({
  isLogin,
  email,
  phone,
  password,
  method,
  loading,
  onEmailChange,
  onPhoneChange,
  onPasswordChange,
  onMethodChange,
  onToggleMode,
  onSubmit,
}: LoginFormProps) {
  return (
    <form className="mx-auto mt-4 max-w-md space-y-2.5" onSubmit={onSubmit}>
      <AuthTabs method={method} onMethodChange={onMethodChange} isLogin={true} />

      {method === "email" ? (
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
          <input
            type="email"
            required
            placeholder="name@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary"
          />
        </div>
      ) : (
        <PhoneInputWithCountry
          value={phone}
          onChange={onPhoneChange}
          placeholder="Enter your phone number"
        />
      )}

      <PasswordInput
        value={password}
        onChange={onPasswordChange}
        placeholder="Enter your password"
      />
      
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="text-xs font-semibold text-primary transition hover:text-primary-dark"
        >
          Forgot the password?
        </button>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span>Don&apos;t have an account?</span>
          <button
            type="button"
            onClick={onToggleMode}
            className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-text-primary transition hover:border-primary hover:text-primary"
          >
            Sign up
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
