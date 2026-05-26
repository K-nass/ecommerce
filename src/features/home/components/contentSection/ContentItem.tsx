import Image from "next/image";
interface ContentItem {
  id: number;
  image: string;
  title: string;
}
export default function ContentItem({ item }: { item: ContentItem }) {
  return (
    <div
      key={item.id}
      className="flex flex-col items-center justify-between rounded-lg transition-all duration-200 overflow-hidden gap-2"
    >
      <div className="relative w-full flex items-center justify-center bg-slate-50">
        <Image
          src={item.image}
          alt={item.title}
          width={135}
          height={135}
          className="object-contain max-h-full max-w-full"
        />
      </div>
      <div className="w-full text-center flex-1 flex items-center justify-center">
        <p className="text-md font-bold line-clamp-2 leading-tight text-primary">
          {item.title}
        </p>
      </div>
    </div>
  );
}
