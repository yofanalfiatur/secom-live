import AboutTrusted from "@/components/Fragments/About/AbTrusted";
import BlpBanner from "@/components/Fragments/BusinessLP/BlpBanner";
import BlpCard from "@/components/Fragments/BusinessLP/BlpCard";
import BlpNews from "@/components/Fragments/BusinessLP/BlpNews";
import BlpWhy from "@/components/Fragments/BusinessLP/BlpWhy";
import ResSurvey from "@/components/Fragments/Residential/R-Survey";
import HeaderList from "@/components/Fragments/Header/HeaderList";
import { getPageData, getPosts } from "@/libs/api";
import React from "react";

export default async function BusinessPage(props) {
  const { locale } = await props.params;

  const response = await getPageData("business");
  const pageData = response.data[locale];

  const sections = pageData.sections.reduce((acc, section) => {
    acc[section.component] = section.fields;
    return acc;
  }, {});

  const bannerData = sections.business_banner?.slides || {};
  const surveyData = sections.business_short_survey || {};
  const whyData = sections.business_how_secom_protects || {};
  const cardData = sections.business_two_card?.cards || {};

  const logoTrustedData = sections.business_trusted_by || [];

  // Fetch and filter articles
  const responsePosts = await getPosts("articles");
  const allPosts = responsePosts?.data?.data || [];

  // Filter out expired articles
  const validPosts = allPosts.filter((post) => !post.expired_at);

  // Sort by published_at (newest first)
  const sortedPosts = validPosts.sort((a, b) => {
    return new Date(b.published_at) - new Date(a.published_at);
  });

  // Take latest 4 posts
  const limitedPosts = sortedPosts.slice(0, 4);
  // Map translations and categories
  const mappedPosts = limitedPosts.map((post) => {
    const title = post.title?.[locale] || post.title?.id || "";
    const content = post.content?.[locale] || post.content?.id || "";
    const slug = post.slug?.[locale] || post.slug?.id || "";

    // Remove HTML tags and limit to 30 words
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

  // Split first and remaining posts
  const firstPostData = mappedPosts.length > 0 ? mappedPosts[0] : null;
  const postsData = mappedPosts.slice(1);

  return (
    <>
      <HeaderList locale={locale} />
      <BlpBanner dataSection={bannerData} />
      <ResSurvey dataSection={surveyData} dataDiscover="/product/alarm" />
      <BlpWhy dataSection={whyData} />
      <BlpCard dataSection={cardData} />

      {mappedPosts.length > 0 && (
        <BlpNews dataFirstPost={firstPostData} dataPosts={postsData} />
      )}

      <AboutTrusted dataSection={logoTrustedData} />
    </>
  );
}
