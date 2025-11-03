"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";

const FooterTop = ({
  prefooterData,
  prefooterBusiness,
  prefooterResidential,
  prefooterAbout,
}) => {
  const [shouldHide, setShouldHide] = useState(false);
  const [customCta, setCustomCta] = useState(null);
  const pathname = usePathname();

  // Fungsi untuk mendapatkan prefooter yang sesuai berdasarkan pathname
  const getCurrentPrefooter = () => {
    const businessPattern = /^\/(en\/)?(business|sector)(\/|$)/;
    const residentialPattern = /^\/(en\/)?residential(\/|$)/;
    const aboutPattern = /^\/(en\/)?about(\/|$)/;

    if (businessPattern.test(pathname)) {
      return prefooterBusiness || prefooterData;
    } else if (residentialPattern.test(pathname)) {
      return prefooterResidential || prefooterData;
    } else if (aboutPattern.test(pathname)) {
      return prefooterAbout || prefooterData;
    }

    return prefooterData;
  };

  // Fungsi untuk membersihkan href dari locale prefix yang duplikat
  const cleanHref = (href) => {
    if (!href) return href;

    let cleanedHref = href;

    cleanedHref = cleanedHref.replace(/(\/en\/)+/g, "/en/");
    cleanedHref = cleanedHref.replace(/(\/id\/)+/g, "/id/");

    const currentLocale = pathname.startsWith("/en/") ? "en" : "id";
    const localePrefix = `/${currentLocale}/`;

    if (cleanedHref.startsWith(localePrefix)) {
      return cleanedHref.slice(localePrefix.length - 1);
    }

    return cleanedHref;
  };

  // Fungsi untuk mencari dan mengambil data dari .spesific__cta-detail
  const getSpecificCtaData = () => {
    const specificCtaElement = document.querySelector(".spesific__cta-detail");

    if (specificCtaElement) {
      const href = specificCtaElement.getAttribute("href");
      const text = specificCtaElement.textContent?.trim();

      if (href && text) {
        return {
          href: cleanHref(href),
          text: text,
        };
      }
    }
    return null;
  };

  const currentPrefooter = getCurrentPrefooter();

  useEffect(() => {
    // Reset customCta setiap kali pathname berubah
    setCustomCta(null);

    const hasHideFooterTop =
      document.querySelector(".hide__footer__top") !== null;
    setShouldHide(hasHideFooterTop);

    // Gunakan setTimeout untuk memastikan DOM sudah sepenuhnya ter-render
    const timer = setTimeout(() => {
      const ctaData = getSpecificCtaData();
      if (ctaData) {
        setCustomCta(ctaData);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Effect untuk handle dynamic content (tetap dipertahankan)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const ctaData = getSpecificCtaData();
      // Hanya update jika ada perubahan
      if (
        ctaData &&
        (!customCta ||
          ctaData.href !== customCta.href ||
          ctaData.text !== customCta.text)
      ) {
        setCustomCta(ctaData);
      } else if (!ctaData && customCta) {
        setCustomCta(null);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [customCta]); // Tambahkan customCta sebagai dependency

  if (shouldHide) return null;
  if (!currentPrefooter) return null;

  // Tentukan href dan text yang akan digunakan
  const finalHref = customCta
    ? customCta.href
    : currentPrefooter.button_link || prefooterData.button_link;
  const finalText = customCta
    ? customCta.text
    : currentPrefooter.button_text || prefooterData.button_text;

  return (
    <>
      <section className="relative z-10 flex flex-col border-b-1 border-[#ffffff66] w-full footer__top">
        <div className="relative z-[1] container w-full mx-auto">
          <div className="w-[90%] lg:w-3/4 border-r-1 py-3 lg:pt-19 lg:pb-19 border-[#ffffff66] flex flex-col">
            <h2 className="text-white text-[25px] lg:text-[60px] pr-4 lg:pl-0 py-3">
              {currentPrefooter.title || prefooterData.title}
            </h2>
          </div>
          <div className="w-[10%] lg:w-1/4"></div>
        </div>
      </section>

      <section className="relative z-10 flex flex-col w-full footer__cta">
        <div className="container relative z-[1] w-full mx-auto flex flex-row">
          <div className="w-[15%] lg:w-1/4"></div>
          <div className="w-[85%] lg:w-3/4 flex flex-col gap-y-8 lg:gap-y-6 border-[#ffffff66] border-l-1 pl-8 py-6 lg:pl-26 lg:pt-21 lg:pb-21">
            <p className="text-white text-[13px] lg:text-lg lg:text-[25px]">
              {currentPrefooter.description || prefooterData.description}
            </p>
            <Link
              href={finalHref}
              target="_self"
              className="max-w-max font-raleway bg-white text-tosca text-[13px] lg:text-base px-3 py-3 lg:px-4 lg:py-3.5 rounded-[5px] tracking-[3px] uppercase transition-all ease duration-200 hover:opacity-80 footer__btn-consult"
            >
              {finalText}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterTop;
