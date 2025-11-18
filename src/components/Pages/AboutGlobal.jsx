import AbWorldCard from "@/components/Fragments/AbWorld/AbWorldCard";
import AbWorldSustain from "@/components/Fragments/AbWorld/AbWorldSustain";
import AbWorldBanner from "@/components/Fragments/AbWorld/AbWorldBanner";
import AbWorldMap from "@/components/Fragments/AbWorld/AbWorldMap";
import AbWorldRnD from "@/components/Fragments/AbWorld/AbWorldRnD";
import AbWorldStory from "@/components/Fragments/AbWorld/AbWorldStory";
import { getStructuredPageData, getSectionData } from "@/utils/page-data";
import { getPosts } from "@/libs/api";

export default async function AboutWorldPage({ params }) {
  const { locale } = await params;

  try {
    // Ambil data halaman utama
    const { sections } = await getStructuredPageData(
      "about-secom-world",
      locale
    );

    // Ambil data representatives (data tambahan)
    const responsePin = await getPosts("representatives");
    const pinData = responsePin.data || [];

    const pinMap = pinData.map((item) => ({
      text: item.name,
      href: item.url,
      flag: item.country?.flag,
      top: `${item.position_y}%`,
      left: `${item.position_x}%`,
    }));

    // Ambil tiap data section
    const bannerData = getSectionData(sections, "about_world_banner");
    const storyData = getSectionData(sections, "about_world_brief_story");
    const mapData = getSectionData(sections, "about_world_our_global_presence");
    const rndData = getSectionData(sections, "about_world_rnd");
    const sustainData = getSectionData(sections, "about_world_sustainability");
    const cardData = getSectionData(sections, "about_world_cards");

    return (
      <>
        <AbWorldBanner dataSection={bannerData} />
        <AbWorldStory dataSection={storyData} />
        <AbWorldMap dataSection={mapData} pinMap={pinMap} />
        <AbWorldRnD dataSection={rndData} />
        <AbWorldSustain dataSection={sustainData} />
        <AbWorldCard dataSection={cardData} />
      </>
    );
  } catch (error) {
    console.error("Error loading about world page:", error);
    return (
      <div className="p-8 text-center">
        <p>Error loading about world page content</p>
      </div>
    );
  }
}
