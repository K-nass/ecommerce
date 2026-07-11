import { setRequestLocale, getTranslations } from "next-intl/server";
import { faqsService } from "@/features/faqs";
import { FaqsAccordion, FaqsSkeleton } from "@/features/faqs";
import { Suspense } from "react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqs" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

async function FaqsList({ locale }: { locale: string }) {
  const faqs = await faqsService.getAll(locale);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {await getTranslations({ locale, namespace: "faqs" }).then((t) => t("title"))}
      </h1>
      <FaqsAccordion faqs={faqs} />
    </div>
  );
}

export default async function FaqsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-8">
      <Suspense fallback={<FaqsSkeleton />}>
        <FaqsList locale={locale} />
      </Suspense>
    </div>
  );
}
