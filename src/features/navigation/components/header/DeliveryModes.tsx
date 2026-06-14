import { getTranslations } from "next-intl/server";
import { DeliveryModeButton } from "./DeliveryModeButton";

export default async function DeliveryModes() {
  const t = await getTranslations("header.deliveryModes");

  return (
    <div className="no-scrollbar flex w-full items-center gap-3 overflow-x-auto py-2">
      <DeliveryModeButton
        label={t("scheduled")}
        icon={{ src: "/scheduled.avif", alt: "Scheduled" }}
        bgClass="bg-primary"
        borderClass="border-white"
        textClass="text-white"
      />
      <DeliveryModeButton
        label={t("now")}
        icon={{ src: "/now.avif", alt: "NOW" }}
        bgClass="bg-background"
        borderClass="border-accent"
        textClass="text-primary"
        etaText="120 mins"
      />
      {/* <DeliveryModeButton
        label="Electronic…"
        icon={{ src: "/electronics.avif", alt: "Electronic" }}
        bgClass="bg-background"
        borderClass="border-primary"
        textClass="text-primary"
      /> */}
    </div>
  );
}
