import { getTranslations } from "next-intl/server";
import HeroSwiper from "@/components/HeroSwiper";

export default async function Home() {
  const t = await getTranslations("header");
  return (
    <main className="space-y-6 py-4">
      <HeroSwiper />
      <h1 className="text-xl font-semibold text-primary">{t("deliveryModes.title")}</h1>
    </main>
  );
}
