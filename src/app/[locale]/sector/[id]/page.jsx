import BannerClipText from "@/components/Fragments/Global/BannerClipText";
import OverviewGlobal from "@/components/Fragments/Global/OverviewGlobal";
import SecDetailCard from "@/components/Fragments/Sector-Detail/SecDetailCard";
import SecDetailSlider from "@/components/Fragments/Sector-Detail/SecDetailSlider";
import { getPostBySlug } from "@/libs/api";
import { notFound } from "next/navigation";

export default async function SectorDetailPage({ params }) {
  const { id, locale } = await params;

  // fetch data based on slug
  const response = await getPostBySlug("sectors", id);
  if (!response || !response.data) return notFound();

  const sectorData = response.data;
  const translationData =
    sectorData.translations?.[locale] || sectorData.translations?.id;

  if (!translationData) return notFound();

  // mapping component
  const bannerData = {
    title: translationData.banner_title,
    image: translationData.banner_image,
    imageMd: translationData.banner_image,
  };
  const overviewData = {
    desc: translationData.overview,
    items: null,
  };
  const sliderData = {
    title: translationData.challenges_title_section,
    items: translationData.challenges,
  };

  const products =
    translationData.products?.map((item) => ({
      title: item.title,
      description: item.description,
      image: item.image,
      url: `/solution?${id}`, // pakai slug sector yang aktif
    })) || [];

  const cardSection = {
    title: translationData.build_title_section,
    desc: translationData.build_description_section,
    items: products,
    ctaTitle: translationData.cta_text,
    ctaImage: translationData.cta_image,
    ctaLabel: translationData.cta_button_label,
    ctaUrl: translationData.cta_button_url,
  };

  return (
    <>
      <BannerClipText dataSection={bannerData} />
      <OverviewGlobal
        dataSection={overviewData}
        className="lg:!pt-17 !pb-10 lg:!pb-17"
      />
      <SecDetailSlider dataSection={sliderData} />
      <SecDetailCard dataSection={cardSection} />
    </>
  );
}
