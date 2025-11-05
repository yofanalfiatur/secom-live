"use client";
import useIsDesktop from "@/components/Hooks/useIsDesktop";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CareerVacancies = (props) => {
  const { dataSection, listVacancies } = props;

  const ITEMS_PER_PAGE = 4;

  const isDesktop = useIsDesktop();
  const locale = useLocale();

  // State pagination
  const [currentPage, setCurrentPage] = useState(1);

  // calculate total pages
  const totalPages = Math.ceil(listVacancies.length / ITEMS_PER_PAGE);

  // data for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = listVacancies.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Function to format job type
  const formatJobType = (type) => {
    const typeMap = {
      fulltime: "Full Time",
      parttime: "Part Time",
      freelance: "Freelance",
    };

    return typeMap[type.toLowerCase()] || type;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="flex flex-col pt-10 lg:pt-20 pb-6 lg:pb-10 bg-[#E6F3FF] cr-vac">
      <div className="container mx-auto flex flex-col lg:flex-row">
        {/* Intro */}
        <div className="w-full lg:w-4/12 lg:pr-25 mb-5 lg:mb-0 cr-vac__intro">
          <h2 className="text-darkblue text-[30px] lg:text-[40px] font-raleway font-normal leading-[1.2]">
            {dataSection.title_section}
          </h2>
          <p className="text-darkblue text-sm lg:text-lg leading-[1.7] lg:leading-[1.5] mt-2 lg:mt-4">
            {dataSection.description_section}
          </p>
        </div>

        {/* List */}
        <div className="w-full h-full lg:w-8/12 cr-vac__list">
          <AnimatePresence mode="wait">
            <motion.ul
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
            >
              {currentItems.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col border-[1px] border-[#00000033] bg-white lg:rounded-[5px]"
                >
                  <div className="flex flex-col border-b-[1px] px-5 pt-5 pb-4 lg:pb-3 border-[#00000033] gap-2">
                    <div className="flex flex-row gap-3">
                      <p className="text-darkblue text-xs leading-[1] bg-[#e6e6e6] flex flex-col items-center justify-center py-[7px] px-4 font-semibold lg:font-normal lg:rounded-[5px]">
                        {item.location}
                      </p>
                      <p className="text-darkblue text-xs leading-[1] bg-[#e6e6e6] flex flex-col items-center justify-center py-[7px] px-4 font-semibold lg:font-normal lg:rounded-[5px]">
                        {formatJobType(item.type)}
                      </p>
                    </div>
                    <p className="text-darkblue text-[20px] lg:text-[25px] font-raleway font-medium">
                      {item.title}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between px-5 pt-4 lg:pt-6 pb-6 lg:pb-7 h-full">
                    <p className="text-darkblue text-base lg:text-base leading-[1.7] lg:leading-[1.5] pb-4 lg:pb-6">
                      {item.shortDesc}
                    </p>
                    <Link
                      href={`/career/${item.slug}`}
                      target="_self"
                      className="flex flex-row max-w-max gap-3 items-center hover:gap-5 transition-all duration-300 ease relative after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-tosca after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:after:h-[1px]"
                    >
                      <p className="text-tosca text-sm lg:text-lg tracking-[2px]">
                        {locale === "en" ? "SEE DETAILS" : "LIHAT DETAIL"}
                      </p>
                      <svg
                        width="12"
                        height="11"
                        viewBox="0 0 12 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.2025 10.8297C7.19973 10.8297 7.19834 10.8264 7.20029 10.8244L10.5942 7.41288C11.3718 6.63124 11.3718 5.36823 10.5942 4.58659L7.195 1.16974C7.1516 1.11275 7.09647 1.06575 7.03333 1.03192C6.9702 0.998098 6.90053 0.978231 6.82904 0.973671C6.75756 0.96911 6.68593 0.979961 6.61901 1.00549C6.55208 1.03102 6.49142 1.07063 6.44114 1.12164C6.39085 1.17265 6.35211 1.23386 6.32754 1.30115C6.30297 1.36843 6.29315 1.44021 6.29873 1.51162C6.30431 1.58303 6.32517 1.65241 6.35989 1.71505C6.36897 1.73144 6.37895 1.74726 6.38975 1.76245C6.45072 1.84817 6.5372 1.91224 6.61127 1.98693C7.90151 3.28794 6.97996 5.49974 5.14766 5.49974L0.53 5.49974C0.397391 5.49974 0.270215 5.55241 0.176447 5.64618C0.0826786 5.73995 0.0299995 5.86713 0.0299995 5.99974C0.0299995 6.13234 0.0826786 6.25952 0.176447 6.35329C0.270215 6.44706 0.397391 6.49974 0.529999 6.49974L4.98964 6.49974C6.88047 6.49974 7.83145 8.78218 6.5 10.1247C6.40651 10.2189 6.35425 10.3463 6.35472 10.479C6.35519 10.6117 6.40835 10.7387 6.5025 10.8322C6.59665 10.9257 6.72409 10.978 6.85677 10.9775C6.98695 10.9771 7.11172 10.9259 7.20468 10.835C7.20666 10.8331 7.20528 10.8297 7.2025 10.8297Z"
                          fill="#00AAAD"
                        />
                      </svg>
                    </Link>
                  </div>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center lg:justify-start items-center mt-8 lg:mt-11 gap-2 lg:gap-8">
              {/* Prev */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-2 py-2 cursor-pointer ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <svg
                  width="14"
                  height="21"
                  viewBox="0 0 14 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8041 0.544199L0.759765 10.1219L10.8041 19.6996C11.0778 19.9598 11.4451 20.102 11.8252 20.095C12.2053 20.088 12.5669 19.9323 12.8306 19.6621C13.0943 19.392 13.2385 19.0296 13.2314 18.6546C13.2243 18.2797 13.0665 17.9228 12.7927 17.6626L4.88029 10.1219L12.7927 2.5728C13.0665 2.31261 13.2243 1.95578 13.2314 1.5808C13.2385 1.20582 13.0943 0.843408 12.8306 0.573297C12.5669 0.303184 12.2053 0.147495 11.8252 0.14048C11.4451 0.133463 11.0778 0.275694 10.8041 0.535885L10.8041 0.544199Z"
                    fill="#2553A8"
                  />
                </svg>
              </button>

              {/* Page Numbers (max 5) */}
              {(() => {
                const pageNumbers = [];
                let startPage = Math.max(1, currentPage - 2);
                let endPage = Math.min(totalPages, currentPage + 2);

                // Adjust to show at least 5 page numbers
                if (endPage - startPage < 4) {
                  if (startPage === 1) {
                    endPage = Math.min(5, totalPages);
                  } else if (endPage === totalPages) {
                    startPage = Math.max(1, totalPages - 4);
                  }
                }

                for (let i = startPage; i <= endPage; i++) {
                  pageNumbers.push(
                    <button
                      key={i}
                      onClick={() => handlePageChange(i)}
                      className={`px-2 py-2 text-sm lg:text-lg cursor-pointer ${
                        currentPage === i
                          ? "text-navyblue font-bold"
                          : "text-darkblue font-normal"
                      }`}
                    >
                      {i}
                    </button>
                  );
                }

                return pageNumbers;
              })()}

              {/* Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-2 py-2 cursor-pointer ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <svg
                  width="13"
                  height="21"
                  viewBox="0 0 13 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.78187 19.6914L12.8262 10.1137L2.78187 0.536033C2.5081 0.275843 2.14079 0.133612 1.76074 0.140628C1.38069 0.147644 1.01902 0.303334 0.755314 0.573446C0.491605 0.843558 0.347449 1.20597 0.35456 1.58095C0.361671 1.95593 0.519466 2.31276 0.793233 2.57295L8.70565 10.1137L0.793232 17.6628C0.519466 17.923 0.361671 18.2798 0.354559 18.6548C0.347448 19.0298 0.491604 19.3922 0.755313 19.6623C1.01902 19.9324 1.38068 20.0881 1.76074 20.0951C2.14079 20.1021 2.5081 19.9599 2.78187 19.6997L2.78187 19.6914Z"
                    fill="#2553A8"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CareerVacancies;
