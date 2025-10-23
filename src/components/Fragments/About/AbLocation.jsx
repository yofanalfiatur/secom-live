"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const AboutLocation = ({ dataSection }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const locale = useLocale();
  // Fungsi untuk membersihkan nomor telepon
  const cleanPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/[^0-9+]/g, "");
  };

  return (
    <section className="flex flex-col pt-10 pb-10 lg:pt-22 lg:pb-10 relative overflow-hidden ab-location">
      <div className="container flex flex-col lg:flex-row mx-auto">
        {/* Left side: buttons */}
        <div className="w-full lg:w-3/12 flex flex-col pt-0 lg:pt-8">
          <h2 className="text-darkblue text-[25px] lg:text-[40px] font-medium font-raleway">
            {dataSection.title}
          </h2>
          <p className="mt-2 mb-4 text-darkblue text-sm lg:text-lg leading-[1.7] lg:leading-[1.5]">
            {dataSection.description}
          </p>

          {/* filter desktop */}
          <div className="hidden lg:flex flex-col gap-4">
            {dataSection.cards.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`border-tosca border-[1px] px-4 py-3 text-base lg:text-lg font-normal transition-all ease duration-200 cursor-pointer ab-location__btn ${
                  activeIndex === index
                    ? "active-loc bg-tosca text-white"
                    : "bg-white text-tosca hover:bg-tosca hover:text-white"
                }`}
              >
                <p dangerouslySetInnerHTML={{ __html: item.name }} />
              </button>
            ))}
          </div>

          {/* filter mobile */}
          <div className="flex lg:hidden flex-col">
            <select
              value={activeIndex}
              onChange={(e) => setActiveIndex(Number(e.target.value))}
              className="border-[#00000033] border rounded-[5px] px-3 py-3.5 text-xs md:text-sm text-navyblue font-normal cursor-pointer w-full mb-5"
            >
              {dataSection.cards.map((item, index) => (
                <option key={index} value={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right side: embeds */}
        <div className="w-full lg:w-9/12 relative">
          {dataSection.cards.map((item, index) => (
            <div
              key={index}
              className={`flex flex-row lg:items-end ab-location__embed absolute top-0 left-0 w-full pl-0.5 lg:pl-10 transition-all duration-500 ${
                activeIndex === index
                  ? "opacity-100 visible relative"
                  : "opacity-0 invisible"
              }`}
            >
              {/* Image */}
              <div className="w-1/3 hidden lg:flex flex-col">
                <Image
                  src={process.env.NEXT_PUBLIC_STORAGE_URL + item.image}
                  alt={item.name}
                  width={1000}
                  height={1000}
                  className="w-full h-full lg: aspect-[338/448] object-cover object-center"
                />
              </div>

              {/* Embed + Address */}
              <div className="w-full lg:w-2/3 flex flex-col">
                <div
                  dangerouslySetInnerHTML={{ __html: item.embed_gmaps }}
                  className="flex flex-col aspect-[285/147] lg:aspect-[720/300] w-full h-auto"
                />
                <div className="grid grid-cols-12 items-center bg-tosca pl-4 lg:pl-5 pr-4 lg:pr-8">
                  <div className="col-span-12 lg:col-span-8 gap-2 flex flex-col mt-3 mb-4">
                    <p className="text-white text-sm leading-[1.7] mb-2 lg:mb-0">
                      {item.address}
                    </p>
                    {item.telephone && (
                      <Link
                        href={`tel:${cleanPhoneNumber(item.telephone)}`}
                        className="text-white text-[15px] lg:text-base font-semibold flex flex-row items-center gap-3 w-max relative after:content-[''] after:absolute after:bottom-0 after:bg-white after:h-[1px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:ease"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.4434 1.60742C15.7656 1.69531 16 1.95898 16 2.28125C16 9.81055 9.90625 15.875 2.40625 15.875C2.05469 15.875 1.79102 15.6699 1.70312 15.3477L1 12.3008C0.941406 11.9785 1.08789 11.627 1.41016 11.4805L4.69141 10.0742C4.98438 9.95703 5.30664 10.0449 5.51172 10.2793L6.97656 12.0664C9.26172 10.9824 11.1074 9.10742 12.1621 6.88086L10.375 5.41602C10.1406 5.21094 10.0527 4.88867 10.1699 4.5957L11.5762 1.31445C11.7227 0.992188 12.0742 0.816406 12.3965 0.904297L15.4434 1.60742Z"
                            fill="white"
                          />
                        </svg>
                        <p className="text-white">{item.telephone}</p>
                      </Link>
                    )}
                  </div>

                  <div className="col-span-12 lg:col-span-4 flex flex-col lg:items-end mb-8 lg:mb-0">
                    <Link
                      href={item.address_url}
                      target="_blank"
                      className="text-white font-raleway text-xs lg:text-sm tracking-[2px] flex flex-row items-center h-max w-max gap-3 transition-all ease duration-200 hover:gap-4 relative after:content-[''] after:w-0 after:h-[1px] after:absolute after:bottom-0 after:bg-white after:transition-all after:ease after:duration-200 hover:after:w-full"
                    >
                      {locale === "en" ? "GET DIRECTION" : "LIHAT PETA"}
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.16497 9.77786L11.97 5.02448L7.16497 0.271102C7.12158 0.215019 7.06644 0.168767 7.0033 0.135476C6.94017 0.102186 6.8705 0.0826352 6.79901 0.0781468C6.72753 0.0736583 6.6559 0.0843374 6.58898 0.109461C6.52205 0.134584 6.46139 0.173566 6.41111 0.223766C6.36082 0.273966 6.32208 0.334213 6.29751 0.400429C6.27294 0.466644 6.26312 0.537282 6.2687 0.60756C6.27428 0.677838 6.29514 0.746115 6.32986 0.80777C6.36459 0.869424 6.41237 0.923016 6.46997 0.964918L10.065 4.53241L0.49997 4.53241C0.367362 4.53241 0.240186 4.58426 0.146417 4.67654C0.0526493 4.76882 -2.97778e-05 4.89398 -2.97836e-05 5.02448C-2.97894e-05 5.15499 0.0526493 5.28015 0.146417 5.37243C0.240185 5.46471 0.367362 5.51655 0.49997 5.51655L10.065 5.51655L6.46997 9.08405C6.37648 9.17671 6.32422 9.30212 6.32469 9.4327C6.32516 9.56327 6.37832 9.68832 6.47247 9.78032C6.56662 9.87233 6.69406 9.92376 6.82674 9.9233C6.95942 9.92284 7.08648 9.87052 7.17997 9.77786L7.16497 9.77786Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutLocation;
