"use client";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import Image from "next/image";

const AboutWhy = ({ dataSection }) => {
  const isDesktop = useIsDesktop();
  return (
    <>
      <section className="relative pt-10 lg:pt-15 pb-10 lg:pb-12 ab-why">
        <div className="container mx-auto flex flex-col items-center">
          <h2 className="text-darkblue font-raleway font-medium text-[30px] lg:text-[40px]">
            {dataSection.title}
          </h2>
          <p className="text-sm font-normal lg:text-lg text-center text-darkblue lg:w-[50%] pt-3 pb-3 leading-[1.7] lg:leading-[1.5]">
            {dataSection.description}
          </p>
          <div className="w-full ab-why__wrap-slider">
            <Splide
              options={{
                type: "loop",
                autoplay: false,
                interval: 4000,
                pauseOnHover: true,
                arrows: false,
                pagination: false,
                perPage: 4,
                destroy: true,
                breakpoints: {
                  1024: {
                    destroy: false,
                    perPage: 2,
                    pagination: true,
                  },
                  768: {
                    perPage: 1,
                  },
                },
              }}
              className="w-full slider-with-pagin ab-why__slider"
              hasTrack={false}
            >
              <SplideTrack>
                {dataSection.cards.map((item, index) => (
                  <SplideSlide
                    key={index}
                    className={`ab-why__slide ${
                      isDesktop ? "w-1/4" : "w-full"
                    }`}
                  >
                    <div
                      className={`ab-why__item flex flex-col items-center p-6`}
                    >
                      <Image
                        src={process.env.NEXT_PUBLIC_STORAGE_URL + item.logo}
                        alt={item.title}
                        width={100}
                        height={100}
                        quality={100}
                        className="mb-4 ab-why__icon"
                      />
                      <p className="text-tosca font-raleway font-bold text-lg text-center ab-why__item-title">
                        {item.title}
                      </p>
                      <p className="text-center ab-why__item-desc">
                        {item.description}
                      </p>
                    </div>
                  </SplideSlide>
                ))}
              </SplideTrack>
            </Splide>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutWhy;
