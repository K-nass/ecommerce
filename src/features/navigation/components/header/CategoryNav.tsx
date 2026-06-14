import { getTranslations } from "next-intl/server";
import { categoryMenuService } from "@/features/categories/services/categoryMenuService";
import CategoryNavClient from "./CategoryNavClient";

export default async function CategoryNav({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("header.categoryNav");

  let categories: import("@/features/categories/types").CategoryMenuItem[] = [];
  try {
    categories = await categoryMenuService.getMenu(locale);
  } catch (error) {
    console.error("Failed to fetch category menu", error);
    return null;
  }

  return (
    <CategoryNavClient
      allCategoriesLabel={t("allCategories")}
      categories={categories}
    />
  );
}
