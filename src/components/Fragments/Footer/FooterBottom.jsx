"use client";

import { Link } from "@/i18n/navigation";
import { useState, useEffect } from "react";

const FooterBottom = ({ locale, FooterDropdown }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".f-wrap-dropdown")) setIsDropdownOpen(false);
    };
    if (isDropdownOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <section className="relative z-10 flex flex-col w-full footer__bottom">
      <div className="lg:container !pt-[1.5rem] !pb-[1.5rem] lg:pt-[2rem] lg:pb-[2rem] px-[1rem] lg:px-0 gap-1 lg:gap-0 flex flex-col-reverse lg:flex-row w-full mx-auto">
        <div className="w-full lg:w-3/6 flex flex-col-reverse lg:flex-row lg:items-center gap-3 lg:gap-0 mt-3 lg:mt-0">
          <p className="text-white text-[12px] lg:text-[14px] leading-[1.2]">
            © {new Date().getFullYear()} PT. SECOM Indonesia
          </p>
          <Link
            href="/privacy-policy"
            className="text-white text-[12px] lg:text-[14px] hover:opacity-70 transition-all leading-[1.2]"
          >
            {locale === "en" ? "Privacy Policy" : "Kebijakan Privasi"}
          </Link>
        </div>

        <div className="w-full lg:w-3/6 flex flex-col items-start lg:items-end lg:pr-20">
          <div
            className={`f-wrap-dropdown relative transition-all ${
              isDropdownOpen ? "after:rotate-180" : ""
            }`}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-[12px] lg:text-[14px] py-2 px-3 border-1 border-[#ffffffb3] text-white cursor-pointer relative"
            >
              SECOM Global Network
            </button>
            <div
              className={`absolute left-0 w-full bg-white p-3 z-10 transition-all ${
                isDropdownOpen
                  ? "opacity-100 visible top-[-380px]"
                  : "opacity-0 invisible top-[-360px]"
              }`}
            >
              {FooterDropdown.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  target="_blank"
                  className="block text-black text-sm hover:text-navyblue"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterBottom;
