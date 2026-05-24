import { getTranslations } from "next-intl/server";
import { navBarService } from "@/services/navbar";
import Image from "next/image";
import CategoryItem from "./CategoryItem";

export default async function CategoryNav({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("header.categoryNav");
  const items = await navBarService.getAll(locale);

  return (
    <nav aria-label="Categories" className="w-full">
      <div className="flex h-11 items-center gap-3 rounded-md">
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-2 rounded-md px-2 py-1 text-[13px] font-semibold text-primary-dark"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center">
            <Image
              src="/icons/grid.svg"
              width={20}
              height={20}
              alt="grid icon"
            />
          </span>
          <span className="whitespace-nowrap">{t("allCategories")}</span>
        </button>

        <div className="no-scrollbar min-w-0 flex-1 overflow-x-auto">
          <ul
            className="flex w-max items-center whitespace-nowrap pe-2 text-[13px] font-semibold text-primary-dark gap-4 sm:gap-6 md:gap-8"
          >
            {items.map((item) => (
              <CategoryItem
                key={item.id}
                href={`/products?category=${item.slug}`}
                name={item.name}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
