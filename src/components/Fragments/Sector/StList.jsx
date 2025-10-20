"use client";

import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useIsDesktop from "@/components/Hooks/useIsDesktop";

const SectorList = ({ dataSection, listSectors }) => {
  const locale = useLocale();
  const isDesktop = useIsDesktop();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = (e) => {
    setActiveIndex(parseInt(e.target.value));
  };

  return (
    <section className="flex flex-col pb-9 lg:pb-0 bg-darkblue st-list">
      <div className="container mx-auto flex flex-col lg:flex-row relative">
        <div className="w-full lg:w-5/12 lg:border-r lg:border-[#FFFFFF80]">
          <div className="flex flex-col pt-11 pb-6 lg:pb-10 lg:pt-10 pr-0 lg:pr-20 relative after:absolute after:content-none after:lg:content-[''] after:w-[calc(150%_+_(100vw-1320px+4rem)/2)] after:h-[1px] after:bottom-0 after:right-0 after:bg-[#FFFFFF80] after:z-[1] ">
            <h2 className="text-white font-raleway text-[30px] lg:text-[45px] font-normal leading-[1.3] lg:leading-[1.2]">
              {dataSection.title_section}
            </h2>
          </div>

          {/* Tab List */}
          {isDesktop ? (
            <ul className="flex flex-col gap-2 mt-4 lg:mt-12 mb-4 lg:mb-12 st-list__tab-list">
              {listSectors.map((item, index) => (
                <li
                  key={item.id ?? index}
                  onClick={() => setActiveIndex(index)}
                  className={`flex flex-col cursor-pointer max-w-max px-4 border-l-[8px] transition-all duration-200 ease ${
                    activeIndex === index
                      ? "border-tosca"
                      : "border-darkblue hover:border-tosca"
                  }`}
                >
                  <p
                    className={`font-raleway font-normal text-[25px] lg:text-[30px] leading-[1.7] max-w-max transition-all duration-200 ease ${
                      activeIndex === index
                        ? "text-white"
                        : "text-[#FFFFFFB2] hover:text-white"
                    }`}
                  >
                    {item.title}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="w-full h-max flex flex-col mb-4 lg:mb-0 relative st-list__tab-list-md-wrap">
              <select
                value={activeIndex}
                onChange={handleChange}
                className="w-full py-3 px-4 appearance-none text-white rounded-[5px] border-[1px] border-white bg-transparent font-raleway text-[18px]"
              >
                {listSectors.map((item, index) => (
                  <option
                    key={item.id ?? index}
                    value={index}
                    className="bg-darkblue text-white"
                  >
                    {item.title}
                  </option>
                ))}
              </select>
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none scale-85"
              >
                <path
                  d="M0.465612 7.725L11.5048 19L22.544 7.725C22.8439 7.41769 23.0078 7.00538 22.9997 6.57876C22.9916 6.15214 22.8122 5.74616 22.5009 5.45014C22.1895 5.15412 21.7718 4.9923 21.3396 5.00028C20.9074 5.00827 20.4961 5.1854 20.1962 5.49271L11.5048 14.3746L2.80377 5.4927C2.50388 5.18539 2.09259 5.00826 1.66039 5.00028C1.22819 4.9923 0.810481 5.15412 0.499151 5.45014C0.187821 5.74616 0.0083746 6.15214 0.000287681 6.57875C-0.00779924 7.00537 0.156137 7.41769 0.45603 7.725L0.465612 7.725Z"
                  fill="white"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="w-full h-max lg:w-7/12 sticky top-[0px]">
          <AnimatePresence mode="wait">
            {listSectors[activeIndex] && (
              <motion.div
                key={listSectors[activeIndex].id ?? activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col lg:pl-12 lg:pt-12 lg:pb-12 st-list__tab-content__item"
              >
                <Image
                  src={listSectors[activeIndex].image}
                  width={1000}
                  height={1000}
                  quality={100}
                  alt={listSectors[activeIndex].title}
                  className="w-full h-full aspect-[285/175] lg:aspect-[764/486] object-cover"
                />
                <p className="text-white text-[25px] lg:text-[35px] mt-4 lg:mt-6">
                  {listSectors[activeIndex].title}
                </p>
                <p className="text-white text-base lg:text-[20px] mt-3 mb-6 lg:leading-[1.3]">
                  {listSectors[activeIndex].desc}
                </p>
                <Link
                  href={listSectors[activeIndex].link}
                  target="_self"
                  className="text-white text-sm lg:text-lg font-raleway uppercase tracking-[2px] max-w-max flex flex-row gap-2 hover:gap-4 transition-all ease duration-300 items-center relative after:absolute after:content-[''] after:w-0 after:h-[1px] after:bg-white after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  <p>
                    {locale === "en" ? "Learn More" : "Pelajari Lebih Lanjut"}
                  </p>

                  <svg
                    width="12"
                    height="11"
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.195 10.83L12 5.99998L7.195 1.16998C7.1516 1.11299 7.09647 1.066 7.03333 1.03217C6.9702 0.998342 6.90053 0.978476 6.82904 0.973915C6.75756 0.969354 6.68593 0.980205 6.61901 1.00573C6.55208 1.03126 6.49142 1.07087 6.44114 1.12188C6.39085 1.17289 6.35211 1.23411 6.32754 1.30139C6.30297 1.36867 6.29315 1.44045 6.29873 1.51186C6.30431 1.58327 6.32517 1.65265 6.35989 1.7153C6.39462 1.77795 6.4424 1.8324 6.5 1.87498L10.095 5.49998L0.53 5.49998C0.397391 5.49998 0.270215 5.55266 0.176447 5.64643C0.0826786 5.74019 0.0299995 5.86737 0.0299995 5.99998C0.0299995 6.13259 0.0826786 6.25977 0.176447 6.35353C0.270215 6.4473 0.397391 6.49998 0.529999 6.49998L10.095 6.49998L6.5 10.125C6.40651 10.2191 6.35425 10.3466 6.35472 10.4792C6.35519 10.6119 6.40835 10.739 6.5025 10.8325C6.59665 10.926 6.72409 10.9782 6.85677 10.9778C6.98945 10.9773 7.11651 10.9241 7.21 10.83L7.195 10.83Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SectorList;
