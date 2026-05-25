import Image from "next/image";

import { Link } from "@/i18n/navigation";

type LogoProps = {
  src: string;
  alt?: string;
  priority?: boolean;
};

export default function Logo({
  src,
  alt = "Logo",
  priority = false,
}: LogoProps) {
  return (
    <Link href="/" aria-label={alt}>
      <Image
        src={src}
        alt={alt}
        width={128}
        height={128}
        priority={priority}
      />
    </Link>
  );
}
