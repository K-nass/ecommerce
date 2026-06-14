"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, AlertTriangle, Smartphone } from "lucide-react";
import { toast } from "sonner";
import type { ActionState } from "../actions/types";

interface OtpFormProps {
  action: (formData: FormData) => void;
  pending: boolean;
  state: ActionState | null;
  email: string;
  phone?: string;
  otpStatus?: string;
  method?: "email" | "phone";
  onBack: () => void;
  onAskMeLater?: () => void;
  onResend?: () => void;
  onMethodChange?: (method: "email" | "phone") => void;
}

const OTP_LENGTH = 6;

export function OtpForm({
  action,
  pending,
  state,
  email,
  phone,
  otpStatus,
  method = "email",
  onBack,
  onAskMeLater,
  onResend,
  onMethodChange,
}: OtpFormProps) {
  const fieldErrors = state?.fieldErrors ?? {};
  const p = state?.payload ?? {};
  const formKey = useRef(0);
  const [otp, setOtp] = useState(() => p.code ?? "");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const isOtpDown = otpStatus === "false";

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Verified successfully!");
      formKey.current += 1;
      inputsRef.current[0]?.focus();
    }
  }, [state]);

  const identity = email || p.email || "";
  const identityPhone = phone || p.phone || "";

  function focusInput(index: number) {
    const target = inputsRef.current[index];
    target?.focus();
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

    const nextValue = digits.join("");
    setOtp(nextValue);

    if (cursor < OTP_LENGTH) {
      focusInput(cursor);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === "Backspace") {
      if (otp[index]) {
        return;
      }
      if (index > 0) {
        event.preventDefault();
        const next = otp.split("");
        next[index - 1] = "";
        setOtp(next.join(""));
        focusInput(index - 1);
      }
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    const clipboard = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!clipboard) {
      return;
    }

    event.preventDefault();
    const digits = otp.split("").slice(0, OTP_LENGTH);
    let cursor = 0;

    for (const char of clipboard) {
      if (cursor >= OTP_LENGTH) break;
      digits[cursor] = char;
      cursor += 1;
    }

    setOtp(digits.join(""));
    focusInput(Math.min(cursor, OTP_LENGTH - 1));
  }

  const digits = Array.from({ length: OTP_LENGTH }, (_, index) => otp[index] ?? "");

  return (
    <form className="mx-auto mt-4 max-w-md" action={action}>
      <div className="rounded-3xl border border-border/80 bg-white/95 p-6 shadow-[0_9px_30px_rgba(0,0,0,0.05)]">
        {isOtpDown ? (
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 text-amber-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">OTP service unavailable</p>
              <p className="text-xs text-text-secondary">
                The verification service is temporarily down. Please try resending or use your phone number instead.
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                {method === "email" ? "Verify your email" : "Verify your phone"}
              </p>
              <p className="text-xs text-text-secondary">
                {method === "email"
                  ? `Enter the 6-digit code sent to ${identity}`
                  : `Enter the 6-digit code sent to ${identityPhone}`
                }
              </p>
            </div>
          </div>
        )}

        {!isOtpDown && onMethodChange && method === "phone" ? null : !isOtpDown && onMethodChange ? (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs text-text-secondary">Verify via:</span>
            <button
              type="button"
              onClick={() => onMethodChange("email")}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                method === "email" ? "bg-primary text-white" : "border border-border text-text-primary hover:border-primary"
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => onMethodChange("phone")}
              className={`inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-semibold transition ${
                method === "phone" ? "bg-primary text-white" : "border border-border text-text-primary hover:border-primary"
              }`}
            >
              <Smartphone className="h-3 w-3" /> Phone
            </button>
          </div>
        ) : null}

        {!isOtpDown && (
          <>
            <div className="flex justify-center gap-2 sm:gap-3">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(event) => updateOtpValue(event.target.value, index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  onPaste={handlePaste}
                  ref={(element) => { inputsRef.current[index] = element; }}
                  className="h-14 w-12 rounded-3xl border border-border bg-background text-center text-2xl font-semibold text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-14"
                />
              ))}
            </div>

            {fieldErrors.code ? <p className="mt-2 text-xs text-red-500">{fieldErrors.code}</p> : null}
          </>
        )}

        <div className="mt-6 grid gap-3 sm:grid-cols-[auto_1fr]">
          <button
            type="button"
            onClick={onBack}
            className="rounded-2xl border border-border px-4 py-3 text-sm font-semibold text-text-primary transition hover:border-primary hover:text-primary"
          >
            Back
          </button>
          {!isOtpDown && (
            <button
              type="submit"
              disabled={pending}
              className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
            >
              {pending ? "Verifying..." : "Verify code"}
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-text-secondary">
          <button
            type="button"
            onClick={onResend}
            className="font-semibold text-primary transition hover:text-primary-dark"
          >
            Resend code
          </button>
          {!isOtpDown && onAskMeLater && (
            <button
              type="button"
              onClick={onAskMeLater}
              className="font-semibold text-amber-600 transition hover:text-amber-700"
            >
              Ask me later
            </button>
          )}
        </div>

        {isOtpDown && (
          <div className="mt-3 text-center">
            {onMethodChange && method === "email" ? (
              <button
                type="button"
                onClick={() => onMethodChange("phone")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition hover:text-primary-dark"
              >
                <Smartphone className="h-3 w-3" /> Verify with phone instead
              </button>
            ) : null}
          </div>
        )}
      </div>

      <input type="hidden" name={method === "email" ? "email" : "phone"} value={method === "email" ? identity : identityPhone} />
      <input type="hidden" name="code" value={otp} />
      <input type="hidden" name="method" value={method} />
    </form>
  );
}