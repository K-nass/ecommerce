import CardSlider from "./CardSlider";
import { homePageService } from "../../services/homePageService";

interface FlashSalesSectionProps {
  title: string;
  type: string;
}

export default async function FlashSalesSection({
  title,
  type,
}: FlashSalesSectionProps) {
  let items;
  if (type === "coupons") {
    items = await homePageService.getCoupons();
  } else {
    // defaults to flash-sales
    items = await homePageService.getFlashSales();
  }

  if (!items || items.length === 0) {
    return null;
  }

  // Pass the raw backend data straight into the UI component
  // No mappers, adapters, or normalizers here!
  return <CardSlider title={title} items={items as any} />;
}
