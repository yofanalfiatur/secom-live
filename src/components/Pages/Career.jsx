import CareerBanner from "@/components/Fragments/Career/CareerBanner";
import CareerCard from "@/components/Fragments/Career/CareerCard";
import CareerVacancies from "@/components/Fragments/Career/CareerVacancies";
import { getStructuredPageData, getSectionData } from "@/utils/page-data";
import { getPosts } from "@/libs/api";

export default async function CareerPage({ params }) {
  const { locale } = await params;

  try {
    // Fetch data secara paralel
    const [pageData, vacanciesData] = await Promise.all([
      getStructuredPageData("career", locale),
      getPosts("vacancies"),
    ]);

    const { sections } = pageData;

    // Process vacancies data
    const vacanciesByLocale = vacanciesData.data?.[locale] || [];
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

    // Process page sections
    const bannerData = getSectionData(sections, "career_banner");
    const cardData = getSectionData(sections, "career_benefit");
    const vacanciesSectionData = getSectionData(sections, "career_vacancies");

    return (
      <>
        <CareerBanner dataSection={bannerData} />
        <CareerCard dataSection={cardData} />
        <CareerVacancies
          dataSection={vacanciesSectionData}
          listVacancies={listVacanciesData}
        />
      </>
    );
  } catch (error) {
    console.error("Error loading career page:", error);
    return (
      <div className="p-8 text-center">
        <p>Error loading career page content</p>
      </div>
    );
  }
}
