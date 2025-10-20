import HeaderAdditional from "@/components/Fragments/Header/HeaderAdditional";
import { getPosts } from "@/libs/api";

async function getMenuData(type, locale, prefix = "") {
  const response = await getPosts(type);
  const items = response.data || [];
  return items.map((item) => {
    const translation = item.translations[locale] || item.translations.id;
    return {
      id: item.id,
      text: translation.title,
      href: `/${prefix}${item.slug}`,
    };
  });
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
