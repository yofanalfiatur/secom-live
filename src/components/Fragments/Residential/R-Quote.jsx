"use client";

import React, { useEffect, useRef } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import "glightbox/dist/css/glightbox.min.css";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const ResQuote = ({ dataSection }) => {
  const imageSliderRef = useRef(null);
  const textSliderRef = useRef(null);

  useEffect(() => {
    if (imageSliderRef.current && textSliderRef.current) {
      const imageSlider = imageSliderRef.current.splide;
      const textSlider = textSliderRef.current.splide;

      if (imageSlider && textSlider) {
        imageSlider.sync(textSlider);
      }
    }
  }, []);

  useEffect(() => {
    import("glightbox").then(({ default: GLightbox }) => {
      const lightbox = GLightbox({
        selector: ".glightbox",
        loop: false,
        zoomable: true,
        draggable: true,
        touchNavigation: false,
        openEffect: "zoom",
        closeEffect: "zoom",
        onOpen: () => {
          console.log("Lightbox opened");
        },
        onClose: () => {
          console.log("Lightbox closed");
        },
      });

      return () => {
        lightbox.destroy();
      };
    });
  }, []);

  return (
    <section className="pb-0 mb-6 lg:mb-24 flex flex-col lg:flex-row bg-tosca relative overflow-hidden res-quote">
      {/* IMAGE SLIDER */}
      <div className="w-full lg:w-[60%] relative z-[1] flex flex-col">
        <Splide
          ref={imageSliderRef}
          options={{
            type: dataSection.length > 1 ? "loop" : "slide",
            perPage: 1,
            perMove: 1,
            arrows: dataSection.length > 1 ? true : false,
            pagination: false,
            gap: "0px",
          }}
          aria-label="Image Slider"
          hasTrack={false}
          className=""
        >
          {/* Custom Arrow Buttons */}
          <div className="w-full mx-auto absolute top-[200%] sm:top-[180%] lg:top-1/2 lg:transform lg:-translate-y-1/2 z-10">
            <div className="splide__arrows w-full z-10">
              <button className="splide__arrow splide__arrow--prev !border-white !bg-transparent !border-[1px] !left-[37.5%] lg:!left-[4vw] !rounded-none !w-[36px] !h-[36px]">
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
                    fill="#ffffff"
                  />
                </svg>
              </button>
              <button className="splide__arrow splide__arrow--next !border-white !bg-transparent !border-[1px] !left-[52.5%] lg:!left-[95vw] !rounded-none !w-[36px] !h-[36px]">
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
                    fill="#ffffff"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Image Slides */}
          <SplideTrack className="res-quote__track">
            {dataSection.map((item, index) => (
              <SplideSlide key={index} className="h-max flex flex-col">
                <div className="flex justify-center h-full items-center w-full bg-gray-200">
                  <Link
                    key={index}
                    href={item.url_video}
                    className="glightbox w-full h-full relative flex flex-col justify-center items-center"
                  >
                    <Image
                      src={
                        item.thumbnail_video &&
                        item.thumbnail_video.trim() !== ""
                          ? process.env.NEXT_PUBLIC_STORAGE_URL +
                            item.thumbnail_video
                          : "/img/thumb-default-blue.jpg"
                      }
                      width={1840}
                      height={1200}
                      alt={`Quote ${index + 1}`}
                      quality={100}
                      className="w-full h-auto object-center top-0 left-0 opacity-100"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80px] h-[87px] z-0 triangle-shape scale-60 md:scale-100">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 triangle-shape animated-gradient-bg2"></div>

                      <div className="bg-white triangle-shape absolute z-1 w-full h-full scale-[83%] top-1/2 left-[47%] transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </Link>
                </div>
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </div>

      {/* TEXT SLIDER */}
      <div className="relative lg:absolute lg:left-1/2 lg:transform lg:-translate-x-[50%] z-[0] container mx-auto flex flex-col items-end h-full">
        <div className="w-full lg:w-[37.5%] h-full flex flex-col justify-center">
          <Splide
            ref={textSliderRef}
            options={{
              type: dataSection.length > 1 ? "loop" : "slide",
              perPage: 1,
              arrows: false,
              pagination: false,
              gap: "0px",
              drag: false,
            }}
            aria-label="Text Slider"
            className=""
          >
            {dataSection.map((item, index) => (
              <SplideSlide key={index} className="!h-full">
                <div className="flex flex-col justify-center items-start py-15 px-0 lg:py-8 lg:pl-16 lg:pr-20 h-full">
                  <svg
                    width="60"
                    height="47"
                    viewBox="0 0 60 47"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-0 mb-3 lg:mb-8 scale-85 lg:scale-100"
                  >
                    <path
                      d="M21.7337 0L17.6471 22.3113H25.0774V47H0V21.9455L6.6873 0H21.7337ZM56.6564 0L52.5697 22.3113H60V47H34.9226V21.9455L41.6099 0H56.6564Z"
                      fill="#00529C"
                    />
                  </svg>
                  <p className="text-[25px] lg:text-[35px] font-normal font-raleway leading-[1.4] text-white">
                    {item.testimony}
                  </p>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default ResQuote;
