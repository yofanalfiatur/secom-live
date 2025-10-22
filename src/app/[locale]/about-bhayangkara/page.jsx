import AboutBanner from "@/components/Fragments/About/AbBanner";
import AboutCertificate from "@/components/Fragments/About/AbCertif";
import AboutLocation from "@/components/Fragments/About/AbLocation";
import AboutStory from "@/components/Fragments/About/AbStory";
import AboutTeam from "@/components/Fragments/About/AbTeam";
import AboutTrusted from "@/components/Fragments/About/AbTrusted";
import AboutWhy from "@/components/Fragments/About/AbWhy";
import AboutWork from "@/components/Fragments/About/AbWork";
import { getPageData, getPosts } from "@/libs/api";
import React from "react";

export default async function AboutBhayangkaraPage(props) {
  const params = await props.params;
  const locale = params.locale;

  // Ambil data halaman dari API
  const response = await getPageData("about-us-bhayangkara");
  const pageData = response.data[locale];

  // Mapping section agar mudah diakses berdasarkan nama component
  const sections = pageData.sections.reduce((acc, section) => {
    acc[section.component] = section.fields;
    return acc;
  }, {});

  // Ambil tiap data section sesuai komponennya
  const bannerData = sections.about_bhayangkara_banner || {};
  const storyData = sections.about_bhayangkara_story_and_purpose || {};
  const whyData = sections.about_bhayangkara_why_secom || {};
  const workData = sections.about_bhayangkara_how_we_work || {};
  const certifData = sections.about_bhayangkara_award || {};
  const teamData = sections.about_bhayangkara_teams || {};

  const logoTrustedData = sections.about_bhayangkara_trusted_by || [];

  return (
    <>
      <AboutBanner dataSection={bannerData} />
      <AboutStory dataSection={storyData} />
      <AboutWhy dataSection={whyData} />
      <AboutWork dataSection={workData} />
      <AboutCertificate dataSection={certifData} />
      <AboutTeam dataSection={teamData} />
      <AboutTrusted dataSection={logoTrustedData} />
    </>
  );
}
