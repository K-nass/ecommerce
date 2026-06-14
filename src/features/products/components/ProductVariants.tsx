"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";
import type { ProductVariant } from "../types";

interface ProductVariantsProps {
  variants: ProductVariant[];
  selectedVariantId: number | null;
  onSelectVariant: (id: number) => void;
}

export function ProductVariants({
  variants,
  selectedVariantId,
  onSelectVariant,
}: ProductVariantsProps) {
  const t = useTranslations("product");

  if (variants.length === 0) return null;

  const attributeGroups = new Map<string, Set<string>>();
  for (const v of variants) {
    for (const attr of v.attributes) {
      if (!attributeGroups.has(attr.attribute_name)) {
        attributeGroups.set(attr.attribute_name, new Set());
      }
      attributeGroups.get(attr.attribute_name)!.add(attr.value);
    }
  }

  return (
    <div className="space-y-4 pt-4 border-t border-border">
      {Array.from(attributeGroups.entries()).map(([name, values]) => (
        <div key={name}>
          <p className="mb-2 text-sm font-semibold text-text-primary">
            {name}
          </p>
          <div className="flex flex-wrap gap-2">
            {Array.from(values).map((value) => {
              const variantId = variants.find((v) =>
                v.attributes.some((a) => a.attribute_name === name && a.value === value),
              )?.id;
              const isSelected = selectedVariantId != null && variantId === selectedVariantId;
              const isAvailable = variantId != null && (variants.find((v) => v.id === variantId)?.quantity ?? 0) > 0;

              return (
                <button
                  key={value}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => variantId != null && onSelectVariant(variantId)}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-medium transition",
                    isSelected
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-background text-text-primary hover:border-primary",
                    !isAvailable && "cursor-not-allowed opacity-40 line-through",
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
