"use client";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useEffect, useState } from "react";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const AbWorldMap = (props) => {
  const { dataSection, pinMap } = props;

  const isDesktop = useIsDesktop();

  const [activeIndex, setActiveIndex] = useState(null); // hover desktop
  const [cardEnabled, setCardEnabled] = useState(null); // delay hover
  const [activeSlide, setActiveSlide] = useState(0); // sinkronisasi slider mobile

  // Delay hover desktop
  useEffect(() => {
    let timer;
    if (activeIndex !== null) {
      timer = setTimeout(() => {
        setCardEnabled(activeIndex);
      }, 100);
    } else {
      setCardEnabled(null);
    }
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section className="bg-darkblue pt-13 pb-10 lg:pt-13 lg:pb-10 flex flex-col items-center overflow-hidden abw-map">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-white text-[30px] lg:text-[40px] font-raleway font-normal text-center">
          {dataSection.title}
        </h2>
        <p className="text-white lg:w-[55%] text-sm lg:text-lg leading-[1.7] lg:leading-[1.5] text-center mt-2 lg:mt-3 mb-8 lg:mb-13">
          {dataSection.description}
        </p>
      </div>

      {/* MAP + PIN */}
      <div className="px-4 lg:px-15 xl:px-20 flex flex-col items-center w-full relative">
        <Image
          src={`/img/temp/about/abw-bg-map.png`}
          width={1920}
          height={1080}
          alt="ab-world-map"
          quality={100}
          className="w-full h-full object-cover"
        />

        {pinMap.map((item, index) => (
          <Link
            href={item.href}
            className={`absolute ${
              activeIndex === index || cardEnabled === index ? "z-10" : "z-0"
            } abw-map__item`}
            style={{ top: item.top, left: item.left }}
            key={index}
            target="_blank"
            onMouseLeave={() => {
              setActiveIndex(null);
              setCardEnabled(null);
            }}
          >
            {/* Pin Desktop / Mobile */}
            <div
              className={`abw-map__item__sonar transition-all duration-300 ease-in ${
                isDesktop
                  ? "opacity-100 visible"
                  : activeSlide === index
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
              }`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="absolute w-[15px] h-[15px] lg:w-[20px] lg:h-[20px] bg-tosca rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 abw-map__item__pin__bg"></div>
              <div className="absolute w-[15px] h-[15px] lg:w-[20px] lg:h-[20px] border-tosca border-[1px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pulse-one"></div>
            </div>

            {/* Card */}
            {isDesktop && (
              <div
                className={`abw-map__item__wrap-text flex flex-col absolute top-[-30px] left-1/2 -translate-1/2 w-max justify-center items-center transition-all duration-300 ease ${
                  activeIndex === index || cardEnabled === index
                    ? "opacity-100 visible pointer-events-auto"
                    : "opacity-0 invisible pointer-events-none"
                }`}
                onMouseEnter={() => {
                  if (cardEnabled === index) setActiveIndex(index);
                }}
              >
                <div className="flex flex-row items-center gap-3 relative z-10 bg-white h-full px-2 py-[5px] m-[2px]">
                  <Image
                    src={item.flag}
                    width={20}
                    height={14}
                    quality={100}
                    alt="flag"
                    className="w-[20px] h-[14px] object-cover"
                  />
                  <p className="text-darkblue text-xs font-raleway font-normal leading-[1]">
                    {item.text}
                  </p>
                </div>
                {/* Background & Triangle */}
                <div className="absolute top-0 left-0 w-full h-full z-0 animated-gradient-bg2"></div>
                <div className="absolute z-[3] bottom-[10px] left-[calc(50%-14px)] -translate-x-1/2 -translate-y-1/2 flex">
                  <div className="absolute w-[20px] h-[20px] border-t-[20px] border-tosca border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent"></div>
                  <div className="absolute top-[-2px] w-[20px] h-[20px] border-t-[20px] border-white border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent scale-[82%]"></div>
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* list slider mobile */}
      {!isDesktop && (
        <div className="flex flex-col w-full container mx-auto abw-map__wrap-slider-md">
          <Splide
            options={{
              type: "loop",
              autoplay: false,
              interval: 4000,
              pauseOnHover: true,
              arrows: true,
              pagination: false,
              perPage: 1,
              gap: "1.5rem",
            }}
            hasTrack={false}
            className="w-full mt-6 mb-2"
            onMoved={(splide, newIndex) => setActiveSlide(newIndex)}
          >
            <SplideTrack>
              {pinMap.map((item, index) => (
                <SplideSlide
                  key={index}
                  className="w-full flex flex-col items-center justify-center"
                >
                  <Link
                    href={item.href}
                    target="_blank"
                    className="flex flex-row gap-3 items-center justify-center abw-map__slider-md__item"
                  >
                    <Image
                      src={item.flag}
                      width={20}
                      height={14}
                      quality={100}
                      alt="flag"
                      className="w-[28px] h-[21px] object-cover"
                    />
                    <p className="text-white text-base font-raleway font-normal leading-[1]">
                      {item.text}
                    </p>
                  </Link>
                </SplideSlide>
              ))}
            </SplideTrack>
            {/* Custom Arrow Buttons */}
            <div className="splide__arrows absolute top-1/2 w-full z-10">
              <button className="splide__arrow splide__arrow--prev !bg-white !opacity-100 !border-white !border-[1px] !rounded-none !left-[0%]">
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
              <button className="splide__arrow splide__arrow--next !bg-white !opacity-100 !border-white !border-[1px] !rounded-none !right-[0%]">
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
      )}
    </section>
  );
};

export default AbWorldMap;
