import BannerBasic from "@/components/Fragments/Global/BannerBasic";
import HeaderList from "@/components/Fragments/Header/HeaderList";
import SolProduct from "@/components/Fragments/Solutions/SolProduct";
import SolServices from "@/components/Fragments/Solutions/SolServices";
import { getPageData, getPosts } from "@/libs/api";
import React from "react";

export default async function SolutionsLP(props) {
  const { locale } = await props.params;

  // Ambil data halaman dari API
  const response = await getPageData("solution");
  const pageData = response.data[locale];

  // Mapping section agar mudah diakses berdasarkan nama component
  const sections = pageData.sections.reduce((acc, section) => {
    acc[section.component] = section.fields;
    return acc;
  }, {});

  // ambil data dari posts Representative
  const responseService = await getPosts("services");
  // temp
  const listService = responseService.data || [];

  // Ambil tiap data section sesuai komponennya
  const bannerData = sections.solution_banner || {};
  const servicesData = sections.solution_service || {};
  const productsData = sections.solution_list_product || {};

  return (
    <>
      <HeaderList locale={locale} />
      <BannerBasic dataSection={bannerData} />
      <SolServices dataSection={servicesData} listService={listService} />
      <SolProduct dataSection={productsData} listProducts="ProductDetails" />
    </>
  );
}
