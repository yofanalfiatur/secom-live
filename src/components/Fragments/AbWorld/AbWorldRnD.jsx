"use client";
import { useState } from "react";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const AbWorldRnD = ({ dataSection }) => {
  const isDesktop = useIsDesktop();
  const locale = useLocale();

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="pt-9 lg:pt-28 pb-5 lg:pb-29 abw-rnd">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* LEFT SIDE */}
        <div className="w-full flex flex-col lg:pr-4">
          <p className="text-darkblue uppercase tracking-[3px] lg:text-xl">
            {dataSection.subtitle}
          </p>
          <h2 className="text-darkblue font-raleway font-medium text-[30px] lg:text-[45px] leading-[1.3] lg:leading-[1.2] mt-3 mb-5">
            {dataSection.title}
          </h2>

          {/* Dropdown (Mobile Only) */}
          {!isDesktop && (
            <div className="abw-rnd__dropdown relative mb-6">
              <select
                className="text-xs font-raleway font-normal text-navyblue w-full border border-[#00000033] rounded-[5px] px-4 py-4 cursor-pointer"
                value={activeIndex}
                onChange={(e) => setActiveIndex(Number(e.target.value))}
              >
                {dataSection.tabs.map((item, index) => (
                  <option key={index} value={index}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Tab List */}
          <div className="flex flex-col lg:pr-6">
            {dataSection.tabs.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={index}
                  className={`abw-rnd__item lg:mb-4 flex flex-col transition-all duration-500 ease
                    ${
                      isDesktop
                        ? ""
                        : isActive
                        ? "opacity-100 visible"
                        : "opacity-0 invisible h-0 overflow-hidden"
                    }`}
                >
                  {/* Tab Button (Desktop) / Image (Mobile) */}
                  {isDesktop ? (
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`border border-tosca px-4 py-3 flex flex-col items-center cursor-pointer transition-all ease duration-200
                        ${
                          isActive
                            ? "bg-tosca text-white active-tab"
                            : "text-tosca hover:bg-tosca hover:text-white"
                        }`}
                    >
                      <p className="text-xl">{item.title}</p>
                    </button>
                  ) : (
                    <Image
                      src={process.env.NEXT_PUBLIC_STORAGE_URL + item.image}
                      width={1000}
                      height={1000}
                      alt={item.title}
                      quality={100}
                      className="w-full h-auto aspect-[285/232] object-cover"
                    />
                  )}

                  {/* Description */}
                  <div
                    className={`flex flex-col overflow-hidden transition-all leading-[1.7] lg:leading-[1.5] ease duration-500
                      ${
                        isActive ? "pt-4 pb-4 lg:max-h-[1000px]" : "lg:max-h-0"
                      }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                      className="flex flex-col text-darkblue font-normal overflow-hidden"
                    />
                    <Link
                      href={item.url}
                      target="_blank"
                      className="text-tosca max-w-max font-raleway uppercase tracking-[2px] font-normal mt-3 hover:opacity-70 transition-all duration-200 ease-in-out relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-tosca after:transition-all after:duration-200 after:ease-in-out hover:after:w-full"
                    >
                      {locale === "en" ? "Read More" : "Baca Selengkapnya"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE (Desktop Only) */}
        {isDesktop && (
          <div className="w-full flex flex-col relative">
            {dataSection.tabs.map((item, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease
                  ${
                    activeIndex === index
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
              >
                <Image
                  src={process.env.NEXT_PUBLIC_STORAGE_URL + item.image}
                  width={1000}
                  height={1000}
                  alt={item.title}
                  quality={100}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AbWorldRnD;
