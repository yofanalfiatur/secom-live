import HeaderAdditional from "@/components/Fragments/Header/HeaderAdditional";
import { apiFetch, getPosts } from "@/libs/api";

async function getMenuData(type, locale, urlPage) {
  const response = await getPosts(type);
  const responsePage = await apiFetch(`/resource?url=${urlPage}`);
  const identifierPage = responsePage?.data.url?.[locale] || "";
  const items = response.data || [];
  return items.map((item) => {
    const translation = item.translations[locale] || item.translations.id;
    return {
      id: item.id,
      text: translation.title,
      href: `/${identifierPage}/${item.url?.[locale]}`,
    };
  });
}

async function getProductsData(locale, urlPage) {
  const responsePage = await apiFetch(`/resource?url=${urlPage}`);
  const identifierPage = responsePage?.data.url?.[locale] || "";
  const response = await getPosts("products");
  const items = response.data || [];
  return items.map((item) => {
    const translation = item.translations[locale] || item.translations.id;
    return {
      id: item.id,
      text: translation.title,
      href: `/${identifierPage}/${item.url?.[locale]}`,
      type: item.type, // Hanya products yang punya type
    };
  });
}

export default async function HeaderList({ locale }) {
  const [productsData, sectorsData, servicesData] = await Promise.all([
    getProductsData(locale, "product"), // Function khusus untuk products
    getMenuData("sectors", locale, "sector"),
    getMenuData("services", locale, "service"),
  ]);

  const responseSectorOverview = await apiFetch(`/resource?url=sector`);
  const linkSectorOverview = responseSectorOverview?.data.url?.[locale] || "";

  const responseSolutionOverview = await apiFetch(`/resource?url=solution`);
  const linkSolutionOverview =
    responseSolutionOverview?.data.url?.[locale] || "";

  return (
    <HeaderAdditional
      menuProducts={productsData}
      menuSectors={sectorsData}
      menuServices={servicesData}
      linkSectorOverview={linkSectorOverview}
      linkSolutionOverview={linkSolutionOverview}
    />
  );
}
