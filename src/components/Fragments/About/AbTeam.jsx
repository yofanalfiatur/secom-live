"use client";

import { useRef, useState, useEffect } from "react";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const AboutTeam = ({ dataSection }) => {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(null);
  const isDesktop = useIsDesktop(); // Asumsi hook ini mengembalikan true untuk desktop

  //lock when popup open
  useEffect(() => {
    const header = document.querySelector(".header");

    if (activeIndex !== null) {
      document.body.classList.add("overflow-hidden");
      if (header) header.style.setProperty("top", "-95px", "important");
    } else {
      document.body.classList.remove("overflow-hidden");
      if (header) header.style.removeProperty("top");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      if (header) header.style.removeProperty("top");
    };
  }, [activeIndex]);

  // Auto play video popup di mobile ketika popup terbuka
  useEffect(() => {
    if (activeIndex !== null && !isDesktop) {
      const videoElement = document.querySelector(
        `.ab-team__item[data-index="${activeIndex}"] .ab-team__item__popup video`
      );
      if (videoElement) {
        videoElement.play().catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      }
    }
  }, [activeIndex, isDesktop]);

  return (
    <section className="flex flex-col relative overflow-hidden ab-team">
      {/* Intro Section */}
      <div
        className={`flex flex-col h-full w-full relative bg-cover bg-center bg-no-repeat ab-team__intro aspect-[20/11]`}
        style={{
          backgroundImage: `url(${
            process.env.NEXT_PUBLIC_STORAGE_URL + dataSection.background
          })`,
        }}
      >
        <div className="container mx-auto flex flex-col items-center relative z-[2]">
          <h2 className="text-white text-center w-full lg:w-[62%] text-sm sm:text-[18px] md:text-2xl lg:text-[50px] font-raleway font-normal pt-5 lg:pt-20 leading-[1.4] lg:leading-[1.2] mb-2 lg:mb-8 ab-team__intro__title">
            {dataSection.title}
          </h2>
        </div>
        {dataSection.photo_group && (
          <Image
            src={process.env.NEXT_PUBLIC_STORAGE_URL + dataSection.photo_group}
            width={1920}
            height={600}
            alt="About"
            quality={100}
            className={`w-full h-full object-cover object-center z-[1] absolute top-0 left-0 aspect-[20/11]`}
          />
        )}
      </div>

      {/* Leadership List */}
      <div className="container mx-auto">
        <div className="flex flex-row items-center mt-8 lg:mt-16 mb-6 lg:mb-8 gap-4 lg:gap-10">
          <p className="text-darkblue text-[25px] lg:text-[40px] font-raleway font-medium">
            {locale === "en" ? "Our Leadership" : "Our Leadership"}
          </p>
          <div className="flex-1 h-[1px] bg-[#13223333]"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-5 ab-team__list">
          {dataSection.cards.map((item, index) => {
            const videoRef = useRef(null);
            const videoRefPopup = useRef(null);
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                data-index={index}
                className={`ab-team__item flex flex-col group ${
                  isActive ? "active-card" : ""
                }`}
              >
                {/* Card Content (trigger popup) */}
                <div
                  className="flex flex-col cursor-pointer ab-team__item__content"
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => videoRef.current?.play()}
                  onMouseLeave={() => {
                    if (videoRef.current) {
                      videoRef.current.pause();
                      videoRef.current.currentTime = 0;
                    }
                  }}
                >
                  {/* Wrapper video only */}
                  <div className="w-full relative aspect-[1/1] overflow-hidden">
                    {/* Video - langsung terlihat dari awal */}
                    <video
                      ref={videoRef}
                      src={process.env.NEXT_PUBLIC_STORAGE_URL + item.video}
                      className="absolute z-0 inset-0 w-full h-full object-cover object-center"
                      muted
                      loop
                      playsInline
                    ></video>

                    {/* Plus Icon */}
                    <div className="absolute z-10 top-[10px] right-[10px] w-[40px] h-[40px] bg-navyblue flex items-center justify-center p-[10px]">
                      <div className="flex flex-col items-center justify-center relative w-full h-full">
                        <div className="w-full h-[4px] bg-tosca"></div>
                        <div className="w-[4px] h-full bg-tosca absolute top-1/2 left-1/2 transform -translate-1/2"></div>
                      </div>
                    </div>
                  </div>

                  {/* Text Info */}
                  <p className="text-darkblue text-xl lg:text-[25px] font-raleway font-semibold mt-4 lg:mt-9 mb-1">
                    {item.name}
                  </p>

                  <p
                    dangerouslySetInnerHTML={{ __html: item.position }}
                    className="text-base lg:text-xl text-darkblue font-raleway font-normal"
                  />
                </div>

                {/* Popup team */}
                <div
                  className={`flex flex-col justify-start lg:justify-center fixed z-[999] top-0 w-full h-full bg-[#132233e6] ab-item__item__popup transition-all duration-500 overflow-auto ${
                    isActive
                      ? "left-0 opacity-100 visible"
                      : "left-[120%] opacity-0 invisible"
                  }`}
                  onClick={() => setActiveIndex(null)} // klik overlay = close
                >
                  <div className="container flex flex-col h-max justify-center lg:flex-row mx-auto mt-[70px] mb-[50px]">
                    <div
                      className="w-full lg:w-10/12 bg-white flex flex-col lg:flex-row h-max relative ab-team__item__popup__wrap"
                      onClick={(e) => e.stopPropagation()} // klik di dalam box putih jangan close
                    >
                      {/* Close Button */}
                      <button
                        className="absolute top-[-40px] right-0 w-[30px] h-[30px] text-white flex items-center justify-center cursor-pointer ab-team__item__popup__close"
                        onClick={() => setActiveIndex(null)}
                      >
                        <span className="text-[40px] leading-none">
                          &times;
                        </span>
                      </button>

                      {/* Video Only - Auto play di mobile */}
                      <div
                        className="flex flex-col justify-center w-full lg:w-[35%] relative"
                        onClick={() => setActiveIndex(index)}
                        onMouseEnter={() => videoRefPopup.current?.play()}
                        onMouseLeave={() => {
                          if (videoRefPopup.current) {
                            videoRefPopup.current.pause();
                            videoRefPopup.current.currentTime = 0;
                          }
                        }}
                      >
                        <video
                          ref={videoRefPopup}
                          src={process.env.NEXT_PUBLIC_STORAGE_URL + item.video}
                          className="w-full h-full aspect-square object-cover object-center"
                          muted
                          loop
                          playsInline
                          autoPlay={!isDesktop && isActive} // Auto play di mobile ketika popup terbuka
                        ></video>
                      </div>

                      {/* Text Content */}
                      <div
                        className="flex flex-col w-full lg:w-[65%] relative bg-[#E6E9F5]"
                        onClick={() => setActiveIndex(index)}
                        onMouseEnter={() => videoRefPopup.current?.play()}
                        onMouseLeave={() => {
                          if (videoRefPopup.current) {
                            videoRefPopup.current.pause();
                            videoRefPopup.current.currentTime = 0;
                          }
                        }}
                      >
                        <div className="flex flex-col border-b-[1px] border-[#13223333] p-6">
                          <p className="text-darkblue text-[25px] lg:text-[35px] font-raleway font-semibold">
                            {item.name}
                          </p>
                          <p className="text-sm lg:text-xl text-darkblue font-raleway font-normal">
                            {item.position}
                          </p>
                        </div>
                        <div
                          dangerouslySetInnerHTML={{ __html: item.description }}
                          className="text-sm lg:text-base font-normal leading-[1.7] lg:leading-[1.5] text-darkblue py-6 px-6 overflow-y-auto min-h-[unset] lg:min-h-[300px] max-h-max lg:max-h-[45vh]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
