"use client";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const HeaderAdditional = (props) => {
  const { menuServices, menuProducts, menuSectors } = props;
  const locale = useLocale();
  const isDesktop = useIsDesktop();
  const pathname = usePathname(); // Tambahkan ini

  // scroll state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollDown, setIsScrollDown] = useState(false);

  // Scroll effect header
  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // scroll > 50px
      setIsScrolled(scrollPosition > 50);

      if (scrollPosition > 100 && scrollPosition > lastScrollTop) {
        setIsScrollDown(true); // scroll down
      } else {
        setIsScrollDown(false); // scroll up
      }

      lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [hoveredTab, setHoveredTab] = useState(null);
  const handleTabEvent = (tabName) => {
    if (isDesktop) {
      setHoveredTab(tabName);
    } else {
      // Toggle tab dan set overflow body
      const newHoveredTab = hoveredTab === tabName ? null : tabName;
      setHoveredTab(newHoveredTab);

      // Set overflow hidden ketika tab dibuka di mobile
      if (newHoveredTab !== null) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  };

  // Tambahkan useEffect untuk cleanup ketika komponen unmount
  useEffect(() => {
    return () => {
      // Reset overflow body ketika komponen unmount
      document.body.style.overflow = "";
    };
  }, []);

  // state untuk submenu yang terbuka (mobile)
  const [openSubmenus, setOpenSubmenus] = useState({
    sectorService: false,
    sectorProducts: false,
    solutionsService: false,
    solutionsProducts: false,
  });
  const toggleSubmenu = (submenuName) => {
    if (!isDesktop) {
      setOpenSubmenus((prev) => ({
        ...prev,
        [submenuName]: !prev[submenuName],
      }));
    }
  };
  const getSubmenuClass = (isOpen) => {
    if (isDesktop) {
      return "max-h-[1000px] opacity-100 visible";
    }
    return isOpen
      ? "max-h-[1000px] opacity-100 visible"
      : "max-h-0 opacity-0 invisible";
  };

  // Function to check if link is active
  const isActiveLink = (href) => {
    // Remove trailing slashes for consistent comparison
    const currentPath = pathname.replace(/\/$/, "");
    const linkPath = href.replace(/\/$/, "");

    // Special case for home page ("/")
    if (linkPath === "") {
      return currentPath === "";
    }

    // Exact match
    if (currentPath === linkPath) return true;

    // For submenu items, check if current path starts with the link path
    // This will make parent menu active when on child pages
    if (currentPath.startsWith(linkPath + "/")) return true;

    return false;
  };

  return (
    <section
      className={`flex flex-col header-add sticky top-[60px] lg:top-[94px] z-[999] transition-all duration-200 ease-[cubic-bezier(.2,1,.3,1)] 
          ${isScrolled ? "header__scrolled" : ""}
          ${
            isScrollDown
              ? "!top-[-62px] lg:!top-[-95px] header__scroll-down"
              : ""
          }`}
    >
      <div className="flex flex-col relative">
        {/* tab list */}
        <div className="bg-navyblue grid grid-cols-2 relative z-[100]">
          {/* tab sector */}
          <div className="flex flex-col justify-center items-center border-r-[1px] border-[#FFFFFF33] relative header-add__wrap-item">
            <div
              className="flex flex-row relative items-center justify-center cursor-pointer header-add__item"
              onMouseEnter={() => isDesktop && handleTabEvent("sector")}
              onMouseLeave={() => isDesktop && setHoveredTab(null)}
              onClick={() => !isDesktop && handleTabEvent("sector")}
            >
              <p className="text-white text-[10px] lg:text-base uppercase tracking-[2px] py-3 px-2 font-raleway">
                {isDesktop
                  ? locale === "en"
                    ? "SECTOR WE PROTECT"
                    : "SEKTOR YANG KAMI PROTEKSI"
                  : locale === "en"
                  ? "SEE OUR SECTORS"
                  : "LIHAT SEKTOR KAMI"}
              </p>
              <svg
                width="13"
                height="7"
                viewBox="0 0 13 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.86148 6.62859L12.1715 1.05559C12.2601 0.962603 12.3096 0.839061 12.3096 0.710591C12.3096 0.58212 12.2601 0.45858 12.1715 0.365592L12.1655 0.359591C12.1225 0.314356 12.0708 0.278336 12.0134 0.253723C11.9561 0.229109 11.8944 0.216416 11.832 0.216416C11.7696 0.216416 11.7078 0.229109 11.6505 0.253723C11.5932 0.278336 11.5414 0.314356 11.4985 0.359591L6.49847 5.60759L1.50048 0.35959C1.4575 0.314355 1.40578 0.278335 1.34844 0.253722C1.29111 0.229108 1.22937 0.216415 1.16698 0.216415C1.10458 0.216415 1.04284 0.229108 0.985509 0.253722C0.928176 0.278335 0.876449 0.314355 0.833476 0.35959L0.827475 0.365591C0.73883 0.458579 0.689379 0.582119 0.689379 0.71059C0.689379 0.83906 0.73883 0.962602 0.827475 1.05559L6.13747 6.62859C6.18417 6.6776 6.24034 6.71662 6.30256 6.74328C6.36479 6.76994 6.43178 6.78369 6.49948 6.78369C6.56717 6.78369 6.63416 6.76994 6.69639 6.74328C6.75861 6.71662 6.81478 6.6776 6.86148 6.62859Z"
                  fill="#ffffff"
                ></path>
              </svg>
            </div>

            {/* triangle */}
            <div
              className={`pointer-events-none absolute z-[1] w-[15px] h-[15px] border-navyblue border-t-[10px] lg:border-t-[15px] border-l-[10px] lg:border-l-[15px] border-l-transparent border-r-[10px] lg:border-r-[15px] border-r-transparent scale-[100%] transition-all duration-300 ease-[cubic-bezier(.2,1,.3,1)] ${
                hoveredTab === "sector"
                  ? "opacity-100 visible top-full"
                  : "opacity-0 invisible top-[50%]"
              }`}
              onMouseEnter={() => isDesktop && handleTabEvent("sector")}
              onMouseLeave={() => isDesktop && setHoveredTab(null)}
            ></div>
          </div>

          {/* tab solutions */}
          <div className="flex flex-col justify-center items-center relative header-add__wrap-item">
            <div
              className="flex flex-row relative items-center justify-center cursor-pointer header-add__item"
              onMouseEnter={() => isDesktop && handleTabEvent("solutions")}
              onMouseLeave={() => isDesktop && setHoveredTab(null)}
              onClick={() => !isDesktop && handleTabEvent("solutions")}
            >
              <p className="text-white text-[10px] lg:text-base uppercase tracking-[2px] py-3 px-2 font-raleway">
                {locale === "en" ? "SOLUTIONS" : "SOLUSI"}
              </p>
              <svg
                width="13"
                height="7"
                viewBox="0 0 13 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.86148 6.62859L12.1715 1.05559C12.2601 0.962603 12.3096 0.839061 12.3096 0.710591C12.3096 0.58212 12.2601 0.45858 12.1715 0.365592L12.1655 0.359591C12.1225 0.314356 12.0708 0.278336 12.0134 0.253723C11.9561 0.229109 11.8944 0.216416 11.832 0.216416C11.7696 0.216416 11.7078 0.229109 11.6505 0.253723C11.5932 0.278336 11.5414 0.314356 11.4985 0.359591L6.49847 5.60759L1.50048 0.35959C1.4575 0.314355 1.40578 0.278335 1.34844 0.253722C1.29111 0.229108 1.22937 0.216415 1.16698 0.216415C1.10458 0.216415 1.04284 0.229108 0.985509 0.253722C0.928176 0.278335 0.876449 0.314355 0.833476 0.35959L0.827475 0.365591C0.73883 0.458579 0.689379 0.582119 0.689379 0.71059C0.689379 0.83906 0.73883 0.962602 0.827475 1.05559L6.13747 6.62859C6.18417 6.6776 6.24034 6.71662 6.30256 6.74328C6.36479 6.76994 6.43178 6.78369 6.49948 6.78369C6.56717 6.78369 6.63416 6.76994 6.69639 6.74328C6.75861 6.71662 6.81478 6.6776 6.86148 6.62859Z"
                  fill="#ffffff"
                ></path>
              </svg>
            </div>

            {/* triangle */}
            <div
              className={`pointer-events-none absolute z-[1] w-[15px] h-[15px] border-navyblue border-t-[10px] lg:border-t-[15px] border-l-[10px] lg:border-l-[15px] border-l-transparent border-r-[10px] lg:border-r-[15px] border-r-transparent scale-[100%] transition-all duration-300 ease-[cubic-bezier(.2,1,.3,1)] ${
                hoveredTab === "solutions"
                  ? "opacity-100 visible top-full"
                  : "opacity-0 invisible top-[50%]"
              }`}
              onMouseEnter={() => isDesktop && handleTabEvent("solutions")}
              onMouseLeave={() => isDesktop && setHoveredTab(null)}
            ></div>
          </div>
        </div>

        {/* tab content sector */}
        <div
          className={`w-full h-[calc(100vh-98px)] lg:h-max overflow-scroll lg:overflow-hidden flex flex-col bg-[#E6E9F5] absolute left-0 transition-all duration-300 ease-[cubic-bezier(.2,1,.3,1)] header-add__ct-wrap ${
            hoveredTab === "sector"
              ? "opacity-100 visible top-full z-[10] lg:max-h-[1000px]"
              : "opacity-0 invisible top-[-50%] z-[-1] lg:max-h-[0px]"
          }`}
          onMouseEnter={() => isDesktop && handleTabEvent("sector")}
          onMouseLeave={() => isDesktop && setHoveredTab(null)}
        >
          <div className="container mx-auto mt-9 lg:mt-0 mb-20 lg:mb-0 pt-0 lg:pt-9 header-add__content h-max lg:h-[300px] grid grid-cols-12 lg:gap-y-4">
            <div className="col-span-12 lg:col-span-2 flex flex-col max-h-max">
              <Link
                href={`/sector`}
                className={`flex flex-row max-w-max items-center mb-4 lg:mb-4 group transition-all duration-300 ease relative ${
                  isActiveLink("/sector") ? "active-add" : ""
                }`}
              >
                <p
                  className={`text-darkblue font-medium text-base group-hover:text-tosca transition-all duration-300 ease ${
                    isActiveLink("/sector") ? "!text-tosca" : ""
                  }`}
                >
                  {locale === "en" ? "Sector Overview" : "Sektor Kami"}
                </p>
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-[-1.7rem] top-1/2 transform -translate-y-1/2 group-hover:right-[-2.2rem] transition-all duration-300 ease"
                >
                  <path
                    d="M1 6L13 6M13 6L8.5 10.5M13 6L8.5 1.5"
                    stroke="#959BA9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-all duration-300 ease group-hover:stroke-tosca ${
                      isActiveLink("/sector") ? "!stroke-tosca" : ""
                    }`}
                  />
                </svg>
              </Link>

              <div
                className="flex flex-row items-center justify-between mb-4 toggle-submenu"
                onClick={() => toggleSubmenu("sectorService")}
              >
                <p className="text-darkblue font-medium text-base">
                  {locale === "en" ? "Service" : "Layanan"}
                </p>
                {!isDesktop && (
                  <svg
                    width="16"
                    height="9"
                    viewBox="0 0 16 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-300 ${
                      openSubmenus.sectorService ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M8.49844 8.78745L15.8099 1.15003C15.9319 1.0226 16 0.853291 16 0.67723C16 0.50117 15.9319 0.331866 15.8099 0.204432L15.8016 0.196209C15.7424 0.134217 15.6712 0.0848551 15.5923 0.0511237C15.5133 0.0173922 15.4283 -2.81104e-06 15.3424 -2.80353e-06C15.2565 -2.79602e-06 15.1715 0.0173922 15.0925 0.0511237C15.0136 0.0848552 14.9424 0.134217 14.8832 0.196209L7.99862 7.38824L1.11681 0.19621C1.05764 0.134219 0.986417 0.0848564 0.907475 0.0511249C0.828532 0.0173935 0.74352 -1.52726e-06 0.65761 -1.51975e-06C0.5717 -1.51224e-06 0.486689 0.0173935 0.407746 0.051125C0.328803 0.0848564 0.25758 0.134219 0.198409 0.19621L0.190148 0.204433C0.0680916 0.331868 1.16436e-06 0.501172 1.17975e-06 0.677231C1.19514e-06 0.853292 0.0680916 1.0226 0.190148 1.15003L7.50156 8.78745C7.56586 8.85461 7.64319 8.90809 7.72887 8.94462C7.81455 8.98116 7.90679 9 8 9C8.09321 9 8.18546 8.98116 8.27113 8.94462C8.35681 8.90809 8.43415 8.85461 8.49844 8.78745Z"
                      fill="#00529C"
                    />
                  </svg>
                )}
              </div>

              <ul
                className={`flex flex-col list-submenu transition-all duration-300 overflow-hidden ${getSubmenuClass(
                  openSubmenus.sectorService || isDesktop
                )}`}
              >
                {menuServices.map((item, index) => (
                  <li className="flex flex-col" key={index}>
                    <Link
                      href={index === 2 ? "/about-bhayangkara" : item.href}
                      className={`flex flex-row max-w-max items-center mb-4 lg:mb-4 transition-all duration-200 ease group relative ${
                        isActiveLink(item.href) ? "active-add" : ""
                      }`}
                    >
                      <p
                        className={`text-darkblue text-sm transition-all duration-200 ease group-hover:text-tosca ${
                          isActiveLink(item.href) ? "!text-tosca" : ""
                        }`}
                      >
                        {item.text}
                      </p>
                      <svg
                        width="14"
                        height="12"
                        viewBox="0 0 14 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-[-1.7rem] top-1/2 transform -translate-y-1/2 group-hover:right-[-2.2rem] transition-all duration-300 ease"
                      >
                        <path
                          d="M1 6L13 6M13 6L8.5 10.5M13 6L8.5 1.5"
                          stroke="#959BA9"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-all duration-200 ease group-hover:stroke-tosca ${
                            isActiveLink(item.href) ? "!stroke-tosca" : ""
                          }`}
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 lg:col-span-10 flex flex-col max-h-max">
              <div
                className="flex flex-row items-center justify-between mb-4 toggle-submenu"
                onClick={() => toggleSubmenu("sectorProducts")}
              >
                <p className="text-darkblue font-medium text-base">
                  {locale === "en" ? "Sectors" : "Sektor"}
                </p>
                {!isDesktop && (
                  <svg
                    width="16"
                    height="9"
                    viewBox="0 0 16 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-300 ${
                      openSubmenus.sectorProducts ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M8.49844 8.78745L15.8099 1.15003C15.9319 1.0226 16 0.853291 16 0.67723C16 0.50117 15.9319 0.331866 15.8099 0.204432L15.8016 0.196209C15.7424 0.134217 15.6712 0.0848551 15.5923 0.0511237C15.5133 0.0173922 15.4283 -2.81104e-06 15.3424 -2.80353e-06C15.2565 -2.79602e-06 15.1715 0.0173922 15.0925 0.0511237C15.0136 0.0848552 14.9424 0.134217 14.8832 0.196209L7.99862 7.38824L1.11681 0.19621C1.05764 0.134219 0.986417 0.0848564 0.907475 0.0511249C0.828532 0.0173935 0.74352 -1.52726e-06 0.65761 -1.51975e-06C0.5717 -1.51224e-06 0.486689 0.0173935 0.407746 0.051125C0.328803 0.0848564 0.25758 0.134219 0.198409 0.19621L0.190148 0.204433C0.0680916 0.331868 1.16436e-06 0.501172 1.17975e-06 0.677231C1.19514e-06 0.853292 0.0680916 1.0226 0.190148 1.15003L7.50156 8.78745C7.56586 8.85461 7.64319 8.90809 7.72887 8.94462C7.81455 8.98116 7.90679 9 8 9C8.09321 9 8.18546 8.98116 8.27113 8.94462C8.35681 8.90809 8.43415 8.85461 8.49844 8.78745Z"
                      fill="#00529C"
                    />
                  </svg>
                )}
              </div>

              <ul
                className={`w-full h-full flex flex-col flex-wrap lg:max-h-[165px] list-submenu transition-all duration-300 overflow-hidden ${getSubmenuClass(
                  openSubmenus.sectorProducts || isDesktop
                )}`}
              >
                {menuSectors.map((item, index) => (
                  <li className="flex flex-col" key={index}>
                    <Link
                      href={item.href}
                      className={`flex flex-row max-w-max items-center mb-4 lg:mb-4 transition-all duration-200 ease group relative ${
                        isActiveLink(item.href) ? "active-add" : ""
                      }`}
                    >
                      <p
                        className={`text-darkblue text-sm transition-all duration-200 ease group-hover:text-tosca ${
                          isActiveLink(item.href) ? "!text-tosca" : ""
                        }`}
                      >
                        {item.text}
                      </p>
                      <svg
                        width="14"
                        height="12"
                        viewBox="0 0 14 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-[-1.7rem] top-1/2 transform -translate-y-1/2 group-hover:right-[-2.2rem] transition-all duration-300 ease"
                      >
                        <path
                          d="M1 6L13 6M13 6L8.5 10.5M13 6L8.5 1.5"
                          stroke="#959BA9"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-all duration-300 ease group-hover:stroke-tosca ${
                            isActiveLink(item.href) ? "!stroke-tosca" : ""
                          }`}
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* tab content solution */}
        <div
          className={`w-full h-[calc(100vh-98px)] lg:h-max overflow-scroll lg:overflow-hidden flex flex-col bg-[#E6E9F5] absolute left-0 transition-all duration-300 ease-[cubic-bezier(.2,1,.3,1)] header-add__ct-wrap ${
            hoveredTab === "solutions"
              ? "opacity-100 visible top-full z-[10] lg:max-h-[1000px]"
              : "opacity-0 invisible top-[-50%] z-[-1] lg:max-h-[0px]"
          }`}
          onMouseEnter={() => isDesktop && handleTabEvent("solutions")}
          onMouseLeave={() => isDesktop && setHoveredTab(null)}
        >
          <div className="container mx-auto mt-9 lg:mt-0 mb-20 lg:mb-0 pt-0 lg:pt-9 header-add__content h-max lg:h-[300px] grid grid-cols-12 lg:gap-y-4">
            <div className="col-span-12 lg:col-span-2 flex flex-col max-h-max">
              <Link
                href={`/solution`}
                className={`flex flex-row max-w-max items-center mb-4 lg:mb-4 group transition-all duration-300 ease relative ${
                  isActiveLink("/solution") ? "active-add" : ""
                }`}
              >
                <p
                  className={`text-darkblue font-medium text-base group-hover:text-tosca transition-all duration-300 ease ${
                    isActiveLink("/solution") ? "!text-tosca" : ""
                  }`}
                >
                  {locale === "en" ? "Solutions Overview" : "Solusi Kami"}
                </p>
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-[-1.7rem] top-1/2 transform -translate-y-1/2 group-hover:right-[-2.2rem] transition-all duration-300 ease"
                >
                  <path
                    d="M1 6L13 6M13 6L8.5 10.5M13 6L8.5 1.5"
                    stroke="#959BA9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-all duration-300 ease group-hover:stroke-tosca ${
                      isActiveLink("/solution") ? "!stroke-tosca" : ""
                    }`}
                  />
                </svg>
              </Link>

              <div
                className="flex flex-row items-center justify-between mb-4 toggle-submenu"
                onClick={() => toggleSubmenu("solutionsService")}
              >
                <p className="text-darkblue font-medium text-base">
                  {locale === "en" ? "Service" : "Layanan"}
                </p>
                {!isDesktop && (
                  <svg
                    width="16"
                    height="9"
                    viewBox="0 0 16 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-300 ${
                      openSubmenus.solutionsService ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M8.49844 8.78745L15.8099 1.15003C15.9319 1.0226 16 0.853291 16 0.67723C16 0.50117 15.9319 0.331866 15.8099 0.204432L15.8016 0.196209C15.7424 0.134217 15.6712 0.0848551 15.5923 0.0511237C15.5133 0.0173922 15.4283 -2.81104e-06 15.3424 -2.80353e-06C15.2565 -2.79602e-06 15.1715 0.0173922 15.0925 0.0511237C15.0136 0.0848552 14.9424 0.134217 14.8832 0.196209L7.99862 7.38824L1.11681 0.19621C1.05764 0.134219 0.986417 0.0848564 0.907475 0.0511249C0.828532 0.0173935 0.74352 -1.52726e-06 0.65761 -1.51975e-06C0.5717 -1.51224e-06 0.486689 0.0173935 0.407746 0.051125C0.328803 0.0848564 0.25758 0.134219 0.198409 0.19621L0.190148 0.204433C0.0680916 0.331868 1.16436e-06 0.501172 1.17975e-06 0.677231C1.19514e-06 0.853292 0.0680916 1.0226 0.190148 1.15003L7.50156 8.78745C7.56586 8.85461 7.64319 8.90809 7.72887 8.94462C7.81455 8.98116 7.90679 9 8 9C8.09321 9 8.18546 8.98116 8.27113 8.94462C8.35681 8.90809 8.43415 8.85461 8.49844 8.78745Z"
                      fill="#00529C"
                    />
                  </svg>
                )}
              </div>

              <ul
                className={`flex flex-col list-submenu transition-all duration-300 overflow-hidden ${getSubmenuClass(
                  openSubmenus.solutionsService || isDesktop
                )}`}
              >
                {menuServices.map((item, index) => (
                  <li className="flex flex-col" key={index}>
                    <Link
                      href={index === 2 ? "/about-bhayangkara" : item.href}
                      className={`flex flex-row max-w-max items-center mb-4 lg:mb-4 transition-all duration-200 ease group relative ${
                        isActiveLink(item.href) ? "active-add" : ""
                      }`}
                    >
                      <p
                        className={`text-darkblue text-sm transition-all duration-200 ease group-hover:text-tosca  ${
                          isActiveLink(item.href) ? "!text-tosca" : ""
                        }`}
                      >
                        {item.text}
                      </p>
                      <svg
                        width="14"
                        height="12"
                        viewBox="0 0 14 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-[-1.7rem] top-1/2 transform -translate-y-1/2 group-hover:right-[-2.2rem] transition-all duration-300 ease"
                      >
                        <path
                          d="M1 6L13 6M13 6L8.5 10.5M13 6L8.5 1.5"
                          stroke="#959BA9"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-all duration-200 ease group-hover:stroke-tosca ${
                            isActiveLink(item.href) ? "!stroke-tosca" : ""
                          }`}
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 lg:col-span-10 flex flex-col max-h-max">
              <div
                className="flex flex-row items-center justify-between mb-4 toggle-submenu"
                onClick={() => toggleSubmenu("solutionsProducts")}
              >
                <p className="text-darkblue font-medium text-base">
                  {locale === "en" ? "Products" : "Produk"}
                </p>
                {!isDesktop && (
                  <svg
                    width="16"
                    height="9"
                    viewBox="0 0 16 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-300 ${
                      openSubmenus.solutionsProducts ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M8.49844 8.78745L15.8099 1.15003C15.9319 1.0226 16 0.853291 16 0.67723C16 0.50117 15.9319 0.331866 15.8099 0.204432L15.8016 0.196209C15.7424 0.134217 15.6712 0.0848551 15.5923 0.0511237C15.5133 0.0173922 15.4283 -2.81104e-06 15.3424 -2.80353e-06C15.2565 -2.79602e-06 15.1715 0.0173922 15.0925 0.0511237C15.0136 0.0848552 14.9424 0.134217 14.8832 0.196209L7.99862 7.38824L1.11681 0.19621C1.05764 0.134219 0.986417 0.0848564 0.907475 0.0511249C0.828532 0.0173935 0.74352 -1.52726e-06 0.65761 -1.51975e-06C0.5717 -1.51224e-06 0.486689 0.0173935 0.407746 0.051125C0.328803 0.0848564 0.25758 0.134219 0.198409 0.19621L0.190148 0.204433C0.0680916 0.331868 1.16436e-06 0.501172 1.17975e-06 0.677231C1.19514e-06 0.853292 0.0680916 1.0226 0.190148 1.15003L7.50156 8.78745C7.56586 8.85461 7.64319 8.90809 7.72887 8.94462C7.81455 8.98116 7.90679 9 8 9C8.09321 9 8.18546 8.98116 8.27113 8.94462C8.35681 8.90809 8.43415 8.85461 8.49844 8.78745Z"
                      fill="#00529C"
                    />
                  </svg>
                )}
              </div>

              <ul
                className={`w-full h-full flex flex-col flex-wrap lg:max-h-[165px] list-submenu transition-all duration-300 overflow-hidden ${getSubmenuClass(
                  openSubmenus.solutionsProducts || isDesktop
                )}`}
              >
                {menuProducts
                  .filter((item) => item.type && item.type === "business")
                  .map((item, index) => (
                    <li className="flex flex-col" key={index}>
                      <Link
                        href={item.href}
                        className={`flex flex-row max-w-max items-center mb-4 lg:mb-4 transition-all duration-200 ease group relative ${
                          isActiveLink(item.href) ? "active-add" : ""
                        }`}
                      >
                        <p
                          className={`text-darkblue text-sm transition-all duration-200 ease group-hover:text-tosca ${
                            isActiveLink(item.href) ? "!text-tosca" : ""
                          }`}
                        >
                          {item.text}
                        </p>
                        <svg
                          width="14"
                          height="12"
                          viewBox="0 0 14 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute right-[-1.7rem] top-1/2 transform -translate-y-1/2 group-hover:right-[-2.2rem] transition-all duration-300 ease"
                        >
                          <path
                            d="M1 6L13 6M13 6L8.5 10.5M13 6L8.5 1.5"
                            stroke="#959BA9"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-all duration-300 ease group-hover:stroke-tosca ${
                              isActiveLink(item.href) ? "!stroke-tosca" : ""
                            }`}
                          />
                        </svg>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderAdditional;
