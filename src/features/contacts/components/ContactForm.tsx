"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Mail, FileText, MessageSquare, Send, CheckCircle, ArrowRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { contactService } from "../services/contactService";
import type { ContactFormData } from "../types";

interface ContactFormProps {
  locale: string;
}

export default function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations("contact");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    setSuccess(false);
    try {
      await contactService.submit(data);
      setSuccess(true);
      reset();
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : t("errorGeneric");
      setServerError(msg);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">
          {t("successTitle")}
        </h2>
        <p className="mt-2 max-w-md text-sm text-text-secondary">
          {t("successMessage")}
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          {t("sendAnother")}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const inputBase =
    "w-full rounded-xl border bg-background pl-10 pr-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary";

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      {/* -- Left: Form -- */}
      <div className="lg:col-span-3">
        <div className="mb-8">
          <Logo src={locale === "ar" ? "/Meem-logox-white.png" : "/meem-logo.png"} alt="Logo" priority />
          <h1 className="mt-6 text-3xl font-bold text-text-primary">
            {t("title")}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            {t("subtitle")}
          </p>
        </div>

        {serverError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-primary">
              {t("email")}
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
              <input
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                className={
                  inputBase + (errors.email ? " border-red-500" : " border-border")
                }
                {...register("email", {
                  required: t("requiredField"),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t("invalidEmail"),
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-text-primary">
              {t("subject")}
            </label>
            <div className="relative">
              <FileText className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
              <input
                id="subject"
                type="text"
                placeholder={t("subjectPlaceholder")}
                className={
                  inputBase + (errors.subject ? " border-red-500" : " border-border")
                }
                {...register("subject", { required: t("requiredField") })}
              />
            </div>
            {errors.subject && (
              <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text-primary">
              {t("message")}
            </label>
            <div className="relative">
              <MessageSquare className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-text-secondary" />
              <textarea
                id="message"
                rows={6}
                placeholder={t("messagePlaceholder")}
                className={
                  inputBase +
                  " resize-y min-h-[120px] pl-10" +
                  (errors.message ? " border-red-500" : " border-border")
                }
                {...register("message", {
                  required: t("requiredField"),
                  minLength: {
                    value: 10,
                    message: t("messageMinLength"),
                  },
                })}
              />
            </div>
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                {t("sending")}
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {t("submit")}
              </>
            )}
          </button>
        </form>
      </div>

      {/* -- Right: Contact Info -- */}
      <div className="lg:col-span-2">
        <div className="sticky top-24 space-y-6 rounded-2xl bg-surface p-6">
          <h3 className="text-lg font-bold text-text-primary">
            {t("infoTitle")}
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  {t("emailLabel")}
                </p>
                <a
                  href="mailto:support@example.com"
                  className="text-sm font-semibold text-text-primary hover:text-primary transition-colors"
                >
                  support@example.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  {t("phoneLabel")}
                </p>
                <a
                  href="tel:+201111111111"
                  className="text-sm font-semibold text-text-primary hover:text-primary transition-colors"
                >
                  +2 0111 111 1111
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  {t("responseTimeLabel")}
                </p>
                <p className="text-sm font-semibold text-text-primary">
                  {t("responseTime")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
