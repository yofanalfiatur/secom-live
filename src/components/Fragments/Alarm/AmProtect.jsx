"use client";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import BackgroundDots from "@/components/Elements/BackgroundDots";
import ButtonPrimary from "@/components/Elements/ButtonPrimary";
import { useLocale } from "next-intl";
import LocaleLink from "@/components/Hooks/LocaleLink";

const AmProtect = ({ dataSection, typeProduct }) => {
  const isDesktop = useIsDesktop();
  const locale = useLocale();

  return (
    <section className="relative pt-9 pb-13 mt-[-3px] lg:mt-0 lg:pb-23 lg:pt-17 overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:lg:h-10/12 after:h-full after:bg-[linear-gradient(0deg,_#ffffff_30%,_rgba(255,255,255,0)_60%)]">
      <BackgroundDots
        dotSize={isDesktop ? 2.5 : 2}
        dotsX={isDesktop ? 35 : 15}
        dotsY={isDesktop ? 30 : 50}
      />
      <div className="container mx-auto relative z-[3] flex flex-col justify-center items-center">
        <h2 className="text-[25px] lg:text-[40px] text-darkblue lg:text-center font-raleway font-medium">
          {dataSection.title}
        </h2>
        {/* temp */}
        {/* <p className="text-sm lg:text-lg lg:text-center mt-3 leading-[1.7] lg:leading-[1.5] lg:mt-4 lg:mb-10 w-full lg:w-[65%]">
          {dataSection.desc}
        </p> */}

        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet={`${process.env.NEXT_PUBLIC_STORAGE_URL}${dataSection.image}`}
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${dataSection.imageMobile}`}
            alt="Alarm Protect"
            width={1321}
            height={671}
            className="max-w-full w-[100%] h-auto mb-5 mt-2 lg:mb-7"
            quality={100}
          />
        </picture>

        <div className="relative w-full flex flex-col justify-center py-1 mb-3 lg:mb-8">
          {!isDesktop ? (
            <Splide
              options={{
                type: "loop",
                perPage: 1,
                gap: "10px",
                autoplay: false,
                pauseOnHover: false,
                arrows: true,
                pagination: false,
              }}
              className=""
              hasTrack={false}
            >
              <SplideTrack className="test-track pb-19">
                {dataSection.items.map((item, index) => (
                  <SplideSlide key={index} className="group">
                    <div className="text-center flex flex-col items-center justify-center">
                      <p
                        className={`text-2xl font-semibold mb-2 w-[42px] h-[42px] flex flex-col items-center justify-center rounded-full font-raleway self-center text-white ${
                          index % 3 === 0
                            ? "bg-[#CE2129]"
                            : index % 3 === 1
                            ? "bg-navyblue"
                            : "bg-tosca"
                        }`}
                      >
                        {index + 1}
                      </p>
                      <p className="text-lg font-raleway font-semibold mb-1">
                        {item.title}
                      </p>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.description }}
                        className="text-sm leading-[1.7] text-gray-600"
                      />
                    </div>
                  </SplideSlide>
                ))}
              </SplideTrack>
              {/* Custom Arrow Buttons */}
              <div className="splide__arrows absolute bottom-10 w-full z-10">
                <button className="splide__arrow splide__arrow--prev !bg-white !border-tosca !border-[1px] !rounded-none !left-[37%] ">
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
                <button className="splide__arrow splide__arrow--next !bg-white !border-tosca !border-[1px] !rounded-none !right-[37%]">
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
            </Splide>
          ) : (
            <div className="grid grid-cols-12 gap-18">
              {dataSection.items.map((item, index) => (
                <div key={index} className="col-span-4 flex flex-col group">
                  <p className="text-3xl font-semibold text-white mb-2 group-nth-[1]:bg-[#CE2129] group-nth-[2]:bg-navyblue group-nth-[3]:bg-tosca w-[52px] h-[52px] flex flex-col items-center justify-center rounded-full font-raleway">
                    {index + 1}
                  </p>
                  <p className="text-[25px] text-darkblue font-raleway font-semibold mt-2 mb-1 w-full xl:w-10/12">
                    {item.title}
                  </p>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.description }}
                    className="text-lg text-gray-600 w-full xl:w-10/12"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <LocaleLink
          href={`contact?location=${typeProduct}`}
          target="_self"
          className="flex flex-col items-center w-full max-w-full sm:max-w-max sm:max-h-max font-raleway bg-tosca text-white text-sm lg:text-base px-4 py-4 lg:px-5 lg:py-5 rounded-[5px] tracking-[4px] leading-none uppercase transition-all ease duration-200 hover:bg-navyblue"
        >
          {locale === "en" ? "CONSULT NOW" : "KONSULTASI SEKARANG"}
        </LocaleLink>
      </div>
    </section>
  );
};

export default AmProtect;
