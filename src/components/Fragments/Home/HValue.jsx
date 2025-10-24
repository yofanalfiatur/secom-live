"use client";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRef, useEffect } from "react";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { useTranslations } from "next-intl";
import Image from "next/image";

const HomeValue = ({ dataSection }) => {
  const isDesktop = useIsDesktop();
  return (
    <>
      <section className="flex flex-col pt-6 lg:pt-17 pb-10 lg:pb-27 h-value">
        <div className="flex flex-col container mx-auto">
          <h2
            className="text-navyblue text-[30px] lg:text-[45px] leading-[1.4] font-raleway font-medium mb-8 lg:mb-20"
            dangerouslySetInnerHTML={{ __html: dataSection.title }}
          />
          <div className="flex flex-col md:flex-row gap-8 lg:gap-5 justify-start lg:justify-between">
            {dataSection.features?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center px-6 lg:px-0 w-full lg:w-[24%]"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.icon}`}
                  alt={item.title}
                  width={isDesktop ? 95 : 70}
                  height={isDesktop ? 95 : 70}
                  className="object-contain aspect-square"
                />
                <p className="text-darkblue text-base lg:text-xl text-center font-medium mt-4 lg:mt-8 mb-2">
                  {item.title}
                </p>
                <p className="text-darkblue text-sm text-center lg:base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeValue;
