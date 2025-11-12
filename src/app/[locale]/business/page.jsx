import AboutTrusted from "@/components/Fragments/About/AbTrusted";
import BlpBanner from "@/components/Fragments/BusinessLP/BlpBanner";
import BlpCard from "@/components/Fragments/BusinessLP/BlpCard";
import BlpNews from "@/components/Fragments/BusinessLP/BlpNews";
import ResSurvey from "@/components/Fragments/Residential/R-Survey";
import HeaderList from "@/components/Fragments/Header/HeaderList";
import { generatePageMetadata } from "@/utils/metadata";
import {
  getStructuredPageData,
  getSectionData,
  getArrayData,
} from "@/utils/page-data";
import { getPosts } from "@/libs/api";
import SecDetailSlider from "@/components/Fragments/Sector-Detail/SecDetailSlider";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return generatePageMetadata(
    "business",
    locale,
    "business_banner.slides.0.image"
  );
}

export default async function BusinessPage({ params }) {
  const { locale } = await params;

  try {
    // Fetch data secara paralel
    const [pageData, postsData] = await Promise.all([
      getStructuredPageData("business", locale),
      getPosts("articles?tags=20"),
    ]);

    const { sections } = pageData;

    // Process page sections
    const bannerData = getArrayData(sections, "business_banner", "slides");
    const surveyData = getSectionData(sections, "business_short_survey");
    const whyData = getSectionData(sections, "business_how_secom_protects");
    const cardData = getArrayData(sections, "business_two_card", "cards");
    const logoTrustedData = getSectionData(sections, "business_trusted_by");

    const mappingWhyData = {
      title: whyData?.title_section || "",
      desc: whyData?.description_section || "",
      items:
        whyData?.list_items?.map((item) => ({
          title: item?.text || "",
          image: item?.logo || "",
          desc: item?.description || "",
        })) || [],
    };

    // Process articles data
    const allPosts = postsData?.data?.articles.data || [];
    const validPosts = allPosts.filter((post) => !post.expired_at);
    const sortedPosts = validPosts.sort((a, b) => {
      return new Date(b.published_at) - new Date(a.published_at);
    });
    const limitedPosts = sortedPosts.slice(0, 4);

    const mappedPosts = limitedPosts.map((post) => {
      const title = post.title?.[locale] || post.title?.id || "";
      const content = post.content?.[locale] || post.content?.id || "";
      const slug = post.slug?.[locale] || post.slug?.id || "";

      const plainText = content.replace(/<[^>]+>/g, "");
      const words = plainText.split(/\s+/);
      const excerpt =
        words.length > 30 ? words.slice(0, 30).join(" ") + "..." : plainText;

      return {
        id: post.id,
        slug,
        title,
        content,
        excerpt,
        image: post.image?.[0] || null,
        published_at: post.published_at,
        categories: post.categories?.map((cat) => ({
          id: cat.id,
          name: cat.name?.[locale] || cat.name?.id || "",
          type: cat.type,
        })),
      };
    });

    const firstPostData = mappedPosts.length > 0 ? mappedPosts[0] : null;
    const postsDataSliced = mappedPosts.slice(1);

    return (
      <>
        <HeaderList locale={locale} />
        <BlpBanner dataSection={bannerData} />
        <ResSurvey dataSection={surveyData} dataDiscover="/product/alarm" />
        <SecDetailSlider
          dataSection={mappingWhyData}
          classParent="mt-10 lg:mt-20"
          numbering={true}
        />
        <BlpCard dataSection={cardData} />

        {mappedPosts.length > 0 && (
          <BlpNews dataFirstPost={firstPostData} dataPosts={postsDataSliced} />
        )}

        <AboutTrusted dataSection={logoTrustedData} />
      </>
    );
  } catch (error) {
    console.error("Error loading business page:", error);
    return (
      <div className="p-8 text-center">
        <p>Error loading business page content</p>
      </div>
    );
  }
}
