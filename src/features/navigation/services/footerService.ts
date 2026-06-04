import { apiFetch } from "@/shared/lib/api";
import type { ApiResponse } from "@/shared/types";
import type { FooterData } from "../types";

export const footerService = {
  getFooter: async (lang: string): Promise<FooterData> => {
    // Backend dev: uncomment when API is ready
    // const response = await apiFetch<ApiResponse<FooterData>>(
    //   `/general/footer?lang=${lang}`
    // );
    // return response.data;

    return getMockFooterData(lang);
  },
};

function getMockFooterData(lang: string): FooterData {
  const isAr = lang === "ar";

  return {
    logo: {
      imageSrc: "https://cdnprod.mafretailproxy.com/mafrp-web/assets/en/images/default/logo-white.svg",
      alt: isAr ? "كريم شوب" : "Kareem Shop",
    },
    columns: [
      { id: 1, title: null, links: [] },
      {
        id: 2,
        title: isAr ? "خدمة العملاء" : "Customer Service",
        links: [
          { id: 1, label: isAr ? "الخدمة والضمان" : "Service and Warranty", slug: "/service-warranty" },
          { id: 2, label: isAr ? "الإرجاع والاستبدال" : "Returns and Exchanges", slug: "/returns" },
          { id: 3, label: isAr ? "الدفع الآمن عبر الإنترنت" : "Secured Online Payment", slug: "/payment" },
          { id: 4, label: isAr ? "الشحن والتوصيل" : "Shipping & Delivery", slug: "/shipping" },
          { id: 5, label: isAr ? "الدفع عند الاستلام" : "Cash on Delivery", slug: "/cash-on-delivery" },
        ],
      },
      {
        id: 3,
        title: isAr ? "معلومات عنا" : "About Us",
        links: [
          { id: 6, label: isAr ? "عن كريم شوب" : "About Kareem Shop", slug: "/about" },
          { id: 7, label: isAr ? "شركتنا" : "Our Company", slug: "/company" },
          { id: 8, label: isAr ? "المسؤولية المجتمعية" : "Community & Society", slug: "/community" },
          { id: 9, label: isAr ? "النشرة البريدية" : "Newsletter", slug: "/newsletter" },
        ],
      },
      {
        id: 4,
        title: isAr ? "نساعدك على التوفير" : "Helping You Save",
        links: [
          { id: 10, label: isAr ? "الضمان الممتد" : "Extended Warranty", slug: "/extended-warranty" },
          { id: 11, label: isAr ? "برنامج الولاء" : "Loyalty Program", slug: "/loyalty" },
        ],
      },
      {
        id: 5,
        title: isAr ? "المساعدة والدعم" : "Help & Support",
        links: [
          { id: 12, label: isAr ? "اتصل بنا" : "Contact Us", slug: "/contact" },
          { id: 13, label: isAr ? "الشروط والأحكام" : "Terms & Conditions", slug: "/terms" },
          { id: 14, label: isAr ? "إخلاء مسؤولية الاحتيال" : "Anti-Fraud Disclaimer", slug: "/anti-fraud" },
          { id: 15, label: isAr ? "سياسة الإفصاح المسؤول" : "Responsible Disclosure Policy", slug: "/disclosure" },
          { id: 16, label: isAr ? "الأسئلة الشائعة" : "FAQs", slug: "/faq" },
          { id: 17, label: isAr ? "ابحث عن متجر" : "Find A Store", slug: "/stores" },
          { id: 18, label: isAr ? "سياسة الخصوصية" : "Privacy Policy", slug: "/privacy" },
        ],
      },
    ],
    socialLinks: [
      { platform: "facebook", url: "#", label: "Facebook" },
      { platform: "twitter", url: "#", label: "Twitter" },
      { platform: "instagram", url: "#", label: "Instagram" },
      { platform: "youtube", url: "#", label: "YouTube" },
    ],
    contactInfo: {
      stayInTouchText: isAr ? "ابق على تواصل معنا" : "Stay in touch with us",
      whatsappUrl: "https://api.whatsapp.com/send?phone=%2B201111185469",
      assistanceText: isAr ? "تحدث معنا للمساعدة" : "Chat with us for assistance",
      callUsText: isAr ? "اتصل بنا للمساعدة" : "Call us for assistance",
      phoneNumber: "16061",
    },
    bottomRow: {
      title: isAr ? "حمل تطبيقنا" : "Download Our App",
      appStore: {
        platform: "ios",
        imageSrc: "/app-store-badge.svg",
        url: "#",
        alt: "App Store",
      },
      googlePlay: {
        platform: "android",
        imageSrc: "/google-play-badge.svg",
        url: "#",
        alt: "Google Play",
      },
      huaweiAppGallery: {
        platform: "android",
        imageSrc: "/huawei-badge.png",
        url: "#",
        alt: "Huawei AppGallery",
      },
    },
    cookieSettingsLabel: isAr ? "إعدادات ملفات تعريف الارتباط" : "Cookie Settings",
    copyright: isAr
      ? `© ${new Date().getFullYear()} كريم شوب. جميع الحقوق محفوظة.`
      : `© ${new Date().getFullYear()} Kareem Shop. All rights reserved.`,
    attributionLogo: {
      imageSrc: "/attribution-logo.svg",
      alt: isAr ? "كريم شوب" : "Kareem Shop",
    },
  };
}
