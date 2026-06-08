import "../globals.css";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import Header from "@/features/navigation/components/header/Header";
import Footer from "@/features/navigation/components/footer/Footer";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { Montserrat } from "next/font/google";
import { cn } from "@/shared/utils/cn";

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
    <NextIntlClientProvider>
      <html lang={locale} dir={dir}>
        <body className={cn("min-h-screen flex flex-col", montserrat.variable)}>
          <Header params={params} />
          <div className="container mx-auto px-4 flex flex-col grow">{children}</div>
          <Footer params={params} />
          <AuthModal />
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
