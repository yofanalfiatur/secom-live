"use client";
import BackgroundDots from "@/components/Elements/BackgroundDots";
import ButtonPrimary from "@/components/Elements/ButtonPrimary";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const SolDtHighlight = (props) => {
  const { dataSection, buttonContact, haveCatalogue, catalogue } = props;
  const locale = useLocale();
  const isDesktop = useIsDesktop();

  return (
    <section className="flex flex-col relative pt-11 lg:pt-36 pb-8 lg:pb-26 overflow-hidden sol-dt-highlight">
      <BackgroundDots
        dotSize={isDesktop ? 2.5 : 2}
        dotsX={isDesktop ? 35 : 15}
        dotsY={isDesktop ? 25 : 35}
      />
      <div className="container mx-auto relative z-[1]">
        <h2 className="text-darkblue font-raleway font-normal text-[30px] lg:text-[40px] text-center leading-[1.3] lg:leading-[1.2]mb-8 lg:mb-11">
          {dataSection.title}
        </h2>
        <p className="text-darkblue text-sm lg:text-lg font-normal text-center leading-[1.7] lg:leading-[1.5] mb-10 lg:mb-16">
          {dataSection.description}
        </p>
        <div className="flex flex-col gap-y-10 lg:gap-y-10">
          {dataSection.cards.map((item, index) => (
            <div
              className="flex flex-col lg:flex-row [&:nth-child(even)]:lg:flex-row-reverse group"
              key={index}
            >
              <div className="w-full lg:w-7/12 flex flex-col h-max">
                <Image
                  src={process.env.NEXT_PUBLIC_STORAGE_URL + item.image}
                  width={1600}
                  height={800}
                  alt={item.title}
                  className="w-full h-auto aspect-[285/162] lg:aspect-[748/425] object-center object-cover"
                  quality={100}
                />
              </div>
              <div className="w-full lg:w-5/12 flex flex-col justify-center group-[&:nth-child(odd)]:lg:pl-20 group-[&:nth-child(even)]:lg:pr-20">
                <p className="text-darkblue font-raleway font-normal text-[20px] lg:text-[35px] mt-2 lg:mt-0">
                  {item.title}
                </p>
                <p className="text-darkblue text-sm font-normal leading-[1.7] lg:leading-[1.5] mt-1 lg:mt-3 lg:text-[18px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {haveCatalogue !== null &&
        haveCatalogue !== undefined &&
        haveCatalogue !== false &&
        haveCatalogue === true && (
          <div className="container mx-auto relative z-[1] mt-10 lg:mt-28 lg:bg-navyblue flex flex-col-reverse lg:flex-row overflow-hidden lg:overflow-visible">
            <div className="w-full lg:w-4/12 flex flex-col items-center relative bg-navyblue overflow-hidden lg:overflow-visible">
              <Image
                src={process.env.NEXT_PUBLIC_STORAGE_URL + catalogue.image}
                width={171}
                height={171}
                quality={100}
                alt="banner catalogue"
                className=" object-contain relative z-[1] lg:mt-[-10%]"
              />
              <div
                className="bg-tosca w-[200%] lg:w-[130%] h-full absolute bottom-0 left-1/2 -translate-x-1/2"
                style={{
                  clipPath: isDesktop
                    ? "circle(50% at 50% 200%)"
                    : "circle(50% at 50% 170%)",
                }}
              ></div>
            </div>
            <div className="w-full lg:w-5/12 order-[1] lg:order-[unset] flex flex-col justify-center items-center lg:items-start px-4 lg:px-0 pt-6 pb-6 bg-navyblue">
              <p className="text-white font-raleway font-normal text-[20px] lg:text-[30px] text-center lg:text-start leading-[1.5]">
                {locale === "en"
                  ? "Check our products in our catalogue"
                  : "Periksa produk kami di katalog kami"}
              </p>
            </div>
            <div className="w-full lg:w-3/12 flex flex-col justify-center items-center lg:items-end lg:pr-6  bg-navyblue">
              <Link
                href="#document"
                target="_blank"
                className="flex flex-row items-center bg-tosca rounded-[5px] max-w-max px-3 py-1.5 lg:px-5 lg:py-4 mb-8 lg:mb-0 gap-3 transition-all ease duration-200 hover:bg-white group"
              >
                <svg
                  width="27"
                  height="28"
                  viewBox="0 0 27 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="scale-80 lg:scale-100"
                >
                  <path
                    d="M8.76563 24.4063H18.2336C19.2779 24.4063 20.2794 23.9914 21.0179 23.253C21.7563 22.5146 22.1711 21.513 22.1711 20.4688V14.2475C22.1715 13.2033 21.7571 12.2018 21.0191 11.4631L14.304 4.74688C13.9383 4.38125 13.5042 4.09124 13.0265 3.89338C12.5488 3.69553 12.0367 3.59371 11.5196 3.59375H8.76563C7.72134 3.59375 6.71982 4.00859 5.98139 4.74702C5.24297 5.48544 4.82813 6.48696 4.82812 7.53125V20.4688C4.82812 21.513 5.24297 22.5146 5.98139 23.253C6.71982 23.9914 7.72134 24.4063 8.76563 24.4063Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-navyblue transition-all ease duration-200"
                  />
                  <path
                    d="M13.1484 3.99878V10.3663C13.1484 10.963 13.3855 11.5353 13.8074 11.9573C14.2294 12.3792 14.8017 12.6163 15.3984 12.6163H21.7682"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-navyblue transition-all ease duration-200"
                  />
                  <path
                    d="M8.15625 19.0625V17.9375M8.15625 17.9375V15.6875H9.28125C9.57962 15.6875 9.86577 15.806 10.0767 16.017C10.2877 16.228 10.4062 16.5141 10.4062 16.8125C10.4062 17.1109 10.2877 17.397 10.0767 17.608C9.86577 17.819 9.57962 17.9375 9.28125 17.9375H8.15625ZM17.1562 19.0625V17.6562M17.1562 17.6562V15.6875H18.8437M17.1562 17.6562H18.8437M12.6562 19.0625V15.6875H13.2187C13.6663 15.6875 14.0955 15.8653 14.412 16.1818C14.7285 16.4982 14.9062 16.9274 14.9062 17.375C14.9062 17.8226 14.7285 18.2518 14.412 18.5682C14.0955 18.8847 13.6663 19.0625 13.2187 19.0625H12.6562Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-navyblue transition-all ease duration-200"
                  />
                </svg>
                <p className="text-white transition-all ease duration-200 group-hover:text-navyblue text-sm lg:text-xl tracking-[3px] font-raleway">
                  {locale === "en" ? "DOWNLOAD PDF" : "UNDUH PDF"}
                </p>
              </Link>
            </div>
          </div>
        )}
    </section>
  );
};

export default SolDtHighlight;
