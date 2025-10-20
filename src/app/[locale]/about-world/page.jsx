import AbWorldCard from "@/components/Fragments/AbWorld/AbWorldCard";
import AbWorldSustain from "@/components/Fragments/AbWorld/AbWorldSustain";
import AbWorldBanner from "@/components/Fragments/AbWorld/AbWorldBanner";
import AbWorldMap from "@/components/Fragments/AbWorld/AbWorldMap";
import AbWorldRnD from "@/components/Fragments/AbWorld/AbWorldRnD";
import AbWorldStory from "@/components/Fragments/AbWorld/AbWorldStory";
import React from "react";
import { getPageData, getPosts } from "@/libs/api";

export default async function AboutWorld(props) {
  const params = await props.params;
  const locale = params.locale;

  // Ambil data halaman dari API
  const response = await getPageData("about-secom-world");
  const pageData = response.data[locale];

  // Mapping section agar mudah diakses berdasarkan nama component
  const sections = pageData.sections.reduce((acc, section) => {
    acc[section.component] = section.fields;
    return acc;
  }, {});

  // ambil data dari posts Representative
  const responsePin = await getPosts("representatives");
  // temp
  const pinData = responsePin.data || [];
  // fix
  // const pinData = responsePin.data[locale] || [];

  const pinMap = pinData.map((item) => ({
    text: item.name,
    href: item.url,
    flag: item.country?.flag,
    top: `${item.position_y}%`,
    left: `${item.position_x}%`,
  }));

  // Ambil tiap data section sesuai komponennya
  const bannerData = sections.about_world_banner || {};
  const storyData = sections.about_world_brief_story || {};
  const mapData = sections.about_world_our_global_presence || {};
  const rndData = sections.about_world_rnd || {};
  const sustainData = sections.about_world_sustainability || {};
  const cardData = sections.about_world_cards || {};

  return (
    <>
      <AbWorldBanner dataSection={bannerData} />
      <AbWorldStory dataSection={storyData} />
      <AbWorldMap dataSection={mapData} pinMap={pinMap} />
      <AbWorldRnD dataSection={rndData} />
      <AbWorldSustain dataSection={sustainData} />
      <AbWorldCard dataSection={cardData} />
    </>
  );
}
