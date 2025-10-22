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

export default async function AboutPage(props) {
  const params = await props.params;
  const locale = params.locale;

  // Ambil data halaman dari API
  const response = await getPageData("about-secom-indonesia");
  const pageData = response.data[locale];

  // Mapping section agar mudah diakses berdasarkan nama component
  const sections = pageData.sections.reduce((acc, section) => {
    acc[section.component] = section.fields;
    return acc;
  }, {});

  // Ambil tiap data section sesuai komponennya
  const bannerData = sections.about_banner || {};
  const storyData = sections.about_story_and_purpose || {};
  const whyData = sections.about_why_secom || {};
  const workData = sections.about_how_we_work || {};
  const certifData = sections.about_award || {};

  const teamData = sections.about_teams || {};
  const locationData = sections.about_locations || {};

  // ambil data dari posts Representative
  const responseCertif = await getPosts("awards");
  // temp
  const listCertif = responseCertif.data || [];

  // ambil data dari posts Representative
  const responseLogoTrustedBy = await getPosts("settings");
  // temp
  const logoTrustedData = responseLogoTrustedBy.data.logo || [];

  return (
    <>
      <AboutBanner dataSection={bannerData} />
      <AboutStory dataSection={storyData} />
      <AboutWhy dataSection={whyData} />
      <AboutWork dataSection={workData} />
      <AboutCertificate dataSection={certifData} />
      <AboutTeam dataSection={teamData} />
      <AboutLocation dataSection={locationData} />
      <AboutTrusted dataSection={logoTrustedData} />
    </>
  );
}
