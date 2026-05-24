"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";

export type DeliveryModeButtonProps = {
  label: string;
  icon: {
    src: string;
    alt: string;
  };
  bgClass: string;
  borderClass: string;
  textClass?: string;
  etaText?: string;
  onClick?: () => void;
};

export function DeliveryModeButton({
  label,
  icon,
  bgClass,
  borderClass,
  textClass,
  etaText,
  onClick,
}: DeliveryModeButtonProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative inline-flex h-12 w-42 items-center gap-2 rounded-md border-2 text-sm font-semibold leading-none shadow-sm px-4 pt-4 pb-2 cursor-pointer",
        isRtl ? "flex-row-reverse" : "flex-row",
        bgClass,
        borderClass,
        textClass,
      )}
    >
      <Image src={icon.src} alt={icon.alt} width={50} height={50} />
      <span className="whitespace-nowrap">{label}</span>

      {etaText ? (
        <span
          className={cn(
            "absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-background px-2 py-0.5 text-[11px] font-semibold text-primary shadow-sm"
          )}
        >
          {etaText}
        </span>
      ) : null}
    </button>
  );
}
