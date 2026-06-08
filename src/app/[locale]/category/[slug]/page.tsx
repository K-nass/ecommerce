import Breadcrumb from "@/components/ui/Breadcrumb";
import SubCategorySlider from "@/features/categories/components/SubCategorySlider";
import { categoryMenuService } from "@/features/categories/services/categoryMenuService";
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
  const categories = await categoryMenuService.getMenu(locale);

  const categoryPath = findCategoryPath(categories, decodeURIComponent(slug));

  // If path is null, the slug is invalid!
  if (!categoryPath) {
    notFound();
  }

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
      <SubCategorySlider />
    </div>
  );
}
