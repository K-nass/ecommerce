import { getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { CartPageContent } from "./CartPageContent";

interface CartPageProps {
  locale: string;
}

export async function CartPage({ locale }: CartPageProps) {
  const t = await getTranslations({ locale, namespace: "cartPage" });
  const tb = await getTranslations({ locale, namespace: "header.breadcrumb" });

  return (
    <div className="py-6">
      <Breadcrumb
        items={[
          { label: tb("home"), href: "/" },
          { label: t("breadcrumb") },
        ]}
      />

      <div className="mt-6">
        <CartPageContent />
      </div>
    </div>
  );
}