"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";

const MenuMobile = (props) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const HeaderButton = t.raw("HeaderButton");
  const HTop = t.raw("HTop");
  const MenuHeaderMd = t.raw("MenuHeaderMd");

  const { handleHamburgerClick } = props;

  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);

  const toggleSubmenu = (index) => {
    setOpenSubmenuIndex((prev) => (prev === index ? null : index));
  };

  // Get current locale and available locales
  const currentLocale = locale;
  const availableLocales = ["id", "en"];

  // Function to get locale display name
  const getLocaleDisplayName = (localeCode) => {
    // Return locale code in uppercase (ID or EN)
    return localeCode.toUpperCase();
  };

  // Function to get locale flag
  const getLocaleFlag = (localeCode) => {
    if (localeCode === "id") return "/img/flag-id.svg";
    if (localeCode === "en") return "/img/flag-en.svg";
    return "/img/flag-en.svg";
  };

  // Function to handle language change
  const handleLanguageChange = (newLocale) => {
    if (newLocale === currentLocale) return;

    try {
      // Remove current locale from pathname
      let newPath = pathname;
      if (currentLocale !== "id") {
        // id is default, so no prefix
        newPath = pathname.replace(`/${currentLocale}`, "");
      }

      // Add new locale prefix if not default (id)
      if (newLocale !== "id") {
        newPath = `/${newLocale}${newPath}`;
      }

      // Ensure path starts with /
      if (!newPath.startsWith("/")) {
        newPath = `/${newPath}`;
      }

      // Navigate to new path
      router.push(newPath);
    } catch (error) {
      console.error("Error changing language:", error);
      // Fallback: simple redirect
      if (newLocale === "id") {
        router.push("/");
      } else {
        router.push(`/${newLocale}`);
      }
    }
  };

  // Check if language is active
  const isLanguageActive = (localeCode) => {
    return currentLocale === localeCode;
  };

  return (
    <>
      {/* language Mobile */}
      <div className="flex flex-row border-b-[1px] border-[#13223333]  header__lang-md">
        {availableLocales.map((localeCode, index) => (
          <button
            key={index}
            onClick={() => handleLanguageChange(localeCode)}
            className={`w-1/2 border-r-[1px] border-[#13223333] relative py-4 header__menu__link flex flex-row items-center justify-center gap-2 ${
              isLanguageActive(localeCode) ? "active-md" : ""
            }`}
            disabled={isLanguageActive(localeCode)}
          >
            <Image
              src={getLocaleFlag(localeCode)}
              alt={getLocaleDisplayName(localeCode)}
              width={20}
              height={14}
            />
            <span className="uppercase tracking-[2px] font-raleway font-medium leading-none text-lg text-darkblue">
              {getLocaleDisplayName(localeCode)}
            </span>
          </button>
        ))}
      </div>

      {/* Menu Mobile */}
      <ul className="gap-x-6 flex flex-col lg:hidden header__menu-md">
        {MenuHeaderMd.map(({ text, href, icon, subMenu }, index) => (
          <li
            className="flex flex-col justify-center header__menu-md__item group border-b-[1px] border-[#00000033] relative"
            key={index}
          >
            <Link
              href={href}
              onClick={handleHamburgerClick}
              className="relative pl-4 py-4 min-h-[72px] header__menu__link flex flex-row items-center gap-2 z-[0]"
            >
              <div className="flex flex-row items-center gap-2">
                {icon && <Image src={icon} alt="logo" width={20} height={14} />}
                <span className=" uppercase tracking-[2px] font-raleway font-normal leading-none">
                  {text}
                </span>
              </div>
            </Link>
            {/* Submenu Toggle Arrow */}
            {subMenu && subMenu.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => toggleSubmenu(index)}
                  className="flex items-center justify-center w-[60px] h-[70px] absolute right-[3px] top-[35px] transform -translate-y-1/2 z-10 arrow-submenu-md"
                >
                  <svg
                    width="13"
                    height="7"
                    viewBox="0 0 13 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transform transition-transform duration-300 ${
                      openSubmenuIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M6.86148 6.62859L12.1715 1.05559C12.2601 0.962603 12.3096 0.839061 12.3096 0.710591C12.3096 0.58212 12.2601 0.45858 12.1715 0.365592L12.1655 0.359591C12.1225 0.314356 12.0708 0.278336 12.0134 0.253723C11.9561 0.229109 11.8944 0.216416 11.832 0.216416C11.7696 0.216416 11.7078 0.229109 11.6505 0.253723C11.5932 0.278336 11.5414 0.314356 11.4985 0.359591L6.49847 5.60759L1.50048 0.35959C1.4575 0.314355 1.40578 0.278335 1.34844 0.253722C1.29111 0.229108 1.22937 0.216415 1.16698 0.216415C1.10458 0.216415 1.04284 0.229108 0.985509 0.253722C0.928176 0.278335 0.876449 0.314355 0.833476 0.35959L0.827475 0.365591C0.73883 0.458579 0.689379 0.582119 0.689379 0.71059C0.689379 0.83906 0.73883 0.962602 0.827475 1.05559L6.13747 6.62859C6.18417 6.6776 6.24034 6.71662 6.30256 6.74328C6.36479 6.76994 6.43178 6.78369 6.49948 6.78369C6.56717 6.78369 6.63416 6.76994 6.69639 6.74328C6.75861 6.71662 6.81478 6.6776 6.86148 6.62859Z"
                      fill="#00529C"
                    />
                  </svg>
                </button>

                <ul
                  className={`header__menu-md__sub bg-white flex flex-col z-50 transition-all duration-500 ease-in-out overflow-hidden ${
                    openSubmenuIndex === index
                      ? "max-h-[1000px] opacity-100 pb-4"
                      : "max-h-0 opacity-0 pb-0"
                  }`}
                >
                  {subMenu.map(({ subMenuText, subMenuHref }, subIdx) => (
                    <li key={subIdx}>
                      <Link
                        onClick={handleHamburgerClick}
                        href={subMenuHref}
                        className={`block px-4 py-2 hover:text-white font-raleway`}
                      >
                        {subMenuText}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>

      <Link
        href={HeaderButton.HeaderBtnHref}
        target={HeaderButton.HeaderBtnTarget}
        className="flex flex-row bg-navyblue pl-4 py-3 items-center justify-center"
        onClick={handleHamburgerClick}
      >
        <p className="text-white uppercase font-raleway text-sm tracking-[3px]">
          {HeaderButton.HeaderBtnText}
        </p>
      </Link>
      <Link
        href={HTop.login.href}
        target={HTop.login.target}
        className="flex flex-row bg-tosca pl-4 py-3 items-center justify-center gap-2"
        onClick={handleHamburgerClick}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.2662 14.993H2.74152C1.68941 14.993 0.877396 14.1992 1.0153 13.1562L1.0951 12.5479C1.24 11.7079 2.00861 11.1794 2.84302 10.9981L7.9496 10.1H8.0504L13.157 10.9981C14.0054 11.1941 14.76 11.6932 14.9049 12.5479L14.9847 13.1639C15.1226 14.2069 14.3106 15 13.2585 15L13.2662 14.993ZM11.5001 4.5C11.5001 5.42826 11.1313 6.3185 10.4749 6.97487C9.81852 7.63125 8.92827 8 8 8C7.07173 8 6.18148 7.63125 5.52509 6.97487C4.8687 6.3185 4.49995 5.42826 4.49995 4.5C4.49995 3.57174 4.8687 2.6815 5.52509 2.02513C6.18148 1.36875 7.07173 1 8 1C8.92827 1 9.81852 1.36875 10.4749 2.02513C11.1313 2.6815 11.5001 3.57174 11.5001 4.5Z"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <p className="text-white uppercase font-raleway text-sm tracking-[3px]">
          {HTop.login.text}
        </p>
      </Link>
    </>
  );
};

export default MenuMobile;
