import { notFound } from "next/navigation";
import { ProductDetailsPage } from "@/features/products";
import { productService } from "@/features/products/services/productService";
import { extractIdFromSlug } from "@/features/products/utils";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const id = extractIdFromSlug(slug);

  if (id === null) {
    notFound();
  }

  let product;
  try {
    product = await productService.getProduct(id);
  } catch {
    notFound();
  }

  if (product.slug !== slug) {
    notFound();
  }

  return <ProductDetailsPage product={product} locale={locale} />;
}
