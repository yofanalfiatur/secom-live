import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

const ResAbout = ({ dataSection }) => {
  return (
    <section className="flex flex-col relative overflow-hidden pb-9 lg:pb-0">
      <div className="w-full border-b-1 border-[#13223333]">
        <div className="container flex flex-row mx-auto">
          <div className="w-10/12 lg:w-3/4 pt-8 lg:pt-[4.5rem] pb-8 lg:pb-12 lg:border-r-1 lg:border-[#13223333]">
            <h2 className="text-darkblue leading-[1.3] lg:leading-[1.2] text-3xl lg:text-6xl font-medium font-raleway w-full lg:w-3/4">
              {dataSection.title_section}
            </h2>
          </div>
        </div>
      </div>
      <div className="container mx-auto justify-between flex flex-col lg:flex-row">
        <div className="w-full lg:w-[45%] lg:border-r-1 lg:border-[#13223333] flex flex-col">
          <Image
            src={
              process.env.NEXT_PUBLIC_STORAGE_URL + dataSection.image_section
            }
            width={530}
            height={550}
            alt="About"
            className="pt-7 pb-8 lg:pt-16 lg:pb-16 lg:pr-16 w-full h-auto object-cover"
            quality={100}
          />
        </div>
        <div className="w-full lg:w-[55%] relative flex flex-col justify-center pt-6 lg:pt-16 lg:pb-16 lg:pl-16 lg:pr-2 after:content-[''] after:lg:content-none after:absolute after:w-[200%] after:h-[1px] after:bg-[#13223333] after:top-[0%] after:left-[-50%] after:-translate-y-1/2">
          <div
            className="flex flex-col text-sm lg:text-lg text-darkblue leading-[1.7] lg:leading-[1.5] font-normal"
            dangerouslySetInnerHTML={{
              __html: dataSection.description_section,
            }}
          />

          <div className="flex flex-col mt-5 mb-6 lg:mb-12 gap-6">
            {dataSection.list_items.map((item, index) => (
              <div
                key={index}
                className="flex flex-row items-center gap-x-6 lg:gap-x-3 mb-4"
              >
                <Image
                  src={process.env.NEXT_PUBLIC_STORAGE_URL + item.logo}
                  width={55}
                  height={52}
                  alt={item.text}
                  className="w-[44px] object-contain lg:w-[55px]"
                />
                <p className="text-[#132233] text-sm lg:text-lg font-normal">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResAbout;
