"use client";

import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const HomeSegment = ({ dataSection }) => {
  const isDesktop = useIsDesktop();
  return (
    <>
      <section className="flex flex-col relative bg-navyblue pt-8 lg:pt-12 lg:pb-20 h-segment">
        <div className="flex flex-col items-center container mx-auto relative z-[2]">
          <h2 className="text-white text-[30px] lg:text-[45px] font-raleway font-normal">
            {dataSection.title}
          </h2>
          <p className="text-white text-center text-sm lg:text-lg leading-[1.7] lg:leading-[1.5] w-full mt-2 mb-5 lg:mt-1 lg:mb-10">
            {dataSection.description}
          </p>
          <div className="gap-5 flex flex-col lg:flex-row mb-[-150px] lg:mb-[-270px]">
            {dataSection.cards?.map((item, index) => (
              <div className="flex flex-col relative group" key={index}>
                <Link
                  href={item.url}
                  className={`flex flex-col items-center relativ z-10 group transition-all duration-300 ease h-full m-1`}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.image}`}
                    alt={item.title}
                    width={1000}
                    height={1000}
                    quality={100}
                    className="w-full lg:h-[450px] object-cover"
                  />
                  <div
                    className={`flex flex-col items-center px-5 lg:px-6 py-4 lg:py-5 lg:absolute lg:bottom-0 w-full lg:w-[93%] lg:mb-5 transition-all duration-300 ease ${
                      index === 0 ? "bg-tosca lg:bg-navyblue" : "bg-tosca"
                    }`}
                  >
                    <p className="text-white lg:text-[30px] mb-1">
                      {item.title}
                    </p>
                    <p className="text-white text-sm lg:text-lg leading-[1.7] lg:leading-[1.5]">
                      {item.description}
                    </p>
                  </div>
                </Link>
                <div className="absolute top-0 left-0 w-full h-full z-0 animated-gradient-bg2 transition-all duration-200 ease opacity-0 group-hover:opacity-100"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSegment;
