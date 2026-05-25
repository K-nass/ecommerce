"use client";

import Image from "next/image";

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
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative inline-flex h-12 w-42 shrink-0 flex-col items-center justify-center gap-1 rounded-md border-2 px-4 py-2 text-sm font-bold leading-none shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex-row sm:justify-start sm:gap-2 sm:pt-4 sm:pb-2",
        bgClass,
        borderClass,
        textClass,
      )}
    >
      <Image
        src={icon.src}
        alt={icon.alt}
        width={50}
        height={50}
        className="h-7 w-7 sm:h-10 sm:w-10"
      />
      <span className="whitespace-nowrap">{label}</span>

      {etaText ? (
        <span className="absolute -top-2 start-1/2 -translate-x-1/2 rounded-full bg-background px-2 py-0.5 text-[11px] font-semibold text-primary shadow-sm">
          {etaText}
        </span>
      ) : null}
    </button>
  );
}
