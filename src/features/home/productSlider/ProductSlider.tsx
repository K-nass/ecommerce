"use client";
import ProductCard from "@/components/ui/ProductCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { BannerArrows } from "../components/banner";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import type { ProductSliderProps } from "../types";

export default function ProductSlider({ title, items }: ProductSliderProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isLocked, setIsLocked] = useState(true);

  const onPrevious = () => swiper?.slidePrev();
  const onNext = () => swiper?.slideNext();

  return (
    <div className="group relative w-full pb-4">
      {title && <SectionTitle title={title} />}
      <Swiper
        key={locale}
        dir={isRtl ? "rtl" : "ltr"}
        modules={[Navigation, Pagination]}
        spaceBetween={12}
        slidesPerView="auto"
        onSwiper={(s) => {
          setSwiper(s);
          setIsLocked(s.isLocked);
        }}
        onLock={() => setIsLocked(true)}
        onUnlock={() => setIsLocked(false)}
        loop={items.length >= 6}
        watchOverflow={true}
        className="w-full"
      >
        {items.map((product) => (
          <SwiperSlide key={product.id} className="w-auto!">
            <ProductCard
              image={product.image}
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              currency="EGP"
            />
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
          iconClassName="h-7 w-7"
        />
      )}
    </div>
  );
}
