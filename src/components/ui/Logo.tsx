import Image from "next/image";
import { Link } from "@/i18n/navigation";

type LogoProps = {
  src: string;
  alt?: string;
  priority?: boolean;
  className?: string;
};

export default function Logo({
  src,
  alt = "Logo",
  priority = false,
  className,
}: LogoProps) {
  return (
    <Link href="/" aria-label={alt}>
      <Image
        src={src}
        alt={alt}
        width={120}
        height={52}
        priority={priority}
        className={className}
      />
    </Link>
  );
}
