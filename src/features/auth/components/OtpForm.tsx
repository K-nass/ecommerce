"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import type { ActionState } from "../actions/types";

interface OtpFormProps {
  action: (formData: FormData) => void;
  pending: boolean;
  state: ActionState | null;
  email: string;
  onBack: () => void;
}

const OTP_LENGTH = 6;

export function OtpForm({ action, pending, state, email, onBack }: OtpFormProps) {
  const fieldErrors = state?.fieldErrors ?? {};
  const p = state?.payload ?? {};
  const formKey = useRef(0);
  const [otp, setOtp] = useState(() => p.otp ?? "");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    setOtp(p.otp ?? "");
  }, [p.otp]);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Email verified successfully!");
      setOtp("");
      formKey.current += 1;
      inputsRef.current[0]?.focus();
    }
  }, [state]);

  const normalizedEmail = email || p.email || "";

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
    <form key={formKey.current} className="mx-auto mt-4 max-w-md" action={action}>
      <div className="rounded-3xl border border-border/80 bg-white/95 p-6 shadow-[0_9px_30px_rgba(0,0,0,0.05)]">
        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">Verify your email</p>
            <p className="text-xs text-text-secondary">
              Enter the 6-digit code sent to <span className="font-semibold text-text-primary">{normalizedEmail}</span>
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
              onChange={(event) => updateOtpValue(event.target.value, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onPaste={handlePaste}
              ref={(element) => (inputsRef.current[index] = element)}
              className="h-14 w-12 rounded-3xl border border-border bg-background text-center text-2xl font-semibold text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-14"
            />
          ))}
        </div>

        {fieldErrors.otp ? <p className="mt-2 text-xs text-red-500">{fieldErrors.otp}</p> : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-[auto_1fr]">
          <button
            type="button"
            onClick={onBack}
            className="rounded-2xl border border-border px-4 py-3 text-sm font-semibold text-text-primary transition hover:border-primary hover:text-primary"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending ? "Verifying..." : "Verify code"}
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-text-secondary">
          Didn’t receive a code?{' '}
          <button
            type="button"
            onClick={() => toast("A new code has been sent to your email.")}
            className="font-semibold text-primary transition hover:text-primary-dark"
          >
            Resend
          </button>
        </p>
      </div>

      <input type="hidden" name="email" value={normalizedEmail} />
      <input type="hidden" name="otp" value={otp} />
    </form>
  );
}
