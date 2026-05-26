"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { BannerArrows } from "../banner";
import Slide from "./Slide";
import SectionTitle from "@/components/ui/SectionTitle";
export const offerImages = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=281&h=364&fit=crop",
    title: "Mega Flash Sale",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=281&h=364&fit=crop",
    title: "Daily Supermarket Deals",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=281&h=364&fit=crop",
    title: "Fashion & Apparel",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=281&h=364&fit=crop",
    title: "Electronics & Tech",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=281&h=364&fit=crop",
    title: "Beauty & Cosmetics Packs",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=281&h=364&fit=crop",
    title: "Weekly Leaflet Offers",
  },
];
export default function CardSlider({ title }: { title: string }) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const onPrevious = () => swiper?.slidePrev();
  const onNext = () => swiper?.slideNext();

  return (
    <div className="group relative w-full pb-4 cursor-pointer">
      <SectionTitle title={title} />
      <Swiper
        key={locale}
        dir={isRtl ? "rtl" : "ltr"}
        modules={[Navigation, Pagination]}
        spaceBetween={12}
        slidesPerView={1.3}
        onSwiper={setSwiper}
        loop={true}
        breakpoints={{
          480: {
            slidesPerView: 2,
            slidesOffsetBefore: 80,
          },
          768: {
            slidesPerView: 3,
            slidesOffsetBefore: 80,
          },
          1024: {
            slidesPerView: 4,
            slidesOffsetBefore: 80,
          },
        }}
        className="w-full"
      >
        {offerImages.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Slide key={slide.id} slide={slide} hasBorder={false} />
          </SwiperSlide>
        ))}
      </Swiper>

      <BannerArrows
        onPrevious={onPrevious}
        onNext={onNext}
        isRtl={isRtl}
        variant="card"
        strokeWidth={2}
        iconClassName="h-7 w-7"
      />
    </div>
  );
}
