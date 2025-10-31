import FloatButton from "@/components/Elements/FloatButton";
// import PromotionDeals from "@/components/Elements/PromotionDeals";
import ResAbout from "@/components/Fragments/Residential/R-About";
import ResBanner from "@/components/Fragments/Residential/R-Banner";
import ResBannerImage from "@/components/Fragments/Residential/R-BannerImage";
import ResPromotion from "@/components/Fragments/Residential/R-Promotion";
import ResQuote from "@/components/Fragments/Residential/R-Quote";
import ResSolution from "@/components/Fragments/Residential/R-Solution";
import ResSurvey from "@/components/Fragments/Residential/R-Survey";
import ResTesti from "@/components/Fragments/Residential/R-Testimonial";
import { generatePageMetadata } from "@/utils/metadata";
import {
  getStructuredPageData,
  getSectionData,
  getArrayData,
} from "@/utils/page-data";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generatePageMetadata(
    "residential",
    locale,
    "residential_banner.image"
  );
}

export default async function ResidentialPage({ params }) {
  const { locale } = await params;

  try {
    const { sections } = await getStructuredPageData("residential", locale);

    // Process page sections
    const bannerData = getSectionData(sections, "residential_banner");
    const surveyData = getSectionData(sections, "residential_short_survey");
    const aboutData = getSectionData(
      sections,
      "residential_how_secom_protects"
    );
    const solutionData = getSectionData(sections, "residential_solutions");
    const testiData = getSectionData(sections, "residential_testimonial");
    const quoteData = getArrayData(
      sections,
      "residential_testimonial_2",
      "cards"
    );

    return (
      <>
        <ResBannerImage dataSection={bannerData} />
        {/* <ResBanner /> */}
        <ResSurvey
          dataSection={surveyData}
          dataDiscover="/product/residential-solutions/"
        />
        <ResAbout dataSection={aboutData} />
        <ResSolution dataSection={solutionData} />
        <ResTesti dataSection={testiData} />
        <ResQuote dataSection={quoteData} />
        {/* <ResPromotion /> */}
        {/* <PromotionDeals /> */}
        <FloatButton />
      </>
    );
  } catch (error) {
    console.error("Error loading residential page:", error);
    return (
      <div className="p-8 text-center">
        <p>Error loading residential page content</p>
      </div>
    );
  }
}
