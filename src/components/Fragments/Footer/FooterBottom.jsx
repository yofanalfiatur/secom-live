"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const FooterBottom = (props) => {
  const { dataWebsite } = props;
  const locale = useLocale();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".f-wrap-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <section className="relative z-10 flex flex-col w-full footer__bottom">
      <div className="lg:container !pt-[1.5rem] !pb-[1.5rem] lg:pt-[2rem] lg:pb-[2rem] px-[1rem] lg:px-0 gap-1 lg:gap-0 flex flex-col-reverse lg:flex-row w-full mx-auto">
        <div className="w-full lg:w-3/6 flex flex-col-reverse lg:flex-row lg:items-center gap-3 lg:gap-0 mt-3 lg:mt-0">
          <div className="flex flex-row relative h-max text-[12px] after:content-none lg:after:content-[''] after:w-[1px] after: after:bg-white after:mx-3">
            <p className="text-white lg:text-[14px] leading-[1.2]">
              © {new Date().getFullYear()} PT. SECOM Indonesia
            </p>
          </div>
          <Link
            href="/privacy-policy"
            className="float-right text-white text-[12px] lg:text-[14px] hover:opacity-70 transition-all ease duration-200 leading-[1.2]"
          >
            {locale === "en" ? "Privacy Policy" : "Kebijakan Privasi"}
          </Link>
        </div>
        <div className="w-full lg:w-3/6 flex flex-col items-start lg:items-end lg:pr-20">
          <div
            className={`flex flex-col relative max-w-max max-h-max transition-all ease duration-200 f-wrap-dropdown after:top-[4px] after:lg:top-[8px] ${
              isDropdownOpen
                ? "after:rotate-180 after:!top-[8px] after:lg:!top-[10px]"
                : ""
            }`}
          >
            <button
              onClick={toggleDropdown}
              className={`text-[12px] lg:text-[14px] max-w-max py-2 pl-3 pr-10 lg:py-2.5 lg:pl-3 lg:pr-16 relative border-1 border-[#ffffffb3] appearance-none text-[#ffffffb3] cursor-pointer transition-all ease duration-200 f-dropdown`}
            >
              <p className="text-white relative z-20">SECOM Global Network</p>
              <div
                className={`flex flex-col absolute left-0 w-full bg-white p-3 lg:px-3 lg:pt-3 gap-2 z-10 f-wrap-item-dp transition-all lg:max-h-[300px] lg:overflow-scroll duration-300 ease-in-out list-country ${
                  isDropdownOpen
                    ? "opacity-100 visible top-[-381px] lg:top-[-300px]"
                    : "opacity-0 invisible top-[-367px] lg:top-[-270px]"
                }`}
              >
                {dataWebsite.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    target="_blank"
                    className="text-black cursor-pointer text-sm hover:text-navyblue"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterBottom;
