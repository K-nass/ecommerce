import Breadcrumb from "@/components/ui/Breadcrumb";
import CategoryProducts from "@/features/categories/components/CategoryProducts";
import CategorySlider from "@/features/categories/components/CategorySlider";
import ProductsSidebar from "@/features/categories/components/ProductsSidebar";
import MobileCategorySidebar from "@/features/categories/components/MobileCategorySidebar";
import { categoryMenuService } from "@/features/categories/services/categoryMenuService";
import { getCategoryPageData } from "@/features/categories/services/categoryProductsService";
import { findCategoryPath } from "@/features/categories/utils/categoryBreadcrumbs";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

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
    // Try banner first, then promotion
    let result = await getCategoryPageData(decodedSlug, locale, resolvedSearchParams, "banner");
    if (result.products.length === 0) {
      result = await getCategoryPageData(decodedSlug, locale, resolvedSearchParams, "promotion");
    }
    if (result.products.length === 0) {
      notFound();
    }
    const { products, filters, filterLabels } = result;

    return (
      <div className="w-full">
        <Breadcrumb
          items={[
            { label: t("home"), href: "/" },
            { label: decodedSlug },
          ]}
        />
        <div className="flex gap-5 max-[991px]:gap-0 items-stretch">
          <div className="max-[991px]:hidden block">
            <ProductsSidebar
              filters={filters}
              filterLabels={filterLabels}
              seeMoreText={tf("seeMore")}
              seeLessText={tf("seeLess")}
            />
          </div>
          <div className="flex-1 max-[991px]:p-3">
            <CategoryProducts products={products} />
          </div>
        </div>
      </div>
    );
  }

  const { products, filters, filterLabels } = await getCategoryPageData(decodedSlug, locale, resolvedSearchParams);

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

  return (
    <div className="w-full">
      <div className="max-[991px]:hidden">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="flex gap-5 max-[991px]:gap-0 items-stretch">
        {/* Desktop Sidebar */}
        <div className="max-[991px]:hidden block">
          <ProductsSidebar
            filters={filters}
            filterLabels={filterLabels}
            seeMoreText={tf("seeMore")}
            seeLessText={tf("seeLess")}
          />
        </div>

        {/* Mobile Sidebar */}
        <div className="hidden max-[991px]:flex shrink-0 -ms-4 self-stretch">
          <MobileCategorySidebar
            subCategories={sliderCategories}
            currentSlug={decodedSlug}
            parentSlug={sliderParentSlug}
          />
        </div>

        <div className="flex-1 max-[991px]:p-3">
          {/* Desktop Slider */}
          <div className="max-[991px]:hidden block">
            <CategorySlider
              subCategories={sliderCategories}
              currentSlug={decodedSlug}
              parentSlug={sliderParentSlug}
            />
          </div>
          
          <CategoryProducts products={products} />
        </div>
      </div>
    </div>
  );
}
