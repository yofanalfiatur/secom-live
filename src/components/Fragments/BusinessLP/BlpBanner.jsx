"use client";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRef, useEffect } from "react";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import Image from "next/image";

const BlpBanner = ({ dataSection }) => {
  const isDesktop = useIsDesktop();

  const mainSliderRef = useRef(null);
  const contentSliderRef = useRef(null);

  const isLoop = dataSection.length > 1;

  useEffect(() => {
    if (mainSliderRef.current && contentSliderRef.current) {
      const mainSplide = mainSliderRef.current.splide;
      const contentSplide = contentSliderRef.current.splide;

      if (mainSplide && contentSplide) {
        mainSplide.on("moved", (newIndex) => {
          contentSplide.go(newIndex);
        });

        contentSplide.on("moved", (newIndex) => {
          mainSplide.go(newIndex);
        });
      }
    }
  }, []);

  return (
    <section className="h-max flex flex-col overflow-hidden relative bg-navyblue lg:bg-[unset] blp-banner">
      {/* Background Slider */}
      <div className="w-full lg:h-full blp-banner__wrap-slider__bg">
        <Splide
          ref={mainSliderRef}
          options={{
            type: isLoop ? "loop" : "slide",
            perPage: 1,
            perMove: 1,
            pagination: false,
            arrows: false,
            autoplay: isLoop,
            interval: 5000,
            drag: isLoop, // disable drag kalau cuma 1
          }}
          className="w-full h-full blp-banner__slider-bg"
        >
          {dataSection.map((item, index) => (
            <SplideSlide key={index} className="w-full h-full flex flex-col">
              <Image
                width={1920}
                height={1000}
                quality={100}
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.background_image_desktop}`}
                alt=""
                className="w-full h-full aspect-[320/181] lg:aspect-[1980/880] object-cover"
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* Content Slider */}
      <div className="relative lg:absolute w-full h-full flex flex-col justify-center lg:top-0 lg:left-0">
        <div className="container mx-auto mb-[100px] lg:mb-[50px] flex flex-col">
          <div className="w-full lg:w-[35%] flex flex-col blp-banner__wrap-slider">
            <Splide
              ref={contentSliderRef}
              options={{
                type: isLoop ? "loop" : "slide",
                perPage: 1,
                perMove: 1,
                height: "100%",
                pagination: isLoop,
                arrows: false,
                drag: isLoop,
              }}
              className="w-full h-full blp-banner__slider relative z-[1]"
              hasTrack={false}
            >
              <SplideTrack>
                {dataSection.map((item, index) => (
                  <SplideSlide
                    key={index}
                    className="w-full flex flex-col bg-navyblue"
                  >
                    <div className="w-full lg:h-[500px] flex flex-col px-0 pt-4 pb-4 lg:px-[40px] lg:pt-24 lg:pb-8">
                      <p className="text-white text-[30px] lg:text-[40px] font-raleway font-normal leading-[1.3] lg:leading-[1.2]">
                        {item.title}
                      </p>
                      <p className="text-white text-sm lg:text-lg leading-[1.7] lg:leading-[1.5] mt-2 lg:mt-6 mb-4 lg:mb-0">
                        {item.description}
                      </p>
                    </div>
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

export default BlpBanner;
