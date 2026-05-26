import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import ContentItem from "./ContentItem";
interface ContentItem {
  id: number;
  image: string;
  title: string;
}
const items: ContentItem[] = [
  {
    id: 3,
    title: "Mobiles & Tablets",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4f1.svg",
  },
  {
    id: 4,
    title: "Electronics & Appliances",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f50c.svg",
  },
  {
    id: 5,
    title: "Health & Beauty",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9f4.svg",
  },
  {
    id: 6,
    title: "Home & Kitchen",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3e0.svg",
  },
  {
    id: 7,
    title: "Sports & Fitness",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26bd.svg",
  },
  {
    id: 8,
    title: "Toys & Games",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3ae.svg",
  },
  {
    id: 9,
    title: "Books & Stationery",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4da.svg",
  },
  {
    id: 10,
    title: "Baby Products",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f476.svg",
  },
  {
    id: 11,
    title: "Pet Supplies",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg",
  },
  {
    id: 12,
    title: "Automotive",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f697.svg",
  },
  {
    id: 13,
    title: "Gaming",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f579.svg",
  },
  {
    id: 14,
    title: "Jewelry & Accessories",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f48d.svg",
  },
  {
    id: 15,
    title: "Office Supplies",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4bc.svg",
  },
  {
    id: 16,
    title: "Music & Instruments",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3b8.svg",
  },
  {
    id: 17,
    title: "Travel & Luggage",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9f3.svg",
  },
  {
    id: 18,
    title: "Furniture & Decor",
    image:
      "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa91.svg",
  },
];
export default function ContentSection({ title }: { title: string }) {
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
