import HeaderAdditional from "@/components/Fragments/Header/HeaderAdditional";
import { getPosts } from "@/libs/api";

async function getMenuData(type, locale, prefix = "") {
  const response = await getPosts(type);

  // if no data, return empty array
  const items = Array.isArray(response?.data) ? response.data : [];

  return items.map((item) => ({
    id: item.id,
    text:
      item.translations?.[locale]?.title ||
      item.translations?.id?.title ||
      "No Title",
    href: `/${prefix}${item.slug}`,
  }));
}

export default async function HeaderList({ locale }) {
  const [productsData, sectorsData, servicesData] = await Promise.all([
    getMenuData("products", locale, "product/"),
    getMenuData("sectors", locale, "sector/"),
    getMenuData("services", locale, "service/"),
  ]);

  return (
    <HeaderAdditional
      menuProducts={productsData}
      menuSectors={sectorsData}
      menuServices={servicesData}
    />
  );
}
