import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { productService } from "@/features/products/services/productService";
import { ApiError } from "@/shared/lib/api";
import { getDisplayPrice, getOriginalPrice } from "../utils";
import { ProductPageContent } from "./ProductPageContent";
import ProductSlider from "@/features/home/productSlider/ProductSlider";

interface ProductDetailsPageProps {
  slug: string;
  locale: string;
}

export async function ProductDetailsPage({ slug, locale }: ProductDetailsPageProps) {
  const t = await getTranslations({ locale, namespace: "product" });

  let product;
  try {
    product = await productService.getProductBySlug(slug);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    throw err;
  }

  const mappedRelated = product.related_products.map((rp) => ({
    id: rp.id,
    image: rp.image?.thumbnail || "",
    title: rp.name,
    price: getDisplayPrice(rp),
    originalPrice: getOriginalPrice(rp),
    slug: rp.slug ?? `${rp.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}-${rp.id}`,
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
