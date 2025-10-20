import { Link } from "@/i18n/navigation";
import { getPostById } from "@/libs/api";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({ params }) {
  const { id, locale } = await params;

  // 🔹 Extract numeric ID from slug
  const idMatch = id.match(/(\d+)$/);
  const articleId = idMatch ? idMatch[1] : null;

  if (!articleId) return notFound();

  // 🔹 Fetch by ID
  const response = await getPostById("articles", articleId);
  if (!response || !response.data) return notFound();

  const data = response.data;

  // 🔹 get data by locale
  const title = data.title?.[locale] || data.title?.id || "";
  const content = data.content?.[locale] || data.content?.id || "";
  const imageUrl = data.image?.[0]
    ? `${process.env.NEXT_PUBLIC_STORAGE_URL + data.image[0]}`
    : "/img/temp/solutions/sol-bg-2x.jpg";
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

            <Image
              src={imageUrl}
              width={1000}
              height={558}
              alt={title}
              className="w-full lg:h-[588px] md:h-[380px] object-cover mb-5 h-news__featured"
            />

            <div
              className="d-news__detail text-lg mb-5 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </section>

      <section className="d-news__related">
        <div className="border-t border-b border-[#13223320] py-4 w-full flex items-center justify-center">
          <div className="container">
            <h2 className="font-semibold font-darkblue text-center uppercase text-darkblue md:text-lg text-base">
              {locale === "en" ? "Related Articles" : "Artikel Terkait"}
            </h2>
          </div>
        </div>

        {/* Placeholder related posts - nanti bisa diganti dengan API terkait */}
        <div className="flex flex-col items-center justify-center">
          <div className="d-news__list grid lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="d-news__item relative lg:px-16 lg:py-16 px-4 py-8 flex flex-col gap-1 lg:gap-4"
              >
                <div className="meta flex flex-row gap-2 items-center uppercase lg:text-sm text-[10px]">
                  <p>{categories}</p> | <p>{publishedDate}</p>
                </div>
                <Link
                  href="#"
                  className="text-[25px] lg:text-[30px] font-medium font-raleway leading-snug text-darkblue"
                >
                  Sample related article title
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
