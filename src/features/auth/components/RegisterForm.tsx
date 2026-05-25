"use client";

import { FormEvent } from "react";
import { Mail, User } from "lucide-react";
import { AuthTabs } from "./AuthTabs";
import { PhoneInputWithCountry } from "./PhoneInputWithCountry";
import { PasswordInput } from "./PasswordInput";
import { ProfileImageUpload } from "./ProfileImageUpload";

type ContactMethod = "email" | "phone";

interface RegisterFormProps {
  isLogin: boolean;
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
  method: ContactMethod;
  loading: boolean;
  profilePreview: string | null;
  profileFileName?: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmationChange: (value: string) => void;
  onMethodChange: (method: ContactMethod) => void;
  onProfileImageChange: (file: File | null) => void;
  onToggleMode: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function RegisterForm({
  isLogin,
  name,
  email,
  phone,
  password,
  passwordConfirmation,
  method,
  loading,
  profilePreview,
  profileFileName,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onPasswordChange,
  onPasswordConfirmationChange,
  onMethodChange,
  onProfileImageChange,
  onToggleMode,
  onSubmit,
}: RegisterFormProps) {
  return (
    <form className="mx-auto mt-4 max-w-md space-y-2.5" onSubmit={onSubmit}>
      <AuthTabs method={method} onMethodChange={onMethodChange} isLogin={false} />

      <div className="relative">
        <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
        <input
          type="text"
          required
          placeholder="John Doe"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary"
        />
      </div>

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

      <ProfileImageUpload
        preview={profilePreview}
        fileName={profileFileName}
        onChange={onProfileImageChange}
      />

      <PasswordInput
        value={password}
        onChange={onPasswordChange}
        placeholder="Create a password"
      />
      <PasswordInput
        value={passwordConfirmation}
        onChange={onPasswordConfirmationChange}
        placeholder="Confirm your password"
      />

      <div className="flex items-center justify-center gap-2 text-xs text-text-secondary">
        <span>Already have an account?</span>
        <button
          type="button"
          onClick={onToggleMode}
          className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-text-primary transition hover:border-primary hover:text-primary"
        >
          Sign in
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
