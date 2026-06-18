import { Suspense } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CategoryProducts from "@/features/categories/components/CategoryProducts";
import CategorySlider from "@/features/categories/components/CategorySlider";
import ProductsSidebar from "@/features/categories/components/ProductsSidebar";
import MobileCategorySidebar from "@/features/categories/components/MobileCategorySidebar";
import SidebarContent from "@/features/categories/components/SidebarContent";
import ProductsGridContent from "@/features/categories/components/ProductsGridContent";
import { categoryMenuService } from "@/features/categories/services/categoryMenuService";
import { getCategoryPageData, getCachedCategoryPageData } from "@/features/categories/services/categoryProductsService";
import { findCategoryPath } from "@/features/categories/utils/categoryBreadcrumbs";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProductsSidebarSkeleton } from "@/features/categories/components/skeletons/ProductsSidebarSkeleton";
import { CategoryProductsSkeleton } from "@/features/categories/components/skeletons/CategoryProductsSkeleton";

async function BannerPromotionContent({
  slug,
  locale,
  searchParams,
  seeMoreText,
  seeLessText,
}: {
  slug: string;
  locale: string;
  searchParams: Record<string, string | string[] | undefined>;
  seeMoreText: string;
  seeLessText: string;
}) {
  let result = await getCategoryPageData(slug, locale, searchParams, "banner");
  if (result.products.length === 0) {
    result = await getCategoryPageData(slug, locale, searchParams, "promotion");
  }
  if (result.products.length === 0) {
    notFound();
  }
  const { products, filters, filterLabels } = result;

  return (
    <div className="flex gap-5 max-[991px]:gap-0 items-stretch">
      <div className="max-[991px]:hidden block">
        <ProductsSidebar
          filters={filters}
          filterLabels={filterLabels}
          seeMoreText={seeMoreText}
          seeLessText={seeLessText}
        />
      </div>
      <div className="flex-1 max-[991px]:p-3">
        <CategoryProducts products={products} />
      </div>
    </div>
  );
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, slug } = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations({ locale, namespace: "header.breadcrumb" });
  const tf = await getTranslations({ locale, namespace: "header.filters" });
  const categories = await categoryMenuService.getMenu(locale);

  const decodedSlug = decodeURIComponent(slug);
  const categoryPath = findCategoryPath(categories, decodedSlug);

  // banner/promotion page — slug is not a category
  if (!categoryPath) {
    return (
      <div className="w-full">
        <Breadcrumb
          items={[
            { label: t("home"), href: "/" },
            { label: decodedSlug },
          ]}
        />
        <Suspense
          fallback={
            <div className="flex gap-5 max-[991px]:gap-0 items-stretch">
              <div className="max-[991px]:hidden block">
                <ProductsSidebarSkeleton />
              </div>
              <div className="flex-1 max-[991px]:p-3">
                <CategoryProductsSkeleton />
              </div>
            </div>
          }
        >
          <BannerPromotionContent
            slug={decodedSlug}
            locale={locale}
            searchParams={resolvedSearchParams}
            seeMoreText={tf("seeMore")}
            seeLessText={tf("seeLess")}
          />
        </Suspense>
      </div>
    );
  }

  const parentCategory = categoryPath.length > 1 
    ? categoryPath[categoryPath.length - 2] 
    : categoryPath[0];
    
  const sliderCategories = parentCategory?.children || [];
  const sliderParentSlug = parentCategory?.slug || decodedSlug;

  const breadcrumbItems = [
    { label: t("home"), href: "/" },
    ...categoryPath.map((category) => ({
      label: category.name,
      href: `/category/${category.slug}`,
    })),
  ];

  const sidebarPromise = getCachedCategoryPageData(decodedSlug, locale, resolvedSearchParams);

  return (
    <div className="w-full">
      <div className="max-[991px]:hidden">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="flex gap-5 max-[991px]:gap-0 items-stretch">
        {/* Mobile Sidebar — renders immediately */}
        <div className="hidden max-[991px]:flex shrink-0 -ms-4 self-stretch">
          <MobileCategorySidebar
            subCategories={sliderCategories}
            currentSlug={decodedSlug}
            parentSlug={sliderParentSlug}
          />
        </div>

        {/* Desktop Sidebar — streams independently */}
        <Suspense
          fallback={
            <div className="max-[991px]:hidden block">
              <ProductsSidebarSkeleton />
            </div>
          }
        >
          <SidebarContent
            sidebarPromise={sidebarPromise}
            seeMoreText={tf("seeMore")}
            seeLessText={tf("seeLess")}
          />
        </Suspense>

        <div className="flex-1 max-[991px]:p-3">
          {/* Desktop Slider — renders immediately (never disappears) */}
          <div className="max-[991px]:hidden block">
            <CategorySlider
              subCategories={sliderCategories}
              currentSlug={decodedSlug}
              parentSlug={sliderParentSlug}
            />
          </div>

          {/* Products grid — streams independently */}
          <Suspense fallback={<CategoryProductsSkeleton />}>
            <ProductsGridContent
              slug={decodedSlug}
              locale={locale}
              searchParams={resolvedSearchParams}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
