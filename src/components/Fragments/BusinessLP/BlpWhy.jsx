"use client";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRef, useEffect } from "react";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { useTranslations } from "next-intl";
import Image from "next/image";

const BlpWhy = ({ dataSection }) => {
  const isDesktop = useIsDesktop();
  return (
    <section className="flex flex-col relative overflow-hidden pt-8 lg:pt-0 pb-9 lg:pb-0 lg:border-b-1 lg:border-[#13223333] blp-why ">
      <div className="container mx-auto flex flex-col lg:flex-row">
        <div className="w-full lg:w-7/12 flex flex-col justify-center lg:border-r-1 lg:border-[#13223333]">
          <h2 className="text-darkblue leading-[1.3] lg:leading-[1.2] text-3xl lg:text-6xl font-medium font-raleway relative after:content-[''] after:lg:content-none after:absolute after:w-[200%] after:h-[1px] after:bg-[#13223333] after:bottom-[0%] after:left-[-50%] after:-translate-y-1/2 pb-8 lg:pb-0">
            {dataSection.title_section}
          </h2>

          {!isDesktop && (
            <div className="flex flex-col relative after:content-[''] after:lg:content-none after:absolute after:w-[200%] after:h-[1px] after:bg-[#13223333] after:bottom-[0%] after:left-[-50%] after:-translate-y-1/2">
              <Image
                src={
                  process.env.NEXT_PUBLIC_STORAGE_URL +
                  dataSection.image_section
                }
                width={600}
                height={600}
                quality={100}
                alt={dataSection.title_section}
                className="mt-7 mb-8 lg:mt-20 lg:mb-20 lg:mr-0 w-full h-auto lg:aspect-[285/260] object-cover"
              />
            </div>
          )}

          <div className="flex flex-col mt-12 gap-8 relative after:content-[''] after:lg:content-none after:absolute after:w-[200%] after:h-[1px] after:bg-[#13223333] after:bottom-[0%] after:left-[-50%] after:-translate-y-1/2 pb-10 lg:pb-0">
            {dataSection.list_items.map((item, index) => (
              <div className="flex flex-row items-center gap-4" key={index}>
                <Image
                  src={process.env.NEXT_PUBLIC_STORAGE_URL + item.logo}
                  width={55}
                  height={52}
                  alt={item.text}
                  className="w-[44px] object-contain lg:w-[55px]"
                />
                <p className="text-[#132233] text-sm lg:text-lg font-normal">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {isDesktop && (
          <div className="w-full lg:w-5/12 flex flex-col lg:pl-14">
            <Image
              src={
                process.env.NEXT_PUBLIC_STORAGE_URL + dataSection.image_section
              }
              width={600}
              height={600}
              alt="About"
              className="mt-7 mb-8 lg:mt-20 lg:mb-20 lg:mr-0 w-full h-auto lg:aspect-[462/422] object-cover"
              quality={100}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BlpWhy;
