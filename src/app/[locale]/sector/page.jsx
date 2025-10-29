import BannerBasic from "@/components/Fragments/Global/BannerBasic";
import HeaderList from "@/components/Fragments/Header/HeaderList";
import ResTesti from "@/components/Fragments/Residential/R-Testimonial";
import SectorList from "@/components/Fragments/Sector/StList";
import { generatePageMetadata } from "@/utils/metadata";
import { getStructuredPageData, getSectionData } from "@/utils/page-data";
import { getPosts } from "@/libs/api";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generatePageMetadata(
    "sector",
    locale,
    "sector_banner.background_image_desktop"
  );
}

export default async function SectorLanding({ params }) {
  const { locale } = await params;

  try {
    // Fetch data secara paralel
    const [pageData, sectorsData] = await Promise.all([
      getStructuredPageData("sector", locale),
      getPosts("sectors"),
    ]);

    const { sections } = pageData;

    // Process page sections
    const bannerData = getSectionData(sections, "sector_banner");
    const testiData = getSectionData(sections, "sector_client_story");
    const sectorListSection = getSectionData(
      sections,
      "sector_security_across_all_sectors"
    );

    // Normalisasi field agar BannerBasic tidak error
    const normalizedBannerData = {
      ...bannerData,
      background_image_desktop:
        bannerData.background_image_desktop ||
        bannerData.background_image ||
        "",
      background_image_mobile:
        bannerData.background_image_mobile || bannerData.background_image || "",
    };

    // Process sectors data
    const sectorsDataRaw = sectorsData.data || [];
    const sectorsList = sectorsDataRaw.map((item) => {
      const translation =
        item.translations?.[locale] || item.translations?.id || {};
      return {
        id: item.id,
        title: translation.title || "",
        desc: translation.description || "",
        image: translation.image
          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${translation.image}`
          : "",
        link: `/sector/${translation.slug || item.slug}`,
      };
    });

    return (
      <>
        <HeaderList locale={locale} />
        <BannerBasic dataSection={normalizedBannerData} />
        <SectorList dataSection={sectorListSection} listSectors={sectorsList} />
        <ResTesti dataSection={testiData} />
      </>
    );
  } catch (error) {
    console.error("Error loading sector landing page:", error);
    return (
      <div className="p-8 text-center">
        <p>Error loading sector landing page content</p>
      </div>
    );
  }
}
