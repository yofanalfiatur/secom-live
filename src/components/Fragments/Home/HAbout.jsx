"use client";

import { useEffect } from "react";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { useLocale } from "next-intl";
import ButtonPrimary from "@/components/Elements/ButtonPrimary";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import "glightbox/dist/css/glightbox.min.css";
import BackgroundDots from "@/components/Elements/BackgroundDots";

const HomeAbout = ({ dataSection }) => {
  const isDesktop = useIsDesktop();
  const locale = useLocale();

  useEffect(() => {
    import("glightbox").then(({ default: GLightbox }) => {
      const lightbox = GLightbox({
        selector: ".glightbox",
        loop: false,
        zoomable: true,
        draggable: true,
        touchNavigation: false,
        openEffect: "zoom",
        closeEffect: "zoom",
        onOpen: () => {
          console.log("Lightbox opened");
        },
        onClose: () => {
          console.log("Lightbox closed");
        },
      });

      return () => {
        lightbox.destroy();
      };
    });
  }, []);

  return (
    <>
      <section className="flex flex-col pt-43 lg:pt-62 pb-5 lg:pb-30 relative h-about">
        <BackgroundDots
          dotSize={isDesktop ? 2.5 : 2}
          dotsX={isDesktop ? 45 : 20}
          dotsY={isDesktop ? 35 : 35}
        />
        <div className="container relative z-1 mx-auto flex flex-row flex-wrap items-center justify-between lg:gap-y-5">
          <div className="flex flex-col justify-center w-full lg:w-8/12 mb-8 lg:mb-[unset] lg:pr-60 bg-white/40">
            <h2 className="text-[35px] lg:text-6xl font-raleway leading-[1.3] lg:leading-[1.4] font-medium text-navyblue">
              {dataSection.title}
            </h2>
            <p className="text-sm lg:text-lg mt-3 mb-2">
              {dataSection.description}
            </p>
            <ButtonPrimary
              href={dataSection.button_link}
              target="_self"
              className="mt-4"
            >
              {dataSection.button_text}
            </ButtonPrimary>
          </div>
          <div className="flex flex-col w-[48%] lg:w-4/12">
            <Link
              href={dataSection.video_profile}
              className="glightbox w-full h-full relative flex flex-col justify-center items-center after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-tosca after:opacity-60 group"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${dataSection.image_thumbnail}`}
                width={600}
                height={600}
                quality={100}
                alt="profile"
                className="w-full h-full lg:h-[388] aspect-[135/124] lg:aspect-auto object-cover top-0 left-0 opacity-100"
              />
              <div className="absolute z-[1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col lg:flex-row justify-center items-center w-max gap-4 lg:gap-6 after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:transition-all after:duration-200 after:ease-in-out after:w-[0%] after:h-[2px] after:z-[4] after:bg-white group-hover:after:w-full">
                <div className="bg-white triangle-shape w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] "></div>
                <p className="text-white text-xs lg:text-lg ">
                  {locale === "en"
                    ? "OUR COMPANY PROFILE VIDEO"
                    : "PROFIL PERUSAHAAN KAMI"}
                </p>
              </div>
            </Link>
          </div>
          <div className="flex flex-col w-full lg:w-8/12 order-1 lg:order-[unset] mt-4 lg:mt-[unset] mb-3 lg:mb-[unset]">
            <Image
              src={
                process.env.NEXT_PUBLIC_STORAGE_URL + dataSection.image_large
              }
              width={1600}
              height={1000}
              quality={100}
              alt="about"
              className="w-full h-full lg:h-[400px] object-cover object-center opacity-100 lg:pr-5 aspect-[285/128] lg:aspect-auto"
            />
          </div>
          <div className="flex flex-col w-[48%] lg:w-4/12 ">
            <Image
              src={
                process.env.NEXT_PUBLIC_STORAGE_URL + dataSection.image_small
              }
              alt="about"
              width={1600}
              height={1000}
              quality={100}
              className="w-full h-full lg:h-[400px] object-cover object-center opacity-100 aspect-[135/124] lg:aspect-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeAbout;
