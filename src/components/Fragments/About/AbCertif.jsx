"use client";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRef, useEffect, useState } from "react";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { useTranslations } from "next-intl";
import Image from "next/image";

const AboutCertificate = (props) => {
  const { dataSection } = props;

  const [activeIndex, setActiveIndex] = useState(null);
  const videoRefPopup = useRef(null);

  //lock when popup open
  useEffect(() => {
    const header = document.querySelector(".header");

    if (activeIndex !== null) {
      document.body.classList.add("overflow-hidden");
      if (header) header.style.setProperty("top", "-95px", "important");
    } else {
      document.body.classList.remove("overflow-hidden");
      if (header) header.style.removeProperty("top");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      if (header) header.style.removeProperty("top");
    };
  }, [activeIndex]);

  return (
    <>
      <section className="flex flex-col pt-11 pb-20 lg:pt-18 lg:pb-21 relative overflow-hidden ab-certif">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-8/12 flex flex-col py-4 lg:pr-4 relative z-0">
            <Splide
              options={{
                type: "loop",
                autoplay: true,
                interval: 3000,
                perMove: 1,
                pauseOnHover: true,
                arrows: true,
                pagination: false,
                perPage: 2,
                breakpoints: {
                  1024: {
                    perPage: 1,
                  },
                },
                gap: "1.5rem",
              }}
              className="w-full relative ab-certif__slider"
              hasTrack={false}
            >
              <SplideTrack className="!overflow-visible ab-certif__track">
                {dataSection.awards.map((item, index) => (
                  <SplideSlide
                    key={index}
                    className="ab-certif__slide"
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="ab-certif__item h-full flex flex-col items-center p-4 bg-white !shadow-[0px_4px_15px_0px_#0000001A] cursor-pointer">
                      <Image
                        src={process.env.NEXT_PUBLIC_STORAGE_URL + item.image}
                        width={204}
                        height={188}
                        alt={`Certificate ${index + 1}`}
                        quality={100}
                        className="max-h-[138px] w-full lg:max-h-[188px] object-contain h-full  ab-certif__img"
                      />
                      <p className="text-sm lg:text-xl mt-2 lg:mt-4 mb-2 lg:mb-4 font-medium text-darkblue text-center ab-certif__caption">
                        {item.name}
                      </p>
                    </div>
                  </SplideSlide>
                ))}
              </SplideTrack>

              {/* Custom Arrow Buttons */}
              <div className="splide__arrows absolute top-[calc(100%+2.5rem)] lg:top-1/2 w-full z-10">
                {/* Prev */}
                <button className="splide__arrow splide__arrow--prev !bg-white !opacity-100 !border-white !border-[1px] !rounded-none !left-[40%] lg:!left-[-11px] shadow-[0px_1.96px_15px_0px_#0000001A]">
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
                {/* Next */}
                <button className="splide__arrow splide__arrow--next !bg-white !opacity-100 !border-white !border-[1px] !rounded-none !right-[40%] lg:!right-[-11px] shadow-[0px_1.96px_15px_0px_#0000001A]">
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

          {/* Side Text */}
          <div className="w-full lg:w-4/12 flex flex-col justify-center relative lg:py-10 lg:pl-12 z-[1] bg-white after:content-[''] after:absolute after:w-[calc(150%_+_(100vw-1320px+4rem)/2)] after:h-full after:bottom-0 after:left-0 after:bg-white after:z-[-1]">
            <h2 className="text-darkblue text-[30px] lg:text-[40px] font-medium font-raleway lg:w-[80%] leading-[1.2] mb-2 lg:mb-4">
              {dataSection.title}
            </h2>
            <p className="text-darkblue text-sm lg:text-lg font-normal leading-[1.7] lg:leading-[1.5]">
              {dataSection.desc}
            </p>
          </div>
        </div>

        {/* Popup Certif */}
        <div className="flex flex-col">
          {dataSection.awards.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                className={`flex flex-col justify-start  lg:justify-center fixed z-[999] top-0 w-full h-full bg-[#132233e6] ab-certif__item__popup transition-all duration-500 overflow-auto ${
                  isActive
                    ? "opacity-100 left-0 visible"
                    : "opacity-0 left-[120%] invisible"
                }`}
                onClick={() => setActiveIndex(null)}
                key={index}
              >
                <div className="container flex flex-col h-max justify-center lg:flex-row mx-auto mt-[70px] mb-[50px]">
                  <div
                    className="w-full lg:w-10/12 bg-white flex flex-col lg:flex-row h-max relative ab-certif__item__popup__wrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close Button */}
                    <button
                      className="absolute top-[-40px] right-0 w-[30px] h-[30px] text-white flex items-center justify-center cursor-pointer"
                      onClick={() => setActiveIndex(null)}
                    >
                      <span className="text-[40px] leading-none">&times;</span>
                    </button>

                    {/* Image */}
                    <div className="flex flex-col justify-center w-full lg:w-[35%] relative">
                      <Image
                        src={process.env.NEXT_PUBLIC_STORAGE_URL + item.image}
                        width={250}
                        height={250}
                        alt={item.name}
                        quality={100}
                        className="m-auto p-4"
                      />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col w-full lg:w-[65%] bg-[#e5e9f5] relative">
                      <div className="flex flex-col justify-center lg:min-h-[130px] border-b-[1px] border-[#13223333] py-5 px-6 lg:px-10">
                        <p className="text-darkblue text-[25px] lg:text-[35px] leading-[1.5] lg:leading-[1.2] font-raleway font-semibold">
                          {item.name}
                        </p>
                      </div>
                      <div className="flex flex-col h-full">
                        <p
                          className="text-sm lg:text-base font-normal leading-[1.7] lg:leading-[1.5] text-darkblue py-8 px-6 lg:px-10 overflow-y-auto min-h-[unset] lg:min-h-[300px] max-h-max lg:max-h-[45vh]"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default AboutCertificate;
