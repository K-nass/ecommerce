import SectionTitle from "@/components/ui/SectionTitle";
import Banner from "../banner/Banner";
import ProductSlider from "../../productSlider/ProductSlider";
import { homePageService } from "../../services/homePageService";
import type { ProductItem } from "../../types";

interface BrandProductsSectionProps {
  endpoint: string;
  title?: string;
}

export default async function BrandProductsSection({
  endpoint,
  title,
}: BrandProductsSectionProps) {
  let brands;
  try {
    brands = await homePageService.getBrandsWithProducts(endpoint);
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
        {brands.map((brand) => {
          const items: ProductItem[] = brand.products.map((p) => ({
            id: p.id,
            title: p.name,
            image: p.image?.thumbnail || "",
            price:
              p.has_discount && p.discount_amount
                ? p.price - p.discount_amount
                : p.price,
            originalPrice: p.price,
          }));

          return (
            <div key={brand.id} className="flex flex-col gap-y-4">
              <Banner promotion={brand} />
              {items.length > 0 && (
                <ProductSlider title={brand.name} items={items} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
