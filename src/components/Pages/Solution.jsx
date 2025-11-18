import BannerBasic from "@/components/Fragments/Global/BannerBasic";
import HeaderList from "@/components/Fragments/Header/HeaderList";
import SolProduct from "@/components/Fragments/Solutions/SolProduct";
import SolServices from "@/components/Fragments/Solutions/SolServices";
import { getStructuredPageData, getSectionData } from "@/utils/page-data";
import { apiFetch, getPosts } from "@/libs/api";

export default async function SolutionsPage({ params, searchParams }) {
  const { locale } = await params;
  const sector = searchParams?.sector || null;

  try {
    // Fetch data secara paralel
    const [pageData, servicesData] = await Promise.all([
      getStructuredPageData("solution", locale),
      getPosts("services"),
    ]);

    const { sections } = pageData;

    const responseBhayangkara = await apiFetch(
      `/resource?url=about-us-bhayangkara`
    );
    const urlBhayangkara = responseBhayangkara?.data.url?.[locale];

    const responseService = await apiFetch(`/resource?url=service`);
    const urlService = responseService?.data.url?.[locale];

    const responseProduct = await apiFetch(`/resource?url=product`);
    const urlProduct = responseProduct?.data.url?.[locale];

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
          urlBhayangkara={urlBhayangkara}
          urlService={urlService}
        />
        <SolProduct
          dataSection={productsData}
          defaultSector={sector}
          urlProduct={urlProduct}
        />
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
