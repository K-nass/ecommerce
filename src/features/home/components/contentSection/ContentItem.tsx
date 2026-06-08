import Image from "next/image";
import { cn } from "@/shared/utils/cn";
import type { ContentItemProps } from "../../types";

export default function ContentItem({ item, className, isActive }: ContentItemProps) {
  return (
    <div
      key={item.id}
      className={cn(
        "flex flex-col items-center justify-between transition-all duration-200 gap-2 h-full",
        isActive === true && "border-b-[3px] border-primary pb-2",
        isActive === false && "border-b-[3px] border-transparent pb-2"
      )}
    >
      <div
        className={cn(
          "relative w-full flex items-center justify-center bg-slate-50"
        )}
      >
        <Image
          src={item.image}
          alt={item.title}
          width={135}
          height={135}
          className={cn(className, "object-contain w-full h-full")}
        />
      </div>
      <div className="w-full text-center flex-1 flex items-start justify-center pt-1">
        <p
          className={cn(
            "text-[13px] font-medium line-clamp-2 leading-tight transition-colors duration-200",
            isActive === true ? "text-primary" : "text-slate-800"
          )}
        >
          {item.title}
        </p>
      </div>
    </div>
  );
}
