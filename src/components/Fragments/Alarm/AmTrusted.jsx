"use client";

import Image from "next/image";
import React from "react";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { useLocale, useTranslations } from "next-intl";

const AmTrusted = ({ dataSection }) => {
  const locale = useLocale();

  const isDesktop = useIsDesktop();

  return (
    <section
      className="pt-6 pb-10 lg:pb-0 lg:pt-14 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:lg:h-[85%] before:bg-tosca before:z-[-1] am-trusted"
      id="am-trusted"
    >
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-white text-[25px] lg:text-[40px] text-center">
            {dataSection.title}
          </h2>
          <p className="text-white text-sm lg:text-lg lg:max-w-[53%] text-center mt-2 mb-6 lg:mb-9">
            {dataSection.desc}
          </p>
        </div>

        {/* Comparison Table using DIV */}
        <div className="shadow-[0px_4px_20px_0px_#0000001A] lg:rounded-[5px] overflow-hidden w-full max-w-[1000px]">
          <div className="bg-white">
            {/* Table Header */}
            <div className="bg-navyblue text-white flex flex-row">
              <div className="flex flex-col justify-center text-left py-3 lg:py-[22px] px-4 lg:px-8 text-xs lg:text-xl font-semibold font-raleway w-[40%]">
                {locale === "en" ? "FEATURE" : "FITUR"}
              </div>
              <div className="text-center py-3 lg:py-[22px] px-0 lg:px-6 flex flex-col lg:flex-row gap-1 lg:gap-3 items-center justify-center w-[30%]">
                {dataSection.type !== null ? ( // ✅ Perbaikan: !== bukan !===
                  <p className="text-white text-xs lg:text-xl font-semibold uppercase">
                    {dataSection.type}
                  </p>
                ) : (
                  <Image
                    src="/img/secom-logo.png"
                    alt="Secom Logo"
                    width={112}
                    height={28}
                    className="w-[60px] h-auto lg:w-[112px]"
                  />
                )}
              </div>
              <div className="text-center py-3 lg:py-[22px] px-1 lg:px-8 text-xs lg:text-xl font-semibold font-raleway w-[30%] uppercase flex flex-col justify-center">
                {dataSection.competitor}
              </div>
            </div>

            {/* Table Body - Conditional scroll berdasarkan isDesktop */}
            <div
              className={`${
                isDesktop
                  ? "max-h-full overflow-auto"
                  : "max-h-[320px] w-full overflow-y-scroll custom-scrollbar"
              }`}
            >
              {dataSection.items.map((row, index) => (
                <div
                  key={index}
                  className="bg-white border-b-[1px] border-[#0000001A] last:border-0 flex flex-row w-full"
                >
                  {/* Feature Column */}
                  <div className="py-3 lg:py-[18px] px-4 lg:px-8 text-gray-800 font-medium text-[15px] leading-[1.8] lg:leading-[1.3] lg:text-xl font-raleway w-[40%] flex flex-col justify-center">
                    {row.feature}
                  </div>

                  {/* SECOM Column */}
                  <div className="lg:py-[18px] text-center bg-[#E0FEFF] flex items-center justify-center w-[30%]">
                    {row.secom ? (
                      <div className="flex items-center justify-center mx-8 lg:mx-auto">
                        <CheckIcon />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center mx-8 lg:mx-auto">
                        <CrossIcon />
                      </div>
                    )}
                  </div>

                  {/* OTHER Column */}
                  <div
                    className={`p-2 lg:py-[18px] lg:px-4 text-center flex w-[30%] items-center justify-center lg:justify-center`}
                  >
                    {row.other === "Available" ? (
                      <div className="flex items-center justify-center mx-auto">
                        <CheckIcon />
                      </div>
                    ) : row.other === "Unavailable" ? (
                      <div className="flex items-center justify-center mx-auto">
                        <CrossIcon />
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-start w-full max-w-[200px]">
                        <div className="flex flex-col lg:flex-row gap-2 w-full items-center">
                          <div className="flex flex-col lg:w-[35px]">
                            <LimitIcon />
                          </div>
                          <div className="lg:w-[85%] lg:max-w-max font-raleway font-medium text-xs lg:text-xl text-darkblue capitalize lg:text-start flex flex-col">
                            <p>{row.other}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Check icon component
const CheckIcon = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[27px] h-[27px] lg:w-[34px] lg:h-[34px]"
  >
    <path
      d="M17 0C7.6263 0 0 7.6263 0 17C0 26.3737 7.6263 34 17 34C26.3737 34 34 26.3737 34 17C34 7.6263 26.3737 0 17 0ZM25.8474 11.3025L14.8627 24.3795C14.7422 24.523 14.5923 24.6389 14.4231 24.7195C14.2539 24.8 14.0693 24.8432 13.882 24.8462H13.8599C13.6766 24.8461 13.4954 24.8075 13.328 24.7329C13.1606 24.6582 13.0107 24.5493 12.8881 24.413L8.18043 19.1822C8.06087 19.0554 7.96787 18.906 7.90689 18.7427C7.8459 18.5794 7.81817 18.4056 7.82532 18.2315C7.83246 18.0574 7.87435 17.8864 7.94851 17.7287C8.02267 17.571 8.12761 17.4297 8.25715 17.3131C8.3867 17.1965 8.53825 17.107 8.70289 17.0498C8.86752 16.9926 9.04193 16.9689 9.21585 16.9801C9.38977 16.9913 9.55971 17.0372 9.71566 17.115C9.87162 17.1928 10.0104 17.301 10.124 17.4332L13.8256 21.5459L23.845 9.62053C24.0697 9.36069 24.3877 9.19973 24.7301 9.17244C25.0726 9.14515 25.412 9.25372 25.6751 9.47469C25.9382 9.69566 26.1037 10.0113 26.1359 10.3533C26.1682 10.6953 26.0645 11.0363 25.8474 11.3025Z"
      fill="#00AAAD"
    />
  </svg>
);

// Limit icon component
const LimitIcon = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[27px] h-[27px] lg:w-[34px] lg:h-[34px]"
  >
    <path
      d="M17 0C26.3891 0 34 7.6109 34 17C34 26.3891 26.3891 34 17 34C7.6109 34 0 26.3891 0 17C0 7.6109 7.6109 0 17 0ZM17 22.1C16.5491 22.1 16.1167 22.2791 15.7979 22.5979C15.4791 22.9167 15.3 23.3491 15.3 23.8C15.3 24.2509 15.4791 24.6833 15.7979 25.0021C16.1167 25.3209 16.5491 25.5 17 25.5C17.4509 25.5 17.8833 25.3209 18.2021 25.0021C18.5209 24.6833 18.7 24.2509 18.7 23.8C18.7 23.3491 18.5209 22.9167 18.2021 22.5979C17.8833 22.2791 17.4509 22.1 17 22.1ZM17 6.8C16.5836 6.80006 16.1817 6.95293 15.8706 7.22962C15.5594 7.50631 15.3606 7.88757 15.3119 8.3011L15.3 8.5V18.7C15.3005 19.1333 15.4664 19.5501 15.7638 19.8651C16.0613 20.1802 16.4678 20.3698 16.9004 20.3952C17.3329 20.4206 17.7588 20.2799 18.0911 20.0018C18.4234 19.7236 18.6369 19.3292 18.6881 18.8989L18.7 18.7V8.5C18.7 8.04913 18.5209 7.61673 18.2021 7.29792C17.8833 6.97911 17.4509 6.8 17 6.8Z"
      fill="#FAA912"
    />
  </svg>
);

// Cross icon component
const CrossIcon = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[27px] h-[27px] lg:w-[34px] lg:h-[34px]"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 0C7.61126 0 0 7.61126 0 17C0 26.3887 7.61126 34 17 34C26.3887 34 34 26.3887 34 17C34 7.61126 26.3887 0 17 0ZM13.366 11.6881C13.1424 11.4719 12.8428 11.3522 12.5318 11.3548C12.2209 11.3574 11.9233 11.482 11.7033 11.7018C11.4833 11.9216 11.3584 12.219 11.3556 12.5299C11.3527 12.8409 11.4721 13.1406 11.6881 13.3644L15.3221 17L11.6881 20.634C11.4786 20.8589 11.3645 21.1563 11.37 21.4635C11.3754 21.7708 11.4999 22.064 11.7172 22.2813C11.9345 22.4986 12.2276 22.623 12.5349 22.6285C12.8422 22.6339 13.1395 22.5198 13.3644 22.3103L17 18.6794L20.634 22.3135C20.8589 22.523 21.1563 22.637 21.4635 22.6316C21.7708 22.6262 22.064 22.5017 22.2813 22.2844C22.4986 22.0671 22.623 21.774 22.6285 21.4667C22.6339 21.1594 22.5198 20.862 22.3103 20.6372L18.6763 17L22.3103 13.366C22.4269 13.2574 22.5203 13.1264 22.5851 12.9809C22.65 12.8355 22.6848 12.6784 22.6876 12.5192C22.6904 12.3599 22.6611 12.2017 22.6015 12.054C22.5418 11.9063 22.4531 11.7722 22.3404 11.6596C22.2278 11.5469 22.0937 11.4582 21.946 11.3985C21.7983 11.3389 21.6401 11.3096 21.4808 11.3124C21.3216 11.3152 21.1645 11.35 21.0191 11.4149C20.8736 11.4797 20.7426 11.5731 20.634 11.6897L17 15.3206L13.366 11.6881Z"
      fill="#B40505"
    />
  </svg>
);

export default AmTrusted;
