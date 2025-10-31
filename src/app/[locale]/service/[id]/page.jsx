import AmFAQ from "@/components/Fragments/Alarm/AmFAQ";
import HowWeWork from "@/components/Fragments/Global/HowWeWork";
import OverviewGlobal from "@/components/Fragments/Global/OverviewGlobal";
import SolDtHighlight from "@/components/Fragments/Solution-Detail/SolDtHighlight";
import { notFound } from "next/navigation";
import { generateDynamicMetadata } from "@/utils/metadata";
import { getStructuredPostData } from "@/utils/page-data";
import BannerClipText from "@/components/Fragments/Global/BannerClipText";
import HeaderList from "@/components/Fragments/Header/HeaderList";

export async function generateMetadata({ params }) {
  const { id, locale } = await params;
  return generateDynamicMetadata("services", id, locale, "banner_image");
}

export default async function ServiceDetailPage({ params }) {
  const { id, locale } = await params;

  try {
    const { data: serviceData } = await getStructuredPostData(
      "services",
      id,
      locale
    );

    // mapping component
    const bannerData = {
      title: serviceData.banner_title,
      image: serviceData.banner_image,
      imageMd: serviceData.banner_image,
    };

    const overviewData = {
      desc: serviceData.overview_description,
      items: null,
    };

    const reasonData = {
      title: serviceData.why_choose_title_section,
      items: serviceData.why_choose_slides,
    };

    const highlightData = {
      title: serviceData.highlight_title_section,
      desc: serviceData.highlight_description_section,
      cards: serviceData.highlight_cards,
      cta: null,
    };

    const faqData = {
      title: serviceData.faq_title_section,
      desc: serviceData.faq_description_section,
      items: serviceData.faq_accordions,
    };

    return (
      <>
        <HeaderList locale={locale} />
        <BannerClipText dataSection={bannerData} />
        <OverviewGlobal dataSection={overviewData} />
        <HowWeWork dataSection={reasonData} />
        <SolDtHighlight dataSection={highlightData} />
        <AmFAQ dataSection={faqData} />
      </>
    );
  } catch (error) {
    console.error("Error loading service detail:", error);
    notFound();
  }
}
