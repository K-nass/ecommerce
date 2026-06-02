import { cn } from "@/shared/utils/cn";
import Image from "next/image";
import type { CardSlideItem } from "../../types";

interface SlideProps {
  slide: CardSlideItem;
  hasBorder?: boolean;
  aspectClassName?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}
export default function Slide({
  slide,
  hasBorder = true,
  aspectClassName = "aspect-3/4",
  imageClassName,
  sizes = "(max-width: 480px) 75vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 20vw",
  priority = false,
}: SlideProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl",
        aspectClassName,
        hasBorder && "border-2",
        hasBorder && (slide.borderColor || "border-primary-dark"),
      )}
    >
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("rounded-xl object-cover", hasBorder && "p-1", imageClassName)}
      />
    </div>
  );
}

export type { CardSlideItem } from "../../types";
