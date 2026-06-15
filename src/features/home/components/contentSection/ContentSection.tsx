import SectionTitle from "@/components/ui/SectionTitle";
import { homePageService } from "../../services/homePageService";
import ContentItem from "./ContentItem";
import type { ContentSectionProps, HomeCategory } from "../../types";

export default async function ContentSection({
  title,
  type,
  setting,
  endpoint,
}: ContentSectionProps) {
  if (!endpoint) return null;
  const categories = await homePageService.fetchSectionData<HomeCategory[]>(endpoint);

  if (!categories || categories.length === 0) {
    return null;
  }

  const columns = setting?.columns_count ?? 8;
  const isCircle = setting?.shape === "circle";

  return (
    <div className="w-full">
      <SectionTitle title={title} />
      <div
        className="grid gap-x-15 gap-y-4"
        style={{
          gridTemplateColumns: `repeat(${Math.min(columns, categories.length)}, minmax(0, 1fr))`,
        }}
      >
        {categories.map((category) => (
          <ContentItem key={category.id} item={category} isCircle={isCircle} />
        ))}
      </div>
    </div>
  );
}
