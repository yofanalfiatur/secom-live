import BannerBasic from "@/components/Fragments/Global/BannerBasic";
import HeaderList from "@/components/Fragments/Header/HeaderList";
import ResTesti from "@/components/Fragments/Residential/R-Testimonial";
import SectorList from "@/components/Fragments/Sector/StList";
import { getPageData, getPosts } from "@/libs/api";
import React from "react";

export default async function SectorLanding(props) {
  const { locale } = await props.params;

  // Ambil data halaman dari API
  const response = await getPageData("sector");
  const pageData = response.data[locale];

  // Mapping section agar mudah diakses berdasarkan nama component
  const sections = pageData.sections.reduce((acc, section) => {
    acc[section.component] = section.fields;
    return acc;
  }, {});

  const bannerData = sections.sector_banner || {};

  // Normalisasi field agar BannerBasic tidak error
  bannerData.background_image_desktop =
    bannerData.background_image_desktop || bannerData.background_image || "";
  bannerData.background_image_mobile =
    bannerData.background_image_mobile || bannerData.background_image || "";

  const testiData = sections.sector_client_story || {};
  const sectorListSection = sections.sector_security_across_all_sectors || {};

  // Ambil data dari posts sectors
  const responseSector = await getPosts("sectors");
  const sectorsDataRaw = responseSector.data || [];

  // Map ke struktur yang sesuai untuk komponen
  const sectorsData = sectorsDataRaw.map((item) => {
    const translation = item.translations[locale] || item.translations.id;
    return {
      id: item.id,
      title: translation.title,
      desc: translation.description || "",
      image: `${process.env.NEXT_PUBLIC_STORAGE_URL + translation.image}`,
      link: `/sector/${translation.slug}`,
    };
  });

  return (
    <>
      <HeaderList locale={locale} />

      <BannerBasic dataSection={bannerData} />
      <SectorList dataSection={sectorListSection} listSectors={sectorsData} />
      <ResTesti dataSection={testiData} />
    </>
  );
}
