import { cn } from "@/shared/utils/cn";
import Image from "next/image";

interface Slide {
  id: number;
  image: string;
  title: string;
  borderColor?: string;
}

interface SlideProps {
  slide: Slide;
  hasBorder?: boolean;
}
export default function Slide({ slide, hasBorder = true }: SlideProps) {
  return (
    <div
      className={cn(
        "relative aspect-3/4 w-full overflow-hidden rounded-xl",
        hasBorder && "border-2",
        hasBorder && (slide.borderColor || "border-primary-dark"),
      )}
    >
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        sizes="(max-w-480px) 75vw, (max-w-768px) 45vw, (max-w-1024px) 30vw, 20vw"
        priority={slide.id <= 2}
        className={cn("object-cover rounded-xl", hasBorder && "p-1")}
      />
    </div>
  );
}
