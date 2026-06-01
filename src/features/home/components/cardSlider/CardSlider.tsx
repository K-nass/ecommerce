"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import SectionTitle from "@/components/ui/SectionTitle";
import { cn } from "@/shared/utils/cn";

import { BannerArrows } from "../banner";
import Slide, { type CardSlideItem } from "./Slide";

type CommonCardSliderProps = {
  title?: string;
  items: CardSlideItem[];
  className?: string;
  gridClassName?: string;
  cardClassName?: string;
  imageClassName?: string;
  slideSizes?: string;
};

type SliderCardSliderProps = CommonCardSliderProps & {
  variant: "slider";
  showArrows?: boolean;
};

type GridCardSliderProps = CommonCardSliderProps & {
  variant: "grid";
  showArrows?: never;
};

type CardSliderProps = SliderCardSliderProps | GridCardSliderProps;

export default function CardSlider({
  title,
  items,
  variant,
  showArrows = true,
  className,
  gridClassName = "grid grid-cols-2 gap-3 md:grid-cols-4",
  cardClassName = "aspect-3/4",
  imageClassName,
  slideSizes,
}: CardSliderProps) {
  const resolvedVariant = variant;
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const onPrevious = () => swiper?.slidePrev();
  const onNext = () => swiper?.slideNext();
  const shouldShowArrows = resolvedVariant === "slider" && showArrows && items.length > 1;

  const renderSlider = () => (
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
  );

  const renderGrid = () => (
    <div className={gridClassName}>
      {items.map((slide, index) => (
        <Slide
          key={slide.id}
          slide={slide}
          hasBorder={false}
          aspectClassName={cardClassName}
          imageClassName={imageClassName}
          sizes={slideSizes ?? "(max-width: 768px) 50vw, 25vw"}
          priority={index < 2}
        />
      ))}
    </div>
  );

  if (resolvedVariant === "grid") {
    return (
      <section className={cn("group relative w-full pb-4", className)}>
        {title ? <SectionTitle title={title} /> : null}
        {renderGrid()}
      </section>
    );
  }

  return (
    <section className={cn("group relative w-full pb-4", className)}>
      {title ? <SectionTitle title={title} /> : null}
      {renderSlider()}
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
