import { getLocale } from "next-intl/server";
import CardSlider from "./CardSlider";
import CardGrid from "../cardGrid/CardGrid";
import { homePageService } from "../../services/homePageService";
import type { SectionFrontSetting, ApiFlashSale, ApiCoupon, Promotion, CardSlideItem } from "../../types";

interface FlashSalesSectionProps {
  title: string;
  type: string;
  setting?: SectionFrontSetting;
  endpoint?: string;
}

export default async function FlashSalesSection({
  title,
  type,
  setting,
  endpoint,
}: FlashSalesSectionProps) {
  if (!endpoint) return null;
  const locale = await getLocale();

  let items: CardSlideItem[] = [];

  try {
    if (type === "coupons") {
      const coupons = await homePageService.fetchSectionData<ApiCoupon[]>(endpoint, locale);
      items = coupons.map((coupon) => ({
        id: coupon.id,
        title: coupon.name,
        image: coupon.image,
        borderColor: coupon.borderColor,
      }));
    } else if (type === "promotions") {
      const promo = await homePageService.fetchSectionData<Promotion>(endpoint, locale);
      items = [{
        id: promo.id,
        title: promo.name,
        image: promo.image,
      }];
    } else if (type === "brands") {
      const itemsData = await homePageService.fetchSectionData<Promotion[]>(endpoint, locale);
      items = itemsData.map((item) => ({
        id: item.id,
        title: item.name,
        image: item.image,
      }));
    } else {
      // flash-sales
      const flashSales = await homePageService.fetchSectionData<ApiFlashSale[]>(endpoint, locale);
      items = flashSales.map((fs) => ({
        id: fs.id,
        title: fs.name,
        image: fs.image,
      }));
    }
  } catch (error) {
    console.error(`[FlashSalesSection] Failed to fetch ${type}:`, error);
    return null;
  }
  if (!items || items.length === 0) {
    return null;
  }

  const sectionContent = setting?.layout === "grid" ? (
    <CardGrid title={title} items={items} />
  ) : (
    <CardSlider title={title} items={items} />
  );

  if (setting?.theme === "dark") {
    return (
      <section className="text-white rounded-xl p-4">
        {sectionContent}
      </section>
    );
  }

  return sectionContent;
}
