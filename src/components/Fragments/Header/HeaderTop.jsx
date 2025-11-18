"use client";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { apiFetch } from "@/libs/api";

const HeaderTop = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const HTop = t.raw("HTop");

  // Get current locale and available locales
  const currentLocale = locale;
  const availableLocales = ["id", "en"];

  // Function to get locale display name using LocalSwitcher
  const getLocaleDisplayName = (localeCode) => {
    return localeCode.toUpperCase();
  };

  // Function to check if current path is homepage
  const isHomepage = () => {
    return (
      pathname === `/${currentLocale}` ||
      pathname === "/" ||
      pathname === `/${currentLocale}/` ||
      (currentLocale === "id" && pathname === "/") ||
      (currentLocale === "en" && pathname === "/en")
    );
  };

  // Function to handle language change
  const handleLanguageChange = async (newLocale) => {
    if (newLocale === currentLocale) return;

    // console.log("Changing language to:", newLocale);

    try {
      let identifierSlug = "";
      let resourceData = null;

      // Jika bukan homepage, ambil identifierSlug
      if (!isHomepage()) {
        // Parse pathname untuk dapat locale dan segments
        const segments = pathname
          .split("/")
          .filter((segment) => segment !== "");
        const pathWithoutLocale =
          segments[0] === "en" ? segments.slice(1) : segments;

        if (currentLocale === "en") {
          identifierSlug = pathname.replace(`/${currentLocale}/`, "");
        } else {
          identifierSlug = pathname.replace(`/`, "");
        }

        // Fetch resource data berdasarkan slug hanya jika bukan homepage
        let urlResource = null;
        let parentURL = null;

        if (pathWithoutLocale[1] === undefined) {
          urlResource = `/resource?url=${pathWithoutLocale[0]}`;
        } else {
          urlResource = `/resource?url=${pathWithoutLocale[0]}&single_page=${pathWithoutLocale[1]}`;
        }

        try {
          const response = await apiFetch(urlResource);
          resourceData = response?.data.url[newLocale];
          parentURL = response?.data?.parent_url[newLocale];
        } catch (error) {
          console.error("❌ Failed to fetch resource:", error);
        }

        if (pathWithoutLocale[1] && resourceData) {
          router.push(`/${newLocale}/${parentURL}/${resourceData}`);
          // console.log(
          //   "Navigating to:",
          //   `/${newLocale}/${parentURL}/${resourceData}`
          // );
          return;
        }
      }

      // if homepage or resource data not found, redirect ke homepage
      if (isHomepage() || !resourceData) {
        if (newLocale === "id") {
          router.push("/");
        } else {
          router.push(`/${newLocale}`);
        }
      } else {
        // Navigate to new path dengan slug yang sesuai
        router.push(`/${newLocale}/${resourceData}`);
      }
    } catch (error) {
      console.error("Error changing language:", error);
      // Fallback: simple redirect ke homepage
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
      <div className="pr-8 flex flex-row justify-end border-b-1 border-[#00529C33] gap-3 h-full header__wrap-top">
        <div className="flex flex-row items-center relative">
          <ul
            className={`relative lang-list ${isHovered ? "expand-lang" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {availableLocales.map((localeCode, index) => (
              <li
                className={`lang-option ${
                  isLanguageActive(localeCode) ? "w-[50px] active" : ""
                }`}
                key={index}
              >
                <button
                  onClick={() => handleLanguageChange(localeCode)}
                  className="flex flex-row items-center justify-center gap-2 lang-link cursor-pointer"
                  disabled={isLanguageActive(localeCode)}
                  title={`Switch to ${getLocaleDisplayName(localeCode)}`}
                >
                  <span className="font-raleway text-[14px] text-darkblue">
                    {getLocaleDisplayName(localeCode)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-200 relative right-[20px] z-10 pointer-events-none ${
              isHovered ? "rotate-180" : ""
            }`}
          >
            <path
              d="M6.17202 6.41228L11.482 0.839283C11.5707 0.746294 11.6201 0.622753 11.6201 0.494282C11.6201 0.365812 11.5707 0.242271 11.482 0.149283L11.476 0.143282C11.433 0.0980473 11.3813 0.0620278 11.324 0.037414C11.2667 0.0128003 11.2049 0.000107252 11.1425 0.000107247C11.0801 0.000107241 11.0184 0.0128003 10.9611 0.037414C10.9037 0.0620278 10.852 0.0980473 10.809 0.143282L5.80902 5.39128L0.811022 0.143281C0.768049 0.0980464 0.716323 0.0620269 0.65899 0.0374131C0.601657 0.0127994 0.539916 0.00010632 0.477522 0.000106314C0.415129 0.000106309 0.353388 0.0127993 0.296055 0.0374131C0.238722 0.0620268 0.186996 0.0980463 0.144023 0.143281L0.138022 0.149282C0.0493773 0.24227 -7.38444e-05 0.365811 -7.38557e-05 0.494281C-7.38669e-05 0.622752 0.0493773 0.746293 0.138022 0.839282L5.44802 6.41228C5.49472 6.46129 5.55088 6.50031 5.61311 6.52697C5.67533 6.55363 5.74233 6.56738 5.81002 6.56738C5.87772 6.56738 5.94471 6.55363 6.00694 6.52697C6.06916 6.50031 6.12532 6.46129 6.17202 6.41228Z"
              fill="#132233"
            />
          </svg>
        </div>

        <Link
          href={HTop.login.href}
          className="flex flex-row  gap-2 lg:py-1 lg:px-[12px] items-center justify-center bg-tosca min-w-[242px]"
          target={HTop.login.target}
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
            />
          </svg>
          <span className="text-white text-[13px] tracking-[2px] font-raleway leading-none">
            {HTop.login.text}
          </span>
        </Link>
      </div>
    </>
  );
};

export default HeaderTop;
