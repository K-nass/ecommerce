import CardSlider from "./CardSlider";
import { homePageService } from "../../services/homePageService";
import type { CardSlideItem, ApiFlashSale } from "../../types";

interface FlashSalesSectionProps {
  title: string;
  endpoint: string;
}

export default async function FlashSalesSection({
  title,
  endpoint,
}: FlashSalesSectionProps) {
  const flashSales = await homePageService.getFlashSales(endpoint);

  if (!flashSales || flashSales.length === 0) {
    return null;
  }

  const items: CardSlideItem[] = flashSales.map((sale: ApiFlashSale) => ({
    id: sale.id,
    title: sale.name,
    image: {
      desktop: sale.image.desktop,
      mobile: sale.image.mobile,
    },
  }));

  return <CardSlider title={title} items={items} />;
}
