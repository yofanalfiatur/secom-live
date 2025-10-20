import AmFAQ from "@/components/Fragments/Alarm/AmFAQ";
import HowWeWork from "@/components/Fragments/Global/HowWeWork";
import OverviewGlobal from "@/components/Fragments/Global/OverviewGlobal";
import SolDtHighlight from "@/components/Fragments/Solution-Detail/SolDtHighlight";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/libs/api";
import BannerClipText from "@/components/Fragments/Global/BannerClipText";

export default async function ServiceDetailPage({ params }) {
  const { id, locale } = await params;

  // fetch data based on slug
  const response = await getPostBySlug("services", id);
  if (!response || !response.data) return notFound();

  const serviceData = response.data;
  const translationData =
    serviceData.translations?.[locale] || serviceData.translations?.id;

  if (!translationData) return notFound();

  // mapping component
  const bannerData = {
    title: translationData.banner_title,
    image: translationData.banner_image,
    imageMd: translationData.banner_image,
  };

  const overviewData = {
    desc: translationData.overview_description,
    items: null,
  };

  const reasonData = {
    title: translationData.why_choose_title_section,
    items: translationData.why_choose_slides,
  };

  const highlightData = {
    title: translationData.highlight_title_section,
    desc: translationData.highlight_description_section,
    cards: translationData.highlight_cards,
    cta: null,
  };

  const faqData = {
    title: translationData.faq_title_section,
    desc: translationData.faq_description_section,
    items: translationData.faq_accordions,
  };

  return (
    <>
      <BannerClipText dataSection={bannerData} />

      <OverviewGlobal dataSection={overviewData} />
      <HowWeWork dataSection={reasonData} />
      <SolDtHighlight dataSection={highlightData} />
      <AmFAQ dataSection={faqData} />
    </>
  );
}

// export async function generateStaticParams() {
//   const res = await getPosts("services");
//   const data = res.data || [];

//   return data.map((item) => ({
//     id: item.slug,
//   }));
// }
