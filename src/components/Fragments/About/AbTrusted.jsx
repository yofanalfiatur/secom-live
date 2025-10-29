"use client";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useLocale } from "next-intl";
import Image from "next/image";

const AboutTrusted = ({ dataSection, classWrapper }) => {
  const locale = useLocale();

  return (
    <section
      className={`flex flex-col pt-0 pb-8 lg:pt-10 lg:pb-30 overflow-hidden ab-trusted ${classWrapper}`}
    >
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h2 className="text-darkblue text-[25px] lg:text-[40px] font-raleway font-medium">
          {dataSection.title_override === null ||
          dataSection.title_override === undefined
            ? dataSection.title
            : dataSection.title_override}
        </h2>
        <div className="flex w-full flex-col mb-4 mt-4 ab-trusted__wrap-slider">
          <Splide
            options={{
              type: "loop",
              autoplay: false,
              interval: 4000,
              pauseOnHover: true,
              arrows: false,
              pagination: true,
              perPage: 4,
              gap: "1.5rem",
              breakpoints: {
                992: {
                  perPage: 3,
                },
                768: {
                  perPage: 2,
                },
              },
            }}
            className="w-full slider-with-pagin ab-trusted__slider"
            hasTrack={false}
          >
            <SplideTrack className="!overflow-visible mb-8 ab-trusted__track">
              {dataSection.logo.map((img, index) => (
                <SplideSlide
                  key={index}
                  className="flex flex-col ab-trusted__slide"
                >
                  <div className="ab-trusted__item w-full h-full flex flex-col items-center">
                    <Image
                      src={process.env.NEXT_PUBLIC_STORAGE_URL + img}
                      alt={`trusted-${index}`}
                      width={300}
                      height={200}
                      quality={100}
                      className="object-contain w-full lg:max-h-[165px] ab-trusted__img"
                    />
                  </div>
                </SplideSlide>
              ))}
            </SplideTrack>
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default AboutTrusted;
