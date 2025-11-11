import AboutBanner from "@/components/Fragments/About/AbBanner";
import AboutCertificate from "@/components/Fragments/About/AbCertif";
import AboutStory from "@/components/Fragments/About/AbStory";
import AboutTeam from "@/components/Fragments/About/AbTeam";
import AboutTrusted from "@/components/Fragments/About/AbTrusted";
import AboutWhy from "@/components/Fragments/About/AbWhy";
import SecDetailSlider from "@/components/Fragments/Sector-Detail/SecDetailSlider";
import { generatePageMetadata } from "@/utils/metadata";
import { getStructuredPageData } from "@/utils/page-data";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generatePageMetadata(
    "about-us-bhayangkara",
    locale,
    "about_bhayangkara_banner.image"
  );
}

export default async function AboutBhayangkaraPage({ params }) {
  const { locale } = await params;

  try {
    const { sections } = await getStructuredPageData(
      "about-us-bhayangkara",
      locale
    );

    // Ambil tiap data section sesuai komponennya
    const bannerData = sections.about_bhayangkara_banner || {};
    const storyData = sections.about_bhayangkara_story_and_purpose || {};
    const whyData = sections.about_bhayangkara_why_secom || {};

    // Transform work data untuk SecDetailSlider
    const workData = {
      title: sections.about_bhayangkara_how_we_work?.title || "",
      items:
        sections.about_bhayangkara_how_we_work?.slides?.map((slide) => ({
          image: slide.logo,
          title: slide.title,
          desc: slide.description,
        })) || [],
    };

    const certifData = sections.about_bhayangkara_award || {};
    const teamData = sections.about_bhayangkara_teams || {};
    const logoTrustedData = sections.about_bhayangkara_trusted_by || [];
    const statusTrustedByData = logoTrustedData.active || {};

    return (
      <>
        <AboutBanner dataSection={bannerData} />
        <AboutStory dataSection={storyData} />
        <AboutWhy dataSection={whyData} />
        <SecDetailSlider dataSection={workData} numbering={true} />
        <AboutCertificate dataSection={certifData} />
        <AboutTeam dataSection={teamData} classWrapper="mb-15 lg:mb-30" />
        {statusTrustedByData === true && (
          <AboutTrusted
            dataSection={logoTrustedData}
            classWrapper="mt-8 lg:mt-15"
          />
        )}
      </>
    );
  } catch (error) {
    console.error("Error loading about bhayangkara page:", error);
    return (
      <div className="p-8 text-center">
        <p>Error loading about bhayangkara page content</p>
      </div>
    );
  }
}
