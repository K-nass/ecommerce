"use client";

import { useEffect, useRef, useState, useActionState, useCallback } from "react";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";

import { PatternTiles } from "./PatternTiles";
import { AuthHeader } from "./AuthHeader";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { OtpForm } from "./OtpForm";
import { AuthFeedback } from "./AuthFeedback";
import {
  loginAction,
  registerAction,
  otpAction,
  sendOtpCodeAction,
} from "../actions";
import { useAuthStore } from "../store/useAuthStore";

type AuthMode = "login" | "register" | "otp";

export default function AuthGateway() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [mode, setMode] = useState<AuthMode>("login");
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [otpMethod, setOtpMethod] = useState<"email" | "phone">("email");
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [profileFileName, setProfileFileName] = useState<string | undefined>();
  const [otpEmail, setOtpEmail] = useState("");
  const [otpPhone, setOtpPhone] = useState("");
  const [otpStatus, setOtpStatus] = useState<string | undefined>();

  const router = useRouter();
  const setAuthData = useAuthStore((s) => s.setAuthData);

  const [loginState, loginFormAction, loginPending] = useActionState(loginAction, null);
  const [registerState, registerFormAction, registerPending] = useActionState(registerAction, null);
  const [otpState, otpFormAction, otpPending] = useActionState(otpAction, null);

  const isLogin = mode === "login";
  const registerHandledRef = useRef(false);

  const handleResend = useCallback(() => {
    const formData = new FormData();
    if (otpMethod === "email" && otpEmail) {
      formData.set("email", otpEmail);
    } else if (otpPhone) {
      formData.set("phone", otpPhone);
    } else {
      toast.error("No contact method available for resend.");
      return;
    }
    sendOtpCodeAction(null, formData).then((result) => {
      if (result.success) {
        toast.success(result.message || "A new code has been sent.");
      } else {
        toast.error(result.message || "Failed to send code.");
      }
    });
  }, [otpEmail, otpPhone, otpMethod]);

  const handleAskMeLater = useCallback(() => {
    router.push("/auth");
  }, [router]);

  const handleOtpMethodChange = useCallback((newMethod: "email" | "phone") => {
    setOtpMethod(newMethod);
  }, []);

  useEffect(() => {
    return () => {
      if (profilePreview) {
        URL.revokeObjectURL(profilePreview);
      }
    };
  }, [profilePreview]);

  useEffect(() => {
    if (mode === "register") {
      registerHandledRef.current = false;
    }
  }, [mode]);

  useEffect(() => {
    if (!registerState) return;
    const noFieldErrors = !registerState.fieldErrors || Object.keys(registerState.fieldErrors).length === 0;
    if (noFieldErrors && registerState.payload?.email && !registerHandledRef.current) {
      registerHandledRef.current = true;
      setOtpEmail(registerState.payload.email);
      setOtpPhone(registerState.payload.phone || "");
      setOtpStatus(registerState.payload.otp_status);
      setOtpMethod("email");
      setMode("otp");
      toast.success("Account created! Check your email inbox for the OTP code.");
    }
  }, [registerState]);

  useEffect(() => {
    if (otpState?.success) {
      toast.success(otpState.message || "Verified successfully!");
      router.push("/auth");
    }
  }, [otpState, router]);

  useEffect(() => {
    if (loginState?.success && loginState.data) {
      setAuthData(loginState.data);
      toast.success(loginState.message || "Logged in successfully!");
      router.push("/");
    }
  }, [loginState, setAuthData, router]);

  function onProfileImageChange(file: File | null) {
    setProfileFileName(file?.name);
    setProfilePreview((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return file ? URL.createObjectURL(file) : null;
    });
  }

  function handleOtpMode(email: string) {
    setOtpEmail(email);
    setOtpMethod("email");
    setMode("otp");
  }

  function renderForm() {
    switch (mode) {
      case "login":
        return (
          <LoginForm
            action={loginFormAction}
            pending={loginPending}
            state={loginState}
            method={loginMethod}
            onMethodChange={setLoginMethod}
            onToggleMode={() => setMode("register")}
            onOtpMode={handleOtpMode}
          />
        );
      case "register":
        return (
          <RegisterForm
            action={registerFormAction}
            pending={registerPending}
            state={registerState}
            profilePreview={profilePreview}
            profileFileName={profileFileName}
            onProfileImageChange={onProfileImageChange}
            onToggleMode={() => setMode("login")}
          />
        );
      case "otp":
        return (
          <OtpForm
            action={otpFormAction}
            pending={otpPending}
            state={otpState}
            email={otpEmail}
            phone={otpPhone}
            otpStatus={otpStatus}
            method={otpMethod}
            onBack={() => setMode("login")}
            onAskMeLater={handleAskMeLater}
            onResend={handleResend}
            onMethodChange={handleOtpMethodChange}
          />
        );
    }
  }

  function getFeedbackMessage() {
    if (mode === "otp") {
      return {
        error: otpState && !otpState.success ? otpState.message : null,
        success: otpState?.success ? otpState.message : null,
      };
    }
    if (isLogin) {
      return {
        error: loginState && !loginState.success ? loginState.message : null,
        success: loginState?.success ? loginState.message : null,
      };
    }
    return {
      error: registerState && !registerState.success ? registerState.message : null,
      success: registerState?.success ? registerState.message : null,
    };
  }

  const { error: feedbackError, success: feedbackSuccess } = getFeedbackMessage();

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="relative isolate min-h-[760px] overflow-hidden rounded-3xl"
    >
      <PatternTiles />

      <div className="relative z-10 flex min-h-[760px] items-center justify-center p-2">
        <div className="w-full max-w-[480px] rounded-xl border border-border/80 bg-white/92 p-4 shadow-[0_16px_38px_rgba(0,74,151,0.15)] backdrop-blur-md sm:p-6">
          <AuthHeader isLogin={mode === "login"} isOtp={mode === "otp"} />

          {renderForm()}

          <AuthFeedback error={feedbackError} success={feedbackSuccess} />
        </div>
      </div>
    </section>
  );
}