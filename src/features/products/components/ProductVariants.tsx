"use client";

import { useMemo } from "react";
import { cn } from "@/shared/utils/cn";
import type { ProductVariant } from "../types";

interface ProductVariantsProps {
  variants: ProductVariant[];
  selectedAttributes: Record<string, string>;
  onSelectAttribute: (name: string, value: string) => void;
}

export function ProductVariants({
  variants,
  selectedAttributes,
  onSelectAttribute,
}: ProductVariantsProps) {
  const attributeGroups = useMemo(() => {
    const groups = new Map<string, Set<string>>();
    for (const v of variants) {
      for (const attr of v.attributes) {
        if (!groups.has(attr.attribute_name)) {
          groups.set(attr.attribute_name, new Set());
        }
        groups.get(attr.attribute_name)!.add(attr.value);
      }
    }
    return groups;
  }, [variants]);

  if (variants.length === 0) return null;

  return (
    <div className="space-y-4 pt-4 border-t border-border">
      {Array.from(attributeGroups.entries()).map(([name, values]) => {
        const selectedValue = selectedAttributes[name] ?? "";

        return (
          <div key={name}>
            <p className="mb-2 text-sm font-semibold text-text-primary">
              {name}
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from(values).map((value) => {
                const isSelected = selectedValue === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => onSelectAttribute(name, value)}
                    className={cn(
                      "rounded-lg border px-4 py-2 text-sm font-medium transition",
                      isSelected
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-background text-text-primary hover:border-primary",
                    )}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
