import { getTranslations } from "next-intl/server";
import FooterTop from "@/components/Fragments/Footer/FooterTop";
import FooterMiddle from "@/components/Fragments/Footer/FooterMiddle";
import FooterBottom from "@/components/Fragments/Footer/FooterBottom";
import Starfield from "@/components/Elements/Starfield";
import { getPosts } from "@/libs/api";

export default async function Footer(props) {
  const params = await props.params;
  const locale = params.locale;

  const responseListWebsite = await getPosts("representatives");
  const listWebsite = responseListWebsite?.data || [];

  const responseGeneral = await getPosts("settings");
  const listSocmed = responseGeneral?.data.social || [];

  const generalData = responseGeneral?.data.general || [];

  const logoData = responseGeneral?.data.footer?.logo || [];
  const footerLogo =
    logoData.length > 0
      ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${logoData[0]}`
      : "/img/secom-logo.png";

  const prefooterData = {
    title: responseGeneral?.data.footer?.title?.[locale] || "",
    description: responseGeneral?.data.footer?.description?.[locale] || "",
    buttonText: responseGeneral?.data.footer?.button_text?.[locale] || "",
    buttonLink: responseGeneral?.data.footer?.button_link || "",
  };

  const t = await getTranslations();
  const FooterContent = t.raw("FooterContent");
  const FooterMenu = t.raw("FooterMenu");

  return (
    <footer className="max-w-screen items-center justify-center flex flex-col bg-[#00529c] footer overflow-hidden relative z-0">
      <div className="radial one"></div>
      <div className="radial two"></div>
      <div className="radial three"></div>
      <Starfield />

      <FooterTop
        FooterContent={FooterContent}
        shouldHideFooterTop={false}
        prefooterData={prefooterData}
      />
      <FooterMiddle
        FooterContent={FooterContent}
        FooterMenu={FooterMenu}
        FooterSocMed={listSocmed}
        GeneralData={generalData}
        LogoData={footerLogo}
      />
      <FooterBottom dataWebsite={listWebsite} />
    </footer>
  );
}
