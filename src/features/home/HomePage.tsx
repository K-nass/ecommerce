import { Banner } from "./components/banner";
import CardSlider from "./components/cardSlider/CardSlider";
import type { CardSlideItem } from "./components/cardSlider/Slide";
import ContentSection from "./components/contentSection/ContentSection";
import HeroSwiper from "./components/HeroSwiper";
import ProductSlider from "./productSlider/ProductSlider";

const sliderCards: CardSlideItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=281&h=364&fit=crop",
    title: "Mega Flash Sale",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=281&h=364&fit=crop",
    title: "Daily Supermarket Deals",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=281&h=364&fit=crop",
    title: "Fashion & Apparel",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=281&h=364&fit=crop",
    title: "Electronics & Tech",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=281&h=364&fit=crop",
    title: "Beauty & Cosmetics Packs",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=281&h=364&fit=crop",
    title: "Weekly Leaflet Offers",
  },
];

const promoCards: CardSlideItem[] = [
  {
    id: "fresh-deals",
    image:
      "https://cdnprod.mafretailproxy.com/assets/images/Bulk_buys_2x_a000fbb0a8.jpg",
    title: "Fresh deals",
  },
  {
    id: "summer-fruits",
    image:
      "https://cdnprod.mafretailproxy.com/assets/images/Coupon_02_4_735e49bf3d.png",
    title: "Summer fruits",
  },
  {
    id: "snack-time",
    image:
      "https://cdnprod.mafretailproxy.com/assets/images/Choose_Better_2x_e287527b18.jpg",
    title: "Snack time",
  },
  {
    id: "make-a-savings",
    image:
      "https://cdnprod.mafretailproxy.com/assets/images/CRF_Products_2x_53d3855a1b.jpg",
    title: "Make a savings",
  },
];

export function HomePage() {
  return (
    <main className="flex flex-col gap-y-5">
      <HeroSwiper />
      <CardSlider title="Daily Offers" items={sliderCards} variant="slider" />
      <ContentSection title="Top Categories" />
      <ProductSlider title="Best sellers" />
      <CardSlider items={sliderCards} variant="slider" />
      <ProductSlider />
      <CardSlider
        title="Featured promotions"
        items={promoCards}
        variant="grid"
        gridClassName="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        cardClassName="aspect-[16/9]"
        slideSizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
      />
      <ProductSlider />
      <CardSlider title="Explore more deals" items={sliderCards} variant="slider" />
      <ProductSlider title="Trending Now" />
      <Banner
        title="Carrefour leaflets"
        imageSrc="https://cdnprod.mafretailproxy.com/assets/images/Artboard_1_copy_11_cd5b8663fa.png"
        alt="banner"
        className="h-42.5 w-full sm:h-57.5 lg:h-75"
      />
      <CardSlider
        title="Electronics Zone"
        items={promoCards}
        variant="grid"
        gridClassName="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        cardClassName="aspect-[4/5]"
        slideSizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
      />
    </main>
  );
}
