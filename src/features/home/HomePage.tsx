import { Banner } from "./components/banner";
import CardGrid from "./components/cardGrid/CardGrid";
import CardSlider from "./components/cardSlider/CardSlider";
import ContentSection from "./components/contentSection/ContentSection";
import HeroSwiper from "./components/HeroSwiper";
import ProductSlider from "./productSlider/ProductSlider";
import type { HomePageProps } from "./types";

export function HomePage({
  heroBanners,
  dailyOffersTitle,
  dailyOffers,
  topCategoriesTitle,
  topCategories,
  bestSellersTitle,
  bestSellers,
  featuredProductsTitle,
  moreProductsTitle,
  featuredPromotionsTitle,
  featuredPromotions,
  trendingNowTitle,
  trendingProducts,
  exploreMoreDealsTitle,
  exploreMoreDeals,
  leafletBanner,
  electronicsZoneTitle,
  electronicsZone,
}: HomePageProps) {
  return (
    <main className="flex flex-col gap-y-5">
      <HeroSwiper banners={heroBanners} />
      <CardSlider title={dailyOffersTitle} items={dailyOffers} />
      <ContentSection title={topCategoriesTitle} items={topCategories} />
      <ProductSlider title={bestSellersTitle} items={bestSellers} />
      <CardSlider items={dailyOffers} />
      <ProductSlider title={featuredProductsTitle} items={bestSellers} />
      <CardGrid
        title={featuredPromotionsTitle}
        items={featuredPromotions}
        gridClassName="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        cardClassName="aspect-[16/9]"
        slideSizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
      />
      <ProductSlider title={moreProductsTitle} items={trendingProducts} />
      <CardSlider title={exploreMoreDealsTitle} items={exploreMoreDeals} />
      <ProductSlider title={trendingNowTitle} items={trendingProducts} />
      <Banner
        title={leafletBanner.title ?? "Carrefour leaflets"}
        imageSrc={leafletBanner.imageSrc}
        alt={leafletBanner.alt}
        href={leafletBanner.href}
        priority={leafletBanner.priority}
        className="h-42.5 w-full sm:h-57.5 lg:h-75"
      />
      <CardGrid
        title={electronicsZoneTitle}
        items={electronicsZone}
        gridClassName="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        cardClassName="aspect-[4/5]"
        slideSizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
      />
    </main>
  );
}
