import BannerBasic from "@/components/Fragments/Global/BannerBasic";
import HeaderList from "@/components/Fragments/Header/HeaderList";
import SolProduct from "@/components/Fragments/Solutions/SolProduct";
import SolServices from "@/components/Fragments/Solutions/SolServices";
import { generatePageMetadata } from "@/utils/metadata";
import { getStructuredPageData, getSectionData } from "@/utils/page-data";
import { getPosts } from "@/libs/api";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generatePageMetadata("solution", locale, "solution_banner.image");
}

export default async function SolutionsLP({ params, searchParams }) {
  const { locale } = await params;
  const sector = searchParams?.sector || null;

  try {
    // Fetch data secara paralel
    const [pageData, servicesData] = await Promise.all([
      getStructuredPageData("solution", locale),
      getPosts("services"),
    ]);

    const { sections } = pageData;

    // Process data
    const listService = servicesData.data || [];
    const bannerData = getSectionData(sections, "solution_banner");
    const servicesSectionData = getSectionData(sections, "solution_service");
    const productsData = getSectionData(sections, "solution_list_product");

    return (
      <>
        <HeaderList locale={locale} />
        <BannerBasic dataSection={bannerData} />
        <SolServices
          dataSection={servicesSectionData}
          listService={listService}
        />
        <SolProduct dataSection={productsData} defaultSector={sector} />
      </>
    );
  } catch (error) {
    console.error("Error loading solutions page:", error);
    return (
      <div className="p-8 text-center">
        <p>Error loading solutions page content</p>
      </div>
    );
  }
}
