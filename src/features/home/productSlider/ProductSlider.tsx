"use client";
import ProductCard from "@/components/ui/ProductCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { BannerArrows } from "../components/banner";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";

export const mockProducts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop", // Produce
    title: "Nouri Crunchy Strips - 1Kg",
    price: 254.99,
    originalPrice: 349.99,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop", // Coffee
    title: "Premium Coffee Beans - 500g",
    price: 189.5,
    originalPrice: 249.99,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop", // Oil
    title: "Organic Olive Oil - 750ml",
    price: 299.75,
    originalPrice: 399.99,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop", // Chocolate
    title: "Dark Chocolate Bar - 200g",
    price: 79.99,
    originalPrice: 119.99,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop", // Produce
    title: "Almond Butter - 350g",
    price: 159.99,
    originalPrice: 199.99,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop", // Coffee
    title: "Raw Natural Honey - 500g",
    price: 135.0,
    originalPrice: 165.0,
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop", // Oil
    title: "Whole Wheat Pasta - 400g",
    price: 45.5,
    originalPrice: 60.0,
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop", // Chocolate
    title: "Himalayan Pink Salt - 250g",
    price: 85.99,
    originalPrice: 110.0,
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop", // Produce
    title: "Matcha Green Tea Powder - 100g",
    price: 245.0,
    originalPrice: 320.0,
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop", // Coffee
    title: "Roasted Mixed Nuts - 300g",
    price: 215.5,
    originalPrice: 285.99,
  },
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop", // Oil
    title: "Gluten-Free Rolled Oats - 1Kg",
    price: 95.0,
    originalPrice: 130.0,
  },
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop", // Chocolate
    title: "Pure Organic Maple Syrup - 250ml",
    price: 340.0,
    originalPrice: 450.0,
  },
  {
    id: 13,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop", // Produce
    title: "Unsweetened Coconut Milk - 400ml",
    price: 68.99,
    originalPrice: 85.0,
  },
  {
    id: 14,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop", // Coffee
    title: "Organic Chia Seeds - 200g",
    price: 115.0,
    originalPrice: 155.0,
  },
  {
    id: 15,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop", // Oil
    title: "Dried Cranberries - 150g",
    price: 145.25,
    originalPrice: 180.0,
  },
  {
    id: 16,
    image:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop", // Chocolate
    title: "Pure Vanilla Extract - 50ml",
    price: 190.0,
    originalPrice: 240.0,
  },
];

export default function ProductSlider({ title }: { title?: string }) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

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
        onSwiper={setSwiper}
        loop={true}
        className="w-ful"
      >
        {mockProducts.map((product) => (
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
