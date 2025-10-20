"use client";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRef, useEffect } from "react";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { useTranslations } from "next-intl";
import Image from "next/image";

const SecDetailSlider = ({ dataSection }) => {
  // Refs untuk sync
  const imgSplideRef = useRef(null);
  const descSplideRef = useRef(null);

  useEffect(() => {
    if (imgSplideRef.current && descSplideRef.current) {
      const imgSplide = imgSplideRef.current.splide;
      const descSplide = descSplideRef.current.splide;

      // Sync kedua slider (dua arah supaya bisa dikontrol dari mana saja)
      imgSplide.sync(descSplide);
      descSplide.sync(imgSplide);
    }
  }, []);

  return (
    <section className="relative pb-20 lg:pb-0 bg-navyblue sd-slider">
      <div className="container !p-0 mx-auto flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-7/12 flex flex-col justify-center min-h-[unset] lg:min-h-[160px] border-white/50 border-b-[1px] lg:border-r-[1px]">
          <h2 className="text-white text-[30px] lg:text-[50px] leading-[1.3] lg:leading-[1.2] font-normal mt-8 mb-4 lg:mt-auto lg:mb-auto px-4 lg:px-0 font-raleway">
            {dataSection.title}
          </h2>
        </div>
      </div>

      <div className="flex flex-col lg:border-white/50 lg:border-t-[1px]">
        <div className="container mx-auto flex flex-col lg:flex-row">
          {/* IMAGE SLIDER */}
          <div className="w-full lg:w-7/12 lg:border-white/50 lg:border-r-[1px] pt-8 lg:pt-11 pr-0 lg:pr-11 pb-4 lg:pb-15 sd-slider__wrap-slider-img">
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
              className="w-full h-max sd-slider__slider-img"
              hasTrack={false}
            >
              <SplideTrack>
                {dataSection.items.map((item, index) => (
                  <SplideSlide
                    key={index}
                    className="h-max sd-slider__slide-img"
                  >
                    <Image
                      src={process.env.NEXT_PUBLIC_STORAGE_URL + item.image}
                      alt={item.title}
                      width={684}
                      height={331}
                      quality={100}
                      className="w-full h-full aspect-[284/138] lg:aspect-[684/331] object-cover sd-slider__item-img"
                    />
                  </SplideSlide>
                ))}
              </SplideTrack>
            </Splide>
          </div>

          {/* DESCRIPTION SLIDER */}
          <div className="w-full lg:w-5/12 flex flex-col lg:pt-31 lg:pb-15 lg:pl-15 sd-slider__wrap-slider-desc">
            <Splide
              ref={descSplideRef}
              options={{
                type: "loop",
                perPage: 1,
                arrows: true,
                pagination: false,
                autoplay: false,
                pauseOnHover: true,
                gap: "0px",
              }}
              className="w-full h-max sd-slider__slider-desc"
              hasTrack={false}
            >
              {/* Custom Arrow Buttons */}
              <div className="splide__arrows absolute top-[unset] bottom-[-2rem] lg:bottom-[unset] lg:top-[-3rem] w-full z-10">
                <button className="splide__arrow splide__arrow--prev !bg-white !opacity-100 !border-white !border-[1px] !rounded-none !left-[40%] lg:!left-[0%] !w-[27px] !h-[27px] lg:!w-[36px] lg:!h-[36px]">
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
                <button className="splide__arrow splide__arrow--next !bg-white !opacity-100 !border-white !border-[1px] !rounded-none !right-[40%] lg:!right-[85%] !w-[27px] !h-[27px] lg:!w-[36px] lg:!h-[36px]">
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

              <SplideTrack>
                {dataSection.items.map((item, index) => (
                  <SplideSlide
                    key={index}
                    className="h-max flex flex-col sd-slider__slide-desc"
                  >
                    <h3 className="text-white font-raleway font-normal text-[20px] lg:text-[30px] leading-[1.2] lg:leading-[1.3] mb-2 lg:mb-3 ">
                      {item.title}
                    </h3>
                    <p className="text-white leading-[1.7] lg:leading-[1.5] text-sm lg:text-lg h-max sd-slider__item-desc">
                      {item.desc}
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

export default SecDetailSlider;
