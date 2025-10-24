import NewsLP from "@/components/Fragments/NewsLP/NewsLP";
import { getPosts } from "@/libs/api";

// Helper function to extract excerpt from content (max 20 words)
const extractExcerpt = (content, maxWords = 20) => {
  if (!content) return "";

  // Remove HTML tags
  const textContent = content.replace(/<[^>]*>/g, "");

  // Split into words and take first maxWords
  const words = textContent.trim().split(/\s+/);

  if (words.length <= maxWords) {
    return textContent;
  }

  return words.slice(0, maxWords).join(" ") + "...";
};

export default async function NewsLanding(props) {
  // Await both params and searchParams
  const { locale } = await props.params;
  const searchParams = await props.searchParams;

  // Get page from search params, default to 1
  const currentPage = parseInt(searchParams.page) || 1;

  // Fetch articles data with pagination
  const responsePosts = await getPosts("articles", {
    page: currentPage,
    per_page: 5, // Match ITEMS_PER_PAGE in client component
  });

  const postsData = responsePosts?.data || {};
  const allPosts = postsData.articles?.data || [];

  // Transform data to match the expected format
  const transformedPosts = allPosts.map((post) => ({
    id: post.id,
    title: post.title?.[locale] || post.title?.en || "",
    excerpt:
      post.excerpt?.[locale] ||
      post.excerpt?.en ||
      extractExcerpt(post.content?.[locale] || post.content?.en || ""),
    category:
      post.categories?.[0]?.name?.[locale] ||
      post.categories?.[0]?.name?.en ||
      "Uncategorized",
    publishedDate: post.published_at || post.created_at || "",
    featuredImage: post.image?.[0]
      ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${post.image[0]}`
      : "",
    slug: post.slug?.[locale] || post.slug?.id || "",
    content: post.content?.[locale] || post.content?.en || "",
  }));

  // Pagination info from API
  const paginationInfo = {
    currentPage: postsData.current_page || 1,
    totalPages: postsData.last_page || 1,
    totalItems: postsData.total || 0,
    hasNextPage: !!postsData.next_page_url,
    hasPrevPage: !!postsData.prev_page_url,
  };

  return (
    <NewsLP
      posts={transformedPosts}
      locale={locale}
      initialPage={currentPage}
      paginationInfo={paginationInfo}
    />
  );
}
