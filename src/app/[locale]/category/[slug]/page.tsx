import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  buildCategoryBreadcrumbItems,
  hasCategorySlug,
} from "@/features/categories";
import { categoryMenuService } from "@/features/categories/services/categoryMenuService";
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
  const breadcrumbItems = buildCategoryBreadcrumbItems({
    categories,
    homeLabel: t("home"),
    slug,
  });

  if (!hasCategorySlug(categories, slug)) {
    notFound();
  }

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
}
