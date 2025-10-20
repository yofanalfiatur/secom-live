"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

const FooterMiddle = (props) => {
  const { LogoData, FooterMenu, FooterSocMed, GeneralData } = props;
  const locale = useLocale();

  return (
    <section className="relative z-10 w-full flex flex-col border-y-1 border-[#ffffff66] footer__info">
      <div className="lg:container w-full mx-auto flex flex-col lg:flex-row !p-0">
        <div className="w-full lg:w-1/4 flex flex-col justify-center border-b-1 border-[#ffffff66] lg:border-none">
          <div className="lg:max-w-max pt-8 pb-8 lg:pt-0 lg:pb-0 flex items-center lg:items-start flex-col gap-9">
            <Image
              src={LogoData}
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
              href={GeneralData.address_url}
              target="_blank"
            >
              <p
                className="text-white leading-[1.7] lg:leading-[1.3] font-semibold text-[15px] lg:text-xl"
                dangerouslySetInnerHTML={{
                  __html: GeneralData.address,
                }}
              />
            </Link>
          </div>
          <div className="f-info relative lg:pl-26 flex flex-row w-full border-t-[1px] border-[#ffffff66] lg:border-none">
            <div className="mt-6 lg:mt-8 mb-11 lg:mb-20 flex flex-col lg:flex-row w-full px-[1rem] lg:px-0 gap-y-6 lg:gap-0">
              <div className="f-sitemap w-full lg:w-2/3">
                <p className="f-hint text-white text-[12px] lg:text-[14px] font-semibold mb-3 lg:mb-3">
                  {locale === "en" ? "SITEMAP" : "MENU"}
                </p>
                <ul className="f-sitemap__list flex flex-col flex-wrap max-h-[105px] lg:max-h-[80px] max-w-max gap-[15px] lg:gap-5">
                  {FooterMenu.map(({ FtMenuText, FtMenuLink }, index) => (
                    <li
                      className="f-sitemap__list__item flex flex-col max-w-max"
                      key={index}
                    >
                      <Link
                        href={FtMenuLink}
                        className={`f-sitemap__list__item__link text-[14px] lg:text-base text-white max-w-max transition-all ease duration-200 hover:opacity-60`}
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
                  {FooterSocMed.facebook && (
                    <Link
                      href={FooterSocMed.facebook}
                      target="_blank"
                      className="flex flex-col items-center justify-center f-socmed__list__item f-socmed__list__item--fb"
                    >
                      <FaFacebookF className="opacity-[40%] hover:opacity-[100%] text-white w-[14] h-[27] flex flex-col items-center justify-center" />
                    </Link>
                  )}

                  {FooterSocMed.linkedin && (
                    <Link
                      href={FooterSocMed.linkedin}
                      target="_blank"
                      className="flex flex-col items-center justify-center f-socmed__list__item f-socmed__list__item--in"
                    >
                      <FaLinkedinIn className="opacity-[40%] hover:opacity-[100%] text-white w-[24.5] h-[23.5] flex flex-col items-center justify-center" />
                    </Link>
                  )}

                  {FooterSocMed.instagram && (
                    <Link
                      href={FooterSocMed.instagram}
                      target="_blank"
                      className="flex flex-col items-center justify-center f-socmed__list__item f-socmed__list__item--ig"
                    >
                      <FaInstagram className="opacity-[40%] hover:opacity-[100%] text-white w-[27] h-[26] flex flex-col items-center justify-center" />
                    </Link>
                  )}

                  {FooterSocMed.youtube && (
                    <Link
                      href={FooterSocMed.youtube}
                      target="_blank"
                      className="flex flex-col items-center justify-center f-socmed__list__item f-socmed__list__item--yt"
                    >
                      <FaYoutube className="opacity-[40%] hover:opacity-[100%] text-white w-[32] h-[32] flex flex-col items-center justify-center" />
                    </Link>
                  )}

                  {FooterSocMed.tiktok && (
                    <Link
                      href={FooterSocMed.tiktok}
                      target="_blank"
                      className="flex flex-col items-center justify-center f-socmed__list__item f-socmed__list__item--tt"
                    >
                      <FaTiktok className="opacity-[40%] hover:opacity-[100%] text-white w-[21] h-[24] flex flex-col items-center justify-center" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterMiddle;
