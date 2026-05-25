"use client";

import Link from "next/link";
import type { CategoryMenuItem } from "../types";

type SubCategoryPaneProps = {
  activeCategory: CategoryMenuItem;
};

function toCategoryHref(slug: string) {
  return `/products?category=${encodeURIComponent(slug)}`;
}

export default function SubCategoryPane({ activeCategory }: SubCategoryPaneProps) {
  return (
    <section className="overflow-y-auto">
      <div className="p-6">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-12 gap-y-8">
          {activeCategory.children.map((level2) => (
            <div key={level2.id} className="min-w-0">
              <Link
                href={toCategoryHref(level2.slug)}
                className="block text-[13px] font-semibold text-text-primary hover:text-primary-dark transition-colors"
              >
                {level2.name}
              </Link>

              {level2.children.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {level2.children.map((level3) => (
                    <li key={level3.id}>
                      <Link
                        href={toCategoryHref(level3.slug)}
                        className="block text-[13px] text-text-secondary hover:text-primary-dark transition-colors"
                      >
                        {level3.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
