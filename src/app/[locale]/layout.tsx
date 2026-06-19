import "../globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server"; 
import Header from "@/features/navigation/components/header/Header";
import MobileHeader from "@/features/navigation/components/mobile/MobileHeader";
import MobileBottomNav from "@/features/navigation/components/mobile/MobileBottomNav";
import Footer from "@/features/navigation/components/footer/Footer";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { CartSyncProvider } from "@/features/cart/components/CartSyncProvider";
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: locale === "ar" ? "ميم ماركت" : "Meem Market",
      template: "%s | Meem Market",
    },
    description:
      locale === "ar"
        ? "تسوق أفضل المنتجات في ميم ماركت - إلكترونيات، أزياء، منتجات المنزل والمزيد"
        : "Shop the best products at Meem Market - electronics, fashion, home goods and more.",
    icons: {
      icon: "/meem-icon.jpeg",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  setRequestLocale(locale);
  
  const dir = locale === "ar" ? "rtl" : "ltr";
  
  return (
      <html lang={locale} dir={dir} className="overflow-x-hidden">
      <body className={cn("flex flex-col overflow-x-hidden", montserrat.variable)}>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL} />
        <NextIntlClientProvider>
          <div className="hidden lg:block">
            <Header params={params} />
          </div>
          <div className="block lg:hidden">
            <MobileHeader />
          </div>
          <CartSyncProvider>
            <div className="container mx-auto px-4 flex flex-col min-h-screen pb-16 lg:pb-0">
              {children}
            </div>
          </CartSyncProvider>
          <Footer params={params} />
          <MobileBottomNav />
          <AuthModal />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}