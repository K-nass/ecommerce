"use client";

import { useState, type ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function FooterAccordionItem({
  title,
  children,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-4 text-left text-xs text-white transition-colors hover:no-underline"
      >
        <span className="font-bold">{title}</span>
        <svg
          className={`size-4 shrink-0 text-white transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}
