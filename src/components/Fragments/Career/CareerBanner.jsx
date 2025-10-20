"use client";
import Image from "next/image";

const CareerBanner = ({ dataSection }) => {
  return (
    <section className="flex flex-col bg-navyblue relative">
      <div className="w-full lg:w-[65%] flex flex-col">
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet={`${process.env.NEXT_PUBLIC_STORAGE_URL}${dataSection.image_desktop}`}
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${dataSection.image_mobile}`}
            alt="Banner background"
            width={2000}
            height={1200}
            quality={100}
            className="w-full h-full object-cover aspect-[320/211] lg:aspect-[957/631]"
          />
        </picture>
      </div>
      <div className="w-full relative lg:absolute lg:top-1/2 transform lg:-translate-y-1/2 left-0 h-max">
        <div className="container mx-auto flex flex-row-reverse">
          <div className="w-full lg:w-4/12 flex flex-col lg:pl-24 pt-5 pb-6 lg:pt-10 lg:pb-10">
            <h2 className="text-white text-[30px] lg:text-[50px] font-raleway font-normal leading-[1.3] lg:leading-[1.2] mb-2 lg:mb-0">
              {dataSection.title}
            </h2>
            <p className="text-white text-sm lg:text-lg leading-[1.7] lg:leading-[1.5] mt-2 lg:mt-4">
              {dataSection.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerBanner;
