import Image from "next/image";
import { footerService } from "../../services/footerService";
import Logo from "@/components/ui/Logo";
import FooterColumn from "./FooterColumn";
import FooterBottomRow from "./FooterBottomRow";
import FooterContactCard from "./FooterContactCard";
import FooterAccordion from "./FooterAccordion";
import FooterAccordionItem from "./FooterAccordionItem";
import { settingsService } from "@/features/settings";
import { ContactFormMini } from "@/features/contacts";


interface FooterProps {
  params: Promise<{ locale: string }>;
}

const socialIconUrls: Record<string, string | undefined> = {
  facebook:
    "https://cdnprod.mafretailproxy.com/assets/images/Facebook_0ddadaef3b_ea343675c7.svg",
  twitter:
    "https://cdnprod.mafretailproxy.com/assets/images/Twitter_44f3c5fb21_8a3f98290d.svg",
  instagram:
    "https://cdnprod.mafretailproxy.com/assets/images/Instagram_88847d8ba3_d534f2d78f.svg",
  youtube:
    "https://cdnprod.mafretailproxy.com/assets/images/Youtube_9cc9f992ab_ad97908e18.svg",
};

function getSocialIconUrl(platform: string): string {
  return socialIconUrls[platform] || "https://cdnprod.mafretailproxy.com/assets/images/Facebook_0ddadaef3b_ea343675c7.svg";
}

export default async function Footer({ params }: FooterProps) {
  const { locale } = await params;
  const data = await footerService.getFooter(locale);

  let settingsLogo: string | null = null;
  let settingsSocial: { platform: string; url: string; label: string }[] | null = null;
  let settingsCopyright: string | null = null;
  let settingsPhone: string | null = null;
  try {
    const settings = await settingsService.getSettings(locale);
    if (settings?.logo) settingsLogo = settings.logo;
    if (settings?.site_copy_right) settingsCopyright = settings.site_copy_right;
    if (settings?.phone) settingsPhone = settings.phone;
    const socialLinks: { platform: string; url: string; label: string }[] = [];
    if (settings?.facebook) socialLinks.push({ platform: "facebook", url: settings.facebook, label: "Facebook" });
    if (settings?.instagram) socialLinks.push({ platform: "instagram", url: settings.instagram, label: "Instagram" });
    if (settings?.youtube) socialLinks.push({ platform: "youtube", url: settings.youtube, label: "YouTube" });
    if (settings?.linkedin) socialLinks.push({ platform: "linkedin", url: settings.linkedin, label: "LinkedIn" });
    if (socialLinks.length > 0) settingsSocial = socialLinks;
  } catch {
    // Use footer defaults
  }

  const socialIcons = settingsSocial || data.socialLinks;
  const logoUrl = settingsLogo || "/Meem-logox-white.png";

  return (
    <footer className="bg-primary text-white hidden lg:block mt-10">
      <div className="px-4 py-6 md:px-10">
        {/* أ¢â€‌â‚¬أ¢â€‌â‚¬ Mobile Accordion أ¢â€‌â‚¬أ¢â€‌â‚¬ */}
        <div className="lg:hidden">
          <div className="border-b border-white pb-4">
              <Logo src={logoUrl} alt="Logo" />
            <p className="mt-4 text-xs leading-normal font-normal text-white">{data.contactInfo.stayInTouchText}</p>
            <div className="mt-2 flex">
              {socialIcons.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  aria-label={s.label}
                  className="pr-2 transition-opacity hover:opacity-80 dark:hover:text-white"
                >
                  <Image
                    alt={s.label}
                    width={24}
                    height={24}
                    src={getSocialIconUrl(s.platform)}
                    unoptimized
                  />
                </a>
              ))}
            </div>
          </div>

          <FooterAccordion columns={data.columns} />

          <FooterAccordionItem title={data.bottomRow.title}>
            <div>
              <FooterBottomRow data={data.bottomRow} />
            </div>
          </FooterAccordionItem>

          <div className="pt-4">
            <FooterContactCard contactInfo={data.contactInfo} />
          </div>
          <div className="mt-4 border-t border-white/20 pt-4">
            <ContactFormMini />
          </div>
        </div>

        {/* أ¢â€‌â‚¬أ¢â€‌â‚¬ Desktop Grid أ¢â€‌â‚¬أ¢â€‌â‚¬ */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-5 gap-4">
            <div>
              <Logo src={logoUrl} alt="Logo" />
              <p className="mt-4 text-xs leading-normal font-normal text-white">{data.contactInfo.stayInTouchText}</p>
              <div className="mt-2 flex">
                {socialIcons.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    aria-label={s.label}
                    className="pr-2 transition-opacity hover:opacity-80 dark:hover:text-white"
                  >
                    <Image
                      alt={s.label}
                      width={24}
                      height={24}
                      src={getSocialIconUrl(s.platform)}
                      unoptimized
                    />
                  </a>
                ))}
              </div>
              <FooterContactCard contactInfo={data.contactInfo} />
            </div>

            {data.columns.slice(1).map((col, index) => (
              <FooterColumn
                key={col.id}
                column={col}
                cookieSettingsLabel={
                  index === 0 ? data.cookieSettingsLabel : undefined
                }
              />
            ))}
          </div>

          <div className="flex justify-end">
            <FooterBottomRow data={data.bottomRow} />
          </div>
        </div>

        <div className="mt-6 border-t border-white/20 pt-4">
          <ContactFormMini />
        </div>
      </div>
    </footer>
  );
}
