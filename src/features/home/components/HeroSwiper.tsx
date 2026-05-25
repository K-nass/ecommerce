"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";

import "swiper/css";

import { Banner, BannerArrows, BannerPagination } from "./banner";
import type { BannerItem } from "../types";

const HERO_BANNERS: BannerItem[] = [
  {
    id: "eid-special-1",
    imageSrc:
      "/hero1.jpg",
    alt: "Eid special hero banner",
    priority: true,
  },
  {
    id: "eid-special-2",
    imageSrc:
      "/hero2.webp",
    alt: "Eid special hero banner",
    priority: true,
  },
  {
    id: "eid-special-3",
    imageSrc:
      "/hero3.webp",
    alt: "Eid special hero banner",
    priority: true,
  },
];

const AUTO_PLAY_MS = 4500;

export default function HeroSwiper() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const banners = useMemo(() => HERO_BANNERS, []);
  const total = banners.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const goTo = (index: number) => {
    if (!swiper) return;
    if (swiper.params.loop) {
      swiper.slideToLoop(index);
      return;
    }

    swiper.slideTo(index);
  };

  const onPrevious = () => swiper?.slidePrev();
  const onNext = () => swiper?.slideNext();

  return (
    <section className="w-full" dir={isRtl ? "rtl" : "ltr"} aria-label="Hero promotions">
      <div className="group relative h-[170px] w-full overflow-hidden rounded-[20px] sm:h-[230px] lg:h-[300px]">
        <Swiper
          key={locale}
          modules={[Autoplay, A11y, Keyboard]}
          loop={total > 1}
          speed={700}
          slidesPerView={1}
          keyboard={{ enabled: true }}
          a11y={{ enabled: true }}
          autoplay={
            total > 1
              ? {
                  delay: AUTO_PLAY_MS,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          onSwiper={(instance) => {
            setSwiper(instance);
            setCurrentIndex(instance.realIndex);
          }}
          onRealIndexChange={(instance) => setCurrentIndex(instance.realIndex)}
          className="h-full w-full"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={banner.id} className="h-full">
              <Banner
                imageSrc={banner.imageSrc}
                alt={banner.alt}
                href={banner.href}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {total > 1 ? (
          <>
            <BannerArrows
              onPrevious={onPrevious}
              onNext={onNext}
              isRtl={isRtl}
              className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
            />
            <BannerPagination
              total={total}
              currentIndex={currentIndex}
              onSelect={goTo}
              className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
            />
          </>
        ) : null}
      </div>
    </section>
  );
}
