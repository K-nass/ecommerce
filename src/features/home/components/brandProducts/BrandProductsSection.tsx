import SectionTitle from "@/components/ui/SectionTitle";
import Banner from "../banner/Banner";
import ProductSlider from "../../productSlider/ProductSlider";
import { homePageService } from "../../services/homePageService";
import type { ProductItem } from "../../types";

interface BrandProductsSectionProps {
  type: string;
  title?: string;
}

export default async function BrandProductsSection({
  type,
  title,
}: BrandProductsSectionProps) {
  let brands;
  try {
    brands = await homePageService.getBrandsWithProducts();
  } catch (error) {
    console.error("[BrandProductsSection] Failed to fetch brands:", error);
    return null;
  }

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-8 pb-4">
      {title && <SectionTitle title={title} />}
      <div className="flex flex-col gap-y-12">
        {brands.map((brand) => (
          <div key={brand.id} className="flex flex-col gap-y-4">
            <Banner promotion={brand} />
            {brand.products && brand.products.length > 0 && (
              <ProductSlider title={brand.name} items={brand.products as any} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
