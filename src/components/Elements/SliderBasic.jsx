"use client";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const SliderBasic = ({ items, linkLabel, target }) => {
  const locale = useLocale();

  // fallback if linkLabel is not provided
  const defaultLabel = locale === "en" ? "Read more" : "Baca Selengkapnya";
  const finalLabel = linkLabel ? linkLabel[locale] : defaultLabel;

  return (
    <Splide
      options={{
        type: "loop",
        autoplay: false,
        interval: 4000,
        pauseOnHover: true,
        arrows: false,
        pagination: false,
        perPage: 3,
        gap: "1.2rem",
        breakpoints: {
          1024: {
            perPage: 2,
            arrows: true,
          },
          768: {
            perPage: 1,
          },
        },
      }}
      className="w-full slider-basic"
      hasTrack={false}
    >
      <SplideTrack className="slider-basic__track">
        {items.map((item, index) => {
          return (
            <SplideSlide
              key={index}
              className="flex flex-col pb-6 lg:pb-15 px-[2px] slider-basic__slide"
            >
              <div className="card-slider-basic__item bg-white shadow-[0px_2.71px_10.18px_0px_#00000026] lg:shadow-[0px_4px_15px_0px_#00000026] flex flex-col h-full">
                {/* Image */}
                <div className="flex flex-col w-full">
                  <Image
                    src={process.env.NEXT_PUBLIC_STORAGE_URL + item.image}
                    alt={`trusted-${index}`}
                    width={420}
                    height={291}
                    quality={100}
                    className="w-full h-full object-cover aspect-[285/197] lg:aspect-[420/291] card-slider-basic__img"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1 pt-8 px-6 pb-8 lg:pb-10 h-full">
                  <p className="text-darkblue font-semibold text-base lg:text-[25px]">
                    {item.title}
                  </p>
                  <p className="text-darkblue text-sm lg:text-base font-normal">
                    {item.description}
                  </p>

                  <Link
                    href={item.url}
                    target={target}
                    className="uppercase text-sm lg:text-lg text-tosca font-raleway tracking-[2px] max-w-max flex pt-2 lg:pt-5 mt-auto flex-row transition-all duration-200 ease items-center gap-2 hover:gap-3 relative after:content-[''] after:w-0 after:h-[1px] after:absolute after:bottom-0 after:bg-tosca after:transition-all after:ease after:duration-200 hover:after:w-full card-slider-basic__link"
                  >
                    <p>{finalLabel}</p>

                    <svg
                      width="12"
                      height="10"
                      viewBox="0 0 12 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.16497 9.77786L11.97 5.02448L7.16497 0.271102C7.12158 0.215019 7.06644 0.168767 7.0033 0.135476C6.94017 0.102186 6.8705 0.0826352 6.79901 0.0781468C6.72753 0.0736583 6.6559 0.0843374 6.58898 0.109461C6.52205 0.134584 6.46139 0.173566 6.41111 0.223766C6.36082 0.273966 6.32208 0.334213 6.29751 0.400429C6.27294 0.466644 6.26312 0.537282 6.2687 0.60756C6.27428 0.677838 6.29514 0.746115 6.32986 0.80777C6.36459 0.869424 6.41237 0.923016 6.46997 0.964918L10.065 4.53241L0.49997 4.53241C0.367362 4.53241 0.240186 4.58426 0.146417 4.67654C0.0526493 4.76882 -2.97778e-05 4.89398 -2.97836e-05 5.02448C-2.97894e-05 5.15499 0.0526493 5.28015 0.146417 5.37243C0.240185 5.46471 0.367362 5.51655 0.49997 5.51655L10.065 5.51655L6.46997 9.08405C6.37648 9.17671 6.32422 9.30212 6.32469 9.4327C6.32516 9.56327 6.37832 9.68832 6.47247 9.78032C6.56662 9.87233 6.69406 9.92376 6.82674 9.9233C6.95942 9.92284 7.08648 9.87052 7.17997 9.77786L7.16497 9.77786Z"
                        fill="#00AAAD"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </SplideTrack>

      {/* Custom Arrows */}
      <div className="splide__arrows absolute top-[calc(100%+10px)] w-full z-10">
        <button className="splide__arrow splide__arrow--prev !bg-white !opacity-100 !border-white !border-[1px] !rounded-none !left-[35%] shadow-[0px_1.96px_15px_0px_#0000001A]">
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
        <button className="splide__arrow splide__arrow--next !bg-white !opacity-100 !border-white !border-[1px] !rounded-none !right-[35%] shadow-[0px_1.96px_15px_0px_#0000001A]">
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
  );
};

export default SliderBasic;
