import { Link } from "@/i18n/navigation";
import { getPostBySlug, getPosts } from "@/libs/api";
import { generateNewsMetadata } from "@/utils/metadata";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id, locale } = await params;
  return generateNewsMetadata(id, locale);
}

export default async function NewsDetailPage({ params }) {
  const { id, locale } = await params;

  try {
    // 🔹 Fetch by Slug
    const response = await getPostBySlug("articles", id);
    if (!response || !response.data) return notFound();

    const data = response.data;

    // 🔹 get data by locale
    const title = data.title?.[locale] || data.title?.id || "";
    const content = data.content?.[locale] || data.content?.id || "";
    const imageUrl = data.image?.[0]
      ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${data.image[0]}`
      : "";
    const categories =
      data.categories
        ?.map((cat) => cat.name?.[locale] || cat.name?.id)
        ?.join(", ") || "-";

    const publishedDate = data.published_at
      ? new Date(data.published_at).toLocaleDateString(
          locale === "en" ? "en-GB" : "id-ID",
          { day: "2-digit", month: "long", year: "numeric" }
        )
      : "-";

    // 🔹 Get category IDs for related articles
    const categoryIds = data.categories?.map((cat) => cat.id) || [];

    // Fetch related articles
    let listRelated = [];
    if (categoryIds.length > 0) {
      const responseRelated = await getPosts(
        `articles?per_page=3&category=${categoryIds}`
      );
      listRelated =
        responseRelated.data.articles?.data
          ?.filter((article) => article.id !== data.id) // Exclude current article
          ?.map((article) => ({
            id: article.id,
            title: article.title?.[locale] || article.title?.id,
            imageUrl: article.image?.[0]
              ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${article.image[0]}`
              : "",
            slug: article.slug?.[locale] || article.slug?.id,
            category:
              article.categories
                ?.map((cat) => cat.name?.[locale] || cat.name?.id)
                ?.join(", ") || "-",
            pusblishedDate: article.published_at
              ? new Date(article.published_at).toLocaleDateString(
                  locale === "en" ? "en-GB" : "id-ID",
                  { day: "2-digit", month: "long", year: "numeric" }
                )
              : "-",
          })) || [];
    }

    return (
      <>
        <section className="d-news flex flex-col">
          <div className="d-news__meta border-b border-[#13223320] uppercase py-6">
            <div className="container mx-auto flex flex-row gap-2 items-center xl:w-[71%] md:text-base text-sm">
              <p>{categories}</p>|<p>{publishedDate}</p>
            </div>
          </div>

          <div className="container mx-auto xl:w-[71%]">
            <div className="d-news__content pb-10">
              <h1 className="d-news__title font-semibold my-5 md:text-4xl text-3xl text-darkblue">
                {title}
              </h1>

              {imageUrl && (
                <Image
                  src={imageUrl}
                  width={1600}
                  height={1000}
                  quality={100}
                  alt={title}
                  className="w-full h-auto object-cover mb-5 h-news__featured"
                />
              )}

              <div
                className="d-news__detail text-lg mb-5 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </section>

        {categoryIds.length > 0 && (
          <section className="d-news__related">
            <div className="border-t border-b border-[#13223320] py-4 w-full flex items-center justify-center">
              <div className="container">
                <h2 className="font-semibold font-darkblue text-center uppercase text-darkblue md:text-lg text-base">
                  {locale === "en" ? "Related Articles" : "Artikel Terkait"}
                </h2>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="d-news__list grid lg:grid-cols-3">
                {listRelated.map((item, index) => (
                  <div
                    key={index}
                    className="d-news__item relative lg:px-16 lg:py-16 px-4 py-8 flex flex-col gap-1 lg:gap-4"
                  >
                    <div className="meta flex flex-row gap-2 items-center uppercase lg:text-sm text-[10px]">
                      <p>{item.category}</p> | <p>{item.pusblishedDate}</p>
                    </div>
                    <Link
                      href={`/${item.slug}`}
                      className="text-[25px] lg:text-[30px] font-medium font-raleway leading-snug text-darkblue transition-all duration-300 ease hover:text-navyblue"
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </>
    );
  } catch (error) {
    console.error("Error loading news detail:", error);
    notFound();
  }
}
