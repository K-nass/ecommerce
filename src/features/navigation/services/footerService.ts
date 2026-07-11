import { apiFetch } from "@/shared/lib/api";
import type { FooterData } from "../types";

// ---------------------------------------------------------------------------
// Footer data is fully dynamic â€” all content (links, social, contact info,
// app badges, copyright, logos) will be fetched from the backend /footer
// endpoint.  The mock data below simulates that API response so development
// can proceed without a running backend.  Replace with the real API call
// when the endpoint is available.
// ---------------------------------------------------------------------------

export const footerService = {
  getFooter: async (lang: string): Promise<FooterData> => {
    // Backend dev: uncomment when /footer endpoint is ready
    // const response = await apiFetch<FooterData>(
    //   "/footer",
    //   { lang },
    // );
    // return response.data;

    return getMockFooterData(lang);
  },
};

function getMockFooterData(lang: string): FooterData {
  const isAr = lang === "ar";

  return {
    columns: [
      { id: 1, title: null, links: [] },
      {
        id: 2,
        title: isAr ? "ط®ط¯ظ…ط© ط§ظ„ط¹ظ…ظ„ط§ط،" : "Customer Service",
        links: [
          { id: 1, label: isAr ? "ط§ظ„ط®ط¯ظ…ط© ظˆط§ظ„ط¶ظ…ط§ظ†" : "Service and Warranty", slug: "/service-warranty" },
          { id: 2, label: isAr ? "ط§ظ„ط¥ط±ط¬ط§ط¹ ظˆط§ظ„ط§ط³طھط¨ط¯ط§ظ„" : "Returns and Exchanges", slug: "/returns" },
          { id: 3, label: isAr ? "ط§ظ„ط¯ظپط¹ ط§ظ„ط¢ظ…ظ† ط¹ط¨ط± ط§ظ„ط¥ظ†طھط±ظ†طھ" : "Secured Online Payment", slug: "/payment" },
          { id: 4, label: isAr ? "ط§ظ„ط´ط­ظ† ظˆط§ظ„طھظˆطµظٹظ„" : "Shipping & Delivery", slug: "/shipping" },
          { id: 5, label: isAr ? "ط§ظ„ط¯ظپط¹ ط¹ظ†ط¯ ط§ظ„ط§ط³طھظ„ط§ظ…" : "Cash on Delivery", slug: "/cash-on-delivery" },
        ],
      },
      {
        id: 3,
        title: isAr ? "ظ…ط¹ظ„ظˆظ…ط§طھ ط¹ظ†ط§" : "About Us",
        links: [
          { id: 6, label: isAr ? "ط¹ظ† ظƒط±ظٹظ… ط´ظˆط¨" : "About Kareem Shop", slug: "/about" },
          { id: 7, label: isAr ? "ط´ط±ظƒطھظ†ط§" : "Our Company", slug: "/company" },
          { id: 8, label: isAr ? "ط§ظ„ظ…ط³ط¤ظˆظ„ظٹط© ط§ظ„ظ…ط¬طھظ…ط¹ظٹط©" : "Community & Society", slug: "/community" },
          { id: 9, label: isAr ? "ط§ظ„ظ†ط´ط±ط© ط§ظ„ط¨ط±ظٹط¯ظٹط©" : "Newsletter", slug: "/newsletter" },
        ],
      },
      {
        id: 4,
        title: isAr ? "ظ†ط³ط§ط¹ط¯ظƒ ط¹ظ„ظ‰ ط§ظ„طھظˆظپظٹط±" : "Helping You Save",
        links: [
          { id: 10, label: isAr ? "ط§ظ„ط¶ظ…ط§ظ† ط§ظ„ظ…ظ…طھط¯" : "Extended Warranty", slug: "/extended-warranty" },
          { id: 11, label: isAr ? "ط¨ط±ظ†ط§ظ…ط¬ ط§ظ„ظˆظ„ط§ط،" : "Loyalty Program", slug: "/loyalty" },
        ],
      },
      {
        id: 5,
        title: isAr ? "ط§ظ„ظ…ط³ط§ط¹ط¯ط© ظˆط§ظ„ط¯ط¹ظ…" : "Help & Support",
        links: [
          { id: 12, label: isAr ? "ط§طھطµظ„ ط¨ظ†ط§" : "Contact Us", slug: "/contact-us" },
          { id: 13, label: isAr ? "ط§ظ„ط´ط±ظˆط· ظˆط§ظ„ط£ط­ظƒط§ظ…" : "Terms & Conditions", slug: "/terms" },
          { id: 14, label: isAr ? "ط¥ط®ظ„ط§ط، ظ…ط³ط¤ظˆظ„ظٹط© ط§ظ„ط§ط­طھظٹط§ظ„" : "Anti-Fraud Disclaimer", slug: "/anti-fraud" },
          { id: 15, label: isAr ? "ط³ظٹط§ط³ط© ط§ظ„ط¥ظپطµط§ط­ ط§ظ„ظ…ط³ط¤ظˆظ„" : "Responsible Disclosure Policy", slug: "/disclosure" },
          { id: 16, label: isAr ? "ط§ظ„ط£ط³ط¦ظ„ط© ط§ظ„ط´ط§ط¦ط¹ط©" : "FAQs", slug: "/faqs" },
          { id: 17, label: isAr ? "ط§ط¨ط­ط« ط¹ظ† ظ…طھط¬ط±" : "Find A Store", slug: "/stores" },
          { id: 18, label: isAr ? "ط³ظٹط§ط³ط© ط§ظ„ط®طµظˆطµظٹط©" : "Privacy Policy", slug: "/privacy" },
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
      stayInTouchText: isAr ? "ط§ط¨ظ‚ ط¹ظ„ظ‰ طھظˆط§طµظ„ ظ…ط¹ظ†ط§" : "Stay in touch with us",
      whatsappUrl: "https://api.whatsapp.com/send?phone=%2B201111185469",
      assistanceText: isAr ? "طھط­ط¯ط« ظ…ط¹ظ†ط§ ظ„ظ„ظ…ط³ط§ط¹ط¯ط©" : "Chat with us for assistance",
      callUsText: isAr ? "ط§طھطµظ„ ط¨ظ†ط§ ظ„ظ„ظ…ط³ط§ط¹ط¯ط©" : "Call us for assistance",
      phoneNumber: "16061",
    },
    bottomRow: {
      title: isAr ? "ط­ظ…ظ„ طھط·ط¨ظٹظ‚ظ†ط§" : "Download Our App",
      appStore: {
        platform: "ios",
        imageSrc: "/images/badges/app-store.svg",
        url: "#",
        alt: "App Store",
      },
      googlePlay: {
        platform: "android",
        imageSrc: "/images/badges/play-store.svg",
        url: "#",
        alt: "Google Play",
      },
    },
    cookieSettingsLabel: isAr ? "ط¥ط¹ط¯ط§ط¯ط§طھ ظ…ظ„ظپط§طھ طھط¹ط±ظٹظپ ط§ظ„ط§ط±طھط¨ط§ط·" : "Cookie Settings",
  };
}
