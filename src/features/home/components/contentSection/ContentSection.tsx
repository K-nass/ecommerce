import SectionTitle from "@/components/ui/SectionTitle";
import ContentItem from "./ContentItem";
import type { ContentSectionProps } from "../../types";

export default function ContentSection({ title, items }: ContentSectionProps) {
  return (
    <div className="w-full">
      <SectionTitle title={title} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-x-15 gap-y-4">
        {items.map((item) => (
          <ContentItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
