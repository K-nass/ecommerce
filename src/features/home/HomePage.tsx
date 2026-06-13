import { Banner } from "./components/banner";
import FlashSalesSection from "./components/cardSlider/FlashSalesSection";
import ContentSection from "./components/contentSection/ContentSection";
import ProductSliderSection from "./productSlider/ProductSliderSection";
import HeroSwiper from "./components/HeroSwiper";
import BrandProductsSection from "./components/brandProducts/BrandProductsSection";
import { homePageService } from "./services/homePageService";
import type { HomePageSection } from "./types";

function renderSection(section: HomePageSection) {
  // switch (section.type) {
  //   case "banners":
  //     return <HeroSwiper key={section.id} type={section.type} />;
  //   case "promotions":
  //     return (
  //       <Banner
  //         key={section.id}
  //         type={section.type}
  //         title={section.title}
  //       />
  //     );
  //   case "best-category":
  //   case "parent_category":
  //     return (
  //       <ContentSection
  //         key={section.id}
  //         type={section.type}
  //         title={section.title}
  //       />
  //     );
  //   case "flash-sales":
  //   case "coupons":
  //     return (
  //       <FlashSalesSection
  //         key={section.id}
  //         type={section.type}
  //         title={section.title}
  //       />
  //     );
  //   case "brand":
  //     return (
  //       <BrandProductsSection
  //         key={section.id}
  //         type={section.type}
  //         title={section.title}
  //       />
  //     );
  //   case "best_product_sales":
  //   case "flash_sales_product":
  //   case "brands_product":
  //   case "product_discount_today_or_low_qty":
  //   case "flash_sales_end_today":
  //   case "flash_sales_end_week":
  //   case "product_for_parent_category":
  //   case "new_arrivals":
  //   case "all_product_discounts":
  //     return (
  //       <ProductSliderSection
  //         key={section.id}
  //         type={section.type}
  //         title={section.title}
  //       />
  //     );
  //   default:
  //     console.warn(`[HomePage] Unknown section type: ${section.type}`);
  //     return null;
  // }
}

export async function HomePage() {
  const sections = await homePageService.getHomePageSections();

  return (
    <main className="flex flex-col gap-y-5">
      {/* {sections.map(renderSection)} */}
    </main>
  );
}
