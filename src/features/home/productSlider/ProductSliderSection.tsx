import ProductSlider from "./ProductSlider";
import { homePageService } from "../services/homePageService";
import { toProductItem } from "../utils";
import type { SectionFrontSetting, ApiProduct } from "../types";

interface ProductSliderSectionProps {
  title: string;
  type: string;
  setting?: SectionFrontSetting;
  endpoint?: string;
  queryParams?: string;
}

export default async function ProductSliderSection({
  title,
  type,
  setting,
  queryParams,
}: ProductSliderSectionProps) {
  let products: ApiProduct[];

  if (queryParams) {
    products = await homePageService.getProducts(queryParams);
  } else {
    products = await homePageService.getProductsBySectionType(type);
  }

  if (!Array.isArray(products) || products.length === 0) {
    return null;
  }

  const items = products.map(toProductItem);

  return (
    <ProductSlider
      title={title}
      items={items}
      columnsCount={setting?.columns_count}
      badgeText={setting?.badge_text}
      showTimer={setting?.show_timer}
      timerEndAt={setting?.timer_end_at}
    />
  );
}
