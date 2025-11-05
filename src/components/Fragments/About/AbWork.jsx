"use client";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRef, useEffect } from "react";
import Image from "next/image";

const AboutWork = ({ dataSection, classParent }) => {
  // Refs untuk sync
  const titleSplideRef = useRef(null);
  const imgSplideRef = useRef(null);
  const descSplideRef = useRef(null);

  useEffect(() => {
    if (
      titleSplideRef.current &&
      imgSplideRef.current &&
      descSplideRef.current
    ) {
      const titleSplide = titleSplideRef.current.splide;
      const imgSplide = imgSplideRef.current.splide;
      const descSplide = descSplideRef.current.splide;

      // Sync title → img & desc
      titleSplide.sync(imgSplide);
      titleSplide.sync(descSplide);
    }
  }, []);

  return (
    <section className={`relative bg-navyblue ab-work ${classParent}`}>
      <div className="container !p-0  mx-auto flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-7/12 flex flex-col justify-center h-auto lg:h-[200px] lg:border-white/50 lg:border-r-[1px]">
          <h2
            className="text-white text-[35px] lg:text-[50px] font-normal my-4 lg:my-auto px-4 lg:px-0"
            dangerouslySetInnerHTML={{ __html: dataSection.title }}
          />
        </div>
        <div className="w-full lg:w-5/12 flex flex-col py-4 px-4 lg:py-10 lg:px-8 border-t-[1px] lg:border-t-[0] border-white/50 ab-work__wrap-slider-title">
          <Splide
            ref={titleSplideRef}
            options={{
              type: "loop",
              perPage: 1,
              arrows: true,
              pagination: false,
              autoplay: false,
              pauseOnHover: true,
              gap: "0px",
            }}
            className="w-full h-max mt-3 lg:mt-0 ab-work__slider-title"
            hasTrack={false}
          >
            <SplideTrack>
              {dataSection.slides.map((item, index) => (
                <SplideSlide
                  key={index}
                  className="h-max flex flex-row justify-center items-center gap-1 lg:gap-4 ab-work__slide-title"
                >
                  <p className="text-white h-max font-normal text-[20px] lg:text-[35px] ab-work__item-title">
                    {index + 1 + "."}
                  </p>
                  <p className="text-white h-max font-normal text-[20px] lg:text-[35px] ab-work__item-title">
                    {item.title}
                  </p>
                </SplideSlide>
              ))}
            </SplideTrack>
            {/* Custom Arrow Buttons border white */}
            <div className="splide__arrows absolute top-1/2 w-full z-10">
              <button className="splide__arrow splide__arrow--prev !bg-white !opacity-100 !border-white !border-[1px] !rounded-none !left-[0%]">
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
              <button className="splide__arrow splide__arrow--next !bg-white !opacity-100 !border-white !border-[1px] !rounded-none !right-[0%]">
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
        </div>
      </div>

      <div className="flex flex-col lg:border-white/50 lg:border-t-[1px]">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-7/12 lg:border-white/50 lg:border-r-[1px] pt-2 lg:pt-15 pr-0 lg:pr-15 pb-4 lg:pb-15 ab-work__wrap-slider-img">
            <Splide
              ref={imgSplideRef}
              options={{
                type: "loop",
                perPage: 1,
                arrows: false,
                pagination: false,
                autoplay: false,
                pauseOnHover: true,
                gap: "0px",
              }}
              className="w-full h-max ab-work__slider-img"
              hasTrack={false}
            >
              <SplideTrack>
                {dataSection.slides.map((item, index) => (
                  <SplideSlide key={index} className="h-max ab-work__slide-img">
                    <Image
                      src={process.env.NEXT_PUBLIC_STORAGE_URL + item.logo}
                      alt={item.title}
                      width={684}
                      height={331}
                      quality={100}
                      className="w-full h-full aspect-[284/138] lg:aspect-[684/331] object-cover ab-work__item-img"
                    />
                  </SplideSlide>
                ))}
              </SplideTrack>
            </Splide>
          </div>

          <div className="w-full lg:w-5/12 flex flex-col p-0 lg:p-15 ab-work__wrap-slider-desc">
            <Splide
              ref={descSplideRef}
              options={{
                type: "loop",
                perPage: 1,
                arrows: false,
                pagination: false,
                autoplay: false,
                pauseOnHover: true,
                gap: "0px",
              }}
              className="w-full pb-10 lg:pb-0 h-max ab-work__slider-desc"
              hasTrack={false}
            >
              <SplideTrack>
                {dataSection.slides.map((item, index) => (
                  <SplideSlide
                    key={index}
                    className="h-max ab-work__slide-desc"
                  >
                    <p className="text-white leading-[1.7] lg:leading-[1.5] text-sm lg:text-base h-max ab-work__item-desc">
                      {item.description}
                    </p>
                  </SplideSlide>
                ))}
              </SplideTrack>
            </Splide>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWork;
