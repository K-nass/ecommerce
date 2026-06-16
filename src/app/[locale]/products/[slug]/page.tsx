import { ProductDetailsPage } from "@/features/products";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { locale, slug } = await params;

  return <ProductDetailsPage slug={slug} locale={locale} />;
}
