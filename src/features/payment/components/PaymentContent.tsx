"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, CreditCard, Zap } from "lucide-react";
import { useChannelStore } from "@/features/fast-shipping/store/useChannelStore";
import { checkoutService } from "../services/paymentService";
import type { CheckoutRequest, FastCheckoutRequest, CheckoutFormData } from "../types";

interface CheckoutFormDataExtended extends CheckoutFormData {
  governorate_id: string;
}

interface FieldError {
  field: string;
  message: string;
}

function validate(form: CheckoutFormDataExtended, isFast: boolean): FieldError[] {
  const errors: FieldError[] = [];

  if (!form.name.trim()) {
    errors.push({ field: "name", message: "Name is required" });
  }
  if (!form.user_phone.trim()) {
    errors.push({ field: "user_phone", message: "Phone number is required" });
  }
  if (!form.user_email.trim()) {
    errors.push({ field: "user_email", message: "Email is required" });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.user_email)) {
    errors.push({ field: "user_email", message: "Invalid email format" });
  }
  if (!form.city.trim()) {
    errors.push({ field: "city", message: "City is required" });
  }
  if (!form.state.trim()) {
    errors.push({ field: "state", message: "State is required" });
  }
  if (!form.country.trim()) {
    errors.push({ field: "country", message: "Country is required" });
  }
  if (!form.street_address.trim()) {
    errors.push({ field: "street_address", message: "Street address is required" });
  }

  if (isFast && !form.governorate_id.trim()) {
    errors.push({ field: "governorate_id", message: "Governorate is required for fast shipping" });
  }

  return errors;
}

const initialForm: CheckoutFormDataExtended = {
  name: "",
  user_phone: "",
  user_email: "",
  city: "",
  state: "",
  country: "",
  street_address: "",
  notes: "",
  governorate_id: "",
};

export function PaymentContent() {
  const t = useTranslations("payment");
  const channel = useChannelStore((s) => s.channel);
  const isFast = channel === "fast-shipping";
  const [form, setForm] = useState<CheckoutFormDataExtended>(initialForm);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const fieldError = (name: string) =>
    errors.find((e) => e.field === name)?.message;

  const set = (field: keyof CheckoutFormDataExtended) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => prev.filter((e) => e.field !== field));
    setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const validationErrors = validate(form, isFast);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      if (isFast) {
        const payload: FastCheckoutRequest = {
          governorate_id: Number(form.governorate_id.trim()),
          name: form.name.trim(),
          user_phone: form.user_phone.trim(),
          user_email: form.user_email.trim(),
          address: {
            city: form.city.trim(),
            state: form.state.trim(),
            country: form.country.trim(),
            street_address: form.street_address.trim(),
          },
        };
        if (form.notes.trim()) payload.notes = form.notes.trim();
        const result = await checkoutService.processFastCheckout(payload);
        window.location.href = "/orders/" + result.id;
      } else {
        const payload: CheckoutRequest = {
          name: form.name.trim(),
          user_phone: form.user_phone.trim(),
          user_email: form.user_email.trim(),
          address: {
            city: form.city.trim(),
            state: form.state.trim(),
            country: form.country.trim(),
            street_address: form.street_address.trim(),
          },
        };
        if (form.notes.trim()) payload.notes = form.notes.trim();
        const result = await checkoutService.processCheckout(payload);
        window.location.href = result.url;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : t("errorProcessing");
      setApiError(msg);
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Loader2 className="mb-4 size-10 animate-spin text-primary" />
        <h1 className="text-xl font-bold text-text-primary">{t("processing")}</h1>
        <p className="mt-2 text-sm text-text-secondary">{t("processingDesc")}</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/50 focus:border-primary";

  const errorClass =
    "w-full rounded-xl border-2 border-red-300 bg-white px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/50 focus:border-red-400";

  const labelClass = "text-sm font-semibold text-text-primary";

  return (
    <div className="mx-auto max-w-lg space-y-6">
      {isFast && (
        <div className="rounded-2xl border-2 border-accent bg-amber-50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-800">
            <Zap className="h-4 w-4" />
            Fast Shipping Checkout
          </div>
        </div>
      )}
      {apiError && (
        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {apiError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border-2 border-border bg-white p-6 space-y-5"
      >
        <div className="flex items-center gap-2">
          <div className="h-1 w-6 rounded-full bg-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2 space-y-1.5">
            <label className={labelClass}>{t("name")}</label>
            <input
              className={fieldError("name") ? errorClass : inputClass}
              placeholder={t("namePlaceholder")}
              value={form.name}
              onChange={set("name")}
            />
            {fieldError("name") && (
              <p className="text-xs text-red-500">{fieldError("name")}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className={labelClass}>{t("phone")}</label>
            <input
              className={fieldError("user_phone") ? errorClass : inputClass}
              placeholder={t("phonePlaceholder")}
              value={form.user_phone}
              onChange={set("user_phone")}
            />
            {fieldError("user_phone") && (
              <p className="text-xs text-red-500">{fieldError("user_phone")}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className={labelClass}>{t("email")}</label>
            <input
              className={fieldError("user_email") ? errorClass : inputClass}
              placeholder={t("emailPlaceholder")}
              type="email"
              value={form.user_email}
              onChange={set("user_email")}
            />
            {fieldError("user_email") && (
              <p className="text-xs text-red-500">{fieldError("user_email")}</p>
            )}
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            {t("addressTitle")}
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label className={labelClass}>{t("country")}</label>
              <input
                className={fieldError("country") ? errorClass : inputClass}
                placeholder={t("countryPlaceholder")}
                value={form.country}
                onChange={set("country")}
              />
              {fieldError("country") && (
                <p className="text-xs text-red-500">{fieldError("country")}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>{t("state")}</label>
              <input
                className={fieldError("state") ? errorClass : inputClass}
                placeholder={t("statePlaceholder")}
                value={form.state}
                onChange={set("state")}
              />
              {fieldError("state") && (
                <p className="text-xs text-red-500">{fieldError("state")}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>{t("city")}</label>
              <input
                className={fieldError("city") ? errorClass : inputClass}
                placeholder={t("cityPlaceholder")}
                value={form.city}
                onChange={set("city")}
              />
              {fieldError("city") && (
                <p className="text-xs text-red-500">{fieldError("city")}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={labelClass}>{t("streetAddress")}</label>
            <input
              className={fieldError("street_address") ? errorClass : inputClass}
              placeholder={t("streetAddressPlaceholder")}
              value={form.street_address}
              onChange={set("street_address")}
            />
            {fieldError("street_address") && (
              <p className="text-xs text-red-500">{fieldError("street_address")}</p>
            )}
          </div>

          {isFast && (
            <div className="space-y-1.5">
              <label className={labelClass}>{t("governorate") || "Governorate"}</label>
              <input
                className={fieldError("governorate_id") ? errorClass : inputClass}
                placeholder={"Governorate ID"}
                value={form.governorate_id}
                onChange={set("governorate_id")}
              />
              {fieldError("governorate_id") && (
                <p className="text-xs text-red-500">{fieldError("governorate_id")}</p>
              )}
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className={labelClass}>
            {t("notes")}
            <span className="ml-1 text-xs font-normal text-text-secondary">
              ({t("optional")})
            </span>
          </label>
          <textarea
            className={`${inputClass} min-h-[80px] resize-none`}
            placeholder={t("notesPlaceholder")}
            value={form.notes}
            onChange={set("notes")}
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white transition-all hover:opacity-90"
        >
          <CreditCard className="size-4" />
          {t("submitButton")}
        </button>
      </form>
    </div>
  );
}
