import { Suspense } from "react";
import dynamic from "next/dynamic";
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



async function SectionRenderer({
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
  const page = await homePageService.getHomePage(locale);

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
