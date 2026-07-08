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
import { ChannelThemeProvider } from "@/features/fast-shipping/components/ChannelThemeProvider";
import { CartSyncProvider } from "@/features/cart/components/CartSyncProvider";
import { Montserrat } from "next/font/google";
import { cn } from "@/shared/utils/cn";
import { settingsService } from "@/features/settings";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const DEFAULT_EN_TITLE = "Meem Market";
const DEFAULT_AR_TITLE = "ميم ماركت";
const DEFAULT_EN_DESC = "Shop the best products at Meem Market — electronics, fashion, home goods, and more.";
const DEFAULT_AR_DESC = "تسوق أفضل المنتجات في ميم ماركت - إلكترونيات، أزياء، منتجات المنزل والمزيد";
const DEFAULT_FAVICON = "/meem-icon.jpeg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  let siteName = isAr ? DEFAULT_AR_TITLE : DEFAULT_EN_TITLE;
  let description = isAr ? DEFAULT_AR_DESC : DEFAULT_EN_DESC;
  let favicon = DEFAULT_FAVICON;

  try {
    const settings = await settingsService.getSettings(locale);
    if (settings?.site_name) siteName = settings.site_name;
    if (settings?.meta_desc) description = settings.meta_desc;
    else if (settings?.site_desc) description = settings.site_desc;
    if (settings?.favicon) favicon = settings.favicon;
  } catch {
    // Use defaults
  }

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    icons: {
      icon: favicon,
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

  let settingsLogo: string | null = null;
  try {
    const settings = await settingsService.getSettings(locale);
    if (settings?.logo) settingsLogo = settings.logo;
  } catch {
    // Use default
  }
  
  return (
      <html lang={locale} dir={dir} className="overflow-x-hidden">
      <body className={cn("flex flex-col overflow-x-hidden", montserrat.variable)}>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL} />
        <NextIntlClientProvider>
          <div className="hidden lg:block">
            <Header params={params} settingsLogo={settingsLogo} />
          </div>
          <div className="block lg:hidden">
            <MobileHeader />
          </div>
          <MobileBottomNav />
          <ChannelThemeProvider />
          <CartSyncProvider>
            <div className="container mx-auto px-4 flex flex-col min-h-screen pb-[56px] lg:pb-0">
              {children}
            </div>
          </CartSyncProvider>
          <Footer params={params} />
          <AuthModal />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
