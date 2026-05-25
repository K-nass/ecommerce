import "../globals.css";

import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header/Header";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
 const dir = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <html lang={locale} dir={dir}>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <Header params={params} />
          <div className="container mx-auto px-4">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
