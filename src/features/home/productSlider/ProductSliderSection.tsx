import ProductSlider from "./ProductSlider";
import { homePageService } from "../services/homePageService";

interface ProductSliderSectionProps {
  title: string;
  type: string;
}

export default async function ProductSliderSection({
  title,
  type,
}: ProductSliderSectionProps) {
  const products = await homePageService.getProductsBySectionType(type);

  if (!products || products.length === 0) {
    return null;
  }

  return <ProductSlider title={title} items={products as any} />;
}
