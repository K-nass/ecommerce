import SectionTitle from "@/components/ui/SectionTitle";
import { homePageService } from "../../services/homePageService";
import ContentItem from "./ContentItem";
import type { ContentSectionProps } from "../../types";

export default async function ContentSection({
  title,
  endpoint,
}: ContentSectionProps) {
  const categories = await homePageService.getCategories(endpoint);

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <SectionTitle title={title} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-x-15 gap-y-4">
        {categories.map((category) => (
          <ContentItem key={category.id} item={category} />
        ))}
      </div>
    </div>
  );
}
