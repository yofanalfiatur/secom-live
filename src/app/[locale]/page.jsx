import FloatButton from "@/components/Elements/FloatButton";
import HomeAbout from "@/components/Fragments/Home/HAbout";
import HomeBanner from "@/components/Fragments/Home/HBanner";
import HomeSegment from "@/components/Fragments/Home/HSegment";
import HomeValue from "@/components/Fragments/Home/HValue";
import { generatePageMetadata } from "@/utils/metadata";
import { getStructuredPageData } from "@/utils/page-data";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generatePageMetadata("homepage", locale, "home_about.image_small");
}

export default async function HomePage({ params }) {
  const { locale } = await params;

  try {
    const { sections } = await getStructuredPageData("homepage", locale);

    const bannerData = Object.values(sections.home_banner?.slides || []);
    const valueData = sections.home_value || {};
    const segmentData = sections.home_segmen || {};
    const aboutData = sections.home_about || {};

    return (
      <>
        <HomeBanner dataSection={bannerData} />
        <HomeValue dataSection={valueData} />
        <HomeSegment dataSection={segmentData} />
        <HomeAbout dataSection={aboutData} />
      </>
    );
  } catch (error) {
    console.error("Error loading homepage:", error);
    return (
      <div className="p-8 text-center">
        <p>Error loading homepage content</p>
      </div>
    );
  }
}
