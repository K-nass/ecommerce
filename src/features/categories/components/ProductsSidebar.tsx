import ExpandableList from "./ExpandableList";
import type { CategoryFilters } from "../types";

interface ProductsSidebarProps {
  filters: CategoryFilters;
  seeMoreText: string;
  seeLessText: string;
}

const FILTER_LABELS: Record<keyof CategoryFilters, string> = {
  brand: "Brand",
  category: "Category",
  height: "Height",
  width: "Width",
  length: "Length",
  weight: "Weight",
};

export default function ProductsSidebar({
  filters,
  seeMoreText,
  seeLessText,
}: ProductsSidebarProps) {
  const entries = Object.entries(filters).filter(
    ([key, values]) => key !== "category" && values && values.length > 0,
  );

  if (entries.length === 0) return null;

  return (
    <aside className="w-80 shrink-0 border border-border-subtle">
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto space-y-1 p-5">
      {entries.map(([key, values]) => {
        const label = FILTER_LABELS[key as keyof CategoryFilters];
        const items = values!;
        const isLong = items.length > 6;

        return (
          <div key={key} className="py-3">
            <h3 className="font-semibold text-sm mb-2">{label}</h3>
            {isLong ? (
              <ExpandableList
                items={items}
                seeMoreText={seeMoreText}
                seeLessText={seeLessText}
              />
            ) : (
              items.map((value: string) => (
                <label
                  key={value}
                  className="flex items-center gap-2 text-sm cursor-pointer py-0.5"
                >
                  <input type="checkbox" className="accent-primary" />
                  {value}
                </label>
              ))
            )}
          </div>
        );
      })}
      </div>
    </aside>
  );
}
