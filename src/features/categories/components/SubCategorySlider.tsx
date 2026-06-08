"use client";

import ContentItem from "@/features/home/components/contentSection/ContentItem";
import { BannerArrows } from "@/features/home/components/banner";
import { cn } from "@/shared/utils/cn";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import GridIcon from "@/components/ui/icons/GridIcon";

interface SubCategory {
  id: number;
  image: string;
  name: string;
}

const mockSubCategories: SubCategory[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop&crop=center",
    name: "Cooking Ingredients",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=200&fit=crop&crop=center",
    name: "Biscuits, Crackers & Cakes",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?w=200&h=200&fit=crop&crop=center",
    name: "Chocolate & Confectionery",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center",
    name: "Rice, Pasta & Pulses",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=200&fit=crop&crop=center",
    name: "Jams, Honey & Spreads",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop&crop=center",
    name: "Chips & Snacks",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=200&h=200&fit=crop&crop=center",
    name: "Cereals & Breakfast",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&h=200&fit=crop&crop=center",
    name: "Coffee & Tea",
  },
];

export default function SubCategorySlider() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeId, setActiveId] = useState<number | "all">("all");
  const [isLocked, setIsLocked] = useState(true);

  const allLabel = locale === "ar" ? "الجميع" : "All";

  const onPrevious = () => swiper?.slidePrev();
  const onNext = () => swiper?.slideNext();

  return (
    <div className="group relative w-full pt-4 pb-2 border-b border-slate-100">
      <Swiper
        key={locale}
        dir={isRtl ? "rtl" : "ltr"}
        modules={[Navigation]}
        spaceBetween={8}
        slidesPerView="auto"
        onSwiper={(s) => {
          setSwiper(s);
          setIsLocked(s.isLocked);
        }}
        onLock={() => setIsLocked(true)}
        onUnlock={() => setIsLocked(false)}
        className="w-full px-2!"
      >
        {/* All slide */}
        <SwiperSlide className="w-auto! h-auto!">
          <button
            type="button"
            onClick={() => setActiveId("all")}
            className={cn(
              "flex flex-col items-center gap-2 cursor-pointer w-[120px] transition-all duration-200 h-full",
              activeId === "all"
                ? "border-b-[3px] border-primary pb-2"
                : "border-b-[3px] border-transparent pb-2"
            )}
          >
            <div
              className={cn(
                "w-[100px] h-[100px] rounded-full flex items-center justify-center transition-colors duration-200 border shrink-0",
                activeId === "all"
                  ? "bg-primary border-primary"
                  : "bg-white border-blue-100"
              )}
            >
              <GridIcon
                className={cn(
                  "w-10 h-10 transition-colors duration-200",
                  activeId === "all" ? "text-white" : "text-primary"
                )}
              />
            </div>
            <div className="w-full text-center flex-1 flex items-start justify-center pt-1">
              <p
                className={cn(
                  "text-[13px] font-medium text-center leading-tight transition-colors duration-200",
                  activeId === "all" ? "text-primary" : "text-slate-800"
                )}
              >
                {allLabel}
              </p>
            </div>
          </button>
        </SwiperSlide>

        {/* Subcategory slides */}
        {mockSubCategories.map((cat) => (
          <SwiperSlide key={cat.id} className="w-auto! h-auto!">
            <button
              type="button"
              onClick={() => setActiveId(cat.id)}
              className="cursor-pointer w-[120px] h-full"
            >
              <ContentItem
                item={{ id: cat.id, image: cat.image, title: cat.name }}
                className={cn(
                  "rounded-full",
                  activeId === cat.id
                    ? "border-primary bg-white"
                    : "border-blue-100 bg-white"
                )}
                isActive={activeId === cat.id}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {!isLocked && (
        <BannerArrows
          onPrevious={onPrevious}
          onNext={onNext}
          isRtl={isRtl}
          variant="card"
          strokeWidth={2}
          iconClassName="h-5 w-5"
        />
      )}
    </div>
  );
}
