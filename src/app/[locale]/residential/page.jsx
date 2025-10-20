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
import { getPageData } from "@/libs/api";

export default async function ResidentialPage(props) {
  const params = await props.params;
  const locale = params.locale;

  // Ambil data halaman dari API
  const response = await getPageData("residential");
  const pageData = response.data[locale];

  // Mapping section agar mudah diakses berdasarkan nama component
  const sections = pageData.sections.reduce((acc, section) => {
    acc[section.component] = section.fields;
    return acc;
  }, {});

  const bannerData = sections.residential_banner || {};
  const surveyData = sections.residential_short_survey || {};
  const aboutData = sections.residential_how_secom_protects || {};
  const solutionData = sections.residential_solutions || {};
  const testiData = sections.residential_testimonial || {};
  const quoteData = sections.residential_testimonial_2?.cards || {};

  return (
    <>
      <ResBannerImage dataSection={bannerData} />
      {/* <ResBanner /> */}
      <ResSurvey dataSection={surveyData} />
      <ResAbout dataSection={aboutData} />
      <ResSolution dataSection={solutionData} />
      <ResTesti dataSection={testiData} />
      <ResQuote dataSection={quoteData} />
      {/* <ResPromotion /> */}
      {/* <PromotionDeals /> */}
      <FloatButton />
    </>
  );
}
