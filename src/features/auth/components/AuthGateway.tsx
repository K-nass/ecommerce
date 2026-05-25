"use client";

import { FormEvent, useEffect, useState } from "react";
import { useLocale } from "next-intl";

import { useAuthStore } from "../store/useAuthStore";
import { PatternTiles } from "./PatternTiles";
import { AuthHeader } from "./AuthHeader";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { AuthFeedback } from "./AuthFeedback";

type AuthMode = "login" | "register";
type ContactMethod = "email" | "phone";

export default function AuthGateway() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [mode, setMode] = useState<AuthMode>("login");
  const [loginMethod, setLoginMethod] = useState<ContactMethod>("email");
  const [registerMethod, setRegisterMethod] = useState<ContactMethod>("email");
  const [loginForm, setLoginForm] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    profile_image: null as File | null,
  });
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const { login, register, loading, error } = useAuthStore();
  const isLogin = mode === "login";

  useEffect(() => {
    return () => {
      if (profilePreview) {
        URL.revokeObjectURL(profilePreview);
      }
    };
  }, [profilePreview]);

  async function onLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    setFeedbackError(null);

    const payload =
      loginMethod === "email"
        ? { email: loginForm.email.trim(), password: loginForm.password }
        : { phone: loginForm.phone.trim(), password: loginForm.password };

    try {
      await login(payload);
      setFeedback("You are logged in successfully.");
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Login failed.";
      setFeedbackError(message);
    }
  }

  async function onRegisterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    setFeedbackError(null);

    const payload = {
      name: registerForm.name.trim(),
      password: registerForm.password,
      password_confirmation: registerForm.password_confirmation,
      profile_image: registerForm.profile_image,
      ...(registerMethod === "email"
        ? { email: registerForm.email.trim() }
        : { phone: registerForm.phone.trim() }),
    };

    try {
      await register(payload);
      setFeedback("Account created successfully.");
      setMode("login");
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Register failed.";
      setFeedbackError(message);
    }
  }

  function onProfileImageChange(file: File | null) {
    setRegisterForm((current) => ({
      ...current,
      profile_image: file,
    }));

    setProfilePreview((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return file ? URL.createObjectURL(file) : null;
    });
  }

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="relative isolate min-h-[760px] overflow-hidden rounded-3xl  "
    >
      {/* <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,90,167,0.12),transparent_35%),radial-gradient(circle_at_80%_12%,rgba(207,158,54,0.12),transparent_32%),radial-gradient(circle_at_48%_90%,rgba(227,0,15,0.08),transparent_28%)]" /> */}

      <PatternTiles />

      <div className="relative z-10 flex min-h-[760px] items-center justify-center p-2">
        <div className="w-full max-w-[480px] rounded-xl border border-border/80 bg-white/92 p-4 shadow-[0_16px_38px_rgba(0,74,151,0.15)] backdrop-blur-md sm:p-6">
          <AuthHeader isLogin={isLogin} onToggleMode={() => setMode(isLogin ? "register" : "login")} />

          {isLogin ? (
            <LoginForm
              isLogin={isLogin}
              email={loginForm.email}
              phone={loginForm.phone}
              password={loginForm.password}
              method={loginMethod}
              loading={loading}
              onEmailChange={(value) =>
                setLoginForm((current) => ({ ...current, email: value }))
              }
              onPhoneChange={(value) =>
                setLoginForm((current) => ({ ...current, phone: value }))
              }
              onPasswordChange={(value) =>
                setLoginForm((current) => ({ ...current, password: value }))
              }
              onMethodChange={setLoginMethod}
              onToggleMode={() => setMode("register")}
              onSubmit={onLoginSubmit}
            />
          ) : (
            <RegisterForm
              isLogin={isLogin}
              name={registerForm.name}
              email={registerForm.email}
              phone={registerForm.phone}
              password={registerForm.password}
              passwordConfirmation={registerForm.password_confirmation}
              method={registerMethod}
              loading={loading}
              profilePreview={profilePreview}
              profileFileName={registerForm.profile_image?.name}
              onNameChange={(value) =>
                setRegisterForm((current) => ({ ...current, name: value }))
              }
              onEmailChange={(value) =>
                setRegisterForm((current) => ({ ...current, email: value }))
              }
              onPhoneChange={(value) =>
                setRegisterForm((current) => ({ ...current, phone: value }))
              }
              onPasswordChange={(value) =>
                setRegisterForm((current) => ({ ...current, password: value }))
              }
              onPasswordConfirmationChange={(value) =>
                setRegisterForm((current) => ({
                  ...current,
                  password_confirmation: value,
                }))
              }
              onMethodChange={setRegisterMethod}
              onProfileImageChange={onProfileImageChange}
              onToggleMode={() => setMode("login")}
              onSubmit={onRegisterSubmit}
            />
          )}

          <AuthFeedback
            error={error || feedbackError}
            feedback={feedback}
          />
        </div>
      </div>
    </section>
  );
}
