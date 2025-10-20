"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ButtonPrimary from "@/components/Elements/ButtonPrimary";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useTranslations } from "next-intl";

const AmPlacement = (props) => {
  const { translationKey, listProducts, pinPlacement } = props;
  const t = useTranslations();
  const AlarmCorners = t.raw(translationKey);
  const ProductDetails = t.raw(listProducts);
  const filteredProducts = ProductDetails.filter(
    (item) => item[pinPlacement] === true
  );

  const isDesktop = useIsDesktop();
  const [activeIndex, setActiveIndex] = useState(null); // index of hovered pin
  const [cardEnabled, setCardEnabled] = useState(null); // delay trigger

  const [activeIndexMd, setActiveIndexMd] = useState(0); // Track active slide index

  // Enable card hover after slight delay
  useEffect(() => {
    let timer;
    if (activeIndex !== null) {
      timer = setTimeout(() => {
        setCardEnabled(activeIndex);
      }, 100); // adjust delay here
    } else {
      setCardEnabled(null);
    }
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section className="pt-10 lg:pt-19 pb-35 lg:pb-8 am-corner" id="am-corner">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-darkblue font-normal text-[25px] lg:text-[40px] font-raleway lg:text-center">
          {AlarmCorners.title}
        </h2>
        <p className="text-darkblue text-sm lg:text-lg mt-2 lg:mt-5 lg:text-center w-full lg:w-7/12">
          {AlarmCorners.desc}
        </p>
        <div className="relative flex flex-col w-full mt-2 lg:mt-10">
          {isDesktop ? (
            <>
              <Image
                src={AlarmCorners.image}
                alt="AlarmCorners"
                width={1300}
                height={700}
                className="w-full h-auto relative z-0"
              />
              {filteredProducts.map((item, index) => (
                <div
                  key={index}
                  className={`absolute flex flex-col max-w-max -translate-x-1/2 -translate-y-1/2 ${
                    activeIndex === index || cardEnabled === index
                      ? "z-10"
                      : "z-0"
                  }`}
                  style={{
                    top: item[`${pinPlacement}Y`],
                    left: item[`${pinPlacement}X`],
                  }}
                  onMouseLeave={() => {
                    setActiveIndex(null);
                    setCardEnabled(null);
                  }}
                >
                  {/* Pin */}
                  <div
                    className="z-[1] rounded-full w-[50px] h-[50px] flex items-center justify-center cursor-pointer am-corner__pin"
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={30}
                      height={30}
                      className="relative z-[1]"
                    />
                    <div className="absolute w-[50px] h-[50px] z-0 bg-tosca rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 am-corner__pin__bg"></div>

                    <div className="absolute wrapper-pulse">
                      <div className="absolute w-[50px] h-[50px] border-tosca border-[2px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pulse-one" />
                      {/* <div className="absolute w-[50px] h-[50px] border-tosca border rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pulse-two" />
                      <div className="absolute w-[50px] h-[50px] border-tosca border rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pulse-three" /> */}
                    </div>
                  </div>
                  {/* Card */}
                  <div
                    className={`flex flex-col absolute min-w-[170px] z-[2] -translate-x-1/2 -translate-y-1/2 top-[-240%] left-[50%] transition-all duration-300 ${
                      activeIndex === index || cardEnabled === index
                        ? "opacity-100 visible pointer-events-auto"
                        : "opacity-0 invisible pointer-events-none"
                    }`}
                    onMouseEnter={() => {
                      if (cardEnabled === index) setActiveIndex(index);
                    }}
                  >
                    <div className="flex flex-col items-center bg-white m-[2px] min-h-[179px] relative z-[1] py-6 px-4">
                      <p className="text-darkblue font-medium text-center  font-raleway mb-2 leading-[1.3]">
                        {item.title}
                      </p>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="w-[44px] lg:w-max lg:h-auto"
                      />
                    </div>

                    {/* Background & Triangle */}
                    <div className="absolute top-0 left-0 w-full h-full z-0 animated-gradient-bg2"></div>
                    <div className="absolute z-[3] bottom-[2px] left-[42%] -translate-x-1/2 -translate-y-1/2 flex">
                      <div className="absolute w-[20px] h-[20px] border-t-[20px] border-tosca border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent"></div>
                      <div className="absolute top-[-2px] w-[20px] h-[20px] border-t-[20px] border-white border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent scale-[82%]"></div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="flex flex-col relative">
                <Image
                  src={AlarmCorners.image}
                  alt="AlarmCorners"
                  width={1300}
                  height={700}
                  className="w-full h-auto relative z-0"
                />
                <div className="absolute top-0 left-0 w-full h-full z-1">
                  {filteredProducts.map((item, index) => (
                    <div
                      className="z-[1] rounded-full w-[20px] h-[20px] flex items-center justify-center cursor-pointer absolute"
                      style={{
                        top: `calc(${item[`${pinPlacement}Y`]} - 10px)`,
                        left: `calc(${item[`${pinPlacement}X`]} - 10px)`,
                      }}
                      key={index}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={10}
                        height={10}
                        className="relative z-[1]"
                      />
                      <div
                        className={`absolute w-[20px] h-[20px] z-0 bg-tosca rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                          activeIndexMd === index ? "am-corner__pin__bg" : ""
                        }`}
                      ></div>
                      <div
                        className={`absolute wrapper-pulse transition-opacity duration-300 ${
                          activeIndexMd === index ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div className="absolute w-[20px] h-[20px] border-tosca border rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pulse-one" />
                        {/* <div className="absolute w-[20px] h-[20px] border-tosca border rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pulse-two" />
                        <div className="absolute w-[20px] h-[20px] border-tosca border rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pulse-three" /> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-flex relative w-full overflow-hidden z-1">
                {/* Slider */}
                <div className="flex flex-col am-corner__wrap-slider relative z-[1] w-full bg-white">
                  <Splide
                    options={{
                      type: "loop",
                      autoplay: { isDesktop: false, isMobile: true },
                      interval: 4000,
                      perPage: 1,
                      perMove: 1,
                      gap: "20px",
                      arrows: true,
                      pagination: false,
                    }}
                    hasTrack={false}
                    onMove={(splide, newIndex) => setActiveIndexMd(newIndex)}
                  >
                    <SplideTrack>
                      {filteredProducts.map((item, index) => (
                        <SplideSlide
                          key={index}
                          className="flex flex-col w-full"
                        >
                          <div className="relative p-1  min-h-[240px] mt-8">
                            <div className="absolute top-0 left-0 w-full h-full z-0 animated-gradient-bg2"></div>
                            <div className="flex flex-col justify-center items-center w-full h-full relative z-[1] bg-white gap-3">
                              <p className="font-normal mt-2">{item.title}</p>
                              <Image
                                src={item.image}
                                alt={item.title}
                                width={110}
                                height={110}
                              />
                            </div>
                          </div>
                        </SplideSlide>
                      ))}
                    </SplideTrack>
                    {/* Custom Arrow Buttons */}
                    <div className="splide__arrows absolute top-[35px] w-full z-10">
                      <button className="splide__arrow splide__arrow--prev !bg-white !opacity-100 !border-tosca !border-[1px] !rounded-none !left-[38%] ">
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
                      <button className="splide__arrow splide__arrow--next !bg-white !opacity-100 !border-tosca !border-[1px] !rounded-none !right-[38%]">
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
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AmPlacement;
