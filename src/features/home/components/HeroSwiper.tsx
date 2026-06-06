"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";

import "swiper/css";

import { BannerArrows, BannerPagination } from "./banner";
import { homePageService } from "../services/homePageService";
import type { HeroBanner, HeroSwiperProps } from "../types";

const AUTO_PLAY_MS = 4500;

export default function HeroSwiper({ endpoint }: HeroSwiperProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const total = banners.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadBanners() {
      const items = await homePageService.getHeroBanners(endpoint);

      if (isMounted) {
        setBanners(items);
      }
    }

    void loadBanners();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

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

  if (total === 0) {
    return null;
  }

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
              <article className="relative h-full w-full overflow-hidden rounded-sm bg-surface">
                <Image
                  src={banner.image.mobile}
                  alt={banner.title}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                  className="object-cover object-center sm:hidden"
                />
                <Image
                  src={banner.image.desktop}
                  alt={banner.title}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                  className="hidden object-cover object-center sm:block"
                />
              </article>
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
