import { getCachedCategoryPageData } from "../services/categoryProductsService";
import CategoryProducts from "./CategoryProducts";

interface ProductsGridContentProps {
  slug: string;
  locale: string;
  searchParams: Record<string, string | string[] | undefined>;
  filterKey?: "category" | "banner" | "promotion";
}

export default async function ProductsGridContent({
  slug,
  locale,
  searchParams,
  filterKey = "category",
}: ProductsGridContentProps) {
  const { products } = await getCachedCategoryPageData(
    slug,
    locale,
    searchParams,
    filterKey,
  );

  return <CategoryProducts products={products} />;
}
