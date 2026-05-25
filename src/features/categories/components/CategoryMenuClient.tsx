"use client";

import { useState } from "react";
import type { CategoryMenuItem } from "../types";
import CategorySidebar from "./CategorySidebar";
import SubCategoryPane from "./SubCategoryPane";

type CategoryMenuClientProps = {
  categories: CategoryMenuItem[];
};

export default function CategoryMenuClient({
  categories,
}: CategoryMenuClientProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const activeCategory =
    categories.find((cat) => cat.id === activeCategoryId) ?? categories[0];

  if (!categories?.length) return null;

  return (
    <div
      aria-label="Category menu"
      className="pointer-events-none absolute inset-s-0 top-full z-50 pt-2 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
    >
      <div className="w-[calc(100vw-2rem)] max-w-6xl overflow-hidden rounded-xl bg-background shadow-lg">
        <div className="grid grid-cols-[240px_1fr] min-h-95 max-h-[70dvh]">
          <CategorySidebar
            categories={categories}
            activeCategoryId={activeCategory.id}
            onActiveCategoryChange={setActiveCategoryId}
          />
          <SubCategoryPane activeCategory={activeCategory} />
        </div>
      </div>
    </div>
  );
}
