import Image from "next/image";
import { footerService } from "../../services/footerService";
import Logo from "@/components/ui/Logo";
import FooterColumn from "./FooterColumn";
import FooterBottomRow from "./FooterBottomRow";
import FooterContactCard from "./FooterContactCard";
import FooterAccordion from "./FooterAccordion";
import FooterAccordionItem from "./FooterAccordionItem";


interface FooterProps {
  params: Promise<{ locale: string }>;
}

const socialIconUrls: Record<string, string> = {
  facebook:
    "https://cdnprod.mafretailproxy.com/assets/images/Facebook_0ddadaef3b_ea343675c7.svg",
  twitter:
    "https://cdnprod.mafretailproxy.com/assets/images/Twitter_44f3c5fb21_8a3f98290d.svg",
  instagram:
    "https://cdnprod.mafretailproxy.com/assets/images/Instagram_88847d8ba3_d534f2d78f.svg",
  youtube:
    "https://cdnprod.mafretailproxy.com/assets/images/Youtube_9cc9f992ab_ad97908e18.svg",
};

export default async function Footer({ params }: FooterProps) {
  const { locale } = await params;
  const data = await footerService.getFooter(locale);

  return (
    <footer className="bg-primary text-white hidden lg:block">
      <div className="px-4 py-6 md:px-10">
        {/* ── Mobile Accordion ── */}
        <div className="lg:hidden">
          <div className="border-b border-white pb-4">
              <Logo src="/Meem-logox-white.png" alt="Kareem Shop" />
            <p className="mt-4 text-xs leading-normal font-normal text-white">{data.contactInfo.stayInTouchText}</p>
            <div className="mt-2 flex">
              {data.socialLinks.map((s) => (
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
                    src={socialIconUrls[s.platform]}
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
        </div>

        {/* ── Desktop Grid ── */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-5 gap-4">
            <div>
              <Logo src="/Meem-logox-white.png" alt="Kareem Shop" />
              <p className="mt-4 text-xs leading-normal font-normal text-white">{data.contactInfo.stayInTouchText}</p>
              <div className="mt-2 flex">
                {data.socialLinks.map((s) => (
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
                      src={socialIconUrls[s.platform]}
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
      </div>
    </footer>
  );
}
