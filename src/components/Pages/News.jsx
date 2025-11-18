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

export default async function NewsPage({ params, searchParams }) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  const currentPage = parseInt(resolvedSearchParams.page) || 1;
  const selectedCategory = resolvedSearchParams.category || "";
  const selectedYear = resolvedSearchParams.year || "";

  // Build API parameters
  const apiParams = {
    page: currentPage,
    per_page: 5, // Match ITEMS_PER_PAGE in client component
  };

  // Add category filter if selected
  if (selectedCategory) {
    apiParams.category = selectedCategory;
  }

  // Add year filter if selected
  if (selectedYear) {
    apiParams.year = selectedYear;
  }

  try {
    // Fetch articles data with pagination and filtering
    const responsePosts = await getPosts("articles", apiParams);

    const postsData = responsePosts?.data?.articles || {};
    const allPosts = postsData.data || [];
    const availableYears = responsePosts?.data?.availableYears || [];

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
        selectedCategory={selectedCategory}
        selectedYear={selectedYear}
        availableYears={availableYears}
      />
    );
  } catch (error) {
    console.error("Error loading news landing page:", error);
    return (
      <div className="p-8 text-center">
        <p>Error loading news page content</p>
      </div>
    );
  }
}
