import { getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { ProductPageContent } from "./ProductPageContent";
import ProductSlider from "@/features/home/productSlider/ProductSlider";
import type { ProductDetail } from "../types";
import { getDisplayPrice, getOriginalPrice } from "../utils";

interface ProductDetailsPageProps {
  product: ProductDetail;
  locale: string;
}

export async function ProductDetailsPage({ product, locale }: ProductDetailsPageProps) {
  const t = await getTranslations({ locale, namespace: "product" });

  const mappedRelated = product.related_products.map((rp) => ({
    id: rp.id,
    image: rp.image?.thumbnail || "",
    title: rp.name,
    price: getDisplayPrice(rp),
    originalPrice: getOriginalPrice(rp),
  }));

  return (
    <div className="py-6">
      <Breadcrumb
        items={[
          { label: t("home"), href: "/" },
          { label: product.name },
        ]}
      />

      <ProductPageContent product={product} />

      {mappedRelated.length > 0 && (
        <div className="mt-12">
          <ProductSlider title={t("relatedProducts")} items={mappedRelated} />
        </div>
      )}
    </div>
  );
}
