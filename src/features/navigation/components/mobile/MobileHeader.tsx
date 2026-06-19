import { getTranslations } from "next-intl/server";
import DeliveryModes from "../header/DeliveryModes";
import { SearchInput } from "../header/SearchInput";

export default async function MobileHeader() {
  const t = await getTranslations("header.search");

  return (
    <div className="block lg:hidden">
      <div className="flex flex-col gap-3 px-4 py-2.5">
        <DeliveryModes />
        <SearchInput
          prefixText={t("mainPlaceholderPrefix")}
          highlightText={t("mainPlaceholderHighlight")}
        />
      </div>
    </div>
  );
}
