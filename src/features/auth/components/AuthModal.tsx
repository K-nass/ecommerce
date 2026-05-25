"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { PatternTiles } from "./PatternTiles";
import { useAuthModalStore } from "../store/useAuthModalStore";

type ModalTab = "login" | "register";

export function AuthModal() {
  const { isOpen, defaultMode, close } = useAuthModalStore();

  if (!isOpen) return null;

  return <AuthModalContent defaultMode={defaultMode} close={close} />;
}

function AuthModalContent({
  defaultMode,
  close,
}: {
  defaultMode: ModalTab;
  close: () => void;
}) {
  const [tab, setTab] = useState<ModalTab>(defaultMode);
  const [identifier, setIdentifier] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(timer);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  /* Prevent body scroll while open */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) close();
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    /* TODO: route to full login / register form with identifier pre-filled */
    close();
  }

  return (
    /* ── Overlay ── */
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-label="Authentication"
    >
      {/* ── Modal card ── */}
      <div className="relative w-full max-w-[480px] overflow-hidden rounded-2xl bg-background shadow-2xl">

        {/* ── Top: animated pattern banner ── */}
        <div className="relative h-52 overflow-hidden bg-surface">
          <PatternTiles />

          {/* Close button */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-text-primary shadow backdrop-blur-sm transition hover:bg-white hover:shadow-md"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Bottom: form area ── */}
        <div className="px-6 pb-7 pt-5">
          {/* Heading */}
          <h2 className="mb-4 text-center text-xl font-bold text-text-primary">
            Hala! Let&apos;s get started
          </h2>

          {/* Login / Sign up pill tabs */}
          <div className="mb-5 flex rounded-xl border border-border bg-surface p-1">
            <button
              type="button"
              onClick={() => setTab("login")}
              className={[
                "flex-1 rounded-lg py-2 text-sm font-semibold transition",
                tab === "login"
                  ? "bg-background text-text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary",
              ].join(" ")}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => setTab("register")}
              className={[
                "flex-1 rounded-lg py-2 text-sm font-semibold transition",
                tab === "register"
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary",
              ].join(" ")}
            >
              Sign up
            </button>
          </div>

          {/* Identifier form */}
          <form onSubmit={handleContinue} className="space-y-3">
            <input
              ref={inputRef}
              id="auth-modal-identifier"
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Please enter email or mobile number"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-secondary/70 focus:border-primary focus:ring-2 focus:ring-primary/10"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-surface py-3 text-sm font-bold uppercase tracking-widest text-text-secondary transition hover:bg-primary hover:text-white"
            >
              Continue
            </button>
          </form>

          {/* Divider with social hint */}
          <p className="mt-4 text-center text-xs text-text-secondary">
            By continuing, you agree to our{" "}
            <span className="cursor-pointer font-medium text-primary hover:underline">
              Terms of Use
            </span>{" "}
            &amp;{" "}
            <span className="cursor-pointer font-medium text-primary hover:underline">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
