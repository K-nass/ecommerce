"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export function PasswordInput({
  value,
  onChange,
  placeholder = "Enter your password",
  required = true,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={togglePasswordVisibility}
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
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary"
      />
    </div>
  );
}
