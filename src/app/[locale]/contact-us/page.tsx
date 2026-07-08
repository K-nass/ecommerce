import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactForm, ContactFormSkeleton } from "@/features/contacts";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Logo from "@/components/ui/Logo";
import { Link } from "@/i18n/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const tb = await getTranslations({ locale, namespace: "header.breadcrumb" });
  const tFaq = await getTranslations({ locale, namespace: "faqs" });

  return (
    <div className="py-6 min-h-screen">
      <Breadcrumb
        items={[
          { label: tb("home"), href: "/" },
          { label: t("breadcrumb") },
        ]}
      />

      <div className="mt-6">
        <Suspense fallback={<ContactFormSkeleton />}>
          <ContactForm locale={locale} />
        </Suspense>

        <div className="mt-12 text-center border-t border-border pt-8">
          <p className="text-sm text-text-secondary">
            {t("faqPrompt")}{" "}
            <Link
              href="/faqs"
              className="font-semibold text-primary underline underline-offset-2 hover:text-primary-dark transition-colors"
            >
              {tFaq("title")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
