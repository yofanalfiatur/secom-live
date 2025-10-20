import CareerBanner from "@/components/Fragments/Career/CareerBanner";
import CareerCard from "@/components/Fragments/Career/CareerCard";
import CareerVacancies from "@/components/Fragments/Career/CareerVacancies";
import { getPageData, getPosts } from "@/libs/api";
import React from "react";

export default async function Career(props) {
  const params = await props.params;
  const locale = params.locale;

  // Ambil data halaman dari API
  const response = await getPageData("career");
  const pageData = response.data[locale];

  // Mapping section agar mudah diakses berdasarkan nama component
  const sections = pageData.sections.reduce((acc, section) => {
    acc[section.component] = section.fields;
    return acc;
  }, {});

  const responsePin = await getPosts("vacancies");
  const vacanciesByLocale = responsePin.data?.[locale] || [];

  const listVacanciesData = vacanciesByLocale.map((item) => {
    const textOnly = item.description.replace(/<[^>]+>/g, "");
    const words = textOnly.split(/\s+/);
    const shortDesc =
      words.length > 30 ? words.slice(0, 30).join(" ") + "..." : textOnly;

    return {
      title: item.title,
      slug: item.slug,
      location: item.location,
      type: item.type,
      shortDesc: shortDesc,
    };
  });

  const bannerData = sections.career_banner || {};
  const cardData = sections.career_benefit || {};
  const vacanciesData = sections.career_vacancies || {};

  return (
    <>
      <CareerBanner dataSection={bannerData} />
      <CareerCard dataSection={cardData} />
      <CareerVacancies
        dataSection={vacanciesData}
        listVacancies={listVacanciesData}
      />
    </>
  );
}
