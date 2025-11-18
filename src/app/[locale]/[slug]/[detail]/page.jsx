import { apiFetch } from "@/libs/api";
import NotFound from "../../not-found";
import SectorDetailPage from "@/components/Pages/Single/DetailSector";
import ProductDetail from "@/components/Pages/Single/DetailProduct";
import ServiceDetailPage from "@/components/Pages/Single/DetailService";
import CareerDetailPage from "@/components/Pages/Single/Vacancies";
import { generateDynamicMetadata } from "@/utils/metadata";

export async function generateMetadata({ params }) {
  const { slug, detail, locale } = await params;

  // Fetch resource data untuk metadata
  let resourceData = null;
  try {
    const response = await apiFetch(
      `/resource?url=${slug}&single_page=${detail}`
    );
    resourceData = response?.data;
  } catch (error) {
    console.error("❌ Failed to fetch resource for metadata:", error);
    return {};
  }

  // Jika ada resource data dan type page, generate metadata
  if (resourceData && resourceData.type === "sector") {
    return generateDynamicMetadata("sectors", detail, locale, "banner_image");
  } else if (resourceData && resourceData.type === "product") {
    return generateDynamicMetadata("products", detail, locale, "image");
  } else if (resourceData && resourceData.type === "service") {
    return generateDynamicMetadata("services", detail, locale, "banner_image");
  }
  // else if (resourceData && resourceData.type === "career") {
  //   return generateDynamicMetadata("vacancies", detail, locale, null);
  // }

  // Fallback metadata
  return {
    title: "SECOM Indonesia",
    description: "SECOM Indonesia",
  };
}

export default async function DynamicDetail({ params }) {
  const { slug, detail, locale } = await params;

  let resourceData = null;

  try {
    const response = await apiFetch(
      `/resource?url=${slug}&single_page=${detail}`
    );
    resourceData = response?.data;
  } catch (error) {
    console.error(
      "❌ Failed to fetch resource for dynamic detail page:",
      error
    );
  }

  // Handle jika data tidak ditemukan
  if (!resourceData) {
    return <NotFound />;
  }

  const { type } = resourceData;

  const responseContactUs = await apiFetch(`/resource?url=contact-us`);
  const urlContactUs = responseContactUs?.data.url?.[locale];

  const responseSolution = await apiFetch(`/resource?url=solution`);
  const urlSolution = responseSolution?.data.url?.[locale];

  const responseProduct = await apiFetch(`/resource?url=product`);
  const urlProduct = responseProduct?.data.url?.[locale];

  if (type === "sector") {
    return (
      <SectorDetailPage params={{ locale, detail, urlProduct, urlSolution }} />
    );
  } else if (type === "product") {
    return <ProductDetail params={{ locale, detail, urlContactUs }} />;
  } else if (type === "service") {
    return <ServiceDetailPage params={{ locale, detail, urlContactUs }} />;
  } else if (type === "career") {
    return <CareerDetailPage params={{ locale, detail }} />;
  } else {
    return <NotFound />;
  }
}
