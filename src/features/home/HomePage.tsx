import CardSlider from "./components/cardSlider/CardSlider";
import ContentSection from "./components/contentSection/ContentSection";
import HeroSwiper from "./components/HeroSwiper";
import ProductSlider from "./productSlider/ProductSlider";

export function HomePage() {
  return (
    <main className="flex flex-col gap-y-5">
      <HeroSwiper />
      <CardSlider title="Daily Offers" />
      <ContentSection title="Top Categories" />
      <ProductSlider title = "Best sellers"/>
    </main>
  );
}
