import { getImageProps } from "next/image";
import { Link } from "@/i18n/navigation";
import type { ContentItemProps } from "../../types";

export default function ContentItem({ item }: ContentItemProps) {
  const commonImageProps = {
    alt: item.name,
    className: "object-contain",
  };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: item.image.desktop || "",
    width: 135,
    height: 135,
  });
  const { props: mobileImageProps } = getImageProps({
    ...commonImageProps,
    src: item.image.mobile || item.image.desktop || "",
    width: 135,
    height: 135,
  });

  return (
    <Link
      href={`/category/${item.slug}`}
      className="flex flex-col items-center justify-between rounded-lg transition-all duration-200 overflow-hidden gap-2"
    >
      <div className="relative w-full flex items-center justify-center bg-slate-50">
        <picture className="flex items-center justify-center">
          <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
          <img {...mobileImageProps} alt={item.name} />
        </picture>
      </div>
      <div className="w-full text-center flex-1 flex items-center justify-center">
        <p className="text-md font-bold line-clamp-2 leading-tight text-primary">
          {item.name}
        </p>
      </div>
    </Link>
  );
}
