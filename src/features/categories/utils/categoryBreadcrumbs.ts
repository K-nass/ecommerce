import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import type { CategoryMenuItem } from "../types";

const categoryPathIndexCache = new WeakMap<
  CategoryMenuItem[],
  Map<string, CategoryMenuItem[]>
>();

function buildCategoryPathIndex(categories: CategoryMenuItem[]) {
  const index = new Map<string, CategoryMenuItem[]>();

  function visit(categoryItems: CategoryMenuItem[], path: CategoryMenuItem[]) {
    for (const category of categoryItems) {
      const categoryPath = [...path, category];
      if (!index.has(category.slug)) {
        index.set(category.slug, categoryPath);
      }
      visit(category.children, categoryPath);
    }
  }

  visit(categories, []);

  return index;
}

function getCategoryPathIndex(categories: CategoryMenuItem[]) {
  const cachedIndex = categoryPathIndexCache.get(categories);

  if (cachedIndex) {
    return cachedIndex;
  }

  const index = buildCategoryPathIndex(categories);
  categoryPathIndexCache.set(categories, index);

  return index;
}

function formatSlugFallback(slug: string) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function buildCategoryBreadcrumbItems({
  categories,
  homeLabel,
  slug,
}: {
  categories: CategoryMenuItem[];
  homeLabel: string;
  slug: string;
}): BreadcrumbItem[] {
  const decodedSlug = decodeURIComponent(slug);
  const categoryPath = getCategoryPathIndex(categories).get(decodedSlug);

  return [
    { label: homeLabel, href: "/" },
    ...(categoryPath?.map((category) => ({
      label: category.name,
      href: `/category/${category.slug}`,
    })) ?? [{ label: formatSlugFallback(decodedSlug) }]),
  ];
}

export function hasCategorySlug(categories: CategoryMenuItem[], slug: string) {
  return getCategoryPathIndex(categories).has(decodeURIComponent(slug));
}
