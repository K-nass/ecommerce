"use client";
import ProductCard from "@/components/ui/ProductCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { BannerArrows } from "../components/banner";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import type { ProductSliderProps } from "../types";

export default function ProductSlider({
  title,
  items,
  columnsCount,
  badgeText,
  showTimer,
  timerEndAt,
}: ProductSliderProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isLocked, setIsLocked] = useState(true);

  const onPrevious = () => swiper?.slidePrev();
  const onNext = () => swiper?.slideNext();

  const safeItems = Array.isArray(items) ? items : [];

  if (safeItems.length === 0) {
    return null;
  }

  return (
    <div className="group relative w-full pb-4">
      {title && <SectionTitle title={title} />}
      <Swiper
        key={locale}
        dir={isRtl ? "rtl" : "ltr"}
        modules={[Navigation, Pagination]}
        spaceBetween={12}
        slidesPerView={columnsCount ? Math.min(columnsCount, 1.5) : "auto"}
        onSwiper={(s) => {
          setSwiper(s);
          setIsLocked(s.isLocked);
        }}
        onLock={() => setIsLocked(true)}
        onUnlock={() => setIsLocked(false)}
        loop={safeItems.length >= 6}
        watchOverflow={true}
        breakpoints={columnsCount ? {
          480: { slidesPerView: Math.min(columnsCount, 2.5) },
          768: { slidesPerView: Math.min(columnsCount, 3.5) },
          1024: { slidesPerView: columnsCount },
        } : undefined}
        className="w-full"
      >
        {safeItems.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              image={product.image}
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              currency="EGP"
              productId={product.id}
              slug={product.slug}
              sku={product.sku}
              inStock={product.inStock}
              stockQuantity={product.stockQuantity}
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
