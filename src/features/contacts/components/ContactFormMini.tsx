"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { contactService } from "../services/contactService";

type MiniFormData = {
  email: string;
  message: string;
};

export default function ContactFormMini() {
  const t = useTranslations("contact");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MiniFormData>();

  const onSubmit = async (data: MiniFormData) => {
    setServerError(null);
    setSuccess(false);
    try {
      await contactService.submit({
        email: data.email,
        subject: t("miniSubject"),
        message: data.message,
      });
      setSuccess(true);
      reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : t("errorGeneric");
      setServerError(msg);
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="text-xs text-white/70 underline hover:text-white transition-colors"
      >
        {t("quickContact")}
      </button>
    );
  }

  return (
    <div className="mt-4 border-t border-white/20 pt-4">
      <p className="text-xs font-medium text-white mb-2">{t("quickContactTitle")}</p>

      {success && (
        <p className="text-xs text-green-300 mb-2">{t("successMessage")}</p>
      )}
      {serverError && (
        <p className="text-xs text-red-300 mb-2">{serverError}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <input
          type="email"
          placeholder={t("emailPlaceholder")}
          className="w-full rounded border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white placeholder-white/50 outline-none focus:border-white/40"
          {...register("email", { required: t("requiredField") })}
        />
        {errors.email && (
          <p className="text-xs text-red-300">{errors.email.message}</p>
        )}
        <textarea
          rows={2}
          placeholder={t("messagePlaceholder")}
          className="w-full rounded border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white placeholder-white/50 outline-none focus:border-white/40 resize-none"
          {...register("message", { required: t("requiredField") })}
        />
        {errors.message && (
          <p className="text-xs text-red-300">{errors.message.message}</p>
        )}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-white px-3 py-1 text-xs font-semibold text-primary hover:bg-white/90 disabled:opacity-50"
          >
            {isSubmitting ? t("sending") : t("send")}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="rounded px-3 py-1 text-xs text-white/70 hover:text-white"
          >
            {t("cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}
