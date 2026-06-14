"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { sendOtpCodeAction, otpAction } from "../actions";
import { useAuthStore } from "../store/useAuthStore";
import type { AuthLoginData } from "../types";

interface VerifyEmailModalProps {
  email: string;
  onClose: () => void;
}

const OTP_LENGTH = 6;

export function VerifyEmailModal({ email, onClose }: VerifyEmailModalProps) {
  const setAuthData = useAuthStore((s) => s.setAuthData);
  const token = useAuthStore((s) => s.token);
  const permissions = useAuthStore((s) => s.permissions);
  const role = useAuthStore((s) => s.role);
  const [step, setStep] = useState<"sending" | "verify">("sending");
  const [otp, setOtp] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const formData = new FormData();
    formData.set("email", email);
    sendOtpCodeAction(null, formData).then((result) => {
      if (result.success) {
        toast.success(result.message || "OTP code sent to your email.");
        setStep("verify");
        setTimeout(() => inputsRef.current[0]?.focus(), 100);
      } else {
        toast.error(result.message || "Failed to send OTP code.");
        setError(result.message || "Failed to send OTP code.");
      }
    });
  }, [email]);

  function handleVerify() {
    if (otp.length !== OTP_LENGTH) {
      setError("Please enter a valid 6-digit code.");
      return;
    }
    setPending(true);
    setError("");

    const formData = new FormData();
    formData.set("email", email);
    formData.set("code", otp);

    otpAction(null, formData).then((result) => {
      setPending(false);
      if (result.success) {
        const updatedData: AuthLoginData = {
          token: token || result.data?.token || "",
          permissions: result.data?.permissions ?? permissions,
          role: result.data?.role ?? role,
          email_verified: true,
          email: result.data?.email || email,
          phone_number: result.data?.phone_number,
        };
        setAuthData(updatedData);
        toast.success(result.message || "Email verified successfully!");
        onClose();
      } else {
        setError(result.message || "Verification failed.");
      }
    });
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose();
  }

  function updateOtpValue(value: string, index: number) {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) {
      const next = otp.split("");
      next[index] = "";
      setOtp(next.join(""));
      return;
    }
    const digits = otp.split("").slice(0, OTP_LENGTH);
    let cursor = index;
    for (const char of cleaned) {
      if (cursor >= OTP_LENGTH) break;
      digits[cursor] = char;
      cursor += 1;
    }
    setOtp(digits.join(""));
    if (cursor < OTP_LENGTH) {
      inputsRef.current[cursor]?.focus();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === "Backspace") {
      if (otp[index]) return;
      if (index > 0) {
        event.preventDefault();
        const next = otp.split("");
        next[index - 1] = "";
        setOtp(next.join(""));
        inputsRef.current[index - 1]?.focus();
      }
    }
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      inputsRef.current[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    const clipboard = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!clipboard) return;
    event.preventDefault();
    const digits = otp.split("").slice(0, OTP_LENGTH);
    let cursor = 0;
    for (const char of clipboard) {
      if (cursor >= OTP_LENGTH) break;
      digits[cursor] = char;
      cursor += 1;
    }
    setOtp(digits.join(""));
    inputsRef.current[Math.min(cursor, OTP_LENGTH - 1)]?.focus();
  }

  const digits = Array.from({ length: OTP_LENGTH }, (_, i) => otp[i] ?? "");

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-label="Verify email"
    >
      <div className="relative w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-surface text-text-primary transition hover:bg-border"
        >
          <X className="h-4 w-4" />
        </button>

        {step === "sending" ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary animate-pulse">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-text-primary">Sending verification code...</p>
            <p className="text-xs text-text-secondary">Please wait while we send a code to {email}</p>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Verify your email</p>
                <p className="text-xs text-text-secondary">
                  Enter the 6-digit code sent to <span className="font-semibold">{email}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-2 sm:gap-3">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => updateOtpValue(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={(el) => { inputsRef.current[index] = el; }}
                  className="h-14 w-12 rounded-3xl border border-border bg-background text-center text-2xl font-semibold text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-14"
                />
              ))}
            </div>

            {error && <p className="mt-2 text-center text-xs text-red-500">{error}</p>}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-border px-4 py-3 text-sm font-semibold text-text-primary transition hover:border-primary hover:text-primary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVerify}
                disabled={pending || otp.length !== OTP_LENGTH}
                className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {pending ? "Verifying..." : "Verify"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}