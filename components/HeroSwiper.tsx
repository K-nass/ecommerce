"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TouchEvent } from "react";

import { Banner, BannerArrows, BannerPagination } from "@/components/banner";
import type { BannerItem } from "@/types";

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

function toSafeIndex(index: number, total: number) {
  if (total <= 0) return 0;
  return (index + total) % total;
}

export default function HeroSwiper() {
  const banners = useMemo(() => HERO_BANNERS, []);
  const total = banners.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = (index: number) => {
    setCurrentIndex(toSafeIndex(index, total));
  };

  const onPrevious = () => goTo(currentIndex - 1);
  const onNext = () => goTo(currentIndex + 1);

  useEffect(() => {
    if (paused || total <= 1) return;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((index) => toSafeIndex(index + 1, total));
    }, AUTO_PLAY_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [paused, total]);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = touchEndX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 40) return;
    if (deltaX < 0) {
      onNext();
      return;
    }

    onPrevious();
  };

  return (
    <section className="w-full" aria-label="Hero promotions">
      <div
        className="w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          className="group relative h-[170px] w-full overflow-hidden rounded-[20px] sm:h-[230px] lg:h-[300px]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex h-full transition-transform duration-700 ease-out will-change-transform"
            style={{
              width: `${total * 100}%`,
              transform: `translateX(-${(currentIndex / total) * 100}%)`,
            }}
          >
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className="h-full shrink-0"
                style={{ width: `${100 / total}%` }}
              >
                <Banner
                  imageSrc={banner.imageSrc}
                  alt={banner.alt}
                  href={banner.href}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          <BannerArrows
            onPrevious={onPrevious}
            onNext={onNext}
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          />
          <BannerPagination
            total={total}
            currentIndex={currentIndex}
            onSelect={goTo}
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          />
        </div>
      </div>
    </section>
  );
}
