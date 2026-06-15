"use client";

import { getImageProps } from "next/image";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";

import "swiper/css";

import { BannerArrows, BannerPagination } from "./banner";
import { homePageService } from "../services/homePageService";
import type { HeroBanner, HeroSwiperProps, SectionFrontSetting } from "../types";

const AUTO_PLAY_MS = 4500;

function HeroBannerImage({
  banner,
  isFirst,
}: {
  banner: HeroBanner;
  isFirst: boolean;
}) {
  const loading = isFirst ? "eager" : "lazy";
  const commonImageProps = {
    alt: banner.title,
    className: "h-full w-full object-cover object-center",
    loading,
    sizes: "100vw",
  } as const;
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: banner.image.desktop,
    width: 1440,
    height: 300,
  });
  const { props: mobileImageProps } = getImageProps({
    ...commonImageProps,
    src: banner.image.mobile,
    width: 640,
    height: 170,
  });

  return (
    <picture className="block h-full w-full">
      <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
      <img {...mobileImageProps} alt={banner.title} />
    </picture>
  );
}

export default function HeroSwiper({ type, setting, endpoint }: HeroSwiperProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const total = banners.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadBanners() {
      if (!endpoint) return;
      const items = await homePageService.fetchSectionData<HeroBanner[]>(endpoint);

      if (isMounted) {
        setBanners(items);
      }
    }

    void loadBanners();

    return () => {
      isMounted = false;
    };
  }, [type, endpoint]);

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
            total > 1 && setting?.autoplay !== false
              ? {
                  delay: setting?.slider_speed ?? AUTO_PLAY_MS,
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
                <HeroBannerImage banner={banner} isFirst={index === 0} />
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
