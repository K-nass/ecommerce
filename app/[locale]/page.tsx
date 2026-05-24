import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("header");
  return (
    <main className="bg-primary">
      <h1 className="text-xl font-semibold">{t("deliveryModes.title")}</h1>
    </main>
  );
}
