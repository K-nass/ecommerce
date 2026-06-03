"use client";

import { FormEvent } from "react";
import { Mail, Phone, User } from "lucide-react";
import { PhoneInputWithCountry } from "./PhoneInputWithCountry";
import { PasswordInput } from "./PasswordInput";
import { ProfileImageUpload } from "./ProfileImageUpload";

interface RegisterFormProps {
  isLogin: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
  loading: boolean;
  profilePreview: string | null;
  profileFileName?: string;
  policy: boolean;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmationChange: (value: string) => void;
  onProfileImageChange: (file: File | null) => void;
  onPolicyChange: (value: boolean) => void;
  onToggleMode: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function RegisterForm({
  isLogin,
  firstName,
  lastName,
  email,
  phone,
  password,
  passwordConfirmation,
  loading,
  profilePreview,
  profileFileName,
  policy,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPhoneChange,
  onPasswordChange,
  onPasswordConfirmationChange,
  onProfileImageChange,
  onPolicyChange,
  onToggleMode,
  onSubmit,
}: RegisterFormProps) {
  return (
    <form className="mx-auto mt-4 max-w-md space-y-2.5" onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            required
            placeholder="First name"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary"
          />
        </div>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            required
            placeholder="Last name"
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
            className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary"
          />
        </div>
      </div>

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

      <PhoneInputWithCountry
        value={phone}
        onChange={onPhoneChange}
        placeholder="Enter your phone number"
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

      <ProfileImageUpload
        preview={profilePreview}
        fileName={profileFileName}
        onChange={onProfileImageChange}
      />

      <label className="flex cursor-pointer items-start gap-2 text-xs text-text-secondary">
        <input
          type="checkbox"
          checked={policy}
          onChange={(e) => onPolicyChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
        />
        <span>
          I agree to the{" "}
          <a href="#" className="text-primary underline hover:text-primary-dark">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary underline hover:text-primary-dark">
            Privacy Policy
          </a>
        </span>
      </label>

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

