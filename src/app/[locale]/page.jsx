import FloatButton from "@/components/Elements/FloatButton";
import HomeAbout from "@/components/Fragments/Home/HAbout";
import HomeBanner from "@/components/Fragments/Home/HBanner";
import HomeSegment from "@/components/Fragments/Home/HSegment";
import HomeValue from "@/components/Fragments/Home/HValue";
import React from "react";
import { getPageData } from "@/libs/api";

export default async function HomePage(props) {
  const params = await props.params;
  const locale = params.locale;

  const response = await getPageData("homepage");
  const pageData = response.data?.[locale] || response.data?.id;

  if (!pageData || !pageData.sections) {
    console.error("Invalid page data:", response);
    return <div>Error loading page content</div>;
  }

  const sections = pageData.sections.reduce((acc, section) => {
    acc[section.component] = section.fields;
    return acc;
  }, {});

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
      <FloatButton />
    </>
  );
}
