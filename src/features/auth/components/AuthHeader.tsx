"use client";

import Image from "next/image";

interface AuthHeaderProps {
  isLogin: boolean;
  onToggleMode: () => void;
}

export function AuthHeader({ isLogin, onToggleMode }: AuthHeaderProps) {
  return (
    <>
      <div className="mb-3 flex justify-center">
        <Image
          src="/logo.png"
          alt="Kareem Shop"
          width={112}
          height={34}
          style={{ width: "auto", height: "auto" }}
          className="h-8 object-contain"
          priority
          loading="eager"
        />
      </div>

      <h2 className="text-center text-2xl font-semibold text-text-primary sm:text-3xl">
        {isLogin ? "Sign in to Kareem Shop" : "Create your account"}
      </h2>
      <p className="mt-1 text-center text-sm text-text-secondary">
        {isLogin
          ? "Please enter your login details below to continue."
          : "Use your details below to create a new account."}
      </p>
    </>
  );
}
