import { Banner } from "./components/banner";
import FlashSalesSection from "./components/cardSlider/FlashSalesSection";
import ContentSection from "./components/contentSection/ContentSection";
import ProductSliderSection from "./productSlider/ProductSliderSection";
import HeroSwiper from "./components/HeroSwiper";
import BrandProductsSection from "./components/brandProducts/BrandProductsSection";
import { homePageService } from "./services/homePageService";
import type { HomePageSection, SectionFrontSetting } from "./types";

function renderSection(section: HomePageSection) {
  const setting = section.setting?.front;

  switch (section.type) {
    case "banners":
      return (
        <HeroSwiper
          key={section.id}
          type={section.type}
          setting={setting}
          endpoint={section.endpoint}
        />
      );
    case "promotions":
      return (
        <Banner
          key={section.id}
          type={section.type}
          title={section.title}
          setting={setting}
          endpoint={section.endpoint}
        />
      );
    case "categories":
    case "parent_category":
      return (
        <ContentSection
          key={section.id}
          type={section.type}
          title={section.title}
          setting={setting}
          endpoint={section.endpoint}
        />
      );
    case "flash-sales":
    case "coupons":
      return (
        <FlashSalesSection
          key={section.id}
          type={section.type}
          title={section.title}
          setting={setting}
          endpoint={section.endpoint}
        />
      );
    case "brands":
      return (
        <BrandProductsSection
          key={section.id}
          type={section.type}
          title={section.title}
          setting={setting}
          endpoint={section.endpoint}
        />
      );
    case "products": {
      const productType =
        (section.setting?.back as Record<string, string>)?.type ??
        section.type;
      const queryParams = section.endpoint?.split("?")[1] ?? "";
      return (
        <ProductSliderSection
          key={section.id}
          type={productType}
          title={section.title}
          setting={setting}
          endpoint={section.endpoint}
          queryParams={queryParams}
        />
      );
    }
    case "best_product_sales":
    case "flash_sales_product":
    case "brands_product":
    case "product_discount_today_or_low_qty":
    case "flash_sales_end_today":
    case "flash_sales_end_week":
    case "product_for_parent_category":
    case "new_arrivals":
    case "all_product_discounts":
      return (
        <ProductSliderSection
          key={section.id}
          type={section.type}
          title={section.title}
          setting={setting}
          endpoint={section.endpoint}
        />
      );
    default:
      console.warn(`[HomePage] Unknown section type: ${section.type}`);
      return null;
  }
}

export async function HomePage() {
  const sections = await homePageService.getHomePageSections();

  return (
    <main className="flex flex-col gap-y-5">
      {sections.map(renderSection)}
    </main>
  );
}
