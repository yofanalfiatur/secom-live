"use client";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NewsLanding = () => {
  const ITEMS_PER_PAGE = 5;

  const t = useTranslations();
  const NewsThumb = t.raw("NewsSingle");
  const locale = useLocale();

  // State pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(NewsThumb.length / ITEMS_PER_PAGE);

  // Data for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = NewsThumb.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Helper untuk format tanggal
  const formatDate = (dateString, locale) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const [clickedFilter, setClickedFilter] = useState(null);

  return (
    <>
      <section className="flex flex-col relative pt-10 lg:pt-0 overflow-hidden news-lp">
        <div className="container mx-auto flex flex-col lg:flex-row relative">
          <div className="w-full h-max lg:w-3/12 flex flex-col relative lg:sticky lg:top-[120] lg:pr-10 lg:pt-10 pb-10 lg:pb-20">
            <p className="text-darkblue text-[30px] lg:text-[40px] font-raleway font-normal leading-[1] pb-4 lg:pb-6">
              {locale === "en" ? "Articles" : "Artikel"}
            </p>
            <div className="flex flex-col gap-y-3 lg:gap-y-4 news-lp__filter">
              <div
                className={`flex flex-col relative news-lp__years ${
                  clickedFilter === "archive" ? "z-[3]" : "z-0"
                }`}
              >
                <button
                  name=""
                  id=""
                  className="text-navyblue relative z-0 uppercase tracking-[3px] font-raleway text-xs lg:text-base rounded-[5px] px-4 py-[16px] appearance-none w-full border-[1px] border-[#00000033] text-start cursor-pointer news-lp__years"
                  onClick={() =>
                    setClickedFilter(
                      clickedFilter === "archive" ? null : "archive"
                    )
                  }
                >
                  {locale === "en" ? "Archive" : "Arsip"}
                </button>
                <svg
                  width="22"
                  height="15"
                  viewBox="0 0 22 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`absolute z-0 right-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-all duration-300 ease scale-60 lg:scale-100 ${
                    clickedFilter === "archive" ? "rotate-0" : "rotate-180"
                  }`}
                >
                  <path
                    d="M21.3765 12.0804L10.9045 0L0.432595 12.0804C0.148111 12.4096 -0.00740039 12.8514 0.000270989 13.3085C0.00794236 13.7656 0.178168 14.2005 0.473501 14.5177C0.768834 14.8349 1.16508 15.0083 1.57507 14.9997C1.98507 14.9911 2.37522 14.8014 2.6597 14.4721L10.9045 4.95578L19.1585 14.4721C19.443 14.8014 19.8331 14.9911 20.2431 14.9997C20.6531 15.0083 21.0493 14.8349 21.3447 14.5177C21.64 14.2005 21.8102 13.7656 21.8179 13.3085C21.8256 12.8514 21.6701 12.4096 21.3856 12.0804H21.3765Z"
                    fill="#00AAAD"
                  />
                </svg>

                <ul
                  className={`flex flex-col absolute z-[2] transform top-full left-0 bg-white w-full h-auto border-[1px] border-[#00000033] rounded-[5px] cursor-pointer ease-[cubic-bezier(.2,1,.3,1)] duration-300 transition-all ${
                    clickedFilter === "archive"
                      ? "max-h-[2000px] opacity-100 visible"
                      : "max-h-0 opacity-0 invisible"
                  }`}
                >
                  {NewsThumb.map((item, index) => (
                    <li
                      key={index}
                      value={item.publishedDate}
                      className="text-darkblue py-2 px-2"
                    >
                      {item.publishedDate}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`flex flex-col relative news-lp__category ${
                  clickedFilter === "category" ? "z-[3]" : "z-0"
                }`}
              >
                <button
                  name=""
                  id=""
                  className="text-navyblue relative z-0 uppercase tracking-[3px] font-raleway text-xs lg:text-base rounded-[5px] px-4 py-[16px] appearance-none w-full border-[1px] border-[#00000033] text-start cursor-pointer news-lp__years"
                  onClick={() =>
                    setClickedFilter(
                      clickedFilter === "category" ? null : "category"
                    )
                  }
                >
                  {locale === "en" ? "Category" : "Kategori"}
                </button>
                <svg
                  width="22"
                  height="15"
                  viewBox="0 0 22 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`absolute z-0 right-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-all duration-300 ease scale-60 lg:scale-100 ${
                    clickedFilter === "category" ? "rotate-0" : "rotate-180"
                  }`}
                >
                  <path
                    d="M21.3765 12.0804L10.9045 0L0.432595 12.0804C0.148111 12.4096 -0.00740039 12.8514 0.000270989 13.3085C0.00794236 13.7656 0.178168 14.2005 0.473501 14.5177C0.768834 14.8349 1.16508 15.0083 1.57507 14.9997C1.98507 14.9911 2.37522 14.8014 2.6597 14.4721L10.9045 4.95578L19.1585 14.4721C19.443 14.8014 19.8331 14.9911 20.2431 14.9997C20.6531 15.0083 21.0493 14.8349 21.3447 14.5177C21.64 14.2005 21.8102 13.7656 21.8179 13.3085C21.8256 12.8514 21.6701 12.4096 21.3856 12.0804H21.3765Z"
                    fill="#00AAAD"
                  />
                </svg>

                <ul
                  className={`flex flex-col absolute z-[2] transform top-full left-0 bg-white w-full h-auto border-[1px] border-[#00000033] rounded-[5px] cursor-pointer ease-[cubic-bezier(.2,1,.3,1)] duration-300 transition-all ${
                    clickedFilter === "category"
                      ? "max-h-[2000px] opacity-100 visible"
                      : "max-h-0 opacity-0 invisible"
                  }`}
                >
                  {NewsThumb.map((item, index) => (
                    <li
                      key={index}
                      value={item.category}
                      className="text-darkblue py-2 px-2"
                    >
                      {item.category}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-9/12 flex flex-col lg:border-l-[1px] lg:border-[#13223333]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="news-lp__list-content"
              >
                {currentItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col lg:flex-row after:content-[''] after:absolute after:w-[calc(300%_+_(100vw-1320px+8rem)/2)] after:md:w-[calc(200%_+_(100vw-1320px+8rem)/2)] after:lg:w-[calc(150%_+_(100vw-1320px+4rem)/2)] after:h-[1px] after:bottom-0 after:left-[-50%] after:lg:left-0 after:bg-[#13223333] after:z-[-1] relative lg:pl-16 pb-9 lg:pb-16 lg:pt-16 mb-11 lg:mb-0"
                  >
                    {item.featuredImage && (
                      <div className="w-full lg:w-4/12 flex flex-col news-item__wrap-image px-8 pb-6 lg:px-0 lg:pb-0 lg:pr-12">
                        <Image
                          src={item.featuredImage}
                          alt={item.title}
                          width={800}
                          height={800}
                          quality={100}
                          className="w-full h-auto object-cover object-center aspect-square"
                        />
                      </div>
                    )}

                    <div className="w-full lg:w-full flex flex-col news-item__wrap-content">
                      <div className="flex flex-row max-w-max">
                        <p className="text-darkblue text-[10px] lg:text-sm uppercase relative flex flex-row after:content-[''] after:bg-darkblue after:w-[1px] after:h-full after:mx-2 leading-[1]">
                          {item.category}
                        </p>
                        <p className="text-darkblue text-[10px] lg:text-sm uppercase leading-[1]">
                          {formatDate(item.publishedDate, locale)}
                        </p>
                      </div>
                      <Link
                        href={`#detail`}
                        className="text-darkblue text-[25px] leading-[1.3] font-normal font-raleway transition-all ease duration-300 hover:text-navyblue mt-3 mb-2 lg:mb-1"
                      >
                        {item.title}
                      </Link>
                      <p className="text-darkblue text-sm lg:text-lg leading-[1.7] lg:leading-[1.5]">
                        {item.excerpt}
                      </p>
                      <Link
                        href={`#detail`}
                        className="flex flex-row max-w-max items-center gap-2 relative mt-5 lg:mb-4 after:content-[''] after:absolute after:bg-navyblue after:w-0 after:h-[1px] after:left-0 after:bottom-0 after:z-[-1] hover:after:w-full hover:after:transition-all hover:after:ease-in-out hover:after:duration-300"
                      >
                        <p className="flex flex-col text-navyblue uppercase tracking-[2px] text-sm lg:text-lg leading-[1.7] lg:leading-[1.5]">
                          {locale === "en" ? "Read more" : "Baca Selengkapnya"}
                        </p>
                        <svg
                          width="12"
                          height="11"
                          viewBox="0 0 12 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.195 10.83L12 5.99998L7.195 1.16998C7.1516 1.11299 7.09647 1.066 7.03333 1.03217C6.9702 0.998342 6.90053 0.978476 6.82904 0.973915C6.75756 0.969354 6.68593 0.980205 6.61901 1.00573C6.55208 1.03126 6.49142 1.07087 6.44114 1.12188C6.39085 1.17289 6.35211 1.23411 6.32754 1.30139C6.30297 1.36867 6.29315 1.44045 6.29873 1.51186C6.30431 1.58327 6.32517 1.65265 6.35989 1.7153C6.39462 1.77795 6.4424 1.8324 6.5 1.87498L10.095 5.49998L0.53 5.49998C0.397391 5.49998 0.270215 5.55266 0.176447 5.64643C0.0826786 5.74019 0.0299995 5.86737 0.0299995 5.99998C0.0299995 6.13259 0.0826786 6.25977 0.176447 6.35353C0.270215 6.4473 0.397391 6.49998 0.529999 6.49998L10.095 6.49998L6.5 10.125C6.40651 10.2191 6.35425 10.3466 6.35472 10.4792C6.35519 10.6119 6.40835 10.739 6.5025 10.8325C6.59665 10.926 6.72409 10.9782 6.85677 10.9778C6.98945 10.9773 7.11651 10.9241 7.21 10.83L7.195 10.83Z"
                            fill="#00529C"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center lg:justify-start items-center mt-0 lg:mt-9 mb-6 lg:mb-9 gap-2 lg:gap-8 lg:pl-16">
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
    </>
  );
};

export default NewsLanding;
