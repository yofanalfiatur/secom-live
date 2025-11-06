"use client";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import useIsDesktop from "@/components/Hooks/useIsDesktop";

const BlpNews = (props) => {
  const { dataFirstPost, dataPosts } = props;

  const locale = useLocale();
  const isDesktop = useIsDesktop();

  // helper untuk format tanggal
  const formatDate = (dateString, locale) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <section className="bg-navyblue mb-10 lg:mb-12 pb-20 lg:pb-0 flex flex-col gap-7 lg:gap-0 blp-news">
      {/* featured article */}
      {dataFirstPost && (
        <div className="flex flex-col-reverse lg:flex-row justify-end relative overflow-hidden border-b-[1px] border-b-[#FFFFFF80] blp-news__featured">
          <div className="w-full lg:w-[calc(67%+2rem)] flex">
            <Image
              src={process.env.NEXT_PUBLIC_STORAGE_URL + dataFirstPost.image}
              width={1000}
              height={516}
              alt={dataFirstPost.title}
              className="object-cover w-full h-full aspect-[320/166] lg:aspect-[994/516]"
            />
          </div>
          <div className="relative lg:absolute h-full w-full">
            <div className="container mx-auto flex flex-col h-full justify-center">
              <div className="w-full lg:w-4/12 h-full flex flex-col justify-center lg:pr-12 bg-navyblue pt-7 lg:pt-8 pb-7 lg:pb-8">
                <div className="flex flex-row blp-news__meta">
                  <p className="text-white text-[10px] lg:text-sm uppercase leading-[1] relative flex flex-row items-center after:content-[''] after:w-[1px] after:h-full after:bg-white after:mx-3">
                    {dataFirstPost.categories
                      ?.map((cat) => cat.name)
                      .join(", ")}
                  </p>
                  <p className="text-white text-[10px] lg:text-sm uppercase leading-[1]">
                    {formatDate(dataFirstPost.published_at, locale)}
                  </p>
                </div>
                <Link
                  href={`/${dataFirstPost.slug}`}
                  className="blp-news__link group"
                >
                  <p className="text-white font-normal text-[30px] lg:text-[40px] leading-[1.3] lg:leading-[1.2] mt-2 mb-3 lg:mb-4 transition-all duration-300 ease group-hover:text-tosca">
                    {dataFirstPost.title}
                  </p>
                </Link>
                <p className="text-white text-sm lg:text-lg leading-[1.7] lg:leading-[1.5]">
                  {dataFirstPost.excerpt}
                </p>
                <Link
                  href={`/${dataFirstPost.slug}`}
                  className="flex flex-row items-center gap-3 mt-5 lg:mt-6 relative max-w-max transition-all duration-300 ease hover:gap-6 after:content-[''] after:absolute after:w-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full "
                >
                  <p className="text-white text-sm lg:text-lg tracking-[3px] uppercase">
                    {locale === "en" ? "Read More" : "Baca Selengkapnya"}
                  </p>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="arrow-white"
                  >
                    <path
                      d="M10.195 13.83L15 8.99998L10.195 4.16998C10.1516 4.11299 10.0965 4.066 10.0333 4.03217C9.9702 3.99834 9.90053 3.97848 9.82904 3.97391C9.75756 3.96935 9.68593 3.98021 9.61901 4.00573C9.55208 4.03126 9.49142 4.07087 9.44114 4.12188C9.39085 4.17289 9.35211 4.23411 9.32754 4.30139C9.30297 4.36867 9.29315 4.44045 9.29873 4.51186C9.30431 4.58327 9.32517 4.65265 9.35989 4.7153C9.39462 4.77795 9.4424 4.8324 9.5 4.87498L13.095 8.49998L3.53 8.49998C3.39739 8.49998 3.27021 8.55266 3.17645 8.64643C3.08268 8.74019 3.03 8.86737 3.03 8.99998C3.03 9.13259 3.08268 9.25977 3.17645 9.35353C3.27021 9.4473 3.39739 9.49998 3.53 9.49998L13.095 9.49998L9.5 13.125C9.40651 13.2191 9.35425 13.3466 9.35472 13.4792C9.35519 13.6119 9.40835 13.739 9.5025 13.8325C9.59665 13.926 9.72409 13.9782 9.85677 13.9778C9.98945 13.9773 10.1165 13.9241 10.21 13.83L10.195 13.83Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* slider articles */}
      {dataPosts.length > 0 && (
        <div className="container mx-auto blp-news__wrap-slider">
          <Splide
            options={{
              type: "loop",
              autoplay: false,
              interval: 4000,
              pauseOnHover: true,
              arrows: false,
              pagination: false,
              perPage: 3,
              gap: "1.5rem",
              destroy: true,
              breakpoints: {
                1023: { perPage: 2, destroy: false, arrows: true },
                468: { perPage: 1 },
              },
            }}
            className="blp-news__slider"
            hasTrack={false}
          >
            <SplideTrack>
              {dataPosts.map((item, index) => (
                <SplideSlide
                  key={index}
                  className="flex flex-col blp-news__item"
                >
                  <div className="flex flex-row blp-news__meta">
                    <p className="text-white text-[10px] lg:text-sm uppercase leading-[1] relative flex flex-row items-center after:content-[''] after:w-[1px] after:h-full after:bg-white after:mx-3">
                      {item.categories?.map((cat) => cat.name).join(", ")}
                    </p>
                    <p className="text-white text-[10px] lg:text-sm uppercase leading-[1]">
                      {formatDate(item.published_at, locale)}
                    </p>
                  </div>
                  <Link href={`/${item.slug}`} className="blp-news__link group">
                    <p className="text-white font-normal text-[20px] lg:text-[30px] leading-[1.3] lg:leading-[1.2] mt-2 lg:mt-5 transition-all duration-300 ease group-hover:text-tosca">
                      {item.title}
                    </p>
                  </Link>
                </SplideSlide>
              ))}
            </SplideTrack>
            {!isDesktop && (
              <>
                {/* Custom Arrow Buttons */}
                <div className="splide__arrows absolute bottom-[-35px] w-full z-10">
                  <button className="splide__arrow splide__arrow--prev !bg-white !opacity-100 !border-white !border-[1px] !rounded-none !left-[37%]">
                    <svg
                      width="22"
                      height="15"
                      viewBox="0 0 22 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="scale-75 rotate-[270deg]"
                    >
                      <path
                        d="M21.3765 12.0804L10.9045 0L0.432595 12.0804C0.148111 12.4096 -0.00740039 12.8514 0.000270989 13.3085C0.00794236 13.7656 0.178168 14.2005 0.473501 14.5177C0.768834 14.8349 1.16508 15.0083 1.57507 14.9997C1.98507 14.9911 2.37522 14.8014 2.6597 14.4721L10.9045 4.95578L19.1585 14.4721C19.443 14.8014 19.8331 14.9911 20.2431 14.9997C20.6531 15.0083 21.0493 14.8349 21.3447 14.5177C21.64 14.2005 21.8102 13.7656 21.8179 13.3085C21.8256 12.8514 21.6701 12.4096 21.3856 12.0804H21.3765Z"
                        fill="#00AAAD"
                      />
                    </svg>
                  </button>
                  <button className="splide__arrow splide__arrow--next !bg-white !opacity-100 !border-white !border-[1px] !rounded-none !right-[37%]">
                    <svg
                      width="22"
                      height="15"
                      viewBox="0 0 22 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="scale-75 rotate-[90deg]"
                    >
                      <path
                        d="M21.3765 12.0804L10.9045 0L0.432595 12.0804C0.148111 12.4096 -0.00740039 12.8514 0.000270989 13.3085C0.00794236 13.7656 0.178168 14.2005 0.473501 14.5177C0.768834 14.8349 1.16508 15.0083 1.57507 14.9997C1.98507 14.9911 2.37522 14.8014 2.6597 14.4721L10.9045 4.95578L19.1585 14.4721C19.443 14.8014 19.8331 14.9911 20.2431 14.9997C20.6531 15.0083 21.0493 14.8349 21.3447 14.5177C21.64 14.2005 21.8102 13.7656 21.8179 13.3085C21.8256 12.8514 21.6701 12.4096 21.3856 12.0804H21.3765Z"
                        fill="#00AAAD"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </Splide>
        </div>
      )}
    </section>
  );
};

export default BlpNews;
