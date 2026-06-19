import { Suspense } from "react";
import { withRetry } from "@/shared/utils/retry";
import { homePageService } from "./services/homePageService";
import type { HomeContentPage, HomePageSection } from "./types";
import HeroSwiper from "./components/HeroSwiper";
import FlashSalesSection from "./components/cardSlider/FlashSalesSection";
import ContentSection from "./components/contentSection/ContentSection";
import ProductSliderSection from "./productSlider/ProductSliderSection";
import BrandProductsSection from "./components/brandProducts/BrandProductsSection";
import HeroSwiperSkeleton from "./components/skeletons/HeroSwiperSkeleton";
import FlashSalesSkeleton from "./components/skeletons/FlashSalesSkeleton";
import ContentSectionSkeleton from "./components/skeletons/ContentSectionSkeleton";
import ProductSliderSkeleton from "./components/skeletons/ProductSliderSkeleton";
import BrandProductsSectionSkeleton from "./components/skeletons/BrandProductsSectionSkeleton";

function SectionRenderer({
  section,
  locale,
}: {
  section: HomePageSection;
  locale: string;
}) {
  const { type, title, endpoint } = section;
  const setting = section.setting?.front;

  switch (type) {
    case "sliders":
      return <HeroSwiper type={type} locale={locale} setting={setting} endpoint={endpoint} />;
    case "promotions":
    case "flash-sales":
    case "coupons":
      return <FlashSalesSection type={type} title={title} locale={locale} setting={setting} endpoint={endpoint} />;
    case "categories":
      return <ContentSection type={type} title={title} locale={locale} setting={setting} endpoint={endpoint} />;
    case "products":
      return <ProductSliderSection type={type} title={title} locale={locale} setting={setting} endpoint={endpoint} />;
    case "banners":
      return <BrandProductsSection type={type} title={title} locale={locale} setting={setting} endpoint={endpoint} />;
    default:
      console.warn(`[HomePage] Unknown section type: ${type}`);
      return null;
  }
}

const sectionSkeletonMap: Record<string, React.ReactNode> = {
  sliders: <HeroSwiperSkeleton />,
  promotions: <FlashSalesSkeleton />,
  "flash-sales": <FlashSalesSkeleton />,
  coupons: <FlashSalesSkeleton />,
  categories: <ContentSectionSkeleton />,
  products: <ProductSliderSkeleton />,
  banners: <BrandProductsSectionSkeleton />,
};

export async function HomePage({ locale }: { locale: string }) {
  let page: HomeContentPage;
  try {
    page = await withRetry(() => homePageService.getHomePage(locale));
  } catch {
    console.warn("[HomePage] Failed to load page config after retries");
    return <main className="flex flex-col gap-y-5" />;
  }

  return (
    <main className="flex flex-col gap-y-5">
      {page.sections.map((section) => (
        <Suspense key={section.id} fallback={sectionSkeletonMap[section.type] ?? null}>
          <SectionRenderer section={section} locale={locale} />
        </Suspense>
      ))}
    </main>
  );
}
