"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";

import SectionTitle from "@/components/ui/SectionTitle";
import { cn } from "@/shared/utils/cn";

import { BannerArrows } from "../banner";
import Slide from "./Slide";
import type { CardSliderProps } from "../../types";

export default function CardSlider({
  title,
  items,
  showArrows = true,
  className,
  cardClassName = "aspect-3/4",
  imageClassName,
  slideSizes,
}: CardSliderProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const onPrevious = () => swiper?.slidePrev();
  const onNext = () => swiper?.slideNext();
  const shouldShowArrows = showArrows && items.length > 1;

  return (
    <section className={cn("group relative w-full pb-4", className)}>
      {title ? <SectionTitle title={title} /> : null}
      <Swiper
        key={locale}
        dir={isRtl ? "rtl" : "ltr"}
        modules={[Navigation, Pagination]}
        spaceBetween={12}
        slidesPerView={1.3}
        onSwiper={setSwiper}
        loop={items.length > 1}
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
        {items.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <Slide
              slide={slide}
              hasBorder={false}
              aspectClassName={cardClassName}
              imageClassName={imageClassName}
              sizes={slideSizes}
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {shouldShowArrows ? (
        <BannerArrows
          onPrevious={onPrevious}
          onNext={onNext}
          isRtl={isRtl}
          variant="card"
          strokeWidth={2}
          iconClassName="h-7 w-7"
        />
      ) : null}
    </section>
  );
}
