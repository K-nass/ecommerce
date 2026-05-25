import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/shared/utils/cn";

type BannerProps = {
  imageSrc: string;
  alt: string;
  href?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  className?: string;
  overlay?: ReactNode;
  sizes?: string;
};

export default function Banner({
  imageSrc,
  alt,
  href,
  priority = false,
  loading = "lazy",
  className,
  overlay,
  sizes = "(max-width: 768px) 100vw, 1000px",
}: BannerProps) {
  const content = (
    <article
      className={cn(
        "relative h-full w-full overflow-hidden rounded-sm bg-surface",
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority={priority}
        loading={loading}
        sizes={sizes}
        className="object-cover object-center"
      />
      {overlay ? <div className="absolute inset-0 z-10">{overlay}</div> : null}
    </article>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="block h-full w-full">
      {content}
    </Link>
  );
}
