import { getImageProps } from "next/image";
import { getLocale } from "next-intl/server";

import SectionTitle from "@/components/ui/SectionTitle";
import { homePageService } from "../../services/homePageService";
import type { BannerProps, Promotion } from "../../types";

export default async function Banner({ type, title, promotion: initialPromotion, setting, endpoint }: BannerProps) {
  const locale = await getLocale();
  let promotion = initialPromotion;

  if (!promotion && endpoint) {
    const promotions = await homePageService.fetchSectionData<Promotion[]>(endpoint, locale);
    if (promotions.length > 0) {
      promotion = promotions[0];
    }
  }

  if (!promotion || !promotion.image?.desktop || !promotion.image?.mobile) {
    return null;
  }
  const commonImageProps = {
    alt: promotion.name,
    className: "h-full w-full object-cover object-center",
    sizes: "100vw",
  };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: promotion.image.desktop,
    width: 1440,
    height: 300,
  });
  const { props: mobileImageProps } = getImageProps({
    ...commonImageProps,
    src: promotion.image.mobile,
    width: 640,
    height: 170,
  });

  return (
    <section className="flex flex-col gap-y-3">
      {title ? <SectionTitle title={title} /> : null}
      <article className="relative h-42.5 w-full overflow-hidden rounded-sm bg-surface sm:h-57.5 lg:h-75">
        <picture className="block h-full w-full">
          <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
          <img {...mobileImageProps} alt={promotion.name} />
        </picture>
      </article>
    </section>
  );
}
