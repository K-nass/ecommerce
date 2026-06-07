import { Banner } from "./components/banner";
import FlashSalesSection from "./components/cardSlider/FlashSalesSection";
import ContentSection from "./components/contentSection/ContentSection";
// Temporarily disabled
// import ProductSliderSection from "./productSlider/ProductSliderSection";
import HeroSwiper from "./components/HeroSwiper";
import BrandProductsSection from "./components/brandProducts/BrandProductsSection";
import { homePageService } from "./services/homePageService";
import type { HomePageSection } from "./types";

function renderSection(section: HomePageSection) {
  switch (section.type) {
    case "banners":
      return <HeroSwiper key={section.id} endpoint={section.endpoint} />;
    case "promotions":
      return (
        <Banner
          key={section.id}
          endpoint={section.endpoint}
          title={section.title}
        />
      );
    case "pest-category":
      return (
        <ContentSection
          key={section.id}
          endpoint={section.endpoint}
          title={section.title}
        />
      );
    // case "pest-product-sales":
    //   return (
    //     <ProductSliderSection
    //       key={section.id}
    //       endpoint={section.endpoint}
    //       title={section.title}
    //     />
    //   );
    case "flash-sales":
      return (
        <FlashSalesSection
          key={section.id}
          endpoint={section.endpoint}
          title={section.title}
        />
      );
    // Temporarily disabled
    // case "flash-sales-qtys":
    //   return (
    //     <ProductSliderSection
    //       key={section.id}
    //       endpoint={section.endpoint}
    //       title={section.title}
    //     />
    //   );
    case "product-brand":
      return (
        <BrandProductsSection
          key={section.id}
          endpoint={section.endpoint}
          title={section.title}
        />
      );
    case "coupons":
      return (
        <FlashSalesSection
          key={section.id}
          endpoint={section.endpoint}
          title={section.title}
        />
      )
    // case "product-for parent":
    //   return (
    //     <ProductSliderSection
    //       key={section.id}
    //       endpoint={section.endpoint}
    //       title={section.title}
    //     />
    //   )
    // case "new-arrivals":
    //   return (
    //     <ProductSliderSection
    //       key={section.id}
    //       endpoint={section.endpoint}
    //       title={section.title}
    //     />
    //   )
    // case "all-discount-product":
    //   return (
    //     <ProductSliderSection
    //     key={section.id}
    //     endpoint={section.endpoint}
    //     title={section.title}
    //     />
    //   )
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
