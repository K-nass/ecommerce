import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getLocale } from "next-intl/server";
import { homePageService } from "./services/homePageService";
import type { HomePageSection } from "./types";
import HeroSwiperSkeleton from "./components/skeletons/HeroSwiperSkeleton";
import FlashSalesSkeleton from "./components/skeletons/FlashSalesSkeleton";
import ContentSectionSkeleton from "./components/skeletons/ContentSectionSkeleton";
import ProductSliderSkeleton from "./components/skeletons/ProductSliderSkeleton";
import BrandProductsSectionSkeleton from "./components/skeletons/BrandProductsSectionSkeleton";

const HeroSwiper = dynamic(() => import("./components/HeroSwiper"), {
  loading: () => <HeroSwiperSkeleton />,
});

const FlashSalesSection = dynamic(
  () => import("./components/cardSlider/FlashSalesSection"),
  { loading: () => <FlashSalesSkeleton /> }
);

const ContentSection = dynamic(
  () => import("./components/contentSection/ContentSection"),
  { loading: () => <ContentSectionSkeleton /> }
);

const ProductSliderSection = dynamic(
  () => import("./productSlider/ProductSliderSection"),
  { loading: () => <ProductSliderSkeleton /> }
);

const BrandProductsSection = dynamic(
  () => import("./components/brandProducts/BrandProductsSection"),
  { loading: () => <BrandProductsSectionSkeleton /> }
);

const sectionComponentMap: Record<string, React.ComponentType<any>> = {
  sliders: HeroSwiper,
  promotions: FlashSalesSection,
  "flash-sales": FlashSalesSection,
  coupons: FlashSalesSection,
  categories: ContentSection,
  products: ProductSliderSection,
  banners: BrandProductsSection,
};

async function SectionRenderer({ section }: { section: HomePageSection }) {
  const Component = sectionComponentMap[section.type];
  if (!Component) {
    console.warn(`[HomePage] Unknown section type: ${section.type}`);
    return null;
  }
  return (
    <Component
      type={section.type}
      title={section.title}
      setting={section.setting?.front}
      endpoint={section.endpoint}
    />
  );
}

export async function HomePage() {
  const locale = await getLocale();
  const page = await homePageService.getHomePage(locale);

  return (
    <main className="flex flex-col gap-y-5">
      {page.sections.map((section) => (
        <Suspense key={section.id} fallback={null}>
          <SectionRenderer section={section} />
        </Suspense>
      ))}
    </main>
  );
}
