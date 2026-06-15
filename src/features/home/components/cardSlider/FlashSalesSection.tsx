import CardSlider from "./CardSlider";
import CardGrid from "../cardGrid/CardGrid";
import { homePageService } from "../../services/homePageService";
import type { SectionFrontSetting, ApiFlashSale, ApiCoupon } from "../../types";

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

  let items;
  if (type === "coupons") {
    items = await homePageService.fetchSectionData<ApiCoupon[]>(endpoint);
  } else {
    items = await homePageService.fetchSectionData<ApiFlashSale[]>(endpoint);
  }

  if (!items || items.length === 0) {
    return null;
  }

  const sectionContent = setting?.layout === "grid" ? (
    <CardGrid title={title} items={items as any} />
  ) : (
    <CardSlider title={title} items={items as any} />
  );

  if (setting?.theme === "dark") {
    return (
      <section className="bg-gray-900 text-white rounded-xl p-4">
        {sectionContent}
      </section>
    );
  }

  return sectionContent;
}
