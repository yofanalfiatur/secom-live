import AboutBanner from "@/components/Fragments/About/AbBanner";
import AboutCertificate from "@/components/Fragments/About/AbCertif";
import AboutLocation from "@/components/Fragments/About/AbLocation";
import AboutStory from "@/components/Fragments/About/AbStory";
import AboutTeam from "@/components/Fragments/About/AbTeam";
import AboutTrusted from "@/components/Fragments/About/AbTrusted";
import AboutWhy from "@/components/Fragments/About/AbWhy";
import React from "react";
import { getStructuredPageData } from "@/utils/page-data";
import SecDetailSlider from "@/components/Fragments/Sector-Detail/SecDetailSlider";

export default async function AboutPage({ params }) {
  const { locale } = await params;

  const { sections } = await getStructuredPageData(
    "about-secom-indonesia",
    locale
  );

  const bannerData = sections.about_banner || {};
  const storyData = sections.about_story_and_purpose || {};
  const whyData = sections.about_why_secom || {};
  const workDataNew = {
    title: sections.about_how_we_work?.title,
    items:
      sections.about_how_we_work?.slides.map((slide) => ({
        image: slide.logo,
        title: slide.title,
        desc: slide.description,
      })) || [],
  };

  const certifData = sections.about_award || {};

  const teamData = sections.about_teams || {};
  const locationData = sections.about_locations || {};

  const logoTrustedData = sections.about_trusted_by || [];

  return (
    <>
      <AboutBanner dataSection={bannerData} />
      <AboutStory dataSection={storyData} />
      <AboutWhy dataSection={whyData} />
      <SecDetailSlider dataSection={workDataNew} numbering={true} />
      <AboutCertificate dataSection={certifData} />
      <AboutTeam dataSection={teamData} />
      <AboutLocation dataSection={locationData} />
      <AboutTrusted dataSection={logoTrustedData} />
    </>
  );
}
