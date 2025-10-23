"use client";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";

const SolServices = (props) => {
  const { dataSection, listService } = props;
  const locale = useLocale();

  return (
    <section className="flex flex-col pb-9 lg:pb-25 sol-card">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-darkblue text-[30px] lg:text-[40px] font-normal font-raleway text-center mt-10 lg:mt-12">
          {dataSection.title_section}
        </h2>
        <p className="text-darkblue text-sm lg:text-lg text-center font-normal leading-[1.7] lg:leading-[1.5] mt-2 mb-5 lg:mb-10 w-full lg:w-6/12">
          {dataSection.description_section}
        </p>

        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {listService.map((item, index) => {
            const content = item.translations[locale];

            const hrefLink =
              index === 2 ? "/about-global" : `/service/${item.slug}`;

            return (
              <li
                key={index}
                className="relative h-full flex flex-col group overflow-hidden sol-card__item"
              >
                <Link
                  href={hrefLink}
                  className="flex flex-col h-[calc(100%-3px)] justify-between relative z-1 m-[3px] bg-white sol-card__item-link"
                >
                  <div className="flex flex-col pt-5 px-5 pb-2 lg:pt-10 lg:px-10 w-full">
                    <p className="text-nayvblue leading-[1.3] lg:leading-[1.2] text-base lg:text-[25px] text-navyblue font-medium mb-2 lg:mb-3">
                      {content.title}
                    </p>
                    <p className="text-darkblue leading-[1.7] lg:leading-[1.5] text-xs lg:text-base">
                      {content.description}
                    </p>
                  </div>

                  <div className="flex mt-auto flex-col relative">
                    <Image
                      src={process.env.NEXT_PUBLIC_STORAGE_URL + item.image}
                      width={1000}
                      height={800}
                      alt={content.title}
                      className="w-full h-full object-cover relative z-[1]"
                    />
                    <div
                      style={{
                        clipPath: "polygon(0 33%, 100% 0, 100% 100%, 0 100%)",
                      }}
                      className="bg-navyblue w-full h-full absolute z-0 top-0 right-0"
                    ></div>
                  </div>
                </Link>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%-3px)] h-[calc(100%-3px)] z-0 bg-[#00000033] transition-all duration-200 ease opacity-100 group-hover:opacity-0"></div>
                <div className="absolute top-0 left-0 w-full h-full z-0 animated-gradient-bg2 transition-all duration-200 ease opacity-0 group-hover:opacity-100"></div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default SolServices;
