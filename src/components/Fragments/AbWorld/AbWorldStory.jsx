"use client";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { useTranslations } from "next-intl";
import Image from "next/image";

const AbWorldStory = ({ dataSection }) => {
  const isDesktop = useIsDesktop();

  return (
    <section className="placeholder-violet-600 pt-8 lg:pt-13 pb-8 lg:pb-0 abw-story">
      {/* Title & Description */}
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-darkblue text-[30px] lg:text-[40px] font-raleway font-normal text-center">
          {dataSection.title}
        </h2>
        <p className="text-sm lg:text-lg leading-[1.7] lg:leading-[1.5] text-darkblue text-center lg:w-[55%] mt-2 lg:mt-3 mb-7 lg:mb-15">
          {dataSection.desc}
        </p>
      </div>

      {/* Content */}
      <div className="w-full border-t border-[#00000033] px-4 lg:px-0">
        {isDesktop ? (
          // Desktop → Grid
          <div className="grid grid-cols-3">
            {dataSection.cards.map((item, index) => (
              <div
                key={index}
                className="flex flex-col border-r border-b border-[#00000033] relative group"
              >
                <div className="pl-10 pt-5 pb-10 pr-4 flex flex-col relative z-[1] h-full  m-[3px] bg-white">
                  <Image
                    src={process.env.NEXT_PUBLIC_STORAGE_URL + item.logo}
                    width={50}
                    height={50}
                    alt={item.title}
                    className="self-end"
                  />
                  <p className="font-raleway font-normal text-darkblue text-base lg:text-[25px] mt-4 lg:mt-14">
                    {item.description}
                  </p>
                  <p className="text-navyblue text-[30px] lg:text-[50px] font-bold">
                    {item.title}
                  </p>
                  <p className="font-raleway font-normal text-darkblue text-base lg:text-[25px]">
                    {item.subtitle}
                  </p>
                </div>

                <div className="absolute top-0 left-0 w-full h-full z-0 bg-white transition-all duration-200 ease opacity-100 group-hover:opacity-0"></div>
                <div className="absolute top-0 left-0 w-full h-full z-0 animated-gradient-bg2 transition-all duration-200 ease opacity-0 group-hover:opacity-100"></div>
              </div>
            ))}
          </div>
        ) : (
          // Mobile → Splide Slider
          <Splide
            options={{
              type: "loop",
              autoplay: false,
              interval: 4000,
              pauseOnHover: true,
              arrows: false,
              pagination: true,
              perPage: 1,
            }}
            hasTrack={false}
            className="slider-with-pagin abw-story__slider"
          >
            <SplideTrack>
              {dataSection.cards.map((item, index) => (
                <SplideSlide key={index} className="abw-story__item">
                  <div className="flex flex-col pt-4 pb-5">
                    <Image
                      src={process.env.NEXT_PUBLIC_STORAGE_URL + item.logo}
                      width={50}
                      height={50}
                      quality={100}
                      alt={item.title}
                      className="w-[35px] h-[35px] mb-12 object-contain self-end"
                    />
                    <p className="font-raleway font-normal text-darkblue text-base lg:text-[25px]">
                      {item.description}
                    </p>
                    <p className="text-navyblue text-[32px] lg:text-[50px] font-bold">
                      {item.title}
                    </p>
                    <p className="font-raleway font-normal text-darkblue text-base lg:text-[25px]">
                      {item.subtitle}
                    </p>
                  </div>
                </SplideSlide>
              ))}
            </SplideTrack>
          </Splide>
        )}
      </div>
    </section>
  );
};

export default AbWorldStory;
