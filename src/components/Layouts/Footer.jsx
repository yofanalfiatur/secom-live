"use client";

import { useLocale, useTranslations } from "next-intl";

import { useEffect, useState } from "react";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import ButtonSecondary from "../Elements/ButtonSecondary";
import Starfield from "../Elements/Starfield";
import { usePathname } from "next/navigation";
import PromotionDeals from "../Elements/PromotionDeals";
import FloatButton from "../Elements/FloatButton";

const Footer = () => {
  const t = useTranslations();
  const FooterContent = t.raw("FooterContent");
  const FooterMenu = t.raw("FooterMenu");
  const FooterSocMed = t.raw("FooterSocMed");
  const FooterDropdown = t.raw("FooterDropdown");
  const locale = useLocale();

  const [shouldHideFooterTop, setShouldHideFooterTop] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const checkFooterVisibility = () => {
      const main = document.querySelector("main");
      if (main && main.querySelector(".hide__footer__top")) {
        setShouldHideFooterTop(true);
      } else {
        setShouldHideFooterTop(false);
      }
    };

    const timeout = setTimeout(() => {
      checkFooterVisibility();
    }, 20);

    return () => clearTimeout(timeout);
  }, [pathname]);

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
    <footer className="max-w-screen items-center justify-center flex flex-col bg-[#00529c] footer overflow-hidden relative z-0">
      <div className="radial one"></div>
      <div className="radial two"></div>
      <div className="radial three"></div>
      <Starfield />
      {!shouldHideFooterTop && (
        <>
          <section className=" relative z-10 flex flex-col border-b-1 border-[#ffffff66] w-full footer__top">
            <div className="relative z-[1] container w-full mx-auto">
              <div className="w-[90%] lg:w-3/4 border-r-1 py-3 lg:pt-19 lg:pb-19 border-[#ffffff66] flex flex-col items-center">
                <h2 className="text-white text-[25px] lg:text-[60px] pr-4 lg:pl-0 py-3">
                  {FooterContent.FtTitle}
                </h2>
              </div>
              <div className="w-[10%] lg:w-1/4"></div>
            </div>
          </section>

          <section className=" relative z-10 flex flex-col w-full footer__cta">
            <div className="container relative z-[1] w-full mx-auto flex flex-row">
              <div className="w-[15%] lg:w-1/4"></div>
              <div className="w-[85%] lg:w-3/4 flex flex-col gap-y-8 lg:gap-y-6 border-[#ffffff66] border-l-1 pl-8 py-6 lg:pl-26 lg:pt-21 lg:pb-21">
                <p className="text-white text-[13px] lg:text-lg lg:text-[25px]">
                  {FooterContent.FtDescription}
                </p>
                <ButtonSecondary
                  href={FooterContent.FtButtonHref}
                  target={FooterContent.FtButtonTarget}
                >
                  {FooterContent.FtButtonText}
                </ButtonSecondary>
              </div>
            </div>
          </section>
        </>
      )}

      <section className=" relative z-10 w-full flex flex-col border-y-1 border-[#ffffff66] footer__info">
        <div className="lg:container w-full mx-auto flex flex-col lg:flex-row !p-0">
          <div className="w-full lg:w-1/4 flex flex-col justify-center border-b-1 border-[#ffffff66] lg:border-none">
            <div className="lg:max-w-max pt-8 pb-8 lg:pt-0 lg:pb-0 flex items-center lg:items-start flex-col gap-9">
              <Image
                src="/img/secom-logo.png"
                alt="logo"
                width={248}
                height={62}
                className="max-w-[205px] lg:max-w-full object-contain"
              />
            </div>
          </div>
          <div className="w-full lg:w-3/4 lg:border-l-1 border-[#ffffff66] flex flex-col">
            <div className="f-wrap-address lg:pl-26 pt-6 pb-7 lg:py-6 flex flex-col gap-y-2 px-[1rem] lg:px-0">
              <p className="f-address__text text-white text-[12px] lg:text-[14px]">
                {locale === "en" ? "ADDRESS" : "ALAMAT"}
              </p>
              <Link
                className="text-white leading-[1.7] lg:leading-[1.2] font-semibold text-[15px] lg:text-xl w-full lg:w-2/3 hover:opacity-70 transition-all duration-200 ease-in-out"
                href={FooterContent.FtAddressLink}
                target="_blank"
              >
                <p
                  className="text-white leading-[1.7] lg:leading-[1.3] font-semibold text-[15px] lg:text-xl"
                  dangerouslySetInnerHTML={{
                    __html: FooterContent.FtAddressText,
                  }}
                />
              </Link>
            </div>
            <div className=" f-info relative lg:pl-26 flex flex-row w-full border-t-[1px] border-[#ffffff66] lg:border-none">
              <div className="mt-6 lg:mt-8 mb-11 lg:mb-20 flex flex-col lg:flex-row w-full px-[1rem] lg:px-0 gap-y-6 lg:gap-0">
                <div className="f-sitemap w-full lg:w-2/3">
                  <p className="f-hint text-white text-[12px] lg:text-[14px] font-semibold mb-3 lg:mb-3">
                    {locale === "en" ? "SITEMAP" : "MENU"}
                  </p>
                  <ul className="f-sitemap__list flex flex-col flex-wrap max-h-[105px] lg:max-h-[80px] max-w-max gap-[15px] lg:gap-3">
                    {FooterMenu.map(({ FtMenuText, FtMenuLink }, index) => (
                      <li
                        className="f-sitemap__list__item flex flex-col max-w-max"
                        key={index}
                      >
                        <Link
                          href={FtMenuLink}
                          className="f-sitemap__list__item__link text-[14px] lg:text-base text-white max-w-max transition-all ease duration-200 hover:opacity-60"
                        >
                          {FtMenuText}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="f-socmed w-full lg:w-1/3">
                  <p className="f-hint text-white text-[12px] lg:text-[14px] font-semibold mb-3 lg:mb-3">
                    {locale === "en" ? "STAY CONNECTED" : "TETAP TERHUBUNG"}
                  </p>
                  <div className="f-socmed__list flex flex-row gap-6 lg:gap-8 ">
                    <Link
                      href={FooterSocMed.FtFacebook}
                      target="_blank"
                      className="flex flex-col items-center justify-center f-socmed__list__item f-socmed__list__item--fb"
                    >
                      <FaFacebookF className="opacity-[40%] hover:opacity-[100%] text-white w-[14] h-[27] flex flex-col items-center justify-center" />
                    </Link>
                    <Link
                      href={FooterSocMed.FtLinkedin}
                      target="_blank"
                      className="flex flex-col items-center justify-center f-socmed__list__item f-socmed__list__item--in"
                    >
                      <FaLinkedinIn className="opacity-[40%] hover:opacity-[100%] text-white w-[24.5] h-[23.5] flex flex-col items-center justify-center" />
                    </Link>
                    <Link
                      href={FooterSocMed.FtInstagram}
                      target="_blank"
                      className="flex flex-col items-center justify-center f-socmed__list__item f-socmed__list__item--ig"
                    >
                      <FaInstagram className="opacity-[40%] hover:opacity-[100%] text-white w-[27] h-[26] flex flex-col items-center justify-center" />
                    </Link>
                    <Link
                      href={FooterSocMed.FtYoutube}
                      target="_blank"
                      className="flex flex-col items-center justify-center f-socmed__list__item f-socmed__list__item--yt"
                    >
                      <FaYoutube className="opacity-[40%] hover:opacity-[100%] text-white w-[32] h-[32] flex flex-col items-center justify-center" />
                    </Link>
                    <Link
                      href={FooterSocMed.FtTiktok}
                      target="_blank"
                      className="flex flex-col items-center justify-center f-socmed__list__item f-socmed__list__item--tt"
                    >
                      <FaTiktok className="opacity-[40%] hover:opacity-[100%] text-white w-[21] h-[24] flex flex-col items-center justify-center" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" relative z-10 flex flex-col w-full footer__bottom">
        <div className="lg:container !pt-[1.5rem] !pb-[1.5rem] lg:pt-[2rem] lg:pb-[2rem] px-[1rem] lg:px-0 gap-1 lg:gap-0 flex flex-col-reverse lg:flex-row w-full mx-auto">
          <div className="w-full lg:w-3/6 flex flex-col-reverse lg:flex-row lg:items-center gap-3 lg:gap-0 mt-3 lg:mt-0">
            <div className=" flex flex-row relative h-max text-[12px] after:content-none lg:after:content-[''] after:w-[1px] after: after:bg-white after:mx-3">
              <p className="text-white lg:text-[14px] leading-[1.2]">
                {" "}
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
                  {FooterDropdown.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      target="_blank"
                      className="text-black cursor-pointer text-sm hover:text-navyblue"
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
