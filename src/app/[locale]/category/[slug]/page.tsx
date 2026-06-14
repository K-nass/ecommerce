import Breadcrumb from "@/components/ui/Breadcrumb";
import CategoryProducts from "@/features/categories/components/CategoryProducts";
import ProductsSidebar from "@/features/categories/components/ProductsSidebar";
import { categoryMenuService } from "@/features/categories/services/categoryMenuService";
import { getCategoryPageData } from "@/features/categories/services/categoryProductsService";
import { findCategoryPath } from "@/features/categories/utils/categoryBreadcrumbs";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("header.breadcrumb");
  const tf = await getTranslations("header.filters");
  const categories = await categoryMenuService.getMenu(locale);

  const categoryPath = findCategoryPath(categories, decodeURIComponent(slug));

  if (!categoryPath) {
    notFound();
  }

  const { products, filters } = await getCategoryPageData(slug, locale);

  const breadcrumbItems = [
    { label: t("home"), href: "/" },
    ...categoryPath.map((category) => ({
      label: category.name,
      href: `/category/${category.slug}`,
    })),
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex gap-5">
      <ProductsSidebar
          filters={filters}
          seeMoreText={tf("seeMore")}
          seeLessText={tf("seeLess")}
        />
      <div className="flex-1">
        <CategoryProducts products={products} />
      </div>
      </div>
    </div>
  );
}
