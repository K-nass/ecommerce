import "../globals.css";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header/Header";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={dir}>
      <body className={cn("min-h-full flex flex-col", montserrat.variable)}>
        <NextIntlClientProvider>
          <Header params={params} />
          <div className="container mx-auto px-4">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
