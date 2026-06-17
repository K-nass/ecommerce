import { Suspense } from "react";
import { getLocale } from "next-intl/server";
import FlashSalesSection from "./components/cardSlider/FlashSalesSection";
import ContentSection from "./components/contentSection/ContentSection";
import ProductSliderSection from "./productSlider/ProductSliderSection";
import HeroSwiper from "./components/HeroSwiper";
import HeroSwiperSkeleton from "./components/skeletons/HeroSwiperSkeleton";
import FlashSalesSkeleton from "./components/skeletons/FlashSalesSkeleton";
import ContentSectionSkeleton from "./components/skeletons/ContentSectionSkeleton";
import ProductSliderSkeleton from "./components/skeletons/ProductSliderSkeleton";
import { homePageService } from "./services/homePageService";
import type { HomePageSection } from "./types";
import BrandProductsSection from "./components/brandProducts/BrandProductsSection";
import BrandProductsSectionSkeleton from "./components/skeletons/BrandProductsSectionSkeleton";

const sectionRegistry = {
  sliders: { Component: HeroSwiper, Fallback: HeroSwiperSkeleton },
  promotions: { Component: FlashSalesSection, Fallback: FlashSalesSkeleton },
  "flash-sales": { Component: FlashSalesSection, Fallback: FlashSalesSkeleton },
  coupons: { Component: FlashSalesSection, Fallback: FlashSalesSkeleton },
  categories: { Component: ContentSection, Fallback: ContentSectionSkeleton },
  products: { Component: ProductSliderSection, Fallback: ProductSliderSkeleton },
  banners: { Component: BrandProductsSection, Fallback: BrandProductsSectionSkeleton },
} as const;

type SectionType = keyof typeof sectionRegistry;

function SectionFallback({ section }: { section: HomePageSection }) {
  const entry = sectionRegistry[section.type as SectionType];
  if (!entry) return null;
  return <entry.Fallback setting={section.setting?.front} />;
}

async function SectionRenderer({ section }: { section: HomePageSection }) {
  const entry = sectionRegistry[section.type as SectionType];
  if (!entry) {
    console.warn(`[HomePage] Unknown section type: ${section.type}`);
    return null;
  }
  const setting = section.setting?.front;
  return (
    <entry.Component
      type={section.type}
      title={section.title}
      setting={setting}
      endpoint={section.endpoint}
    />
  );
}

export async function HomePage() {
  const locale = await getLocale();
  const page = await homePageService.getHomePage(locale);
  const sections = page.sections;

  return (
    <main className="flex flex-col gap-y-5">
      {sections.map((section) => (
        <Suspense key={section.id} fallback={<SectionFallback section={section} />}>
          <SectionRenderer section={section} />
        </Suspense>
      ))}
    </main>
  );
}
