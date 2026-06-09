"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import Image from "next/image";

interface LocationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocationSidebar({ isOpen, onClose }: LocationSidebarProps) {
  const t = useTranslations("header.location");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 z-100 transition-opacity" 
        onClick={onClose} 
      />
      <div 
        className={`fixed top-0 inset-e-0 h-full w-full sm:w-[450px] bg-white z-101 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 pb-2">
          <h2 className="text-xl font-bold text-[#1a1a1a]">{t("addLocation")}</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="px-4 sm:px-6 py-2 flex-1 flex flex-col">
          <div className="relative mb-6 mt-2">
            <input 
              type="text" 
              placeholder={t("searchPlaceholder")}
              className="w-full border border-gray-300 rounded-[4px] py-2.5 px-4 outline-none focus:border-blue-500 transition-colors text-[15px] placeholder:text-gray-500"
            />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center -mt-10 select-none pointer-events-none">
             <MapIllustration />
          </div>
        </div>

        <div className="p-4 flex flex-wrap items-center justify-center gap-1 text-[13px] text-gray-500 pb-6 bg-[#f9f9f9]">
          {t("poweredBy")}
          <span className="font-bold flex items-center text-[15px] tracking-tight ms-0.5" dir="ltr">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </span>
        </div>
      </div>
    </>
  );
}

function MapIllustration() {
  return (
    <Image 
      src="/images/location-map.svg" 
      alt="Map illustration" 
      width={280} 
      height={280} 
      className="w-[280px] h-[280px] object-contain" 
      priority
    />
  );
}
