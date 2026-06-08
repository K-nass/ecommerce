"use client";

import { ChevronDown, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import Logo from "@/components/ui/Logo";
import { SearchInput } from "./SearchInput";
import Image from "next/image";
import { useAuthModalStore } from "@/features/auth/store/useAuthModalStore";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { UserMenu } from "@/features/auth/components/UserMenu";

export default function MainNav() {
  const t = useTranslations("header.mainNav");
  const tSearch = useTranslations("header.search");
  const authLabel = t("loginRegister");
  const openAuthModal = useAuthModalStore((s) => s.open);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-4">
      <div className="flex items-center gap-x-4 md:gap-x-8">
        <Logo src="/headerLogo.png" alt="Carrefour" priority />

        <button
          type="button"
          className="inline-flex items-center text-sm font-semibold text-text-primary"
        >
          <span className="hidden whitespace-nowrap md:inline">Maadi - Cairo</span>
          <span className="sr-only">Maadi - Cairo</span>
          <ChevronDown className="h-4 w-4 text-text-secondary" />
        </button>
      </div>

      <SearchInput
        wrapperClassName="order-last w-full min-w-0 lg:order-none lg:flex-1 lg:max-w-3xl"
        inputClassName="border-primary-dark"
        prefixText={tSearch("mainPlaceholderPrefix")}
        highlightText={tSearch("mainPlaceholderHighlight")}
      />

      <div className="ms-auto flex items-center gap-4 md:gap-6">
        <button
          type="button"
          aria-label="Language"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md"
        >
          <span className="text-xl leading-none">🇪🇬</span>
        </button>

        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <button
            type="button"
            onClick={() => openAuthModal("login")}
            className="inline-flex items-center text-sm font-semibold text-text-primary gap-1 transition hover:text-primary"
          >
            <Image src="/icons/user.svg" width={25} height={25} alt="user icon" />
            <span className="hidden whitespace-nowrap md:inline">{authLabel}</span>
            <span className="sr-only">{authLabel}</span>
          </button>
        )}

        <button
          type="button"
          className="relative inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 text-white"
          aria-label="Cart"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full text-white font-bold  px-1 text-xs text-md">
            0
          </span>
        </button>
      </div>
    </div>
  );
}
