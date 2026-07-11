"use client";

import { useState } from "react";
import type { FaqResource } from "../types";

interface FaqsAccordionProps {
  faqs: FaqResource[];
}

export default function FaqsAccordion({ faqs }: FaqsAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="divide-y divide-border-subtle">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className="py-4">
            <button
              onClick={() => toggle(faq.id)}
              className="flex w-full items-center justify-between text-left font-semibold text-sm"
            >
              {faq.faq_title}
              <span
                className={`transition-transform ${
                  isOpen ? "rotate-180" : ""
                } shrink-0 ml-2`}
              >
                &#9662;
              </span>
            </button>
            {isOpen && faq.faq_description && (
              <div className="mt-2 text-sm text-text-secondary leading-relaxed">
                {faq.faq_description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
