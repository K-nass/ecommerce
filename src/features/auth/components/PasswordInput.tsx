"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  placeholder?: string;
  error?: string;
  name?: string;
  defaultValue?: string;
}

export function PasswordInput({
  placeholder = "Enter your password",
  error,
  name,
  defaultValue,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary transition hover:text-text-primary"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={
            "w-full rounded-xl border bg-background pl-10 pr-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary " +
            (error ? "border-red-500" : "border-border")
          }
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
