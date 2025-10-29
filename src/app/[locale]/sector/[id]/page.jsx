import BannerClipText from "@/components/Fragments/Global/BannerClipText";
import OverviewGlobal from "@/components/Fragments/Global/OverviewGlobal";
import HeaderList from "@/components/Fragments/Header/HeaderList";
import SecDetailCard from "@/components/Fragments/Sector-Detail/SecDetailCard";
import SecDetailSlider from "@/components/Fragments/Sector-Detail/SecDetailSlider";
import { generateDynamicMetadata } from "@/utils/metadata";
import { getStructuredPostData } from "@/utils/page-data";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id, locale } = await params;

  return generateDynamicMetadata("sectors", id, locale, "banner_image");
}

export default async function SectorDetailPage({ params }) {
  const { id, locale } = await params;

  try {
    const { data: sectorData, rawData } = await getStructuredPostData(
      "sectors",
      id,
      locale
    );

    // mapping component
    const bannerData = {
      title: sectorData.banner_title,
      image: sectorData.banner_image,
      imageMd: sectorData.banner_image,
    };

    const overviewData = {
      desc: sectorData.overview,
      items: null,
    };

    const sliderData = {
      title: sectorData.challenges_title_section,
      items: sectorData.challenges,
    };

    const products =
      sectorData.products?.map((item) => ({
        title: item.title,
        description: item.description,
        image: item.image,
        url: `/product/${item.slug}`,
        is_highlighted: item.is_highlighted,
      })) || [];

    const cardSection = {
      title: sectorData.build_title_section,
      desc: sectorData.build_description_section,
      items: products.filter((product) => product.is_highlighted === "1"),
      ctaTitle:
        locale === "en"
          ? `Protect Your ${sectorData.title} with SECOM`
          : `Lindungi ${sectorData.title} Anda dengan SECOM`,
      ctaImage: sectorData.cta_image,
      ctaLabel: sectorData.cta_button_label,
      ctaUrl: rawData.slug,
    };

    return (
      <>
        <HeaderList locale={locale} />
        <BannerClipText dataSection={bannerData} />
        <OverviewGlobal
          dataSection={overviewData}
          className="lg:!pt-17 !pb-10 lg:!pb-17"
        />
        <SecDetailSlider dataSection={sliderData} />
        <SecDetailCard dataSection={cardSection} />
      </>
    );
  } catch (error) {
    console.error("Error loading sector detail:", error);
    notFound();
  }
}
