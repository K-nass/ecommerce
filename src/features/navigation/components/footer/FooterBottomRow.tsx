import type { FooterData } from "../../types";

interface Props {
  data: FooterData["bottomRow"];
}

export default function FooterBottomRow({ data }: Props) {
  const badges = [
    { badge: data.appStore, key: "appstore" },
    { badge: data.googlePlay, key: "google" },
    { badge: data.huaweiAppGallery, key: "huawei" },
  ];

  return (
    <div className="flex items-center justify-end gap-2">
      {badges.map(({ badge, key }) => (
        <a key={key} href={badge.url}>
          <img
            src={badge.imageSrc}
            alt={badge.alt ?? badge.platform}
            className="h-8 w-auto"
          />
        </a>
      ))}
      <span className="ml-2 text-xs leading-normal font-normal text-white">{data.title}</span>
    </div>
  );
}
